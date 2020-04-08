import DaoStakeLocking from '@digix/dao-contracts/build/contracts/DaoStakeLocking.json';
import React from 'react';
import SpectrumConfig from 'spectrum-lightsuite/spectrum.config';
import TxVisualization from '@digix/gov-ui/components/common/blocks/tx-visualization';
import getContract from '@digix/gov-ui/utils/contracts';
import web3Connect from 'spectrum-lightsuite/src/helpers/web3/connect';
import { DEFAULT_GAS_PRICE } from '@digix/gov-ui/constants';
import { Step } from '@digix/gov-ui/pages/dissolution/style';
import { connect } from 'react-redux';
import { executeContractFunction } from '@digix/gov-ui/utils/web3Helper';
import { getAddresses } from 'spectrum-lightsuite/src/selectors';
import { registerUIs } from 'spectrum-lightsuite/src/helpers/uiRegistry';
import { showTxSigningModal } from 'spectrum-lightsuite/src/actions/session';
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { Button } from '@digix/gov-ui/components/common/elements';
import {
  getSignTransactionTranslation,
  truncateNumber,
} from '@digix/gov-ui/utils/helpers';
import {
  showHideAlert,
  setLockedDgd,
} from '@digix/gov-ui/reducers/gov-ui/actions';
import {
  unlockSubscription,
  withApolloClient,
} from '@digix/gov-ui/pages/dissolution/api/queries';

const {
  Content,
  Container,
  Currency,
  CurrencyLabel,
  CurrencyValue,
  Title,
  SuccessIcon,
} = Step;

registerUIs({ txVisualization: { component: TxVisualization } });
const network = SpectrumConfig.defaultNetworks[0];

class UnlockStep extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isTxBroadcasted: false,
      unlockAmount: 0,
    };

    this.subscription = undefined;
  }

  componentWillReceiveProps(nextProps) {
    const { lockedDgd } = this.props;
    const nextLockedDgd = nextProps.lockedDgd;

    if (lockedDgd !== nextLockedDgd) {
      this.getCurrentTimeInQuarter()
        .then((currentTimeInQuarter) => {
          const unlockAmount = this.getUnlockableAmount(nextLockedDgd, currentTimeInQuarter);
          this.setState({ unlockAmount });
        });
    }
  }

  getCurrentTimeInQuarter() {
    const { web3Redux } = this.props;
    const { abi, address } = getContract(DaoStakeLocking, network);
    const { web3 } = web3Redux.networks[network];
    const contract = web3.eth.contract(abi).at(address);

    return contract.currentTimeInQuarter
      .call()
      .then(time => (Number(time.toString())));
  }

  getUnlockableAmount = (lockedDGDAmount, currentTimeInQuarter) => {
    const daysSinceTime = Math.floor(currentTimeInQuarter / 60 / 60 / 24) - 10;
    const unlockableAmount = ((80 - daysSinceTime - 1) / 80) * lockedDGDAmount;

    return unlockableAmount;
  }

  unlockDgd = (unlockAmount) => {
    const {
      addresses,
      confirmMinedTx,
      lockedDgd,
      setCurrentSubscription,
      t,
      web3Redux
    } = this.props;
    const { abi, address } = getContract(DaoStakeLocking, network);
    const sourceAddress = addresses.find(({ isDefault }) => isDefault);
    const contract = web3Redux
      .web3(network)
      .eth.contract(abi)
      .at(address);

    const ui = {
      caption: t('snackbars.dissolutionUnlock.title'),
      header: 'User',
      type: 'txVisualization',
    };

    const web3Params = {
      gasPrice: DEFAULT_GAS_PRICE,
      gas: 2000000,
      ui,
    };

    const onTransactionSuccess = (txHash) => {
      if (this.subscription) {
        this.subscription.unsubscribe();
        this.subscription = undefined;
      }

      this.props.setHasUnlocked(true);
      this.props.setLockedDgd(lockedDgd - unlockAmount);
      this.props.showHideAlert({
        message: t('snackbars.dissolutionUnlock.success'),
        status: 'success',
        statusMessage: t('status.success'),
        txHash,
      });
    };

    const onFailure = (error) => {
      if (this.subscription) {
        this.setState({ isTxBroadcasted: false });
        this.subscription.unsubscribe();
        this.subscription = undefined;
      }

      const message = JSON.stringify(error && error.message) || error;
      this.props.showHideAlert({
        message: `${t('snackbars.dissolutionUnlock.fail')}: ${message}`,
        status: 'error',
        statusMessage: t('status.error'),
      });
    };

    const onTransactionAttempt = (txHash) => {
      this.setState({ isTxBroadcasted: true });
      this.props.showHideAlert({
        message: t('snackbars.dissolutionUnlock.message'),
        status: 'pending',
        txHash,
      });

      confirmMinedTx(txHash, web3Redux.web3(network), onFailure);
      const subscription = this.props.client.subscribe({
        query: unlockSubscription,
        variables: { address: sourceAddress.address.toLowerCase() },
      }).subscribe({
        next(response) {
          if (response.data.byAddress.length) {
            onTransactionSuccess(txHash);
          }
        },
        error(error) {
          onFailure(error);
        },
      });

      this.subscription = subscription;
      setCurrentSubscription(subscription);
    };

    const txnTranslations = getSignTransactionTranslation();
    const payload = {
      address: sourceAddress,
      contract,
      func: contract.withdrawDGD,
      network,
      onFailure,
      onFinally: txHash => onTransactionAttempt(txHash),
      onSuccess: txHash => onTransactionSuccess(txHash),
      params: [unlockAmount * 1e9],
      showTxSigningModal: this.props.showTxSigningModal,
      translations: txnTranslations,
      ui,
      web3Params,
    };

    return executeContractFunction(payload);
  };

  render() {
    const { isTxBroadcasted, unlockAmount } = this.state;
    const {
      lockedDgd,
      t,
    } = this.props;

    const isButtonEnabled = lockedDgd > 0;
    const buttonLabel = isButtonEnabled
      ? t('Dissolution:Unlock.button')
      : <SuccessIcon kind="check" />;

    return (
      <Container>
        <Title>{t('Dissolution:Unlock.title')}</Title>
        <Content>
          <Currency>
            <CurrencyValue>{truncateNumber(unlockAmount)}</CurrencyValue>
            <CurrencyLabel>Unlockable DGD</CurrencyLabel>
          </Currency>
        </Content>
        <Button
          disabled={isTxBroadcasted || !isButtonEnabled}
          onClick={() => this.unlockDgd(unlockAmount)}
          secondary
        >
          {buttonLabel}
        </Button>
      </Container>
    );
  }
}

const {
  array,
  func,
  number,
  object,
} = PropTypes;

UnlockStep.propTypes = {
  addresses: array,
  client: object.isRequired,
  confirmMinedTx: func.isRequired,
  lockedDgd: number.isRequired,
  showHideAlert: func.isRequired,
  setHasUnlocked: func.isRequired,
  setLockedDgd: func.isRequired,
  setCurrentSubscription: func.isRequired,
  showTxSigningModal: func.isRequired,
  t: func.isRequired,
  web3Redux: object.isRequired,
};

UnlockStep.defaultProps = {
  addresses: [],
};

const mapStateToProps = state => ({
  addresses: getAddresses(state),
  lockedDgd: state.govUI.Dissolution.lockedDgd,
});

export default withTranslation(['Snackbar', 'Dissolution'])(
  withApolloClient(
    web3Connect(connect(mapStateToProps, {
      showHideAlert,
      setLockedDgd,
      showTxSigningModal,
    })(UnlockStep))
  )
);

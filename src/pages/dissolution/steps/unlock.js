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
import PropTypes, { bool } from 'prop-types';
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
  ErrorMessage,
  TextInput,
  Title,
  Subtitle,
  SuccessIcon,
} = Step;

registerUIs({ txVisualization: { component: TxVisualization } });
const network = SpectrumConfig.defaultNetworks[0];

class UnlockStep extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      errorMessage: '',
      isTxBroadcasted: false,
      maxUnlockAmount: 0,
      unlockAmount: 0,
    };

    this.subscription = undefined;
  }

  componentWillReceiveProps(nextProps) {
    const { hasUnlocked, lockedDgd } = this.props;
    const nextLockedDgd = nextProps.lockedDgd;

    if (lockedDgd !== nextLockedDgd) {
      this.getCurrentTimeInQuarter()
        .then((currentTimeInQuarter) => {
          const maxUnlockAmount = this.getUnlockableAmount(nextLockedDgd, currentTimeInQuarter);
          const unlockAmount = hasUnlocked ? 0 : maxUnlockAmount
          this.setState({
            maxUnlockAmount,
            unlockAmount,
          });
        });
    }
  }

  onDgdInputChange = (e) => {
    this.setState({
      errorMessage: '',
      unlockAmount: e.target.value,
    });
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

  unlockDgd = () => {
    const {
      addresses,
      confirmMinedTx,
      lockedDgd,
      setCurrentSubscription,
      t,
      web3Redux
    } = this.props;
    const {
      maxUnlockAmount,
      unlockAmount,
    } = this.state;

    if (unlockAmount <= 0) {
      this.setState({
        errorMessage: 'You must unlock an amount greater than zero.',
      });
      return;
    }

    if (unlockAmount > maxUnlockAmount) {
      this.setState({
        errorMessage: `You can only unlock a maximum amount of ${truncateNumber(maxUnlockAmount)} DGD.`,
      });
      return;
    }

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
      this.setState({ unlockAmount: 0 });
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
    const {
      errorMessage,
      isTxBroadcasted,
      maxUnlockAmount,
      unlockAmount,
    } = this.state;
    const {
      hasUnlocked,
      lockedDgd,
      t,
    } = this.props;

    const canUnlock = lockedDgd > 0
      && unlockAmount > 0
      && errorMessage.length === 0;
    const buttonLabel = lockedDgd === 0 || hasUnlocked
      ? <SuccessIcon kind="check" />
      : t('Dissolution:Unlock.button');

    return (
      <Container>
        <Title>{t('Dissolution:Unlock.title')}</Title>
        <Subtitle>Please input the amount of DGD you wish to unlock.</Subtitle>
        <Content>
          <Currency>
            <TextInput
              type="number"
              autoFocus
              data-digix="UnlockDgd-Amount"
              onChange={this.onDgdInputChange}
              value={unlockAmount}
            />
            <CurrencyLabel small>
              Max Unlockable DGD:&nbsp;
              {truncateNumber(maxUnlockAmount)}
            </CurrencyLabel>
            {errorMessage.length > 0 && (
              <ErrorMessage>{errorMessage}</ErrorMessage>
            )}
          </Currency>
        </Content>
        <Button
          disabled={isTxBroadcasted || !canUnlock}
          onClick={this.unlockDgd}
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
  hasUnlocked: bool.isRequired,
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

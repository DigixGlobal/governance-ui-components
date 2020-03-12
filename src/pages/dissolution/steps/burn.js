import Acid from '@digix/acid-contracts/build/contracts/Acid.json';
import PropTypes from 'prop-types';
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
import { getSignTransactionTranslation } from '@digix/gov-ui/utils/helpers';
import { registerUIs } from 'spectrum-lightsuite/src/helpers/uiRegistry';
import { showHideAlert } from '@digix/gov-ui/reducers/gov-ui/actions';
import { showTxSigningModal } from 'spectrum-lightsuite/src/actions/session';
import { withTranslation } from 'react-i18next';
import { Button } from '@digix/gov-ui/components/common/elements';
import {
  burnSubscription,
  fetchUser,
  withApolloClient,
} from '@digix/gov-ui/pages/dissolution/api/queries';

const {
  Arrow,
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

class BurnStep extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      dgd: 0,
      eth: 0,
      isTxBroadcasted: false,
    };

    this.subscription = undefined;
  }

  componentWillMount = () => {
    const {
      addresses,
      client,
      goToNext,
    } = this.props;
    const sourceAddress = addresses.find(({ isDefault }) => isDefault);

    client.query({
      query: fetchUser,
      variables: {
        id: sourceAddress.address.toLowerCase(),
      },
    })
      .then((response) => {
        const { user } = response.data;
        const dgd = user
          ? Number(user.dgdBalance) / 10e8
          : 0;

        const eth = user
          ? Number(user.ethRefund) / 10e18
          : 0;

        this.setState({ dgd, eth });
        if (dgd <= 0) {
          goToNext();
        }
      });
  }

  componentWillUnmount() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  burnDgd() {
    const { addresses, t, web3Redux } = this.props;
    const { abi, address } = getContract(Acid, network);
    const sourceAddress = addresses.find(({ isDefault }) => isDefault);
    const contract = web3Redux
      .web3(network)
      .eth.contract(abi)
      .at(address);

    const ui = {
      caption: t('snackbars.dissolutionBurn.title'),
      header: 'User',
      type: 'txVisualization',
    };

    const web3Params = {
      gasPrice: DEFAULT_GAS_PRICE,
      gas: 300000,
      ui,
    };

    const onTransactionSuccess = (txHash) => {
      this.setState({ dgd: 0, eth: 0 }, () => {
        this.props.goToNext();
      });

      this.props.showHideAlert({
        message: t('snackbars.dissolutionBurn.success'),
        status: 'success',
        statusMessage: t('status.success'),
        txHash,
      });
    };

    const onFailure = (error) => {
      const message = JSON.stringify(error && error.message) || error;
      this.props.showHideAlert({
        message: `${t('snackbars.dissolutionBurn.fail')}: ${message}`,
        status: 'error',
        statusMessage: t('status.error'),
      });
    };

    const onTransactionAttempt = (txHash) => {
      this.setState({ isTxBroadcasted: true });
      this.props.showHideAlert({
        message: t('snackbars.dissolutionBurn.message'),
        status: 'pending',
        txHash,
      });

      this.subscription = this.props.client.subscribe({
        query: burnSubscription,
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
    };

    const txnTranslations = getSignTransactionTranslation();
    const payload = {
      address: sourceAddress,
      contract,
      func: contract.burn,
      network,
      onFailure,
      onFinally: txHash => onTransactionAttempt(txHash),
      onSuccess: txHash => onTransactionSuccess(txHash),
      params: [],
      showTxSigningModal: this.props.showTxSigningModal,
      translations: txnTranslations,
      ui,
      web3Params,
    };

    return executeContractFunction(payload);
  }

  render() {
    const { dgd, eth, isTxBroadcasted } = this.state;
    const { t } = this.props;

    const isButtonEnabled = dgd > 0;
    const buttonLabel = isButtonEnabled
      ? t('Dissolution:Burn.button')
      : <SuccessIcon kind="check" />;

    return (
      <Container>
        <Title>{t('Dissolution:Burn.title')}</Title>
        <Content>
          <Currency>
            <CurrencyValue>{dgd.toFixed(3)}</CurrencyValue>
            <CurrencyLabel>DGD</CurrencyLabel>
          </Currency>
          <Arrow kind="conversionArrow" />
          <Currency>
            <CurrencyValue>{eth.toFixed(3)}</CurrencyValue>
            <CurrencyLabel>ETH</CurrencyLabel>
          </Currency>
        </Content>
        <Button
          disabled={isTxBroadcasted || !isButtonEnabled}
          onClick={() => this.burnDgd()}
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
  object,
} = PropTypes;

BurnStep.propTypes = {
  addresses: array,
  client: object.isRequired,
  goToNext: func.isRequired,
  showHideAlert: func.isRequired,
  showTxSigningModal: func.isRequired,
  t: func.isRequired,
  web3Redux: object.isRequired,
};

BurnStep.defaultProps = {
  addresses: [],
};

const mapStateToProps = state => ({
  addresses: getAddresses(state),
});

export default withTranslation(['Snackbar', 'Dissolution'])(
  withApolloClient(
    web3Connect(connect(mapStateToProps, {
      showHideAlert,
      showTxSigningModal,
    })(BurnStep))
  )
);

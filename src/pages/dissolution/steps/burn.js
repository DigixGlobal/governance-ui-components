import Acid from '@digix/acid-contracts/build/contracts/Acid.json';
import DgdToken from '@digix/acid-contracts/build/contracts/DGDInterface.json';
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
import { parseBigNumber } from 'spectrum-lightsuite/src/helpers/stringUtils';
import { registerUIs } from 'spectrum-lightsuite/src/helpers/uiRegistry';
import { showHideAlert } from '@digix/gov-ui/reducers/gov-ui/actions';
import { showTxSigningModal } from 'spectrum-lightsuite/src/actions/session';
import { withTranslation } from 'react-i18next';
import { Button } from '@digix/gov-ui/components/common/elements';
import {
  getSignTransactionTranslation,
  truncateNumber,
} from '@digix/gov-ui/utils/helpers';
import {
  burnSubscription,
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
  Subtitle,
  SuccessIcon,
} = Step;

registerUIs({ txVisualization: { component: TxVisualization } });
const network = SpectrumConfig.defaultNetworks[0];
const DGD_TO_ETH_RATIO = 0.193054178;

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
    const { addresses, goToNext } = this.props;
    const sourceAddress = addresses.find(({ isDefault }) => isDefault);
    if (!sourceAddress) {
      return;
    }

    let dgd = 0;
    this.getDgdBalance().then((dgdBalance) => {
      dgd = dgdBalance;
      const eth = dgd * DGD_TO_ETH_RATIO;

      this.setState({ dgd, eth });
      if (dgd <= 0) {
        goToNext();
      }
    });
  }

  getDgdBalance() {
    const { addresses, web3Redux } = this.props;
    const sourceAddress = addresses.find(({ isDefault }) => isDefault);
    const { abi, address } = getContract(DgdToken, network);
    const { web3 } = web3Redux.networks[network];
    const contract = web3.eth.contract(abi).at(address);

    return contract.balanceOf
      .call(sourceAddress.address)
      .then(balance => parseBigNumber(balance, 9, false));
  }

  burnDgd() {
    const {
      addresses,
      confirmMinedTx,
      setCurrentSubscription,
      t,
      web3Redux
    } = this.props;
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
      if (this.subscription) {
        this.subscription.unsubscribe();
        this.subscription = undefined;
      }

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
      if (this.subscription) {
        this.setState({ isTxBroadcasted: false });
        this.subscription.unsubscribe();
        this.subscription = undefined;
      }

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

      confirmMinedTx(txHash, web3Redux.web3(network), onFailure);
      const subscription = this.props.client.subscribe({
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

      this.subscription = subscription;
      setCurrentSubscription(subscription);
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
    const {
      dgd,
      eth,
      isTxBroadcasted,
    } = this.state;
    const { t } = this.props;

    const isButtonEnabled = dgd > 0;
    const buttonLabel = isButtonEnabled
      ? t('Dissolution:Burn.button')
      : <SuccessIcon kind="check" />;

    return (
      <Container>
        <Title>{t('Dissolution:Burn.title')}</Title>
        <Subtitle>1 DGD = {DGD_TO_ETH_RATIO} ETH</Subtitle>
        <Content>
          <Currency>
            <CurrencyValue>{truncateNumber(dgd)}</CurrencyValue>
            <CurrencyLabel>DGD</CurrencyLabel>
          </Currency>
          <Arrow kind="conversionArrow" />
          <Currency>
            <CurrencyValue>{truncateNumber(eth)}</CurrencyValue>
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
  confirmMinedTx: func.isRequired,
  goToNext: func.isRequired,
  showHideAlert: func.isRequired,
  setCurrentSubscription: func.isRequired,
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

import { Button } from '@digix/gov-ui/components/common/elements';
import DaoStakeLocking from '@digix/dao-contracts/build/contracts/DaoStakeLocking.json';
import { DEFAULT_GAS_PRICE } from '@digix/gov-ui/constants';
import PropTypes, { array } from 'prop-types';
import React from 'react';
import SpectrumConfig from 'spectrum-lightsuite/spectrum.config';
import { Step } from '@digix/gov-ui/pages/dissolution/style';
import TxVisualization from '@digix/gov-ui/components/common/blocks/tx-visualization';
import { connect } from 'react-redux';
import { executeContractFunction } from '@digix/gov-ui/utils/web3Helper';
import { getAddresses } from 'spectrum-lightsuite/src/selectors';
import getContract from '@digix/gov-ui/utils/contracts';
import { registerUIs } from 'spectrum-lightsuite/src/helpers/uiRegistry';
import { showHideAlert } from '@digix/gov-ui/reducers/gov-ui/actions';
import { showTxSigningModal } from 'spectrum-lightsuite/src/actions/session';
import web3Connect from 'spectrum-lightsuite/src/helpers/web3/connect';

const {
  Content,
  Container,
  Currency,
  CurrencyLabel,
  CurrencyValue,
  Title,
} = Step;

registerUIs({ txVisualization: { component: TxVisualization } });
const network = SpectrumConfig.defaultNetworks[0];

class UnlockStep extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  unlockDgd = (unlockAmount) => {
    const {
      addresses,
      translations,
      txnTranslations,
      web3Redux,
    } = this.props;

    const { abi, address } = getContract(DaoStakeLocking, network); // TODO: replace?
    const sourceAddress = addresses.find(({ isDefault }) => isDefault);
    const contract = web3Redux
      .web3(network)
      .eth.contract(abi)
      .at(address);

    const t = translations.snackbar.snackbars.dissolutionUnlock;
    const tStatus = translations.snackbar.status;
    const ui = {
      caption: t.title,
      header: 'User',
      type: 'txVisualization',
    };

    const web3Params = {
      gasPrice: DEFAULT_GAS_PRICE,
      gas: 2000000, // TODO: confirm
      ui,
    };

    const onTransactionAttempt = (txHash) => {
      console.log('Attempting Unlock DGD with txHash', txHash);
    };

    const onTransactionSuccess = (txHash) => {
      this.props.showHideAlert({
        message: t.success,
        status: 'success',
        statusMessage: tStatus.success,
        txHash,
      });
    };

    const onFailure = (error) => {
      const message = JSON.stringify(error && error.message) || error;
      this.props.showHideAlert({
        message: `${t.fail}: ${message}`,
        status: 'error',
        statusMessage: tStatus.error,
      });
    };

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
    const { addresses, translations } = this.props;
    const t = translations.dissolution;

    return (
      <Container>
        <Title>{t.Unlock.title}</Title>
        <Content>
          <Currency>
            <CurrencyValue>435.234</CurrencyValue>
            <CurrencyLabel>DGD</CurrencyLabel>
          </Currency>
        </Content>
        <Button
          disabled={!addresses.length}
          onClick={() => this.unlockDgd(0.1)} // TODO: fetch locked DGD
          secondary
        >
          {t.Unlock.button}
        </Button>
      </Container>
    );
  }
}

const { func, object } = PropTypes;

UnlockStep.propTypes = {
  addresses: array,
  showHideAlert: func.isRequired,
  showTxSigningModal: func.isRequired,
  translations: object.isRequired,
  txnTranslations: object.isRequired,
  web3Redux: object.isRequired,
};

UnlockStep.defaultProps = {
  addresses: [],
};

const mapStateToProps = state => ({
  addresses: getAddresses(state),
  translations: state.daoServer.Translations.data,
  txnTranslations: state.daoServer.Translations.data.signTransaction,
});

export default web3Connect(connect(mapStateToProps, {
  showHideAlert,
  showTxSigningModal,
})(UnlockStep));

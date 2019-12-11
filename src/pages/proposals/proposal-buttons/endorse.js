import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Dao from '@digix/dao-contracts/build/contracts/Dao.json';

import web3Connect from 'spectrum-lightsuite/src/helpers/web3/connect';
import SpectrumConfig from 'spectrum-lightsuite/spectrum.config';
import { registerUIs } from 'spectrum-lightsuite/src/helpers/uiRegistry';
import { getAddresses } from 'spectrum-lightsuite/src/selectors';
import { showTxSigningModal } from 'spectrum-lightsuite/src/actions/session';

import getContract from '@digix/gov-ui/utils/contracts';
import { executeContractFunction } from '@digix/gov-ui/utils/web3Helper';
import { ProposalStages, DEFAULT_GAS_PRICE, EMPTY_HASH } from '@digix/gov-ui/constants';
import TxVisualization from '@digix/gov-ui/components/common/blocks/tx-visualization';
import { showHideAlert } from '@digix/gov-ui/reducers/gov-ui/actions';
import { sendTransactionToDaoServer } from '@digix/gov-ui/reducers/dao-server/actions';
import Button from '@digix/gov-ui/components/common/elements/buttons/index';

registerUIs({ txVisualization: { component: TxVisualization } });

const network = SpectrumConfig.defaultNetworks[0];

class EndorseProjectButton extends React.PureComponent {
  setError = error =>
    this.props.showHideAlert({
      message: JSON.stringify(error && error.message) || error,
    });

  handleSubmit = () => {
    const {
      gasLimitConfig,
      web3Redux,
      ChallengeProof,
      addresses,
      proposalId,
      translations: { snackbars },
    } = this.props;

    const { abi, address } = getContract(Dao, network);
    const contract = web3Redux
      .web3(network)
      .eth.contract(abi)
      .at(address);

    const ui = {
      caption: snackbars.endorse.title,
      header: snackbars.endorse.txUiHeader,
      type: 'txVisualization',
    };
    const web3Params = {
      gasPrice: DEFAULT_GAS_PRICE,
      gas: gasLimitConfig.ENDORSE_PROPOSAL || gasLimitConfig.DEFAULT,
      ui,
    };

    const sourceAddress = addresses.find(({ isDefault }) => isDefault);

    const onTransactionAttempt = txHash => {
      if (ChallengeProof.data) {
        this.props.sendTransactionToDaoServer({
          txHash,
          title: snackbars.endorse.title,
          token: ChallengeProof.data['access-token'],
          client: ChallengeProof.data.client,
          uid: ChallengeProof.data.uid,
        });
      }
    };

    const onTransactionSuccess = txHash => {
      this.props.showHideAlert({
        message: snackbars.endorse.message,
        txHash,
      });

      this.props.history.push('/');
    };

    const payload = {
      address: sourceAddress,
      contract,
      func: contract.endorseProposal,
      params: [proposalId],
      onFailure: this.setError,
      onFinally: txHash => onTransactionAttempt(txHash),
      onSuccess: txHash => onTransactionSuccess(txHash),
      network,
      web3Params,
      ui,
      showTxSigningModal: this.props.showTxSigningModal,
      translations: this.props.txnTranslations,
    };

    return executeContractFunction(payload);
  };

  render() {
    const { checkProposalRequirements, stage, isModerator, endorser, translations } = this.props;
    if (stage !== ProposalStages.idea || !isModerator || (endorser && endorser !== EMPTY_HASH))
      return null;

    return (
      <Button kind="round" large onClick={() => checkProposalRequirements(this.handleSubmit)}>
        {translations.buttons.endorse}
      </Button>
    );
  }
}

const { string, bool, object, func, array } = PropTypes;

EndorseProjectButton.propTypes = {
  stage: string.isRequired,
  endorser: string,
  proposalId: string.isRequired,
  isModerator: bool,
  web3Redux: object.isRequired,
  ChallengeProof: object.isRequired,
  checkProposalRequirements: func.isRequired,
  gasLimitConfig: object,
  showHideAlert: func.isRequired,
  sendTransactionToDaoServer: func.isRequired,
  showTxSigningModal: func.isRequired,
  addresses: array.isRequired,
  history: object.isRequired,
  translations: object.isRequired,
  txnTranslations: object.isRequired,
};

EndorseProjectButton.defaultProps = {
  endorser: EMPTY_HASH,
  gasLimitConfig: undefined,
  isModerator: false,
};

const mapStateToProps = state => ({
  addresses: getAddresses(state),
  ChallengeProof: state.daoServer.ChallengeProof,
  gasLimitConfig: state.infoServer.TxConfig.data.gas,
});

export default web3Connect(
  connect(
    mapStateToProps,
    { showHideAlert, sendTransactionToDaoServer, showTxSigningModal }
  )(EndorseProjectButton)
);

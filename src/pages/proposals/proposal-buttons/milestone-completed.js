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
import { DEFAULT_GAS_PRICE, ProposalStages } from '@digix/gov-ui/constants';
import TxVisualization from '@digix/gov-ui/components/common/blocks/tx-visualization';
import { showHideAlert } from '@digix/gov-ui/reducers/gov-ui/actions';
import { sendTransactionToDaoServer } from '@digix/gov-ui/reducers/dao-server/actions';
import Button from '@digix/gov-ui/components/common/elements/buttons/index';

registerUIs({ txVisualization: { component: TxVisualization } });

const network = SpectrumConfig.defaultNetworks[0];

class CompleteMilestoneButton extends React.PureComponent {
  setError = error =>
    this.props.showHideAlert({ message: JSON.stringify(error && error.message) || error });

  handleSubmit = () => {
    const {
      gasLimitConfig,
      web3Redux,
      ChallengeProof,
      addresses,
      proposal,
      proposal: { proposalId },
      translations: { snackbars },
    } = this.props;

    const { abi, address } = getContract(Dao, network);
    const contract = web3Redux
      .web3(network)
      .eth.contract(abi)
      .at(address);

    const ui = {
      caption: snackbars.milestoneCompleted.title,
      header: snackbars.milestoneCompleted.TxUiHeader,
      type: 'txVisualization',
    };
    const web3Params = {
      gasPrice: DEFAULT_GAS_PRICE,
      gas: gasLimitConfig.FINISH_MILESTONE || gasLimitConfig.DEFAULT,
      ui,
    };

    const sourceAddress = addresses.find(({ isDefault }) => isDefault);

    const onTransactionAttempt = txHash => {
      if (ChallengeProof.data) {
        this.props.sendTransactionToDaoServer({
          txHash,
          title: snackbars.milestoneCompleted.title,
          token: ChallengeProof.data['access-token'],
          client: ChallengeProof.data.client,
          uid: ChallengeProof.data.uid,
        });
      }
    };

    const onTransactionSuccess = txHash => {
      this.props.showHideAlert({
        message: snackbars.milestoneCompleted.message,
        txHash,
      });

      this.props.history.push('/');
    };

    const payload = {
      address: sourceAddress,
      contract,
      func: contract.finishMilestone,
      params: [proposalId, proposal.currentMilestone - 1],
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

  completeMilestone() {
    this.props.checkProposalRequirements(this.handleSubmit);
  }

  render() {
    const {
      isProposer,
      proposal,
      translations: { buttons },
    } = this.props;

    if (
      !isProposer ||
      !proposal ||
      ((proposal && proposal.stage !== ProposalStages.ongoing) ||
        Number(proposal.claimableFunding) !== 0)
    )
      return null;

    const currentTime = Date.now();
    const withinDeadline = currentTime > proposal.currentMilestoneStart * 1000;
    if (!withinDeadline) return null;

    return (
      <Button
        kind="round"
        large
        data-digix="ProposalAction-CompleteMilestone"
        onClick={() => this.completeMilestone()}
      >
        {buttons.myMilestoneIsCompleted}
      </Button>
    );
  }
}

const { bool, object, func, array } = PropTypes;

CompleteMilestoneButton.propTypes = {
  proposal: object.isRequired,
  isProposer: bool,
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

CompleteMilestoneButton.defaultProps = {
  gasLimitConfig: undefined,
  isProposer: false,
};

const mapStateToProps = state => ({
  addresses: getAddresses(state),
  ChallengeProof: state.daoServer.ChallengeProof,
  gasLimitConfig: state.infoServer.TxConfig.data.gas,
  txnTranslations: state.daoServer.Translations.data.signTransaction,
});

export default web3Connect(
  connect(
    mapStateToProps,
    { showHideAlert, sendTransactionToDaoServer, showTxSigningModal }
  )(CompleteMilestoneButton)
);

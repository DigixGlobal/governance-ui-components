import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import DaoFundingManager from '@digix/dao-contracts/build/contracts/DaoFundingManager.json';

import web3Connect from 'spectrum-lightsuite/src/helpers/web3/connect';
import SpectrumConfig from 'spectrum-lightsuite/spectrum.config';
import { registerUIs } from 'spectrum-lightsuite/src/helpers/uiRegistry';
import { getAddresses } from 'spectrum-lightsuite/src/selectors';
import { showTxSigningModal } from 'spectrum-lightsuite/src/actions/session';

import getContract from '@digix/gov-ui/utils/contracts';
import { executeContractFunction } from '@digix/gov-ui/utils/web3Helper';
import { DEFAULT_GAS, DEFAULT_GAS_PRICE, ProposalStages } from '@digix/gov-ui/constants';
import TxVisualization from '@digix/gov-ui/components/common/blocks/tx-visualization';
import { showHideAlert } from '@digix/gov-ui/reducers/gov-ui/actions';
import { sendTransactionToDaoServer } from '@digix/gov-ui/reducers/dao-server/actions';
import Button from '@digix/gov-ui/components/common/elements/buttons/index';

registerUIs({ txVisualization: { component: TxVisualization } });

const network = SpectrumConfig.defaultNetworks[0];

class ClaimFundingButton extends React.PureComponent {
  setError = error =>
    this.props.showHideAlert({ message: JSON.stringify((error && error.message) || error) });

  handleSubmit = () => {
    const {
      web3Redux,
      ChallengeProof,
      addresses,
      proposal,
      proposal: { proposalId },
    } = this.props;

    const { abi, address } = getContract(DaoFundingManager, network);
    const contract = web3Redux
      .web3(network)
      .eth.contract(abi)
      .at(address);

    const ui = {
      caption: 'Claim Funding',
      header: 'Proposal',
      type: 'txVisualization',
    };
    const web3Params = {
      gasPrice: DEFAULT_GAS_PRICE,
      gas: DEFAULT_GAS,
      ui,
    };

    const sourceAddress = addresses.find(({ isDefault }) => isDefault);

    const onSuccess = txHash => {
      if (ChallengeProof.data) {
        this.props.sendTransactionToDaoServer({
          txHash,
          title: 'Claim Funding',
          token: ChallengeProof.data['access-token'],
          client: ChallengeProof.data.client,
          uid: ChallengeProof.data.uid,
        });
      }
      this.props.showHideAlert({ message: 'Funding Claimed' });
      if (this.props.history) this.props.history.push('/');
    };

    const payload = {
      address: sourceAddress,
      contract,
      func: contract.claimFunding,
      params: [proposalId, proposal.currentMilestone - 1],
      onSuccess: txHash => {
        onSuccess(txHash);
      },
      onFailure: this.setError,
      network,
      web3Params,
      ui,
      showTxSigningModal: this.props.showTxSigningModal,
    };
    return executeContractFunction(payload);
  };
  render() {
    const { voteClaimingDeadline } = this.state;
    const {
      isProposer,
      proposal,
      proposal: { currentVotingRound },
    } = this.props;
    if (
      !isProposer ||
      !proposal ||
      ((proposal && proposal.stage !== ProposalStages.ongoing) || proposal.claimableFunding <= 0)
    )
      return null;

    const currentTime = Date.now();
    const withinDeadline =
      currentTime > proposal.votingRounds[currentVotingRound].revealDeadline * 1000 &&
      currentTime <
        (proposal.votingRounds[currentVotingRound].revealDeadline + voteClaimingDeadline) * 1000;
    if (!withinDeadline) return null;

    return (
      <Button kind="round" ghost primary onClick={this.handleSubmit}>
        Claim Funding
      </Button>
    );
  }
}

const { bool, object, func, array } = PropTypes;

ClaimFundingButton.propTypes = {
  proposal: object.isRequired,
  isProposer: bool,
  web3Redux: object.isRequired,
  ChallengeProof: object.isRequired,
  showHideAlert: func.isRequired,
  sendTransactionToDaoServer: func.isRequired,
  showTxSigningModal: func.isRequired,
  addresses: array.isRequired,
  history: object.isRequired,
};

ClaimFundingButton.defaultProps = {
  isProposer: false,
};

const mapStateToProps = state => ({
  ChallengeProof: state.daoServer.ChallengeProof,
  addresses: getAddresses(state),
});

export default web3Connect(
  connect(
    mapStateToProps,
    { showHideAlert, sendTransactionToDaoServer, showTxSigningModal }
  )(ClaimFundingButton)
);

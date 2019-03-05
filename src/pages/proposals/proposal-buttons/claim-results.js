import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { toBigNumber } from 'spectrum-lightsuite/src/helpers/stringUtils';

import DaoVotingClaims from '@digix/dao-contracts/build/contracts/DaoVotingClaims.json';

import web3Connect from 'spectrum-lightsuite/src/helpers/web3/connect';
import SpectrumConfig from 'spectrum-lightsuite/spectrum.config';
import { registerUIs } from 'spectrum-lightsuite/src/helpers/uiRegistry';
import { getAddresses } from 'spectrum-lightsuite/src/selectors';
import { showTxSigningModal } from 'spectrum-lightsuite/src/actions/session';

import getContract from '@digix/gov-ui/utils/contracts';
import { executeContractFunction } from '@digix/gov-ui/utils/web3Helper';
import { DEFAULT_GAS, DEFAULT_GAS_PRICE } from '@digix/gov-ui/constants';
import TxVisualization from '@digix/gov-ui/components/common/blocks/tx-visualization';
import { showHideAlert } from '@digix/gov-ui/reducers/gov-ui/actions';
import { sendTransactionToDaoServer } from '@digix/gov-ui/reducers/dao-server/actions';
import { getDaoConfig } from '@digix/gov-ui/reducers/info-server/actions';

import Button from '@digix/gov-ui/components/common/elements/buttons/index';

registerUIs({ txVisualization: { component: TxVisualization } });

const network = SpectrumConfig.defaultNetworks[0];

class ClaimResultsButton extends React.PureComponent {
  componentWillMount = () => {
    this.props.getDaoConfig();
  };

  setError = error =>
    this.props.showHideAlert({
      message: JSON.stringify(error && error.message) || error,
    });

  handleSubmit = () => {
    const {
      web3Redux,
      ChallengeProof,
      addresses,
      proposal: { currentVotingRound, proposalId },
    } = this.props;

    const { abi, address } = getContract(DaoVotingClaims, network);
    const contract = web3Redux
      .web3(network)
      .eth.contract(abi)
      .at(address);

    const ui = {
      caption: 'Claim Voting Result',
      header: 'Proposal',
      type: 'txVisualization',
    };
    const web3Params = {
      gasPrice: DEFAULT_GAS_PRICE,
      gas: DEFAULT_GAS,
      ui,
    };

    const sourceAddress = addresses.find(({ isDefault }) => isDefault);

    const onTransactionAttempt = txHash => {
      if (ChallengeProof.data) {
        this.props.sendTransactionToDaoServer({
          txHash,
          title: 'Claim Voting Result',
          token: ChallengeProof.data['access-token'],
          client: ChallengeProof.data.client,
          uid: ChallengeProof.data.uid,
        });
      }
    };

    const onTransactionSuccess = txHash => {
      this.props.showHideAlert({
        message: 'Voting Result Claimed',
        txHash,
      });

      this.props.history.push('/');
    };

    const payload = {
      address: sourceAddress,
      contract,
      func: contract.claimProposalVotingResult,
      params: [proposalId, currentVotingRound, toBigNumber(50)],
      onFailure: this.setError,
      onFinally: txHash => onTransactionAttempt(txHash),
      onSuccess: txHash => onTransactionSuccess(txHash),
      network,
      web3Params,
      ui,
      showTxSigningModal: this.props.showTxSigningModal,
    };
    return executeContractFunction(payload);
  };

  render() {
    const {
      isProposer,
      proposal,
      proposal: { currentVotingRound },
      daoConfig,
    } = this.props;

    if (
      !isProposer ||
      !proposal ||
      !proposal.votingRounds ||
      !daoConfig.data.CONFIG_VOTE_CLAIMING_DEADLINE
    )
      return null;

    const currentTime = Date.now();
    const { yes, no, quorum, quota, claimed } = proposal.votingRounds[currentVotingRound];

    const isVotingDeadlineOver =
      currentTime > new Date(proposal.votingRounds[currentVotingRound].revealDeadline * 1000);

    if (claimed || !isVotingDeadlineOver) return null;

    const tentativePassed =
      Number(yes) + Number(no) > Number(quorum) &&
      Number(yes) / (Number(yes) + Number(no)) > Number(quota);

    const withinDeadline =
      currentTime > proposal.votingRounds[currentVotingRound].revealDeadline * 1000 &&
      currentTime <
        (proposal.votingRounds[currentVotingRound].revealDeadline +
          Number(daoConfig.data.CONFIG_VOTE_CLAIMING_DEADLINE)) *
          1000;

    return (
      <Button
        disabled={claimed}
        data-digix="Propsal-Claim-Results"
        kind="round"
        large
        onClick={this.handleSubmit}
      >
        {withinDeadline && tentativePassed ? 'Claim Results' : 'Claim Failed Project'}
      </Button>
    );
  }
}

const { bool, object, func, array } = PropTypes;

ClaimResultsButton.propTypes = {
  proposal: object.isRequired,
  isProposer: bool,
  web3Redux: object.isRequired,
  ChallengeProof: object.isRequired,
  daoConfig: object.isRequired,
  showHideAlert: func.isRequired,
  getDaoConfig: func.isRequired,
  sendTransactionToDaoServer: func.isRequired,
  showTxSigningModal: func.isRequired,
  addresses: array.isRequired,
  history: object.isRequired,
};

ClaimResultsButton.defaultProps = {
  isProposer: false,
};

const mapStateToProps = state => ({
  ChallengeProof: state.daoServer.ChallengeProof,
  addresses: getAddresses(state),
  daoConfig: state.infoServer.DaoConfig,
});

export default web3Connect(
  connect(
    mapStateToProps,
    {
      showHideAlert,
      sendTransactionToDaoServer,
      showTxSigningModal,
      getDaoConfig,
    }
  )(ClaimResultsButton)
);

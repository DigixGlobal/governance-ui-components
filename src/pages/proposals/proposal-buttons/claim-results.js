import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { toBigNumber, parseBigNumber } from 'spectrum-lightsuite/src/helpers/stringUtils';

import DaoConfigStorage from '@digix/dao-contracts/build/contracts/MockDaoConfigsStorage.json';
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
import Button from '@digix/gov-ui/components/common/elements/buttons/index';

registerUIs({ txVisualization: { component: TxVisualization } });

const network = SpectrumConfig.defaultNetworks[0];

class ClaimResultsButton extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      voteClaimingDeadline: undefined,
    };
  }
  componentWillMount = () => {
    const {
      web3Redux,
      isProposer,
      proposal,
      proposal: { currentVotingRound },
    } = this.props;
    const currentTime = Date.now();

    if (!isProposer || !proposal || !proposal.votingRounds) return;

    const { abi, address } = getContract(DaoConfigStorage, network);
    const contract = web3Redux
      .web3(network)
      .eth.contract(abi)
      .at(address);

    contract.uintConfigs.call('config_claiming_deadline').then(result => {
      const deadline = parseBigNumber(result, 0, false);
      const withinDeadline =
        currentTime > proposal.votingRounds[currentVotingRound].revealDeadline * 1000 &&
        currentTime < (proposal.votingRounds[currentVotingRound].revealDeadline + deadline) * 1000;
      if (withinDeadline) this.setState({ voteClaimingDeadline: deadline });
    });
  };

  setError = error =>
    this.props.showHideAlert({ message: JSON.stringify(error && error.message) || error });

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
    const { voteClaimingDeadline } = this.state;
    const {
      isProposer,
      proposal,
      proposal: { currentVotingRound },
    } = this.props;
    if (!isProposer || !proposal || !proposal.votingRounds || !voteClaimingDeadline) return null;
    const { claimed } = proposal.votingRounds[currentVotingRound];
    const currentTime = Date.now();
    const withinDeadline =
      currentTime > proposal.votingRounds[currentVotingRound].revealDeadline * 1000 &&
      currentTime <
        (proposal.votingRounds[currentVotingRound].revealDeadline + voteClaimingDeadline) * 1000;

    if (!withinDeadline || claimed) return null;

    return (
      <Button kind="round" ghost primary onClick={this.handleSubmit}>
        Claim Results
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
  showHideAlert: func.isRequired,
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
});

export default web3Connect(
  connect(
    mapStateToProps,
    { showHideAlert, sendTransactionToDaoServer, showTxSigningModal }
  )(ClaimResultsButton)
);

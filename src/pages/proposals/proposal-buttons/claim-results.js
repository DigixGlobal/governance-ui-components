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
import { DEFAULT_GAS, DEFAULT_GAS_PRICE, MAX_PEOPLE_PER_CLAIM } from '@digix/gov-ui/constants';
import TxVisualization from '@digix/gov-ui/components/common/blocks/tx-visualization';
import MultiStepClaim from '@digix/gov-ui/components/common/blocks/overlay/claim-approval';
import { showHideAlert, showRightPanel } from '@digix/gov-ui/reducers/gov-ui/actions';
import {
  sendTransactionToDaoServer,
  getPendingTransactions,
} from '@digix/gov-ui/reducers/dao-server/actions';
import { getDaoConfig } from '@digix/gov-ui/reducers/info-server/actions';

import Button from '@digix/gov-ui/components/common/elements/buttons/index';

registerUIs({ txVisualization: { component: TxVisualization } });

const network = SpectrumConfig.defaultNetworks[0];

class ClaimResultsButton extends React.PureComponent {
  state = {
    isMultiStep: false,
    claiming: false,
    totalTransactions: 0,
  };

  componentWillMount = () => {
    const {
      daoDetails: { data: daoDetails },
      proposal,
      ChallengeProof,
    } = this.props;
    Promise.all([
      this.props.getDaoConfig(),
      this.props.getPendingTransactions({
        token: ChallengeProof.data['access-token'],
        client: ChallengeProof.data.client,
        uid: ChallengeProof.data.uid,
      }),
    ]);
    const isMultiStep = Number(daoDetails.nParticipants) > MAX_PEOPLE_PER_CLAIM;
    const nParticipants =
      proposal.stage === 'review' ? 2 * daoDetails.nParticipants : daoDetails.nParticipants;
    const totalTransactions = Math.ceil(nParticipants / MAX_PEOPLE_PER_CLAIM);
    this.setState({ isMultiStep, totalTransactions });
  };

  setError = error =>
    this.props.showHideAlert({
      message: JSON.stringify(error && error.message) || error,
    });

  showOverlay = txns => {
    const { history } = this.props;
    this.props.showRightPanel({
      component: <MultiStepClaim history={history} {...txns} onCompleted={this.onPanelClose} />,
      show: true,
    });
  };

  handleSubmit = useMaxClaim => () => {
    const {
      web3Redux,
      ChallengeProof,
      addresses,
      proposal,
      proposal: { currentVotingRound, proposalId },
    } = this.props;

    const { totalTransactions } = this.state;

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
      this.setState({ claiming: true }, () => {
        this.props.showRightPanel({ show: false });
      });
      if (ChallengeProof.data) {
        this.props.sendTransactionToDaoServer({
          txHash,
          title: 'Claim Voting Result',
          token: ChallengeProof.data['access-token'],
          client: ChallengeProof.data.client,
          type: 1,
          project: proposalId,
          uid: ChallengeProof.data.uid,
        });
      }
    };

    const onTransactionSuccess = txHash => {
      const { onCompleted } = this.props;

      this.props.showHideAlert({
        message: useMaxClaim
          ? `Claiming Voting Result ${
              proposal.votingRounds[currentVotingRound].currentClaimStep
            } of ${totalTransactions}`
          : 'Claiming Voting Result',
        txHash,
      });
      setTimeout(() => {
        this.setState({ claiming: false }, () => onCompleted());
      }, 1000);
    };

    const payload = {
      address: sourceAddress,
      contract,
      func: contract.claimProposalVotingResult,
      params: [
        proposalId,
        proposal.isSpecial ? 0 : currentVotingRound,
        toBigNumber(useMaxClaim ? MAX_PEOPLE_PER_CLAIM : 50),
      ],
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

  hasPendingClaim = () => {
    const {
      pendingTransactions,
      proposal: { proposalId },
    } = this.props;
    if (!pendingTransactions.data) return false;

    const transaction = pendingTransactions.data.find(
      p => p.project === proposalId && p.status !== 'confirmed'
    );
    return transaction !== undefined;
  };

  claimResults = useMaxClaim => () => {
    this.props.checkProposalRequirements(() => this.handleSubmit(useMaxClaim)());
  };

  render() {
    const {
      isProposer,
      proposal,
      proposal: { currentVotingRound },
      daoConfig,
    } = this.props;

    const { isMultiStep, claiming, totalTransactions } = this.state;

    if (
      !isProposer ||
      !proposal ||
      !proposal.votingRounds ||
      !daoConfig.data.CONFIG_VOTE_CLAIMING_DEADLINE
    )
      return null;

    const currentTime = Date.now();
    const { yes, no, quorum, quota, claimed } = proposal.isSpecial
      ? proposal.votingRounds[0]
      : proposal.votingRounds[currentVotingRound];

    const revealDeadline = proposal.isSpecial
      ? proposal.votingRounds[0].revealDeadline
      : proposal.votingRounds[currentVotingRound].revealDeadline;

    const isVotingDeadlineOver = currentTime > new Date(revealDeadline * 1000);

    if (claimed || !isVotingDeadlineOver) return null;

    const tentativePassed =
      Number(yes) + Number(no) > Number(quorum) &&
      Number(yes) / (Number(yes) + Number(no)) > Number(quota);

    const withinDeadline =
      currentTime > revealDeadline * 1000 &&
      currentTime < (revealDeadline + Number(daoConfig.data.CONFIG_VOTE_CLAIMING_DEADLINE)) * 1000;

    return (
      <Button
        disabled={claimed || claiming || this.hasPendingClaim()}
        kind="round"
        large
        onClick={() =>
          isMultiStep && tentativePassed && withinDeadline
            ? this.showOverlay({
                total: totalTransactions,
                current: proposal.votingRounds[currentVotingRound].currentClaimStep,
                onClaim: this.claimResults(true),
              })
            : this.handleSubmit(false)()
        }
        data-digix="ProposalAction-Results"
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
  checkProposalRequirements: func.isRequired,
  daoConfig: object.isRequired,
  daoDetails: object.isRequired,
  pendingTransactions: object,
  showHideAlert: func.isRequired,
  getDaoConfig: func.isRequired,
  sendTransactionToDaoServer: func.isRequired,
  getPendingTransactions: func.isRequired,
  showRightPanel: func.isRequired,
  showTxSigningModal: func.isRequired,
  onCompleted: func.isRequired,
  addresses: array.isRequired,
  history: object.isRequired,
};

ClaimResultsButton.defaultProps = {
  isProposer: false,
  pendingTransactions: undefined,
};

const mapStateToProps = state => ({
  ChallengeProof: state.daoServer.ChallengeProof,
  pendingTransactions: state.daoServer.PendingTransactions,
  addresses: getAddresses(state),
  daoConfig: state.infoServer.DaoConfig,
  daoDetails: state.infoServer.DaoDetails,
});

export default web3Connect(
  connect(
    mapStateToProps,
    {
      showHideAlert,
      showRightPanel,
      sendTransactionToDaoServer,
      getPendingTransactions,
      showTxSigningModal,
      getDaoConfig,
    }
  )(ClaimResultsButton)
);

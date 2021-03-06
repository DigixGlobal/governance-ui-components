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

import { withSearchTransactions } from '@digix/gov-ui/api/graphql-queries/transaction';

import getContract from '@digix/gov-ui/utils/contracts';
import { executeContractFunction } from '@digix/gov-ui/utils/web3Helper';
import { DEFAULT_GAS_PRICE, MAX_PEOPLE_PER_CLAIM, ProposalStages } from '@digix/gov-ui/constants';
import TxVisualization from '@digix/gov-ui/components/common/blocks/tx-visualization';
import MultiStepClaim from '@digix/gov-ui/components/common/blocks/overlay/claim-approval';
import { showHideAlert, showRightPanel } from '@digix/gov-ui/reducers/gov-ui/actions';
import { sendTransactionToDaoServer } from '@digix/gov-ui/reducers/dao-server/actions';
import { getDaoConfig } from '@digix/gov-ui/reducers/info-server/actions';
import { injectTranslation } from '@digix/gov-ui/utils/helpers';

import Button from '@digix/gov-ui/components/common/elements/buttons/index';

registerUIs({ txVisualization: { component: TxVisualization } });

const network = SpectrumConfig.defaultNetworks[0];

class ClaimResultsButton extends React.PureComponent {
  state = {
    isMultiStep: false,
    totalTransactions: 0,
    claimingStep: undefined,
  };

  componentWillMount = () => {
    const {
      daoDetails: { data: daoDetails },
      proposal,
    } = this.props;
    Promise.all([this.props.getDaoConfig()]);
    const isMultiStep = Number(daoDetails.nParticipants) > MAX_PEOPLE_PER_CLAIM;
    const nParticipants =
      proposal.stage === ProposalStages.review
        ? 2 * daoDetails.nParticipants
        : daoDetails.nParticipants;
    const totalTransactions = Math.ceil(nParticipants / MAX_PEOPLE_PER_CLAIM);

    this.setState({ isMultiStep, totalTransactions });
  };

  componentDidMount = () => {
    this.props.subscribeToTransaction();
  };

  setError = error =>
    this.props.showHideAlert({
      message: JSON.stringify(error && error.message) || error,
    });

  showOverlay = txns => {
    const { history, translations } = this.props;
    this.props.showRightPanel({
      component: (
        <MultiStepClaim
          history={history}
          {...txns}
          onCompleted={this.onPanelClose}
          translations={translations}
        />
      ),
      show: true,
    });
  };

  handleSubmit = useMaxClaim => () => {
    const {
      gasLimitConfig,
      web3Redux,
      ChallengeProof,
      addresses,
      proposal,
      proposal: { currentVotingRound = 0, isSpecial, proposalId },
      translations: { snackbars },
    } = this.props;

    const { totalTransactions } = this.state;

    const { abi, address } = getContract(DaoVotingClaims, network);
    const contract = web3Redux
      .web3(network)
      .eth.contract(abi)
      .at(address);

    const ui = {
      caption: snackbars.claimResult.title,
      header: snackbars.claimResult.TxUiHeader,
      type: 'txVisualization',
    };

    const gasLimit = isSpecial ? gasLimitConfig.CLAIM_SPECIAL_VOTING : gasLimitConfig.CLAIM_VOTING;
    const web3Params = {
      gasPrice: DEFAULT_GAS_PRICE,
      gas: gasLimit || gasLimitConfig.DEFAULT,
      ui,
    };

    const sourceAddress = addresses.find(({ isDefault }) => isDefault);

    const onTransactionAttempt = txHash => {
      if (ChallengeProof.data) {
        this.props.sendTransactionToDaoServer({
          txHash,
          title: snackbars.claimResult.title,
          token: ChallengeProof.data['access-token'],
          client: ChallengeProof.data.client,
          type: 1,
          project: proposalId,
          uid: ChallengeProof.data.uid,
        });
      }
    };

    const onTransactionSuccess = txHash => {
      const injectedMessage = injectTranslation(snackbars.claimResult.multiClaimMessage, {
        currentClaimStep: proposal.votingRounds[currentVotingRound].currentClaimStep,
        totalTransactions,
      });
      this.props.showHideAlert({
        message: useMaxClaim ? injectedMessage : snackbars.claimResult.message,
        txHash,
      });
      this.props.showRightPanel({
        show: false,
      });
      this.setState({
        claimingStep: proposal.votingRounds[currentVotingRound].currentClaimStep,
      });
    };

    const payload = {
      address: sourceAddress,
      contract,
      func: contract.claimProposalVotingResult,
      params: [
        proposalId,
        currentVotingRound,
        toBigNumber(useMaxClaim ? MAX_PEOPLE_PER_CLAIM : 50),
      ],
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

  hasPendingClaim = () => {
    const {
      transactions,
      proposal: { proposalId },
    } = this.props;
    if (!transactions.edges || transactions.edges.length === 0) return false;

    const transaction = transactions.edges.find(
      p => p.node.project === proposalId && p.node.status.toLowerCase() === 'pending'
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
      daoConfig,
      translations: { buttons },
    } = this.props;

    const { isMultiStep, claimingStep, totalTransactions } = this.state;

    let { currentVotingRound } = proposal;

    if (!currentVotingRound || currentVotingRound === null) currentVotingRound = 0;

    if (
      !isProposer ||
      !proposal ||
      !proposal.votingRounds ||
      !daoConfig.data.CONFIG_VOTE_CLAIMING_DEADLINE
    )
      return null;

    const currentTime = Date.now();
    const { yes, no, quorum, quota, claimed, revealDeadline } = proposal.votingRounds[
      currentVotingRound || 0
    ];

    const isVotingDeadlineOver = currentTime > new Date(revealDeadline * 1000);

    if (claimed || !isVotingDeadlineOver) return null;

    const tentativePassed =
      Number(yes) + Number(no) > Number(quorum) &&
      Number(yes) / (Number(yes) + Number(no)) > Number(quota);

    const withinDeadline =
      currentTime > revealDeadline * 1000 &&
      currentTime < (revealDeadline + Number(daoConfig.data.CONFIG_VOTE_CLAIMING_DEADLINE)) * 1000;

    const hasPendingClaim =
      this.hasPendingClaim() ||
      (claimingStep && claimingStep === proposal.votingRounds[currentVotingRound].currentClaimStep);
    const claimCaption = hasPendingClaim ? `${buttons.claiming} ` : buttons.claimResult;

    return (
      <Button
        disabled={claimed || hasPendingClaim}
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
        {withinDeadline && tentativePassed
          ? `${claimCaption} ${proposal.votingRounds[currentVotingRound].currentClaimStep}/${totalTransactions}`
          : buttons.claimFailedProject}
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
  gasLimitConfig: object,
  pendingTransactions: object,
  showHideAlert: func.isRequired,
  getDaoConfig: func.isRequired,
  subscribeToTransaction: func.isRequired,
  sendTransactionToDaoServer: func.isRequired,
  transactions: object,
  showRightPanel: func.isRequired,
  showTxSigningModal: func.isRequired,
  addresses: array.isRequired,
  history: object.isRequired,
  translations: object.isRequired,
  txnTranslations: object.isRequired,
};

ClaimResultsButton.defaultProps = {
  gasLimitConfig: undefined,
  isProposer: false,
  pendingTransactions: undefined,
  transactions: undefined,
};

const mapStateToProps = state => ({
  ChallengeProof: state.daoServer.ChallengeProof,
  addresses: getAddresses(state),
  daoConfig: state.infoServer.DaoConfig,
  daoDetails: state.infoServer.DaoDetails,
  gasLimitConfig: state.infoServer.TxConfig.data.gas,
});

export default web3Connect(
  connect(
    mapStateToProps,
    {
      showHideAlert,
      showRightPanel,
      sendTransactionToDaoServer,
      showTxSigningModal,
      getDaoConfig,
    }
  )(withSearchTransactions(ClaimResultsButton))
);

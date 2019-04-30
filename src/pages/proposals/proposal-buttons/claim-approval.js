import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { toBigNumber } from 'spectrum-lightsuite/src/helpers/stringUtils';
import web3Connect from 'spectrum-lightsuite/src/helpers/web3/connect';
import SpectrumConfig from 'spectrum-lightsuite/spectrum.config';
import { registerUIs } from 'spectrum-lightsuite/src/helpers/uiRegistry';
import { getAddresses } from 'spectrum-lightsuite/src/selectors';
import { showTxSigningModal } from 'spectrum-lightsuite/src/actions/session';
import { injectTranslation } from '@digix/gov-ui/utils/helpers';
import { executeContractFunction } from '@digix/gov-ui/utils/web3Helper';
import { DEFAULT_GAS_PRICE, VotingStages, MAX_PEOPLE_PER_CLAIM } from '@digix/gov-ui/constants';
import TxVisualization from '@digix/gov-ui/components/common/blocks/tx-visualization';
import MultiStepClaim from '@digix/gov-ui/components/common/blocks/overlay/claim-approval';
import { showHideAlert, showRightPanel } from '@digix/gov-ui/reducers/gov-ui/actions';
import { sendTransactionToDaoServer } from '@digix/gov-ui/reducers/dao-server/actions';

import { withSearchTransactions } from '@digix/gov-ui/api/graphql-queries/transaction';

import getContract from '@digix/gov-ui/utils/contracts';
import DaoVotingClaims from '@digix/dao-contracts/build/contracts/DaoVotingClaims.json';

import { getDaoConfig } from '@digix/gov-ui/reducers/info-server/actions';

import Button from '@digix/gov-ui/components/common/elements/buttons/index';

registerUIs({ txVisualization: { component: TxVisualization } });

const network = SpectrumConfig.defaultNetworks[0];

class ClaimApprovalButton extends React.PureComponent {
  state = {
    isMultiStep: false,
    totalTransactions: 0,
    claimingStep: undefined,
  };

  componentWillMount() {
    const {
      daoDetails: { data: daoDetails },
    } = this.props;

    Promise.all([this.props.getDaoConfig()]);
    const isMultiStep = Number(daoDetails.nModerators) > MAX_PEOPLE_PER_CLAIM;
    const totalTransactions = Math.ceil(daoDetails.nModerators / MAX_PEOPLE_PER_CLAIM);
    this.setState({ isMultiStep, totalTransactions });
  }

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
      component: <MultiStepClaim history={history} {...txns} translations={translations} />,
      show: true,
    });
  };

  handleSubmit = useMaxClaim => () => {
    const {
      gasLimitConfig,
      web3Redux,
      ChallengeProof,
      addresses,
      proposalId,
      translations: { snackbars },
    } = this.props;
    const { totalTransactions } = this.state;
    const { abi, address } = getContract(DaoVotingClaims, network);
    const contract = web3Redux
      .web3(network)
      .eth.contract(abi)
      .at(address);

    const ui = {
      caption: snackbars.claimApproval.title,
      header: snackbars.claimApproval.txUiHeader,
      type: 'txVisualization',
    };

    const web3Params = {
      gasPrice: DEFAULT_GAS_PRICE,
      gas: gasLimitConfig.CLAIM_DRAFT_VOTING || gasLimitConfig.DEFAULT,
      ui,
    };

    const sourceAddress = addresses.find(({ isDefault }) => isDefault);
    const onTransactionAttempt = txHash => {
      if (ChallengeProof.data) {
        this.props.sendTransactionToDaoServer({
          txHash,
          title: snackbars.claimApproval.title,
          token: ChallengeProof.data['access-token'],
          client: ChallengeProof.data.client,
          type: 1,
          project: proposalId,
          uid: ChallengeProof.data.uid,
        });
      }
    };

    const onTransactionSuccess = txHash => {
      const { draftVoting } = this.props;
      const injectedMessage = injectTranslation(snackbars.claimApproval.multiClaimMessage, {
        currentClaimStep: draftVoting.currentClaimStep,
        totalTransactions,
      });

      this.props.showHideAlert({
        message: useMaxClaim ? injectedMessage : snackbars.claimApproval.message,
        txHash,
      });
      this.props.showRightPanel({
        show: false,
      });
      this.setState({ claimingStep: this.props.draftVoting.currentClaimStep });
    };

    const payload = {
      address: sourceAddress,
      contract,
      func: contract.claimDraftVotingResult,
      params: [proposalId, toBigNumber(useMaxClaim ? MAX_PEOPLE_PER_CLAIM : 50)],
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
    const { transactions, proposalId } = this.props;
    if (!transactions.edges || transactions.edges.length === 0) return false;

    const transaction = transactions.edges.find(
      p => p.node.project === proposalId && p.node.status.toLowerCase() !== 'confirmed'
    );
    return transaction !== undefined;
  };

  claimApproval = useMaxClaim => () => {
    this.props.checkProposalRequirements(() => this.handleSubmit(useMaxClaim)());
  };

  render() {
    const {
      draftVoting,
      isProposer,
      votingStage,
      daoConfig,
      daoDetails: { data: daoDetails },
      translations: { buttons },
    } = this.props;
    const { isMultiStep, totalTransactions, claimingStep } = this.state;
    const voteClaimingDeadline = daoConfig.data.CONFIG_VOTE_CLAIMING_DEADLINE;
    const currentTime = Date.now();
    if (
      !draftVoting ||
      !isProposer ||
      votingStage !== VotingStages.draft ||
      !voteClaimingDeadline ||
      !daoDetails
    )
      return null;

    const { yes, no, quorum, quota, claimed } = draftVoting;
    const isVotingDeadlineOver = currentTime > new Date(draftVoting.votingDeadline * 1000);

    if (claimed || !isVotingDeadlineOver) return null;

    const canClaim =
      currentTime > draftVoting.votingDeadline * 1000 &&
      currentTime < new Date((draftVoting.votingDeadline + Number(voteClaimingDeadline)) * 1000);

    const tentativePassed =
      Number(yes) + Number(no) > Number(quorum) &&
      Number(yes) / (Number(yes) + Number(no)) > Number(quota);

    const hasPendingClaim =
      this.hasPendingClaim() || (claimingStep && claimingStep === draftVoting.currentClaimStep);

    const claimCaption = hasPendingClaim ? `${buttons.claiming} ` : buttons.claimModeratorApproavl;

    return (
      <Button
        kind="round"
        large
        disabled={claimed || hasPendingClaim}
        onClick={() =>
          isMultiStep && tentativePassed && canClaim
            ? this.showOverlay({
                total: totalTransactions,
                current: draftVoting.currentClaimStep,
                onClaim: this.claimApproval(true),
              })
            : this.claimApproval(false)()
        }
        data-digix="ProposalAction-Approval"
      >
        {canClaim && tentativePassed
          ? `${claimCaption} ${draftVoting.currentClaimStep}/${totalTransactions}`
          : buttons.claimFailedProject}
      </Button>
    );
  }
}

const { object, string, func, array, bool } = PropTypes;

ClaimApprovalButton.propTypes = {
  draftVoting: object,
  proposalId: string.isRequired,
  daoConfig: object.isRequired,
  daoDetails: object.isRequired,
  gasLimitConfig: object.isRequired,
  pendingTransactions: object,
  web3Redux: object.isRequired,
  ChallengeProof: object.isRequired,
  checkProposalRequirements: func.isRequired,
  showHideAlert: func.isRequired,
  showRightPanel: func.isRequired,
  sendTransactionToDaoServer: func.isRequired,
  subscribeToTransaction: func.isRequired,
  getDaoConfig: func.isRequired,
  showTxSigningModal: func.isRequired,
  addresses: array.isRequired,
  history: object.isRequired,
  transactions: object,
  votingStage: string,
  isProposer: bool.isRequired,
  translations: object.isRequired,
  txnTranslations: object.isRequired,
};

ClaimApprovalButton.defaultProps = {
  draftVoting: undefined,
  votingStage: undefined,
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
      sendTransactionToDaoServer,
      showTxSigningModal,
      getDaoConfig,
      showRightPanel,
    }
  )(withSearchTransactions(ClaimApprovalButton))
);

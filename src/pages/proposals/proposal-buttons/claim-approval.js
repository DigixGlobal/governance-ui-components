import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { toBigNumber } from 'spectrum-lightsuite/src/helpers/stringUtils';
import web3Connect from 'spectrum-lightsuite/src/helpers/web3/connect';
import SpectrumConfig from 'spectrum-lightsuite/spectrum.config';
import { registerUIs } from 'spectrum-lightsuite/src/helpers/uiRegistry';
import { getAddresses } from 'spectrum-lightsuite/src/selectors';
import { showTxSigningModal } from 'spectrum-lightsuite/src/actions/session';

import { executeContractFunction } from '@digix/gov-ui/utils/web3Helper';
import {
  DEFAULT_GAS,
  DEFAULT_GAS_PRICE,
  VotingStages,
  MAX_PEOPLE_PER_CLAIM,
} from '@digix/gov-ui/constants';
import TxVisualization from '@digix/gov-ui/components/common/blocks/tx-visualization';
import MultiStepClaim from '@digix/gov-ui/components/common/blocks/overlay/claim-approval';
import { showHideAlert, showRightPanel } from '@digix/gov-ui/reducers/gov-ui/actions';
import {
  sendTransactionToDaoServer,
  getPendingTransactions,
} from '@digix/gov-ui/reducers/dao-server/actions';

import getContract from '@digix/gov-ui/utils/contracts';
import DaoVotingClaims from '@digix/dao-contracts/build/contracts/DaoVotingClaims.json';

import { getDaoConfig } from '@digix/gov-ui/reducers/info-server/actions';

import Button from '@digix/gov-ui/components/common/elements/buttons/index';

registerUIs({ txVisualization: { component: TxVisualization } });

const network = SpectrumConfig.defaultNetworks[0];

class ClaimApprovalButton extends React.Component {
  state = {
    isMultiStep: false,
    claiming: false,
    totalTransactions: 0,
  };

  componentWillMount() {
    const {
      daoDetails: { data: daoDetails },
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
    const isMultiStep = Number(daoDetails.nModerators) > MAX_PEOPLE_PER_CLAIM;
    const totalTransactions = Math.ceil(daoDetails.nModerators / MAX_PEOPLE_PER_CLAIM);
    this.setState({ isMultiStep, totalTransactions });
  }

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
    const { web3Redux, ChallengeProof, addresses, proposalId, onCompleted } = this.props;
    const { totalTransactions } = this.state;
    const { abi, address } = getContract(DaoVotingClaims, network);
    const contract = web3Redux
      .web3(network)
      .eth.contract(abi)
      .at(address);

    const ui = {
      caption: 'Claim Approval',
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
          title: 'Claim Approval',
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
      this.props.showHideAlert({
        message: useMaxClaim
          ? `Claiming Approval ${draftVoting.currentClaimStep} of ${totalTransactions}`
          : 'Claiming Approval',
        txHash,
      });
      setTimeout(() => {
        this.setState({ claiming: false }, () => onCompleted());
      }, 1000);
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
    };
    return executeContractFunction(payload);
  };

  hasPendingClaim = () => {
    const { pendingTransactions, proposalId } = this.props;
    if (!pendingTransactions.data) return false;

    const transaction = pendingTransactions.data.find(p => p.project === proposalId);
    return transaction !== undefined;
  };

  render() {
    const {
      draftVoting,
      isProposer,
      votingStage,
      daoConfig,
      daoDetails: { data: daoDetails },
    } = this.props;
    const { isMultiStep, claiming, totalTransactions } = this.state;
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

    return (
      <Button
        kind="round"
        large
        disabled={claiming}
        onClick={() =>
          isMultiStep && tentativePassed && canClaim
            ? this.showOverlay({
                total: totalTransactions,
                current: draftVoting.currentClaimStep,
                onClaim: this.handleSubmit(true),
              })
            : this.handleSubmit(false)()
        }
        data-digix="Create-Proposal-Claim-Approval"
      >
        {canClaim && tentativePassed ? 'Claim Approval' : 'Claim Failed Project'}
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
  pendingTransactions: object,
  web3Redux: object.isRequired,
  ChallengeProof: object.isRequired,
  showHideAlert: func.isRequired,
  showRightPanel: func.isRequired,
  sendTransactionToDaoServer: func.isRequired,
  getPendingTransactions: func.isRequired,
  getDaoConfig: func.isRequired,
  showTxSigningModal: func.isRequired,
  onCompleted: func.isRequired,
  addresses: array.isRequired,
  history: object.isRequired,
  votingStage: string,
  isProposer: bool.isRequired,
};

ClaimApprovalButton.defaultProps = {
  draftVoting: undefined,
  votingStage: undefined,
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
      sendTransactionToDaoServer,
      showTxSigningModal,
      getDaoConfig,
      showRightPanel,
      getPendingTransactions,
    }
  )(ClaimApprovalButton)
);

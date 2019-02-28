import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash';

import { Button } from '@digix/gov-ui/components/common/elements/index';
import Like from '@digix/gov-ui/components/common/elements/like';
import { getProposalDetails, getAddressDetails } from '@digix/gov-ui/reducers/info-server/actions';
import {
  getUserProposalLikeStatus,
  likeProposal,
  unlikeProposal,
  clearDaoProposalDetails,
} from '@digix/gov-ui/reducers/dao-server/actions';

import { truncateNumber } from '@digix/gov-ui/utils/helpers';

import PreviousVersion from '@digix/gov-ui/pages/proposals/previous';
import NextVersion from '@digix/gov-ui/pages/proposals/next';

import ProjectDetails from '@digix/gov-ui/pages/proposals/details';
import Milestones from '@digix/gov-ui/pages/proposals/milestones';

import ParticipantButtons from '@digix/gov-ui/pages/proposals/proposal-buttons/participants';
import ModeratorButtons from '@digix/gov-ui/pages/proposals/proposal-buttons/moderators';

import VotingResult from '@digix/gov-ui/pages/proposals/voting-result';
import CommentThread from '@digix/gov-ui/pages/proposals/comment';

import { Notifications } from '@digix/gov-ui/components/common/common-styles';
import {
  ProposalsWrapper,
  VersionHistory,
  ProjectSummary,
  Header,
  Title,
  CtaButtons,
  FundingSummary,
  SummaryInfo,
  InfoItem,
  Upvote,
  ItemTitle,
  Data,
  WarningIcon,
} from '@digix/gov-ui/pages/proposals/style';

const getVotingStruct = proposal => {
  let deadline = Date.now();
  const mileStone = proposal.currentMilestone > 0 ? proposal.currentMilestone : 0;
  if (!proposal.isSpecial) {
    switch (proposal.stage.toLowerCase()) {
      case 'draft':
        if (proposal.votingStage === 'draftVoting' && proposal.draftVoting !== null) {
          return {
            passed: proposal.draftVoting.passed,
            deadline: proposal.draftVoting.votingDeadline,
          };
        }
        return undefined;

      case 'proposal':
        if (Date.now() < proposal.votingRounds[0].commitDeadline) {
          deadline = proposal.votingRounds[0].commitDeadline || undefined;
        }
        deadline = proposal.votingRounds[0].revealDeadline;
        return {
          passed: proposal.votingRounds[0].passed,
          deadline,
        };
      case 'review':
        if (Date.now() < proposal.votingRounds[mileStone].commitDeadline) {
          deadline = proposal.votingRounds[mileStone].commitDeadline || undefined;
        }
        deadline = proposal.votingRounds[mileStone].revealDeadline;
        return {
          passed: proposal.votingRounds[mileStone].passed,
          deadline,
        };
      case 'archived':
        return {
          passed: false,
          deadline: undefined,
        };
      default:
        return {
          passed: proposal.draftVoting ? proposal.draftVoting.passed : false,
          deadline: proposal.draftVoting ? proposal.draftVoting.votingDeadline : undefined,
        };
    }
  } else {
    return {
      passed: proposal.voting.passed,
      deadline: proposal.voting.revealDeadline,
    };
  }
};
class Proposal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      versions: undefined,
      currentVersion: 0,
    };

    const path = this.props.location.pathname.split('/');
    const proposalId = path[2];
    this.PROPOSAL_ID = proposalId;
  }

  componentWillMount = () => {
    const {
      challengeProof,
      clearDaoProposalDetailsAction,
      getProposalDetailsAction,
      getAddressDetailsAction,
      history,
      location,
      addressDetails,
    } = this.props;
    if (!challengeProof.data) history.push('/');
    if (location.pathname) {
      clearDaoProposalDetailsAction();
      if (this.PROPOSAL_ID) {
        getProposalDetailsAction(this.PROPOSAL_ID);
        if (addressDetails.data.address) {
          getAddressDetailsAction(addressDetails.data.address);
        }
        this.getProposalLikes();
      }
    }
  };

  componentWillReceiveProps = nextProps => {
    const { proposalDetails } = nextProps;
    if (!proposalDetails.fetching && proposalDetails.data.proposalId) {
      const currentVersion = proposalDetails.data.proposalVersions
        ? proposalDetails.data.proposalVersions.length - 1
        : 0;
      this.setState({
        versions: proposalDetails.data.proposalVersions,
        currentVersion,
      });
    }
  };

  shouldComponentUpdate = (nextProps, nextState) =>
    !_.isEqual(nextProps, this.props) || !_.isEqual(nextState, this.state);

  getProposalLikes = () => {
    const { getUserProposalLikeStatusAction, challengeProof } = this.props;
    if (challengeProof.data) {
      getUserProposalLikeStatusAction({
        proposalId: this.PROPOSAL_ID,
        client: challengeProof.data.client,
        token: challengeProof.data['access-token'],
        uid: challengeProof.data.uid,
      });
    }
  };

  handlePreviousVersionClick = () => {
    this.setState({ currentVersion: Number(this.state.currentVersion) - 1 });
  };

  handleNextVersionClick = () => {
    this.setState({ currentVersion: Number(this.state.currentVersion) + 1 });
  };

  handleLikeClick = e => {
    e.preventDefault();
    const { likeProposalAction, challengeProof } = this.props;
    likeProposalAction({
      proposalId: this.PROPOSAL_ID,
      client: challengeProof.data.client,
      token: challengeProof.data['access-token'],
      uid: challengeProof.data.uid,
    });
  };

  handleUnlikeClick = e => {
    e.preventDefault();
    const { unlikeProposalAction, challengeProof } = this.props;
    unlikeProposalAction({
      proposalId: this.PROPOSAL_ID,
      client: challengeProof.data.client,
      token: challengeProof.data['access-token'],
      uid: challengeProof.data.uid,
    });
  };

  renderPrlAlert = prl =>
    prl ? (
      <Notifications warning>
        <WarningIcon kind="warning" />
        This proposal can no longer claim funding due to Policy, Regulatory or Legal reasons, even
        if voting passes. Please contact us if you have any queries.
      </Notifications>
    ) : null;

  renderClaimApprovalAlert = () => {
    const { proposalDetails, daoConfig } = this.props;
    const votingStruct = getVotingStruct(proposalDetails.data);
    const voteClaimingDeadline = daoConfig.data.CONFIG_VOTE_CLAIMING_DEADLINE;
    const currentTime = Date.now();
    console.log({ votingStruct });
    const canClaim =
      votingStruct &&
      votingStruct.passed &&
      currentTime > votingStruct.deadline * 1000 &&
      currentTime < new Date((votingStruct.deadline + Number(voteClaimingDeadline)) * 1000);

    const pastDeadline =
      votingStruct &&
      votingStruct.passed &&
      currentTime >= new Date((votingStruct.deadline + Number(voteClaimingDeadline)) * 1000);

    if (canClaim)
      return (
        <Notifications warning>
          <WarningIcon kind="warning" />
          The voting result shows that your project passes the voting. Please click the button below
          to send transaction(s) to claim this result on the blockchain. You need to do this action
          before {new Intl.DateTimeFormat('en-US').format(votingStruct.deadline * 1000)}, or your
          proposal will auto fail.
        </Notifications>
      );
    if (pastDeadline)
      return (
        <Notifications warning>
          <WarningIcon kind="warning" />
          The voting result was not claimed before the claiming deadline. This project will be auto
          failed.
        </Notifications>
      );
  };

  renderProposerDidNotPassAlert = () => {
    const {
      proposalDetails: {
        data: { proposer },
        data,
      },
      addressDetails: {
        data: { address: currentUser },
      },
    } = this.props;
    const votingStruct = getVotingStruct(data);
    if (votingStruct && !votingStruct.passed && currentUser === proposer)
      return (
        <Notifications warning>
          <WarningIcon kind="warning" />
          The voting result shows that your project fails the voting. Please click the button below
          to {data.currentVotingRound <= 0 ? 'get back your collateral and' : ''} close the project.
        </Notifications>
      );
    return null;
  };
  render() {
    const { currentVersion, versions } = this.state;
    const { proposalDetails, addressDetails, history, daoInfo, userProposalLike } = this.props;

    if (proposalDetails.fetching === null || proposalDetails.fetching)
      return <div>Fetching Proposal Details</div>;

    const isProposer = addressDetails.data.address === proposalDetails.data.proposer;
    const proposalVersion = proposalDetails.data.proposalVersions[currentVersion];
    const { dijixObject } = proposalVersion;
    const versionCount = versions ? versions.length : 0;

    const totalUpdatedFunds = (acc, currentValue) =>
      Number(acc.updated) + Number(currentValue.updated);

    const totalOriginalFunds = (acc, currentValue) =>
      Number(acc.original) + Number(currentValue.original);

    const milestoneFundings = (acc, currentValue) => Number(acc) + Number(currentValue);

    const liked = userProposalLike.data ? userProposalLike.data.liked : false;
    const likes = userProposalLike.data ? userProposalLike.data.likes : 0;
    const displayName = userProposalLike.data ? userProposalLike.data.user.displayName : '';

    const funding = proposalDetails.data.isFundingChanged
      ? proposalDetails.data.changedFundings.milestones.reduce(totalOriginalFunds)
      : proposalVersion.milestoneFundings.reduce(milestoneFundings, 0);
    let reward = truncateNumber(proposalVersion.finalReward);

    let updatedFunding;
    let updatedReward;

    if (proposalDetails.data.isFundingChanged) {
      reward = truncateNumber(proposalDetails.data.changedFundings.finalReward.original);

      if (Number(proposalDetails.data.changedFundings.finalReward.updated) > 0) {
        updatedReward = truncateNumber(
          proposalDetails.data.changedFundings.finalReward.updated - reward
        );
        if (updatedReward === 0) updatedReward = -Math.abs(reward);
      } else {
        updatedReward = -Math.abs(reward);
      }

      if (proposalDetails.data.changedFundings.milestones.reduce(totalUpdatedFunds) > 0) {
        updatedFunding = truncateNumber(
          proposalDetails.data.changedFundings.milestones.reduce(totalUpdatedFunds) - funding
        );
        if (updatedFunding === 0) updatedFunding = undefined; // set to undefined to ensure no change in fundng is displayed
      } else {
        updatedFunding = undefined;
      }
    }
    return (
      <ProposalsWrapper>
        <ProjectSummary>
          {versions && versions.length > 1 && (
            <VersionHistory>
              <PreviousVersion
                disabled={currentVersion === 0}
                onClick={this.handlePreviousVersionClick}
              />
              <div>Version {currentVersion + 1} </div>
              <NextVersion
                disabled={currentVersion + 1 === versionCount}
                onClick={this.handleNextVersionClick}
              />
            </VersionHistory>
          )}
          {this.renderPrlAlert(proposalDetails.data.prl)}
          {this.renderClaimApprovalAlert()}
          {this.renderProposerDidNotPassAlert()}

          <Header>
            <div>
              <Button kind="tag" filled>
                Special
              </Button>
              <Button kind="tag" showIcon>
                {proposalDetails.data.stage}
              </Button>
              <Title primary>{dijixObject.title}</Title>
            </div>
            <CtaButtons>
              <ParticipantButtons
                isProposer={isProposer}
                proposal={proposalDetails}
                addressDetails={addressDetails}
                onCompleted={() => this.props.getProposalDetailsAction(this.PROPOSAL_ID)}
                history={history}
              />
              <ModeratorButtons
                proposal={proposalDetails}
                addressDetails={addressDetails}
                history={history}
              />
            </CtaButtons>
          </Header>
          <FundingSummary>
            <SummaryInfo>
              <InfoItem>
                <ItemTitle>Submitted By</ItemTitle>
                <Data>
                  <span>{displayName}</span>
                </Data>
              </InfoItem>
              <InfoItem>
                <ItemTitle>Funding</ItemTitle>
                <Data>
                  <span data-digix="funding-amount-label">{funding}</span>
                  {updatedFunding && (
                    <span data-digix="edit-funding-amount-label">
                      {updatedFunding && updatedFunding > 0
                        ? ` + ${updatedFunding}`
                        : ` - ${Math.abs(updatedFunding)}`}
                    </span>
                  )}
                  {` ETH`}
                </Data>
              </InfoItem>
              <InfoItem>
                <ItemTitle>Milestones</ItemTitle>
                <Data>
                  <span data-digix="milestone-label">{dijixObject.milestones.length || 0}</span>
                </Data>
              </InfoItem>
              <InfoItem>
                <ItemTitle>Reward</ItemTitle>
                <Data>
                  <span data-digix="reward-amount-label">{reward} </span>
                  {updatedReward && (
                    <span data-digix="edit-reward-amount-label">
                      {updatedReward > 0
                        ? ` + ${updatedReward} `
                        : ` - ${Math.abs(updatedReward)} `}
                    </span>
                  )}
                  ETH
                </Data>
              </InfoItem>
            </SummaryInfo>
            <Upvote>
              <Like
                hasVoted={liked}
                likes={likes}
                onClick={liked ? this.handleUnlikeClick : this.handleLikeClick}
              />
            </Upvote>
          </FundingSummary>
        </ProjectSummary>
        <VotingResult
          proposal={proposalDetails.data}
          draftVoting={proposalDetails.data.draftVoting}
          daoInfo={daoInfo}
        />
        <ProjectDetails project={dijixObject} />
        <Milestones
          milestones={dijixObject.milestones || []}
          milestoneFundings={proposalVersion.milestoneFundings}
          changedFundings={
            proposalDetails.data.changedFundings
              ? proposalDetails.data.changedFundings.milestones
              : undefined
          }
          fundingChanged={proposalDetails.data.isFundingChanged}
        />
        <CommentThread proposalId={this.PROPOSAL_ID} uid={addressDetails.data.address} />
      </ProposalsWrapper>
    );
  }
}

const { object, func } = PropTypes;

Proposal.propTypes = {
  proposalDetails: object.isRequired,
  daoInfo: object.isRequired,
  getProposalDetailsAction: func.isRequired,
  getUserProposalLikeStatusAction: func.isRequired,
  clearDaoProposalDetailsAction: func.isRequired,
  getAddressDetailsAction: func.isRequired,
  likeProposalAction: func.isRequired,
  unlikeProposalAction: func.isRequired,
  addressDetails: object.isRequired,
  challengeProof: object,
  daoConfig: object.isRequired,
  userProposalLike: object,
  location: object.isRequired,
  history: object.isRequired,
};

Proposal.defaultProps = {
  challengeProof: undefined,
  userProposalLike: undefined,
};

export default connect(
  ({
    infoServer: {
      ProposalDetails,
      AddressDetails,
      DaoConfig,
      DaoDetails: { data },
    },
    daoServer: { ChallengeProof, UserProposalLike },
  }) => ({
    proposalDetails: ProposalDetails,
    addressDetails: AddressDetails,
    challengeProof: ChallengeProof,
    daoInfo: data,
    daoConfig: DaoConfig,
    userProposalLike: UserProposalLike,
  }),
  {
    getProposalDetailsAction: getProposalDetails,
    getUserProposalLikeStatusAction: getUserProposalLikeStatus,
    getAddressDetailsAction: getAddressDetails,
    likeProposalAction: likeProposal,
    unlikeProposalAction: unlikeProposal,
    clearDaoProposalDetailsAction: clearDaoProposalDetails,
  }
)(Proposal);

import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash';

import { EMPTY_HASH } from '@digix/gov-ui/constants';
import Button from '@digix/gov-ui/components/common/elements/buttons/index';
import Like from '@digix/gov-ui/components/common/elements/like';
import { getProposalDetails } from '@digix/gov-ui/reducers/info-server/actions';
import {
  getUserProposalLikeStatus,
  likeProposal,
  unlikeProposal,
  clearDaoProposalDetails,
} from '@digix/gov-ui/reducers/dao-server/actions';

import PreviousVersion from './previous';
import NextVersion from './next';

import ProjectDetails from './details';
import Milestones from './milestones';

import ParticipantButtons from './proposal-buttons/participants';
import ModeratorButtons from './proposal-buttons/moderators';

// import AbortButton from './proposal-buttons/abort';
// import FinalizeButton from './proposal-buttons/finalize';
// import EndorseButton from './proposal-buttons/endorse';

// import ApproveButton from './proposal-buttons/approve';
// import ClaimApprovalButton from './proposal-buttons/claim-approval';
// import VoteCommitButton from './proposal-buttons/vote-commit';
// import RevealButton from './proposal-buttons/reveal-button';
// import ClaimResultsButton from './proposal-buttons/claim-results';
// import ClaimFundingButton from './proposal-buttons/claim-funding';
// import MilestoneCompletedButton from './proposal-buttons/milestone-completed';

import VotingResult from './voting-result';

import CommentThread from './comment/index';

import {
  ProposalsWrapper,
  BrowseVersionHistory,
  ProjectSummary,
  Header,
  Title,
  LatestActivity,
  SubmittedBy,
  FundingStatus,
  MilestonesStatus,
  Reward,
  UpvoteStatus,
} from './style';

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
      history,
      location,
    } = this.props;
    if (!challengeProof.data) history.push('/');

    if (location.pathname) {
      clearDaoProposalDetailsAction();
      if (this.PROPOSAL_ID) {
        getProposalDetailsAction(this.PROPOSAL_ID);
        this.getProposalLikes();
      }
    }
  };

  componentWillReceiveProps = nextProps => {
    const { proposalDetails } = nextProps;
    if (!proposalDetails.fething && proposalDetails.data.proposalId) {
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
    getUserProposalLikeStatusAction({
      proposalId: this.PROPOSAL_ID,
      client: challengeProof.data.client,
      token: challengeProof.data['access-token'],
      uid: challengeProof.data.uid,
    });
  };

  handlePreviousVersionClick = () => {
    this.setState({ currentVersion: Number(this.state.currentVersion) - 1 });
  };

  handleNextVersionClick = () => {
    this.setState({ currentVersion: Number(this.state.currentVersion) + 1 });
  };

  handleEditClick = () => {
    const { history, proposalDetails } = this.props;
    history.push(`/proposals/edit/${proposalDetails.data.proposalId}`);
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

  render() {
    const { currentVersion, versions } = this.state;
    const { proposalDetails, addressDetails, history, daoInfo, userProposalLike } = this.props;

    if (proposalDetails.fetching === null || proposalDetails.fetching)
      return <div>Fetching Proposal Details</div>;

    const isProposer = addressDetails.data.address === proposalDetails.data.proposer;
    const isEndorsed = proposalDetails.data.endorser !== EMPTY_HASH;

    const proposalVersion = proposalDetails.data.proposalVersions[currentVersion];
    const { dijixObject } = proposalVersion;
    const versionCount = versions ? versions.length : 0;
    const liked = userProposalLike.data ? userProposalLike.data.liked : false;
    return (
      <ProposalsWrapper>
        <ProjectSummary>
          {versions && versions.length > 1 && (
            <BrowseVersionHistory>
              <PreviousVersion
                disabled={currentVersion === 0}
                onClick={this.handlePreviousVersionClick}
              />
              <div>Version {currentVersion + 1} </div>
              <NextVersion
                disabled={currentVersion + 1 === versionCount}
                onClick={this.handleNextVersionClick}
              />
            </BrowseVersionHistory>
          )}
          <Header>
            <div>
              <Button kind="flat">{proposalDetails.data.stage}</Button>
              <Title primary>{dijixObject.title}</Title>
            </div>
            <div>
              <ParticipantButtons
                isProposer={isProposer}
                proposal={proposalDetails}
                addressDetails={addressDetails}
                history={history}
              />
              <ModeratorButtons
                proposal={proposalDetails}
                addressDetails={addressDetails}
                history={history}
              />
              {/* <AbortButton
                stage={proposalDetails.data.stage}
                isProposer={isProposer}
                proposalId={proposalDetails.data.proposalId}
                finalVersionIpfsDoc={proposalDetails.data.finalVersionIpfsDoc}
                history={history}
              />
              <FinalizeButton
                endorser={proposalDetails.data.endorser}
                stage={proposalDetails.data.stage}
                isProposer={isProposer}
                proposalId={proposalDetails.data.proposalId}
                finalVersionIpfsDoc={proposalDetails.data.finalVersionIpfsDoc}
                history={history}
                timeCreated={proposalDetails.data.timeCreated}
              />
              <ClaimResultsButton
                isProposer={isProposer}
                proposal={proposalDetails.data}
                history={history}
              />
              <ClaimFundingButton
                isProposer={isProposer}
                proposal={proposalDetails.data}
                history={history}
              />
              <MilestoneCompletedButton
                isProposer={isProposer}
                proposal={proposalDetails.data}
                history={history}
              />
              <ApproveButton
                history={history}
                isModerator={addressDetails.data.isModerator}
                proposal={proposalDetails.data}
                proposalId={proposalDetails.data.proposalId}
              />

              <ClaimApprovalButton
                isProposer={isProposer}
                draftVoting={proposalDetails.data.draftVoting}
                history={history}
                votingStage={proposalDetails.data.votingStage}
                proposalId={proposalDetails.data.proposalId}
              />
              <VoteCommitButton
                isParticipant={addressDetails.data.isParticipant}
                history={history}
                proposal={proposalDetails.data}
                proposalId={proposalDetails.data.proposalId}
                votingStage={proposalDetails.data.votingStage}
              />
              <RevealButton
                isParticipant={addressDetails.data.isParticipant}
                history={history}
                proposal={proposalDetails.data}
                proposalId={proposalDetails.data.proposalId}
                votingStage={proposalDetails.data.votingStage}
              />

              <EndorseButton
                stage={proposalDetails.data.stage}
                isModerator={addressDetails.data.isModerator}
                endorser={proposalDetails.data.endorser}
                proposalId={proposalDetails.data.proposalId}
                history={history}
              /> */}

              {isProposer && !isEndorsed && (
                <Button kind="round" ghost primary onClick={this.handleEditClick}>
                  Edit
                </Button>
              )}
            </div>
          </Header>
          <LatestActivity>
            <SubmittedBy>
              Submitted By <span>{proposalDetails.data.proposer}</span>
            </SubmittedBy>
            <FundingStatus>
              Funding
              <span>
                {proposalVersion.totalFunding}
                ETH
              </span>
            </FundingStatus>
            <MilestonesStatus>
              Milestones <span>{dijixObject.milestones.length || 0}</span>
            </MilestonesStatus>
            <Reward>
              Reward <span>{proposalVersion.finalReward} ETH</span>
            </Reward>
            <UpvoteStatus>
              <Like
                hasVoted={liked}
                onClick={liked ? this.handleUnlikeClick : this.handleLikeClick}
              />
            </UpvoteStatus>
          </LatestActivity>
        </ProjectSummary>
        <VotingResult
          proposal={proposalDetails.data}
          draftVoting={proposalDetails.data.draftVoting}
          daoInfo={daoInfo}
        />
        <ProjectDetails project={dijixObject} />
        <Milestones milestones={dijixObject.milestones || []} />
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
  likeProposalAction: func.isRequired,
  unlikeProposalAction: func.isRequired,
  addressDetails: object.isRequired,
  challengeProof: object,
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
      DaoDetails: { data },
    },
    daoServer: { ChallengeProof, UserProposalLike },
  }) => ({
    proposalDetails: ProposalDetails,
    addressDetails: AddressDetails,
    challengeProof: ChallengeProof,
    daoInfo: data,
    userProposalLike: UserProposalLike,
  }),
  {
    getProposalDetailsAction: getProposalDetails,
    getUserProposalLikeStatusAction: getUserProposalLikeStatus,
    likeProposalAction: likeProposal,
    unlikeProposalAction: unlikeProposal,
    clearDaoProposalDetailsAction: clearDaoProposalDetails,
  }
)(Proposal);

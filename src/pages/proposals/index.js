import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { EMPTY_HASH } from '@digix/gov-ui/constants';
import Button from '@digix/gov-ui/components/common/elements/buttons/index';
import Vote from '@digix/gov-ui/components/common/elements/vote/index';
import { getProposalDetails } from '@digix/gov-ui/reducers/info-server/actions';

import PreviousVersion from './previous';
import NextVersion from './next';

import ProjectDetails from './details';
import Milestones from './milestones';

import AbortButton from './proposal-buttons/abort';
import FinalizeButton from './proposal-buttons/finalize';
import EndorseButton from './proposal-buttons/endorse';

import ApproveButton from './proposal-buttons/approve';
import ClaimApprovalButton from './proposal-buttons/claim-approval';
import VoteCommitButton from './proposal-buttons/vote-commit';
import RevealButton from './proposal-buttons/reveal-button';
// import ClaimFundingButton from './proposal-buttons/claim-funding';
// import MilestoneCompletedButton from './proposal-buttons/milestone-completed';
// import ClaimResultsButton from './proposal-buttons/claim-results';

import VotingResult from './voting-result';

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
  }

  componentWillMount = () => {
    const { getProposalDetailsAction, location } = this.props;
    if (location.pathname) {
      const path = location.pathname.split('/');
      const proposalId = path[2];
      if (proposalId) getProposalDetailsAction(proposalId);
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

  render() {
    const { currentVersion, versions } = this.state;
    const { proposalDetails, addressDetails, challengeProof, history, daoInfo } = this.props;
    if (!challengeProof.data) history.push('/');

    if (proposalDetails.fething === null || proposalDetails.fething)
      return <div>Fetching Proposal Details</div>;

    if (!proposalDetails.data.proposalId) return <h1>Proposal Not Found</h1>;

    const isProposer = addressDetails.data.address === proposalDetails.data.proposer;
    const isEndorsed = proposalDetails.data.endorser !== EMPTY_HASH;

    const proposalVersion = proposalDetails.data.proposalVersions[currentVersion];
    const { dijixObject } = proposalVersion;
    const versionCount = versions ? versions.length : 0;
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
              <AbortButton
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
              {/* <ClaimFundingButton />
              <MilestoneCompletedButton />
              <ClaimResultsButton /> */}

              {/* TODO: add functionality for the following buttons */}
              <EndorseButton
                stage={proposalDetails.data.stage}
                isModerator={addressDetails.data.isModerator}
                endorser={proposalDetails.data.endorser}
                proposalId={proposalDetails.data.proposalId}
                history={history}
              />

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
              <Vote hasVoted />
            </UpvoteStatus>
          </LatestActivity>
        </ProjectSummary>
        <VotingResult draftVoting={proposalDetails.data.draftVoting} daoInfo={daoInfo} />
        <ProjectDetails project={dijixObject} />
        <Milestones milestones={dijixObject.milestones || []} />
      </ProposalsWrapper>
    );
  }
}

const { object, func } = PropTypes;

Proposal.propTypes = {
  proposalDetails: object.isRequired,
  daoInfo: object.isRequired,
  getProposalDetailsAction: func.isRequired,
  addressDetails: object.isRequired,
  challengeProof: object,
  location: object.isRequired,
  history: object.isRequired,
};

Proposal.defaultProps = {
  challengeProof: undefined,
};

export default connect(
  ({
    infoServer: {
      ProposalDetails,
      AddressDetails,
      DaoDetails: { data },
    },
    daoServer: { ChallengeProof },
  }) => ({
    proposalDetails: ProposalDetails,
    addressDetails: AddressDetails,
    challengeProof: ChallengeProof,
    daoInfo: data,
  }),
  {
    getProposalDetailsAction: getProposalDetails,
  }
)(Proposal);

import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import _ from 'lodash';
import { connect } from 'react-redux';

import CommentThread from '@digix/gov-ui/pages/proposals/comment';
import Like from '@digix/gov-ui/components/common/elements/like';
import Milestones from '@digix/gov-ui/pages/proposals/milestones';
import ModeratorButtons from '@digix/gov-ui/pages/proposals/proposal-buttons/moderators';
import ParticipantButtons from '@digix/gov-ui/pages/proposals/proposal-buttons/participants';
import ProjectDetails from '@digix/gov-ui/pages/proposals/details';
import ProposalFundings from '@digix/gov-ui/pages/proposals/fundings';
import ProposalVersionNav from '@digix/gov-ui/pages/proposals/version-nav';
import SpecialProjectDetails from '@digix/gov-ui/pages/proposals/special-project-details';
import SpecialProjectVotingResult from '@digix/gov-ui/pages/proposals/special-project-voting-result';
import AdditionalDocs from '@digix/gov-ui/pages/proposals/additional-docs';
import VotingAccordion from '@digix/gov-ui/components/common/elements/accordion/voting-accordion';
import VotingResult from '@digix/gov-ui/pages/proposals/voting-result';
import { Button } from '@digix/gov-ui/components/common/elements/index';
import { getAddressDetails } from '@digix/gov-ui/reducers/info-server/actions';
import { Message, Notifications } from '@digix/gov-ui/components/common/common-styles';
import { truncateNumber, injectTranslation } from '@digix/gov-ui/utils/helpers';
import { withFetchProposal } from '@digix/gov-ui/api/graphql-queries/proposal';
import { withFetchUser } from '@digix/gov-ui/api/graphql-queries/users';

import {
  clearDaoProposalDetails,
  getUserProposalLikeStatus,
  likeProposal,
  unlikeProposal,
  getTranslations,
} from '@digix/gov-ui/reducers/dao-server/actions';

import {
  CallToAction,
  Data,
  FundingInfo,
  Header,
  InfoItem,
  ItemTitle,
  ProjectSummary,
  ProposalsWrapper,
  Title,
  WarningIcon,
} from '@digix/gov-ui/pages/proposals/style';

const getVotingStruct = proposal => {
  let deadline = Date.now();
  const mileStone = proposal.currentMilestone > 0 ? proposal.currentMilestone : 0;
  let votingStruct;
  switch (proposal.stage.toLowerCase()) {
    case 'draft':
      if (proposal.votingStage === 'draftVoting' && proposal.draftVoting !== null) {
        votingStruct = {
          yes: proposal.draftVoting.yes,
          no: proposal.draftVoting.no,
          quota: proposal.draftVoting.quota,
          quorum: proposal.draftVoting.quorum,
          claimed: proposal.draftVoting.claimed,
          deadline: proposal.draftVoting.votingDeadline,
        };
      }
      break;

    case 'proposal':
      if (Date.now() < proposal.votingRounds[0].commitDeadline) {
        deadline = proposal.votingRounds[0].commitDeadline || undefined;
      }
      deadline = proposal.votingRounds[0].revealDeadline;

      votingStruct = {
        yes: proposal.votingRounds[0].yes,
        no: proposal.votingRounds[0].no,
        quota: proposal.votingRounds[0].quota,
        claimed: proposal.votingRounds[0].claimed,
        quorum: proposal.votingRounds[0].quorum,
        deadline,
      };

      break;
    case 'review':
      if (Date.now() < proposal.votingRounds[mileStone].commitDeadline) {
        deadline = proposal.votingRounds[mileStone].commitDeadline || undefined;
      }
      deadline = proposal.votingRounds[mileStone].revealDeadline;

      votingStruct = {
        yes: proposal.votingRounds[mileStone].yes,
        no: proposal.votingRounds[mileStone].no,
        claimed: proposal.votingRounds[mileStone].claimed,
        quota: proposal.votingRounds[mileStone].quota,
        quorum: proposal.votingRounds[mileStone].quorum,
        deadline,
      };

      break;

    default:
      votingStruct = {
        yes: 0,
        no: 0,
        quota: 0,
        quorum: 0,
        claimed: true,
        deadline: undefined,
      };
      break;
  }
  return votingStruct;
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
      clearDaoProposalDetailsAction,
      getAddressDetailsAction,
      location,
      addressDetails,
      getTranslationsAction,
      Language,
    } = this.props;
    if (location.pathname) {
      clearDaoProposalDetailsAction();
      if (this.PROPOSAL_ID) {
        if (addressDetails.data.address) {
          getAddressDetailsAction(addressDetails.data.address);
        }
        this.getProposalLikes();
      }
    }

    getTranslationsAction(Language);
  };

  componentDidMount = () => {
    this.props.subscribeToProposal();
  };

  componentWillReceiveProps = nextProps => {
    const { proposalDetails } = nextProps;

    if (!proposalDetails.fetching && proposalDetails.data && proposalDetails.data.proposalId) {
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
    const { getUserProposalLikeStatusAction } = this.props;
    getUserProposalLikeStatusAction({
      proposalId: this.PROPOSAL_ID,
    });
  };

  getChangedFundings() {
    const proposal = this.props.proposalDetails.data;
    let milestoneFunds = null;
    let milestoneFundDifference = null;
    let reward = null;
    let rewardDifference = null;

    if (!proposal.isFundingChanged) {
      return {
        milestoneFunds,
        milestoneFundDifference,
        reward,
        rewardDifference,
      };
    }

    const { finalReward, milestones } = proposal.changedFundings;
    milestoneFunds = milestones.reduce(
      (acc, milestone) => Number(acc.original) + Number(milestone.original)
    );

    const updatedMilestoneFunds = milestones.reduce(
      (acc, milestone) => Number(acc.updated) + Number(milestone.updated)
    );

    milestoneFundDifference = updatedMilestoneFunds - milestoneFunds;
    milestoneFundDifference =
      milestoneFundDifference === 0 ? undefined : truncateNumber(milestoneFundDifference);

    reward = truncateNumber(Number(finalReward.original));
    rewardDifference = Number(finalReward.updated) - Number(finalReward.original);
    rewardDifference = rewardDifference === 0 ? undefined : truncateNumber(rewardDifference);

    return {
      milestoneFunds,
      milestoneFundDifference,
      reward,
      rewardDifference,
    };
  }

  getPastVotingResults = () => {
    const {
      daoInfo,
      proposalDetails,
      Translations: {
        data: {
          project: { votingResult },
        },
      },
    } = this.props;

    const pastVotes = [];
    if (proposalDetails.data.isSpecial === true) {
      pastVotes.push({
        title: votingResult.proposalVoteResults,
        voting: proposalDetails.data.votingRounds[0],
        daoInfo,
      });
    }

    if (proposalDetails.data.currentVotingRound === -1) {
      pastVotes.push({
        title: votingResult.moderatorApprovalResults,
        voting: proposalDetails.data.draftVoting,
        daoInfo,
      });
    }

    if (proposalDetails.data.currentVotingRound === 0) {
      pastVotes.push({
        title: votingResult.moderatorApprovalResults,
        voting: proposalDetails.data.draftVoting,
        daoInfo,
      });
      pastVotes.push({
        title: votingResult.proposalVoteResults,
        voting: proposalDetails.data.votingRounds[0],
        daoInfo,
      });
    }
    if (proposalDetails.data.currentVotingRound === 1) {
      pastVotes.push({
        title: votingResult.moderatorApprovalResults,
        voting: proposalDetails.data.draftVoting,
        daoInfo,
      });
      pastVotes.push({
        title: votingResult.proposalVoteResults,
        voting: proposalDetails.data.votingRounds[0],
        daoInfo,
      });
      pastVotes.push({
        title: injectTranslation(votingResult.reviewVoteResults, {
          votingRound: '1',
        }),
        voting: proposalDetails.data.votingRounds[1],
        daoInfo,
      });
    }
    if (proposalDetails.data.currentVotingRound === 2) {
      pastVotes.push({
        title: votingResult.moderatorApprovalResults,
        voting: proposalDetails.data.draftVoting,
        daoInfo,
      });
      pastVotes.push({
        title: votingResult.proposalVoteResults,
        voting: proposalDetails.data.votingRounds[0],
        daoInfo,
      });
      pastVotes.push({
        title: injectTranslation(votingResult.reviewVoteResults, {
          votingRound: '1',
        }),
        voting: proposalDetails.data.votingRounds[1],
        daoInfo,
      });
      pastVotes.push({
        title: injectTranslation(votingResult.reviewVoteResults, {
          votingRound: '2',
        }),
        voting: proposalDetails.data.votingRounds[2],
        daoInfo,
      });
    }

    return pastVotes;
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

  renderPrlAlert = prl => {
    const {
      Translations: {
        data: {
          project: { alerts },
        },
      },
    } = this.props;
    return prl ? (
      <Notifications warning withIcon>
        <WarningIcon kind="warning" />
        <Message note>{alerts.prl}</Message>
      </Notifications>
    ) : null;
  };

  renderClaimApprovalAlert = () => {
    const {
      proposalDetails: {
        data: { proposer },
        data,
      },
      addressDetails: {
        data: { address: currentUser },
      },
      daoConfig,
      Translations: {
        data: {
          project: { alerts },
        },
      },
    } = this.props;

    if (data.claimed) return null;

    const votingStruct = getVotingStruct(data);
    if (!votingStruct) return null;

    const voteClaimingDeadline = daoConfig.data.CONFIG_VOTE_CLAIMING_DEADLINE;
    const currentTime = Date.now();
    const { yes = 0, no = 0, quorum, quota } = votingStruct;
    const tentativePassed =
      Number(yes) + Number(no) > Number(quorum) &&
      Number(yes) / (Number(yes) + Number(no)) > Number(quota);
    const deadline = new Date((votingStruct.deadline + Number(voteClaimingDeadline)) * 1000);

    const pastDeadline = votingStruct && currentTime >= deadline;

    const canClaim =
      votingStruct &&
      tentativePassed &&
      !pastDeadline &&
      currentTime > votingStruct.deadline * 1000;

    const injectedDeadline = injectTranslation(alerts.claimVotingresult, {
      dateTime: moment(deadline).format('MM/DD/YYYY hh:mm A'),
    });
    if (canClaim && currentUser === proposer)
      return (
        <Notifications warning withIcon>
          <WarningIcon kind="warning" />
          <Message note>{injectedDeadline}</Message>
        </Notifications>
      );
    if (tentativePassed && pastDeadline && currentUser !== proposer)
      return (
        <Notifications warning withIcon>
          <WarningIcon kind="warning" small />
          <Message note>{alerts.unclaimed}</Message>
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
      Translations: {
        data: {
          project: { alerts },
        },
      },
    } = this.props;

    const { daoConfig } = this.props;
    const votingStruct = getVotingStruct(data);
    if (!votingStruct) return null;
    const { yes, no, quorum, quota, claimed } = votingStruct;

    const currentTime = Date.now();

    const tentativePassed =
      Number(yes) + Number(no) > Number(quorum) &&
      Number(yes) / (Number(yes) + Number(no)) > Number(quota);

    const isVotingDeadlineOver = currentTime > new Date(votingStruct.deadline * 1000);
    const pastDeadline =
      votingStruct &&
      currentTime > votingStruct.deadline * 1000 &&
      currentTime >=
        new Date(
          (votingStruct.deadline + Number(daoConfig.data.CONFIG_VOTE_CLAIMING_DEADLINE)) * 1000
        );

    if (
      votingStruct &&
      !claimed &&
      ((!tentativePassed && isVotingDeadlineOver) || pastDeadline) &&
      currentUser === proposer
    )
      return (
        <Notifications warning withIcon>
          <WarningIcon kind="warning" />
          <Message note>
            {data.currentVotingRound <= 0 ? alerts.failedModeratorVoting : alerts.failedVoting}
          </Message>
        </Notifications>
      );
    return null;
  };

  renderSpecialProposal = () => {
    const {
      proposalDetails,
      addressDetails,
      history,
      daoInfo,
      userProposalLike,
      userData,
      Translations,
    } = this.props;

    const { currentVersion } = this.state;
    const proposal = proposalDetails.data;

    const proposalVersion = proposal ? proposal.proposalVersions[currentVersion] : undefined;

    const isProposer = addressDetails.data.address === proposalDetails.data.proposer;
    const isForumAdmin = userData && userData.isForumAdmin;
    const liked = userProposalLike.data ? userProposalLike.data.liked : false;
    const likes = userProposalLike.data ? userProposalLike.data.likes : 0;
    const displayName = userProposalLike.data ? userProposalLike.data.user.displayName : '';
    const hasMoreDocs = proposalVersion ? proposalVersion.moreDocs.length > 0 : false;
    const {
      data: {
        dashboard: { ProposalCard: cardTranslation },
        project,
      },
      data: translations,
    } = Translations;

    return (
      <ProposalsWrapper>
        <ProjectSummary>
          {this.renderPrlAlert(proposalDetails.data.prl)}
          {this.renderClaimApprovalAlert()}
          {this.renderProposerDidNotPassAlert()}
          <Header>
            <div>
              <Button kind="tag" filled>
                {/* TODO: Add Translation */}
                Special
              </Button>
              <Button kind="tag" showIcon>
                {proposalDetails.data.stage}
              </Button>
              <Title data-digix="Proposal-Title">{proposalDetails.data.title}</Title>
            </div>
            {!isForumAdmin && (
              <CallToAction>
                <ParticipantButtons
                  isProposer={isProposer}
                  proposal={proposalDetails}
                  addressDetails={addressDetails}
                  match={this.props.match}
                  history={history}
                  translations={translations}
                />
                <ModeratorButtons
                  proposal={proposalDetails}
                  addressDetails={addressDetails}
                  history={history}
                  translations={translations}
                />
              </CallToAction>
            )}
          </Header>
          <FundingInfo>
            <InfoItem>
              <ItemTitle>{project.submittedBy}</ItemTitle>
              <Data>
                <span>{displayName}</span>
              </Data>
            </InfoItem>
            <InfoItem>
              <Like
                hasVoted={liked}
                likes={likes}
                translations={cardTranslation}
                disabled={!userData}
                onClick={liked ? this.handleUnlikeClick : this.handleLikeClick}
              />
            </InfoItem>
          </FundingInfo>
        </ProjectSummary>
        <VotingAccordion votingResults={this.getPastVotingResults()} translations={translations} />
        <SpecialProjectVotingResult
          proposal={proposalDetails.data}
          daoInfo={daoInfo}
          translations={translations}
        />
        <SpecialProjectDetails
          uintConfigs={proposalDetails.data.uintConfigs}
          translations={translations}
        />
        {hasMoreDocs && <AdditionalDocs translations={translations} proposal={proposalDetails} />}
        <CommentThread
          proposalId={this.PROPOSAL_ID}
          uid={addressDetails.data.address}
          translations={translations}
        />
      </ProposalsWrapper>
    );
  };

  renderNormalProposal = () => {
    const { currentVersion, versions } = this.state;
    const {
      addressDetails,
      daoInfo,
      history,
      match,
      proposalDetails,
      userProposalLike,
      userData,
      Translations,
    } = this.props;

    const proposal = proposalDetails.data;
    const { changedFundings } = proposal;

    const isProposer = addressDetails.data.address === proposal.proposer;
    const isForumAdmin = userData && userData.isForumAdmin;

    const proposalVersion = proposal.proposalVersions[currentVersion];
    const { dijixObject } = proposalVersion;

    const proposalLikes = userProposalLike.data;
    const liked = proposalLikes ? proposalLikes.liked : false;
    const likes = proposalLikes ? proposalLikes.likes : 0;
    const displayName = proposalLikes ? proposalLikes.user.displayName : '';
    const hasMoreDocs = proposalVersion.moreDocs.length > 0;

    const {
      data: {
        dashboard: { ProposalCard: cardTranslation },
        project,
      },
      data: translations,
    } = Translations;

    return (
      <ProposalsWrapper>
        <ProjectSummary>
          <ProposalVersionNav
            currentVersion={currentVersion}
            handlePreviousVersionClick={this.handlePreviousVersionClick}
            handleNextVersionClick={this.handleNextVersionClick}
            match={match}
            versions={versions}
            translations={translations}
          />
          {this.renderPrlAlert(proposal.prl)}
          {this.renderClaimApprovalAlert()}
          {this.renderProposerDidNotPassAlert()}

          <Header>
            <div>
              <Button kind="tag" showIcon data-digix="Proposal-Status">
                {proposal.stage}
              </Button>
              <Title primary data-digix="Proposal-Title">
                {dijixObject.title}
              </Title>
            </div>
            {!isForumAdmin && (
              <CallToAction>
                <ParticipantButtons
                  isProposer={isProposer}
                  proposal={proposalDetails}
                  addressDetails={addressDetails}
                  match={this.props.match}
                  history={history}
                  translations={translations}
                />
                <ModeratorButtons
                  proposal={proposalDetails}
                  addressDetails={addressDetails}
                  translations={translations}
                  history={history}
                />
              </CallToAction>
            )}
          </Header>

          <FundingInfo>
            <InfoItem column>
              <ItemTitle>{project.submittedBy}</ItemTitle>
              <Data>
                <span data-digix="Proposal-Author">{displayName}</span>
              </Data>
            </InfoItem>

            <InfoItem outlined>
              <ItemTitle>{project.milestones}</ItemTitle>
              <Data>
                <span data-digix="Milestone-Count">{dijixObject.milestones.length || 0}</span>
              </Data>
            </InfoItem>
            <ProposalFundings
              currentVersion={currentVersion}
              match={match}
              proposalDetails={proposal}
              translations={translations}
            />
            <InfoItem data-digix="Proposal-Like">
              <Like
                hasVoted={liked}
                likes={likes}
                translations={cardTranslation}
                disabled={!userData}
                onClick={liked ? this.handleUnlikeClick : this.handleLikeClick}
              />
            </InfoItem>
          </FundingInfo>
        </ProjectSummary>

        <VotingAccordion votingResults={this.getPastVotingResults()} translations={translations} />

        <VotingResult
          proposal={proposalDetails.data}
          draftVoting={proposalDetails.data.draftVoting}
          daoInfo={daoInfo}
          translations={translations}
        />

        <ProjectDetails project={dijixObject} translations={translations} />
        {hasMoreDocs && <AdditionalDocs translations={translations} proposal={proposalDetails} />}
        <Milestones
          milestones={dijixObject.milestones || []}
          milestoneFundings={proposalVersion.milestoneFundings || []}
          changedFundings={changedFundings ? changedFundings.milestones : undefined}
          fundingChanged={proposal.isFundingChanged}
          translations={translations}
        />
        <CommentThread
          proposalId={this.PROPOSAL_ID}
          uid={addressDetails.data.address}
          translations={translations}
        />
      </ProposalsWrapper>
    );
  };

  render() {
    const { proposalDetails, Translations } = this.props;
    if (
      proposalDetails.fetching === null ||
      proposalDetails.fetching ||
      !proposalDetails.data ||
      !Translations.data
    )
      return <div>Fetching Project Details</div>;

    if (proposalDetails.data.isSpecial) {
      return this.renderSpecialProposal();
    }
    return this.renderNormalProposal();
  }
}

const { object, func, string } = PropTypes;

Proposal.propTypes = {
  proposalDetails: object.isRequired,
  daoInfo: object.isRequired,
  subscribeToProposal: func.isRequired,
  getUserProposalLikeStatusAction: func.isRequired,
  clearDaoProposalDetailsAction: func.isRequired,
  getAddressDetailsAction: func.isRequired,
  likeProposalAction: func.isRequired,
  unlikeProposalAction: func.isRequired,
  addressDetails: object.isRequired,
  challengeProof: object,
  daoConfig: object.isRequired,
  userData: object,
  userProposalLike: object,
  location: object.isRequired,
  history: object.isRequired,
  match: object.isRequired,
  Translations: object.isRequired,
  getTranslationsAction: func.isRequired,
  Language: string,
};

Proposal.defaultProps = {
  challengeProof: undefined,
  userData: undefined,
  userProposalLike: undefined,
  Language: 'en',
};

export default withFetchUser(
  connect(
    ({
      infoServer: {
        ProposalDetails,
        AddressDetails,
        DaoConfig,
        DaoDetails: { data },
      },
      daoServer: { ChallengeProof, UserProposalLike, Translations },
      govUI: { Language },
    }) => ({
      proposalDetails: ProposalDetails,
      addressDetails: AddressDetails,
      challengeProof: ChallengeProof,
      daoInfo: data,
      daoConfig: DaoConfig,
      userProposalLike: UserProposalLike,
      Translations,
      Language,
    }),
    {
      getUserProposalLikeStatusAction: getUserProposalLikeStatus,
      getAddressDetailsAction: getAddressDetails,
      likeProposalAction: likeProposal,
      unlikeProposalAction: unlikeProposal,
      clearDaoProposalDetailsAction: clearDaoProposalDetails,
      getTranslationsAction: getTranslations,
    }
  )(withFetchProposal(Proposal))
);

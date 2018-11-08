import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import PreviousVersion from './previous';
import NextVersion from './next';

import ProjectDetails from './details';
import Milestones from './milestones';
import Button from '../../components/common/elements/buttons/index';
import Vote from '../../components/common/elements/vote/index';

import { getProposalDetails } from '../../reducers/info-server/actions';

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
  componentWillMount = () => {
    const {
      proposalDetails: { error, fetching },
      getProposalDetailsAction,
      location,
    } = this.props;

    if ((fetching === null || error) && location.pathname) {
      const path = location.pathname.split('/');
      const proposalId = path[2];
      if (proposalId) getProposalDetailsAction(proposalId);
    }
  };

  render() {
    const { proposalDetails } = this.props;
    if (proposalDetails.fething === null || proposalDetails.fething)
      return <div>Fetching Proposal Details</div>;

    if (!proposalDetails.data.proposalId) return <h1>Proposal Not Found</h1>;
    const proposalVersion =
      proposalDetails.data.proposalVersions[proposalDetails.data.proposalVersions.length - 1];
    const { dijixObject } = proposalVersion;
    return (
      <ProposalsWrapper>
        <ProjectSummary>
          <BrowseVersionHistory>
            <PreviousVersion />
            <div>2nd Version</div>
            <NextVersion />
          </BrowseVersionHistory>
          <Header>
            <div>
              <Button kind="flat" style={{ pointerEvents: 'none' }}>
                {proposalDetails.data.stage}
              </Button>
              <Title primary>{dijixObject.title}</Title>
            </div>
            <div>
              <Button kind="round" ghost primary style={{ pointerEvents: 'none' }}>
                Endorse
              </Button>
            </div>
          </Header>
          <LatestActivity>
            <SubmittedBy>
              Submitted By <span>{proposalDetails.data.proposer}</span>
            </SubmittedBy>
            <FundingStatus>
              Funding
              <span>
                {proposalVersion.totalFunding / 1e18}
                ETH
              </span>
            </FundingStatus>
            <MilestonesStatus>
              Milestones <span>{dijixObject.milestones.length || 0}</span>
            </MilestonesStatus>
            <Reward>
              Reward <span>{proposalVersion.finalReward / 1e18} ETH</span>
            </Reward>
            <UpvoteStatus>
              <Vote hasVoted />
            </UpvoteStatus>
          </LatestActivity>
        </ProjectSummary>
        <ProjectDetails details={proposalVersion} />
        <Milestones milestones={dijixObject.milestones || []} />
      </ProposalsWrapper>
    );
  }
}

const { object, func } = PropTypes;

Proposal.propTypes = {
  proposalDetails: object.isRequired,
  getProposalDetailsAction: func.isRequired,
  location: object.isRequired,
};

export default connect(
  ({ infoServer: { ProposalDetails } }) => ({
    proposalDetails: ProposalDetails,
  }),
  {
    getProposalDetailsAction: getProposalDetails,
  }
)(Proposal);

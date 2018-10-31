import React from 'react';
import PreviousVersion from './previous';
import NextVersion from './next';
import ProjectDetails from './details';
import Milestones from './milestones';
import Button from '../../components/common/elements/buttons/index';

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

const Proposal = () => (
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
            IDEA
          </Button>
          <Title primary>Tokenize Silver</Title>
        </div>
        <div>
          <Button kind="round" ghost primary style={{ pointerEvents: 'none' }}>
            Endorse
          </Button>
        </div>
      </Header>
      <LatestActivity>
        <SubmittedBy>
          Submitted By <span>0x54b5acA9790681fc0f83496E59a851B7F45bF9dc</span>
        </SubmittedBy>
        <FundingStatus>
          Funding <span>5 ETH</span>
        </FundingStatus>
        <MilestonesStatus>
          Milestones <span>2</span>
        </MilestonesStatus>
        <Reward>
          Reward <span>1 ETH</span>
        </Reward>
        <UpvoteStatus>Like</UpvoteStatus>
      </LatestActivity>
    </ProjectSummary>
    <ProjectDetails />
    <Milestones />
  </ProposalsWrapper>
);

export default Proposal;

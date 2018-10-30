import React from 'react';
import ProjectDetails from './details';
import Milestones from './milestones';
import Button from '../../components/common/elements/buttons/index';

import {
  ProposalsWrapper,
  ProjectSummary,
  Header,
  ProposalTitle,
  LatestActivity,
  SubmittedBy,
  FundingStatus,
  MilestonesStatus,
  UpvoteStatus,
} from './style';

const Proposal = () => (
  <ProposalsWrapper>
    <ProjectSummary>
      <Header>
        <div>
          <Button kind="flat" style={{ pointerEvents: 'none' }}>
            IDEA
          </Button>
          <ProposalTitle primary>Tokenize Silver</ProposalTitle>
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
        <UpvoteStatus>Like</UpvoteStatus>
      </LatestActivity>
    </ProjectSummary>
    <ProjectDetails />
    <Milestones />
  </ProposalsWrapper>
);

export default Proposal;

import React from 'react';

// import ProjectDetails from '../details';
// import Milestones from '../milestones';
import { Button, Vote } from '../../../components/common/elements/index';

import {
  ProposalsWrapper,
  ProjectSummary,
  Header,
  Title,
  LatestActivity,
  SubmittedBy,
  FundingStatus,
  MilestonesStatus,
  Reward,
  UpvoteStatus,
} from '../style';

class Draft extends React.Component {
  render() {
    return (
      <ProposalsWrapper>
        <Button primary ghost>
          Continue Editing
        </Button>
        <ProjectSummary>
          <Header>
            <div>
              <Button kind="tag" icon>
                Draft
              </Button>
              <Title primary>Title</Title>
            </div>
          </Header>
          <LatestActivity>
            <SubmittedBy>
              Submitted By <span>proposer</span>
            </SubmittedBy>
            <FundingStatus>
              Funding
              <span>123 ETH</span>
            </FundingStatus>
            <MilestonesStatus>
              Milestones <span>123</span>
            </MilestonesStatus>
            <Reward>
              Reward <span>123</span>
            </Reward>
            <UpvoteStatus>
              <Vote hasVoted />
            </UpvoteStatus>
          </LatestActivity>
        </ProjectSummary>
        {/* <ProjectDetails /> */}
        {/* <Milestones /> */}
      </ProposalsWrapper>
    );
  }
}

export default Draft;

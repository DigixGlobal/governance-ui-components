import React from 'react';
import PropTypes from 'prop-types';
import ProjectDetails from '../details';
import Milestones from '../milestones';
import { Button } from '../../../components/common/elements/index';

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
} from '../style';

class Preview extends React.Component {
  render() {
    const { form, proposer } = this.props;
    if (!form) return null;

    return (
      <ProposalsWrapper>
        <Button primary ghost onClick={this.props.onContinueEditing}>
          Continue Editing
        </Button>
        <ProjectSummary>
          <Header>
            <div>
              <Button kind="flat" style={{ pointerEvents: 'none' }}>
                IDEA
              </Button>
              <Title primary>{form.title}</Title>
            </div>
          </Header>
          <LatestActivity>
            <SubmittedBy>
              Submitted By <span>{proposer}</span>
            </SubmittedBy>
            <FundingStatus>
              Funding
              <span>{form.finalReward} ETH</span>
            </FundingStatus>
            <MilestonesStatus>
              Milestones <span>{form.milestones.length}</span>
            </MilestonesStatus>
            <Reward>
              Reward <span>{form.finalReward}</span>
            </Reward>
          </LatestActivity>
        </ProjectSummary>
        <ProjectDetails project={form} preview />
        <Milestones milestones={form.milestones || []} />
      </ProposalsWrapper>
    );
  }
}

const { object, func } = PropTypes;

Preview.propTypes = {
  form: object.isRequired,
  onContinueEditing: func.isRequired,
  proposer: object.isRequired,
};

export default Preview;

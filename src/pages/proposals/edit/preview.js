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

const getTotalFunds = source => {
  const sum = source.reduce((acc, currentValue) => Number(acc) + Number(currentValue.fund), 0);

  return sum;
};

class Preview extends React.Component {
  render() {
    const { form, proposer } = this.props;
    if (!form) return null;
    const totalFunding = form.milestones ? getTotalFunds(form.milestones) : 0;
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
              <span>{totalFunding} ETH</span>
            </FundingStatus>
            <MilestonesStatus>
              Milestones <span>{form.milestones ? form.milestones.length : 0}</span>
            </MilestonesStatus>
            <Reward>
              Reward <span>{form.finalReward / 1e18}</span>
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

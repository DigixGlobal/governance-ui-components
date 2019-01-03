import React from 'react';
import PropTypes from 'prop-types';
import { truncateNumber } from '@digix/gov-ui/utils/helpers';
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

const getTotalFunds = source =>
  source.reduce((acc, currentValue) => Number(acc) + Number(currentValue.fund), 0);

class Preview extends React.Component {
  render() {
    const { form, onContinueEditing, proposer } = this.props;
    if (!form) {
      return null;
    }

    const totalFunding = form.milestones ? getTotalFunds(form.milestones) : 0;
    const funding = truncateNumber(totalFunding);
    const reward = truncateNumber(form.finalReward);

    return (
      <ProposalsWrapper>
        <Button primary ghost onClick={onContinueEditing}>
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
              <span>{funding} ETH</span>
            </FundingStatus>
            <MilestonesStatus>
              Milestones <span>{form.milestones ? form.milestones.length : 0}</span>
            </MilestonesStatus>
            <Reward>
              Reward
              <span>{reward} ETH</span>
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

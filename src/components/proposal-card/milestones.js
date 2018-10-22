import React from 'react';
import PropTypes from 'prop-types';

import {
  MilestonesWrapper,
  Milestones,
  MilestoneStatus,
  Deadline,
  Label,
  Data,
  CallToAction,
} from './style';
import Button from '../common/elements/buttons/index';

const determineDeadline = proposal => {
  let deadline = Date.now();
  switch (proposal.stage.toLowerCase()) {
    case 'draft':
      deadline = proposal.votingRounds[0].votingDeadline;
      break;
    case 'proposal':
      if (Date.now() < proposal.votingRounds[0].commitDeadline) {
        deadline = proposal.votingRounds[0].commitDeadline;
      }
      deadline = proposal.votingRounds[0].revealDeadline;
      break;
    case 'ongoing':
      return undefined;

    case 'review':
      if (Date.now() < proposal.votingRounds[proposal.currentMilestone + 1].commitDeadline) {
        deadline = proposal.votingRounds[proposal.currentMilestone + 1].commitDeadline;
      }
      deadline = proposal.votingRounds[proposal.currentMilestone + 1].revealDeadline;
      return;
    default:
      deadline = proposal.votingRounds[0].commitDeadline;
      break;
  }

  if (deadline) return new Intl.DateTimeFormat('en-US').format(deadline * 1000);

  return deadline;
};
export default class ProposalCardMilestone extends React.Component {
  render() {
    const { details } = this.props;
    const { currentMilestone } = details;
    const mileStones = Object.keys(currentMilestone);
    return (
      <MilestonesWrapper>
        <Milestones>
          <MilestoneStatus>
            {mileStones.length > 0 && <Label>Milestones Completed</Label>}

            <ul>{mileStones && mileStones.map(milestone => <li key={milestone} />)}</ul>
          </MilestoneStatus>
          <Deadline>
            <Label>Voting Deadline</Label>
            <Data>{determineDeadline(details)}</Data>
          </Deadline>
          <CallToAction>
            <Button primary ghost disabled>
              Participate
            </Button>
          </CallToAction>
        </Milestones>
      </MilestonesWrapper>
    );
  }
}

ProposalCardMilestone.propTypes = {
  details: PropTypes.object.isRequired,
};

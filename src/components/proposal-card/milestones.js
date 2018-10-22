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

const disableParticipateWhen = (proposal, user) => {
  if (!proposal || !user) return true;
  switch (proposal.stage.toLowerCase()) {
    case 'idea':
      return true;
    case 'draft' && user.data.isModerator:
      return false;
    case 'proposal' && user.data.isParticipant:
      return false;
    case 'ongoing':
      return true;
    case 'review' && user.data.isParticipant:
      return false;
    case 'archived':
      return true;
    default:
      return false;
  }
};
export default class ProposalCardMilestone extends React.Component {
  render() {
    const { details, userDetails } = this.props;
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
            <Button
              kind="round"
              primary
              ghost
              disabled={() => disableParticipateWhen(details, userDetails)}
            >
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
  userDetails: PropTypes.object.isRequired,
};

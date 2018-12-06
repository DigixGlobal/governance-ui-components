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
import { Button } from '../common/elements/index';

const determineDeadline = proposal => {
  let deadline = Date.now();
  const mileStone = proposal.currentMilestone + 1; // > 0 ? proposal.currentMilestone : 0;

  switch (proposal.stage.toLowerCase()) {
    case 'draft':
      if (proposal.votingStage === 'draftVoting' && proposal.draftVoting !== null) {
        deadline = proposal.draftVoting.votingDeadline;
      } else {
        return undefined;
      }
      break;
    case 'proposal':
      if (Date.now() < proposal.votingRounds[0].commitDeadline) {
        deadline = proposal.votingRounds[0].commitDeadline || undefined;
      }
      deadline = proposal.votingRounds[0].revealDeadline;
      break;
    case 'ongoing':
      return undefined;

    case 'review':
      if (Date.now() < proposal.votingRounds[mileStone].commitDeadline) {
        deadline = proposal.votingRounds[mileStone].commitDeadline || undefined;
      }
      deadline = proposal.votingRounds[mileStone].revealDeadline;
      break;
    default:
      deadline = proposal.votingRounds ? proposal.votingRounds[0].commitDeadline : undefined;
      break;
  }

  if (deadline) return new Intl.DateTimeFormat('en-US').format(deadline * 1000);
  // console.log(moment(new Date(deadline * 1000)).format('MM/DD/YYYY'));
  return deadline;
};

const disableParticipateWhen = (proposal, user) => {
  switch (proposal.stage.toLowerCase()) {
    case 'idea':
      return true;
    case 'draft':
      return !user.data.isModerator;
    case 'proposal':
      return !user.data.isParticipant;
    case 'ongoing':
      return true;
    case 'review':
      return !user.data.isParticipant;
    case 'archived':
      return true;
    default:
      return true;
  }
};
export default class ProposalCardMilestone extends React.Component {
  redirectToProposalPage = () => {
    const { details, history } = this.props;
    history.push(`/proposals/${details.proposalId}`);
  };

  render() {
    const { details, userDetails } = this.props;
    const { currentMilestone } = details;
    const mileStones = Object.keys(currentMilestone);
    const disabledParticipate = disableParticipateWhen(details, userDetails);
    return (
      <MilestonesWrapper>
        <Milestones>
          <MilestoneStatus>
            <Label>Milestones</Label>
            <ul>{mileStones && mileStones.map(milestone => <li key={milestone} />)}</ul>
          </MilestoneStatus>
          <Deadline>
            <Label>Voting Deadline</Label>
            <Data>{determineDeadline(details) || 'N/A'} </Data>
          </Deadline>
          <CallToAction onClick={this.redirectToProposalPage}>
            <Button kind="round" primary ghost disabled={disabledParticipate}>
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
  history: PropTypes.object.isRequired,
  userDetails: PropTypes.object.isRequired,
};

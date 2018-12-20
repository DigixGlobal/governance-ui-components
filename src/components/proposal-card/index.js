import React from 'react';
import PropTypes from 'prop-types';
import Proposal from './proposal';
import Milestones from './milestones';
import Stats from './stats';

import { ProposalWrapper, ProposalContainer } from './style';

export default class ProposalCard extends React.Component {
  render() {
    const { history, proposal, userDetails, liked } = this.props;
    const currentTime = Date.now();
    const { currentVotingRound } = proposal;
    const withinDeadline =
      currentVotingRound > -1
        ? proposal.votingRounds[currentVotingRound].commitDeadline * 1000 < currentTime &&
          currentTime < proposal.votingRounds[currentVotingRound].revealDeadline * 1000
        : false;
    const votingStage = withinDeadline ? 'reveal' : proposal.votingStage;
    return (
      <ProposalWrapper>
        <ProposalContainer>
          <Proposal details={proposal} userDetails={userDetails} liked={liked} />
          <Stats details={proposal} votingStage={votingStage} />
          <Milestones details={proposal} history={history} userDetails={userDetails} />
        </ProposalContainer>
      </ProposalWrapper>
    );
  }
}

const { object, bool } = PropTypes;
ProposalCard.propTypes = {
  history: object.isRequired,
  proposal: object.isRequired,
  userDetails: object.isRequired,
  liked: bool,
};

ProposalCard.defaultProps = {
  liked: false,
};

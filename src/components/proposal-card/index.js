import React from 'react';
import PropTypes from 'prop-types';
import Proposal from './proposal';
import Milestones from './milestones';
import Stats from './stats';

import { ProposalWrapper, ProposalContainer } from './style';

export default class ProposalCard extends React.Component {
  render() {
    const { history, proposal, userDetails, liked, likes, displayName, translations } = this.props;
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
          <Proposal
            displayName={displayName}
            details={proposal}
            title={proposal.title}
            userDetails={userDetails}
            liked={liked}
            likes={likes}
            translations={translations}
          />
          <Stats details={proposal} votingStage={votingStage} translations={translations} />
          <Milestones
            details={proposal}
            history={history}
            userDetails={userDetails}
            translations={translations}
          />
        </ProposalContainer>
      </ProposalWrapper>
    );
  }
}

const { object, bool, number, string } = PropTypes;
ProposalCard.propTypes = {
  history: object.isRequired,
  proposal: object.isRequired,
  userDetails: object.isRequired,
  translations: object.isRequired,
  displayName: string,
  liked: bool,
  likes: number,
};

ProposalCard.defaultProps = {
  liked: false,
  likes: undefined,
  displayName: '',
};

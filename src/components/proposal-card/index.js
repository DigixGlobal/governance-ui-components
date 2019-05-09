import React from 'react';
import PropTypes from 'prop-types';
import Proposal from '@digix/gov-ui/components/proposal-card/proposal';
import Stats from '@digix/gov-ui/components/proposal-card/stats';

import { Container, Item } from '@digix/gov-ui/components/proposal-card/style';

export default class ProposalCard extends React.Component {
  render() {
    const { history, proposal, userDetails, liked, likes, displayName, translations } = this.props;
    const { currentVotingRound, votingRounds } = proposal;

    const currentTime = Date.now() / 1000;
    const hasCurrentVotingRound = currentVotingRound && currentVotingRound > -1;
    const votingRound = hasCurrentVotingRound ? votingRounds[currentVotingRound] : null;

    let withinDeadline = false;
    if (votingRound) {
      const { commitDeadline, revealDeadline } = votingRound;
      withinDeadline = commitDeadline < currentTime && currentTime < revealDeadline;
    }

    const votingStage = withinDeadline ? 'reveal' : proposal.votingStage;
    return (
      <Container data-digix="Proposal-Card">
        <Item>
          <Proposal
            displayName={displayName}
            details={proposal}
            history={history}
            title={proposal.title}
            userDetails={userDetails}
            liked={liked}
            likes={likes}
            translations={translations}
          />
          <Stats details={proposal} votingStage={votingStage} translations={translations} />
        </Item>
      </Container>
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

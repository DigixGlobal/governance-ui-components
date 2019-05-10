import React from 'react';
import PropTypes from 'prop-types';
import Proposal from '@digix/gov-ui/components/proposal-card/proposal';
import Stats from '@digix/gov-ui/components/proposal-card/stats';

import { Container, Item } from '@digix/gov-ui/components/proposal-card/style';

export default class ProposalCard extends React.Component {
  render() {
    const {
      displayName,
      history,
      isLiked,
      likeCount,
      likeProposal,
      proposal,
      translations,
    } = this.props;
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
            isLiked={isLiked}
            likeCount={likeCount}
            translations={translations}
            likeProposal={likeProposal}
          />
          <Stats details={proposal} votingStage={votingStage} translations={translations} />
        </Item>
      </Container>
    );
  }
}

const { bool, func, number, object, oneOfType, string } = PropTypes;
ProposalCard.propTypes = {
  displayName: oneOfType([object, string]),
  history: object.isRequired,
  isLiked: bool,
  likeCount: number,
  likeProposal: func.isRequired,
  proposal: object.isRequired,
  translations: object.isRequired,
};

ProposalCard.defaultProps = {
  displayName: '',
  isLiked: false,
  likeCount: 0,
};

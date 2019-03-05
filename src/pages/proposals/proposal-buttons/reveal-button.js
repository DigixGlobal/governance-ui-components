import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Button from '@digix/gov-ui/components/common/elements/buttons/index';
import RevealVoteOverlay from '@digix/gov-ui/components/common/blocks/overlay/vote/reveal';
import web3Connect from 'spectrum-lightsuite/src/helpers/web3/connect';
import { showRightPanel } from '@digix/gov-ui/reducers/gov-ui/actions';
import { VotingStages } from '@digix/gov-ui/constants';

class RevealVoteButton extends React.PureComponent {
  showOverlay = () => {
    const { history, proposalId, showRightPanelAction, proposal } = this.props;
    showRightPanelAction({
      component: (
        <RevealVoteOverlay history={history} proposalId={proposalId} proposal={proposal} />
      ),
      show: true,
    });
  };

  render() {
    const {
      isParticipant,
      proposal,
      proposal: { currentVotingRound },
      votes,
    } = this.props;
    const vote = votes[proposal.proposalId];
    const votingRound = vote ? vote.votingRound[currentVotingRound] : undefined;
    const hasRevealed = votingRound ? votingRound.reveal : false;
    if (
      !isParticipant ||
      !proposal.draftVoting ||
      proposal.votingStage !== VotingStages.commit ||
      hasRevealed
    ) {
      return null;
    }

    const currentTime = Date.now();

    const withinDeadline =
      proposal.votingRounds[currentVotingRound].commitDeadline * 1000 < currentTime &&
      currentTime < proposal.votingRounds[currentVotingRound].revealDeadline * 1000;
    if (!withinDeadline) return null;
    return (
      <Button kind="round" large onClick={this.showOverlay} data-digix="Proposal-Reveal-Vote">
        Reveal Vote
      </Button>
    );
  }
}

const { bool, func, object, string } = PropTypes;

RevealVoteButton.propTypes = {
  isParticipant: bool,
  proposal: object.isRequired,
  proposalId: string.isRequired,
  history: object.isRequired,
  votes: object,
  showRightPanelAction: func.isRequired,
};

RevealVoteButton.defaultProps = {
  isParticipant: false,
  votes: undefined,
};

const mapStateToProps = state => ({
  addressDetails: state.infoServer.AddressDetails,
});

export default web3Connect(
  connect(
    mapStateToProps,
    {
      showRightPanelAction: showRightPanel,
    }
  )(RevealVoteButton)
);

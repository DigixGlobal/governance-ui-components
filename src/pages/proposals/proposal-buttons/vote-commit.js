import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Button from '@digix/gov-ui/components/common/elements/buttons/index';
import CommitVoteOverlay from '@digix/gov-ui/components/common/blocks/overlay/vote/commit';
import web3Connect from 'spectrum-lightsuite/src/helpers/web3/connect';
import { showRightPanel } from '@digix/gov-ui/reducers/gov-ui/actions';
import { VotingStages } from '@digix/gov-ui/constants';

class CommitVoteButton extends React.PureComponent {
  showOverlay = () => {
    const { history, proposalId, showRightPanelAction, proposal } = this.props;
    showRightPanelAction({
      component: (
        <CommitVoteOverlay history={history} proposalId={proposalId} proposal={proposal} />
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
    const hasVoted = vote ? vote.votingRound[currentVotingRound].commit : false;
    if (
      !isParticipant ||
      !proposal.draftVoting ||
      proposal.votingStage !== VotingStages.commit ||
      hasVoted
    ) {
      return null;
    }

    const currentTime = Date.now();
    const withinDeadline =
      currentTime < proposal.votingRounds[currentVotingRound].commitDeadline * 1000;
    if (!withinDeadline) return null;

    return (
      <Button kind="round" ghost primary onClick={this.showOverlay}>
        Vote
      </Button>
    );
  }
}

const { bool, func, object, string } = PropTypes;

CommitVoteButton.propTypes = {
  isParticipant: bool,
  proposal: object.isRequired,
  proposalId: string.isRequired,
  history: object.isRequired,
  showRightPanelAction: func.isRequired,
  votes: object,
};

CommitVoteButton.defaultProps = {
  isParticipant: false,
  votes: undefined,
};

const mapStateToProps = () => ({});

export default web3Connect(
  connect(
    mapStateToProps,
    {
      showRightPanelAction: showRightPanel,
    }
  )(CommitVoteButton)
);

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Button from '@digix/gov-ui/components/common/elements/buttons/index';
import LogRevealVote from '@digix/gov-ui/analytics/revealVote';
import RevealVoteOverlay from '@digix/gov-ui/components/common/blocks/overlay/vote/reveal';
import web3Connect from 'spectrum-lightsuite/src/helpers/web3/connect';
import { getUserStatus } from '@digix/gov-ui/utils/helpers';
import { showRightPanel } from '@digix/gov-ui/reducers/gov-ui/actions';
import { UserStatus, VotingStages } from '@digix/gov-ui/constants';

class RevealVoteButton extends React.PureComponent {
  showOverlay = () => {
    const {
      AddressDetails,
      history,
      proposalId,
      showRightPanelAction,
      proposal,
      translations,
      txnTranslations,
    } = this.props;

    const userType = getUserStatus(AddressDetails.data, UserStatus);
    LogRevealVote.initiate(userType);

    showRightPanelAction({
      component: (
        <RevealVoteOverlay
          history={history}
          proposalId={proposalId}
          proposal={proposal}
          translations={translations}
          txnTranslations={txnTranslations}
        />
      ),
      show: true,
    });
  };

  render() {
    const {
      checkProposalRequirements,
      isParticipant,
      proposal,
      proposal: { currentVotingRound, isSpecial, isActive },
      votes,
      translations: { buttons },
    } = this.props;

    const vote = votes ? votes[proposal.proposalId] : undefined;
    const votingRound = vote ? vote.votingRound[currentVotingRound || 0] : undefined;
    const hasVoted = votingRound ? votingRound.commit : false;
    const hasRevealed = votingRound ? votingRound.reveal : false;
    if (
      !isParticipant ||
      (!proposal.draftVoting && !isSpecial) ||
      (!isActive && isSpecial) ||
      (proposal.votingStage !== VotingStages.commit && !isSpecial) ||
      hasRevealed ||
      !hasVoted
    ) {
      return null;
    }

    const currentTime = Date.now();

    const withinDeadline =
      proposal.votingRounds[isSpecial ? 0 : currentVotingRound].commitDeadline * 1000 <
        currentTime &&
      currentTime < proposal.votingRounds[isSpecial ? 0 : currentVotingRound].revealDeadline * 1000;
    if (!withinDeadline) return null;
    return (
      <Button
        kind="round"
        large
        onClick={() => checkProposalRequirements(this.showOverlay, undefined, true)}
        data-digix="Proposal-Reveal-Vote"
      >
        {buttons.revealVote}
      </Button>
    );
  }
}

const { bool, func, object, string } = PropTypes;

RevealVoteButton.propTypes = {
  AddressDetails: object.isRequired,
  checkProposalRequirements: func.isRequired,
  isParticipant: bool,
  proposal: object.isRequired,
  proposalId: string.isRequired,
  history: object.isRequired,
  votes: object,
  showRightPanelAction: func.isRequired,
  translations: object.isRequired,
  txnTranslations: object.isRequired,
};

RevealVoteButton.defaultProps = {
  isParticipant: false,
  votes: undefined,
};

const mapStateToProps = state => ({
  AddressDetails: state.infoServer.AddressDetails,
});

export default web3Connect(
  connect(
    mapStateToProps,
    {
      showRightPanelAction: showRightPanel,
    }
  )(RevealVoteButton)
);

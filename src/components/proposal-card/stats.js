import React from 'react';
import PropTypes from 'prop-types';

import { toBigNumber, parseBigNumber } from 'spectrum-lightsuite/src/helpers/stringUtils';

import { StatsWrapper, Stats, StatItem } from '@digix/gov-ui/components/proposal-card/style';
import { VotingStages } from '@digix/gov-ui/constants';
import { truncateNumber } from '@digix/gov-ui/utils/helpers';

export default class ProposalCardStats extends React.Component {
  getStats = proposal => {
    let approvalRating = 0;
    switch (proposal.votingStage) {
      case VotingStages.draftVoting: {
        if (proposal.currentVotingRound === -1) {
          approvalRating =
            parseBigNumber(proposal.draftVoting.yes, 0, false) > 0
              ? parseBigNumber(
                  toBigNumber(proposal.draftVoting.yes)
                    .div(toBigNumber(proposal.draftVoting.totalVoterStake))
                    .times(100),
                  0,
                  false
                )
              : 0;
        }
        return {
          approvalRating,
          participantCount: proposal.draftVoting ? proposal.draftVoting.totalVoterCount : 0,
        };
      }
      case VotingStages.commit:
      case VotingStages.reveal: {
        const { currentVotingRound } = proposal;
        approvalRating =
          parseBigNumber(proposal.votingRounds[currentVotingRound].yes, 0, false) > 0
            ? parseBigNumber(
                toBigNumber(proposal.votingRounds[currentVotingRound].yes)
                  .div(toBigNumber(proposal.votingRounds[currentVotingRound].totalVoterStake))
                  .times(100),
                0,
                false
              )
            : 0;
        return {
          approvalRating,
          participantCount: proposal.votingRounds[currentVotingRound].totalVoterCount || 0,
        };
      }
      default:
        return { approvalRating: 0, participantCount: 0 };
    }
  };
  render() {
    const { details, votingStage } = this.props;
    if (!details) {
      return null;
    }

    // const { draftVoting } = details;

    // let approvalRating = 0;
    // if (draftVoting) {
    //   const totalVotes = parseBigNumber(draftVoting.totalVoterStake, 0, false);
    //   if (totalVotes) {
    //     const votedYes = parseBigNumber(draftVoting.yes, 0, false);
    //     approvalRating = ((votedYes * 100) / totalVotes).toFixed(2);
    //   }
    // }

    const { approvalRating, participantCount } = this.getStats(details);
    let funding = details.proposalVersions[0].totalFunding / 1e18;
    funding = truncateNumber(funding);

    return (
      <StatsWrapper>
        <Stats>
          <StatItem>
            Funding
            <span>{funding}</span>
            <span>ETH</span>
          </StatItem>
          <StatItem stage={details.stage} votingStage={votingStage}>
            Approval
            <span>{approvalRating}%</span>
          </StatItem>
          <StatItem stage={details.stage} votingStage={votingStage}>
            Participants
            <span>{participantCount}</span>
          </StatItem>
        </Stats>
      </StatsWrapper>
    );
  }
}
ProposalCardStats.propTypes = {
  details: PropTypes.object.isRequired,
  votingStage: PropTypes.string,
};

ProposalCardStats.defaultProps = {
  votingStage: undefined,
};

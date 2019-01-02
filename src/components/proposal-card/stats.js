import React from 'react';
import PropTypes from 'prop-types';

import { toBigNumber, parseBigNumber } from 'spectrum-lightsuite/src/helpers/stringUtils';

import { StatsWrapper, Stats, StatItem } from '@digix/gov-ui/components/proposal-card/style';
import { VotingStages } from '@digix/gov-ui/constants';
import { formatPercentage, truncateNumber } from '@digix/gov-ui/utils/helpers';

export default class ProposalCardStats extends React.Component {
  getVotingRoundDetails = proposal => {
    const { votingStage } = this.props;
    const { currentVotingRound, draftVoting, votingRounds } = proposal;

    switch (votingStage) {
      case VotingStages.draft:
        if (currentVotingRound === -1) {
          return draftVoting;
        }

        break;
      case VotingStages.commit:
      case VotingStages.reveal:
        return votingRounds[currentVotingRound];
      default:
        return null;
    }
  };

  getStats = proposal => {
    const votingRoundDetails = this.getVotingRoundDetails(proposal);
    let approvalRating = 0;
    let participantCount = 0;

    if (votingRoundDetails) {
      const approval = toBigNumber(votingRoundDetails.yes);
      const totalStake = toBigNumber(votingRoundDetails.totalVoterStake);

      approvalRating = totalStake > 0 ? approval.div(totalStake) : 0;
      approvalRating = parseBigNumber(approvalRating, 0, false);
      participantCount = votingRoundDetails.totalVoterCount || 0;
    }

    return {
      approvalRating: formatPercentage(approvalRating),
      participantCount,
    };
  };

  render() {
    const { details, votingStage } = this.props;
    if (!details) {
      return null;
    }
    const { approvalRating, participantCount } = this.getStats(details);
    let funding = details.proposalVersions[0].totalFunding / 1e18;
    funding = truncateNumber(funding);

    return (
      <StatsWrapper>
        <Stats>
          <StatItem>
            Funding
            <span>{funding} ETH</span>
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

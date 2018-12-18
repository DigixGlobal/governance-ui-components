import React from 'react';
import PropTypes from 'prop-types';

import { StatsWrapper, Stats, StatItem } from '@digix/gov-ui/components/proposal-card/style';
import { parseBigNumber } from 'spectrum-lightsuite/src/helpers/stringUtils';

export default class ProposalCardStats extends React.Component {
  render() {
    const { details } = this.props;
    if (!details) {
      return null;
    }

    const { draftVoting } = details;

    let approvalRating = 0;
    if (draftVoting) {
      const totalVotes = parseBigNumber(draftVoting.totalVoterStake, 0, false);
      if (totalVotes) {
        const votedYes = parseBigNumber(draftVoting.yes, 0, false);
        approvalRating = ((votedYes * 100) / totalVotes).toFixed(2);
      }
    }

    const participantCount = draftVoting ? draftVoting.totalVoterCount : 0;
    let funding = details.proposalVersions[0].totalFunding / 1e18;
    if (funding % 1 !== 0) {
      funding = funding.toFixed(3);
    }

    return (
      <StatsWrapper>
        <Stats>
          <StatItem>
            Funding
            <span>{funding}</span>
            <span>ETH</span>
          </StatItem>
          <StatItem stage={details.stage}>
            Approval
            <span>{approvalRating}%</span>
          </StatItem>
          <StatItem>
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
};

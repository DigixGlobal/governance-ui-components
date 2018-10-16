import React from 'react';
import PropTypes from 'prop-types';

import { StatsWrapper, Stats, StatItem } from './style';

export default class ProposalCardStats extends React.Component {
  render() {
    const { details } = this.props;
    return (
      <StatsWrapper>
        <Stats>
          <StatItem>
            funding amount
            <span>{details.proposalVersions[0].totalFunding / 1e18} eth</span>
          </StatItem>
          <StatItem>
            upvote
            <span>68%</span>
          </StatItem>
          <StatItem>
            participants
            <span>{details.votingRounds[0].totalVoterCount}</span>
          </StatItem>
        </Stats>
      </StatsWrapper>
    );
  }
}
ProposalCardStats.propTypes = {
  details: PropTypes.object.isRequired,
};

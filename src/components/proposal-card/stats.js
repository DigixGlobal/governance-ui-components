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
            Funding
            <span>{details.proposalVersions[0].totalFunding / 1e18} eth</span>
          </StatItem>
          <StatItem>
            Approval
            <span>2%</span>
          </StatItem>
          <StatItem>
            Participants
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

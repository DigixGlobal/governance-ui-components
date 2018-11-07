import React from 'react';
import PropTypes from 'prop-types';

import { StatsWrapper, Stats, StatItem } from './style';

// import { ProposalStages } from '../../utils/constants';

export default class ProposalCardStats extends React.Component {
  render() {
    const { details } = this.props;
    if (!details) return null;
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
            <span>{details.votingRounds ? details.votingRounds[0].totalVoterCount : 0}</span>
          </StatItem>
        </Stats>
      </StatsWrapper>
    );
  }
}
ProposalCardStats.propTypes = {
  details: PropTypes.object.isRequired,
};

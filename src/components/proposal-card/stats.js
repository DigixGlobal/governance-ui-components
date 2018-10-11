import React from 'react';
// import PropTypes from 'prop-types';

import { StatsWrapper, Stats, StatItem } from './style';

export default class ProposalCard extends React.Component {
  render() {
    return (
      <StatsWrapper>
        <Stats>
          <StatItem>
            Funding
            <span>150 eth</span>
          </StatItem>
          <StatItem>
            Approval
            <span>2%</span>
          </StatItem>
          <StatItem>
            Participants
            <span>8</span>
          </StatItem>
        </Stats>
      </StatsWrapper>
    );
  }
}

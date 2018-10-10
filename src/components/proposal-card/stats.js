import React from 'react';
// import PropTypes from 'prop-types';

import { StatsWrapper, Stats, StatItem } from './style';

export default class ProposalCard extends React.Component {
  render() {
    return (
      <StatsWrapper>
        <Stats>
          <StatItem>
            funding amount
            <span>150 eth</span>
          </StatItem>
          <StatItem>
            upvote
            <span>68%</span>
          </StatItem>
          <StatItem>
            participants
            <span>111</span>
          </StatItem>
        </Stats>
      </StatsWrapper>
    );
  }
}

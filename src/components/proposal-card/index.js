import React from 'react';
// import PropTypes from 'prop-types';
import Proposals from './proposals';

import {
  ProposalWrapper,
  ProposalContainer,
  Stats,
  Milestones,
  ProgressContainer,
  Progress,
  StatItem,
} from './style';

export default class ProposalCard extends React.Component {
  render() {
    return (
      <ProposalWrapper>
        <ProposalContainer>
          <Proposals />
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
          <Milestones>asasd</Milestones>
        </ProposalContainer>
        <ProgressContainer>
          <Progress />
        </ProgressContainer>
      </ProposalWrapper>
    );
  }
}

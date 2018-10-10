import React from 'react';
// import PropTypes from 'prop-types';
import Proposals from './proposals';
import Milestones from './milestones';
import Stats from './stats';

import { ProposalWrapper, ProposalContainer, ProgressContainer, Progress } from './style';

export default class ProposalCard extends React.Component {
  render() {
    return (
      <ProposalWrapper>
        <ProposalContainer>
          <Proposals />
          <Stats />
          <Milestones />
        </ProposalContainer>
        <ProgressContainer>
          <Progress />
        </ProgressContainer>
      </ProposalWrapper>
    );
  }
}

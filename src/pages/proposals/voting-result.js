import React from 'react';
import {
  VotingResultWrapper,
  QuorumContainer,
  QuorumBar,
  QuorumLabel,
  QuorumMinLabel,
  QuorumStatus,
  ApprovalRate,
} from './style';

export default class VotingResult extends React.Component {
  render() {
    return (
      <VotingResultWrapper>
        <QuorumContainer>
          <QuorumBar>
            <QuorumLabel>Quorum</QuorumLabel>
            <QuorumMinLabel>Minimum Quorum Needed: 45%</QuorumMinLabel>
            <QuorumStatus />
          </QuorumBar>
        </QuorumContainer>
        <ApprovalRate>asdasdasd</ApprovalRate>
      </VotingResultWrapper>
    );
  }
}

import React from 'react';
import Countdown from 'react-countdown-now';

import ProgressBar from '@digix/gov-ui/components/common/blocks/progress-bar';

import {
  VotingResultWrapper,
  VotingResultContainer,
  ProgressCol,
  QuorumLabel,
  QuorumMinLabel,
  Label,
  QuorumInfoCol,
  ApprovalLabel,
  ApprovalMinLabel,
} from './style';

// eslint-disable-next-line
const countdownRenderer = ({ days, hours, minutes, seconds, completed }) => {
  if (completed) {
    // Render a completed state
    return `Voting is over!`;
  }
  // Render a countdown
  return <span>{`${days}D:${hours}H:${minutes}M:${seconds}S`}</span>;
};
export default class VotingResult extends React.Component {
  render() {
    return (
      <VotingResultWrapper>
        <VotingResultContainer>
          <ProgressCol>
            <Label>
              <QuorumLabel>Quorum</QuorumLabel>
              <QuorumMinLabel>
                <span>Minimum Quorum Needed: 45%</span>
              </QuorumMinLabel>
            </Label>
            <div>
              <ProgressBar variant="determinate" />
            </div>
          </ProgressCol>
          <QuorumInfoCol>
            1480000 DGD <span>|</span>{' '}
            <Countdown date={Date.now() + 800000 * 1000} renderer={countdownRenderer} />,
          </QuorumInfoCol>
        </VotingResultContainer>
        <VotingResultContainer>
          <ProgressCol>
            <Label>
              <ApprovalLabel>Current Approval Rate</ApprovalLabel>
              <ApprovalMinLabel>
                <span>Minimum Approval Needed: 65%</span>
              </ApprovalMinLabel>
            </Label>
            <div>
              <ProgressBar variant="determinate" />
            </div>
          </ProgressCol>
          <QuorumInfoCol>
            YES: 940000 DGD <span>|</span> NO: 540000 DGD
          </QuorumInfoCol>
        </VotingResultContainer>
      </VotingResultWrapper>
    );
  }
}

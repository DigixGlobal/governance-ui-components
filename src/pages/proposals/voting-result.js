import React from 'react';
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
            1480000 DGD <span>|</span> 4D: 12H:34M:12S
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

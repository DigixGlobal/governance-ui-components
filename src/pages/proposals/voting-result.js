import React from 'react';
import PropTypes from 'prop-types';
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

class VotingResult extends React.Component {
  render() {
    const { draftVoting, daoInfo } = this.props;
    if (!draftVoting) return null;
    const minimumQuorom = ((draftVoting.quorum / daoInfo.totalModeratorLockedDgds) * 100).toFixed(
      2
    );

    const quorumProgress = (draftVoting.totalVoterStake / daoInfo.totalModeratorLockedDgds) * 100;
    const quotaProgress = draftVoting.currentResult * 100;
    return (
      <VotingResultWrapper>
        <VotingResultContainer>
          <ProgressCol>
            <Label>
              <QuorumLabel>Quorum</QuorumLabel>
              <QuorumMinLabel>
                <span>Minimum Quorum Needed: {minimumQuorom}%</span>
              </QuorumMinLabel>
            </Label>
            <div>
              <ProgressBar variant="determinate" value={quorumProgress > 0 ? quorumProgress : -1} />
            </div>
          </ProgressCol>
          <QuorumInfoCol>
            {draftVoting.totalVoterCount} Votes <span>|</span>{' '}
            <Countdown
              date={new Date(draftVoting.votingDeadline * 1000) - Date.now()}
              renderer={countdownRenderer}
            />
            ,
          </QuorumInfoCol>
        </VotingResultContainer>
        <VotingResultContainer>
          <ProgressCol>
            <Label>
              <ApprovalLabel>Current Approval Rate</ApprovalLabel>
              <ApprovalMinLabel>
                <span>Minimum Approval Needed: {draftVoting.quota}%</span>
              </ApprovalMinLabel>
            </Label>
            <div>
              <ProgressBar variant="determinate" value={quotaProgress > 0 ? quotaProgress : -1} />
            </div>
          </ProgressCol>
          <QuorumInfoCol>
            YES: {draftVoting.currentResult * draftVoting.totalVoterStake} <span>|</span> NO:{' '}
            {(1 - draftVoting.currentResult) * draftVoting.totalVoterStake}
          </QuorumInfoCol>
        </VotingResultContainer>
      </VotingResultWrapper>
    );
  }
}

const { object } = PropTypes;

VotingResult.propTypes = {
  draftVoting: object.isRequired,
  daoInfo: object.isRequired,
};
export default VotingResult;

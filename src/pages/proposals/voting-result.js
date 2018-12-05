import React from 'react';
import PropTypes from 'prop-types';
import Countdown from 'react-countdown-now';

import ProgressBar from '@digix/gov-ui/components/common/blocks/progress-bar';
import { parseBigNumber } from 'spectrum-lightsuite/src/helpers/stringUtils';

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
    return `Voting is over!`;
  }

  return <span>{`${days}D:${hours}H:${minutes}M:${seconds}S`}</span>;
};

class VotingResult extends React.Component {
  formatPercentage = num => (num * 100).toFixed(2);

  render() {
    const { draftVoting, daoInfo } = this.props;
    if (!draftVoting) {
      return null;
    }

    const approvalDeadline = new Date(draftVoting.votingDeadline * 1000);

    const quorum = parseBigNumber(draftVoting.quorum, 0, false);
    const quota = parseBigNumber(draftVoting.quota, 0, false);
    const totalModeratorLockedDgds = parseBigNumber(daoInfo.totalModeratorLockedDgds, 0, false);
    const totalVoterStake = parseBigNumber(draftVoting.totalVoterStake, 0, false);

    const minimumQuorum = this.formatPercentage(quorum / totalModeratorLockedDgds);
    const quorumProgress = this.formatPercentage(totalVoterStake / totalModeratorLockedDgds);

    const minimumApproval = this.formatPercentage(quota);
    const approvalProgress = this.formatPercentage(draftVoting.yes / totalVoterStake);

    return (
      <VotingResultWrapper>
        <VotingResultContainer>
          <ProgressCol>
            <Label>
              <QuorumLabel flexWidth={minimumQuorum}>Quorum</QuorumLabel>
              <QuorumMinLabel flexWidth={100 - minimumQuorum}>
                <span>Minimum Quorum Needed: {minimumQuorum}%</span>
              </QuorumMinLabel>
            </Label>
            <ProgressBar variant="determinate" value={quorumProgress} />
          </ProgressCol>
          <QuorumInfoCol>
            {draftVoting.totalVoterCount} Votes
            <span>|</span>
            <Countdown date={approvalDeadline} renderer={countdownRenderer} />
          </QuorumInfoCol>
        </VotingResultContainer>

        <VotingResultContainer>
          <ProgressCol>
            <Label>
              <ApprovalLabel flexWidth={minimumApproval}>Current Approval Rate</ApprovalLabel>
              <ApprovalMinLabel flexWidth={100 - minimumApproval}>
                <span>Minimum Approval Needed: {minimumApproval}%</span>
              </ApprovalMinLabel>
            </Label>
            <ProgressBar variant="determinate" value={approvalProgress} />
          </ProgressCol>
          <QuorumInfoCol>
            YES:&nbsp;{draftVoting.yes} DGD
            <span>|</span>
            NO:&nbsp;{draftVoting.no} DGD
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

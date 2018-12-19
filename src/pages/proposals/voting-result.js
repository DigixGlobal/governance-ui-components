import React from 'react';
import PropTypes from 'prop-types';
import Countdown from 'react-countdown-now';

import { parseBigNumber } from 'spectrum-lightsuite/src/helpers/stringUtils';

import ProgressBar from '@digix/gov-ui/components/common/blocks/progress-bar';
import { VotingStages } from '@digix/gov-ui/constants';

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

// should be string so <ProgressBar/> doesn't interpret the zero as false
const EMPTY_PROGRESS_BAR_VALUE = '0';

// eslint-disable-next-line
const countdownRenderer = ({ days, hours, minutes, seconds, completed }) => {
  if (completed) {
    return <span>Voting is over!</span>;
  }

  return <span>{`${days}D:${hours}H:${minutes}M:${seconds}S`}</span>;
};

// eslint-disable-next-line
const commitCountdownRenderer = (props) => {
  // eslint-disable-next-line
  const {date, total, completed, baseLine } = props;
  const duration = date - baseLine;
  // console.log({ duration, total });
  if (completed) {
    return <ProgressBar variant="determinate" value={100} />;
  }
  return <ProgressBar variant="determinate" value={((duration - total) / duration) * 100} />;
};

class VotingResult extends React.Component {
  getModeratorVotingStats = proposal => {
    const { daoInfo } = this.props;
    const { draftVoting } = proposal;

    const approvalDeadline = new Date(draftVoting.votingDeadline * 1000);

    const quorum = parseBigNumber(draftVoting.quorum, 0, false);
    const quota = parseBigNumber(draftVoting.quota, 0, false);
    const totalModeratorLockedDgds = parseBigNumber(daoInfo.totalModeratorLockedDgds, 0, false);
    const totalVoterStake = parseBigNumber(draftVoting.totalVoterStake, 0, false);
    const votes = draftVoting.totalVoterCount;
    const yesVotes = draftVoting.yes;
    const noVotes = draftVoting.no;

    const minimumQuorum = totalModeratorLockedDgds
      ? this.formatPercentage(quorum / totalModeratorLockedDgds)
      : EMPTY_PROGRESS_BAR_VALUE;
    const quorumProgress = totalModeratorLockedDgds
      ? this.formatPercentage(totalVoterStake / totalModeratorLockedDgds)
      : EMPTY_PROGRESS_BAR_VALUE;

    const minimumApproval = this.formatPercentage(quota);
    const approvalProgress = totalVoterStake
      ? this.formatPercentage(draftVoting.yes / totalVoterStake)
      : EMPTY_PROGRESS_BAR_VALUE;

    return {
      votes,
      yesVotes,
      noVotes,
      approvalDeadline,
      minimumQuorum,
      quorumProgress,
      minimumApproval,
      approvalProgress,
    };
  };

  getProposalVotingPhaseStats = proposal => {
    const { daoInfo } = this.props;
    const { currentVotingRound } = proposal;
    const currentRound = proposal.votingRounds[currentVotingRound];

    const commitDeadline = new Date(currentRound.commitDeadline * 1000);
    const approvalDeadline = new Date(currentRound.revealDeadline * 1000);

    const quorum = parseBigNumber(currentRound.quorum, 0, false);
    const quota = parseBigNumber(currentRound.quota, 0, false);
    const totalModeratorLockedDgds = parseBigNumber(daoInfo.totalModeratorLockedDgds, 0, false);
    const totalVoterStake = parseBigNumber(currentRound.totalVoterStake, 0, false);

    const votes = currentRound.totalVoterCount;
    const yesVotes = currentRound.yes;
    const noVotes = currentRound.no;

    const minimumQuorum = this.formatPercentage(quorum / totalModeratorLockedDgds);
    const quorumProgress = this.formatPercentage(totalVoterStake / totalModeratorLockedDgds);

    const minimumApproval = this.formatPercentage(quota);
    const approvalProgress = this.formatPercentage(currentRound.yes / totalVoterStake);

    return {
      votes,
      yesVotes,
      noVotes,
      commitDeadline,
      approvalDeadline,
      minimumQuorum,
      quorumProgress,
      minimumApproval,
      approvalProgress,
    };
  };

  formatPercentage = num => (num * 100).toFixed(2);

  render() {
    const { proposal } = this.props;
    const isOnModeratorVoting = proposal.votingStage === VotingStages.draft;
    const isOnProposalVoting =
      proposal.votingStage === VotingStages.commit || proposal.votingStage === VotingStages.reveal;

    if (!proposal || (!isOnModeratorVoting && !isOnProposalVoting)) {
      return null;
    }

    // const currentTime = Date.now();
    // const proposalProgress =

    const stats = isOnModeratorVoting
      ? this.getModeratorVotingStats(proposal)
      : this.getProposalVotingPhaseStats(proposal);

    return (
      <VotingResultWrapper>
        <VotingResultContainer>
          <ProgressCol>
            <Label>
              <QuorumLabel flexWidth={stats.minimumQuorum}>Quorum</QuorumLabel>
              <QuorumMinLabel flexWidth={100 - stats.minimumQuorum}>
                <span>Minimum Quorum Needed: {stats.minimumQuorum}%</span>
              </QuorumMinLabel>
            </Label>
            <ProgressBar
              variant="determinate"
              value={Number(stats.quorumProgress) > 0 ? Number(stats.quorumProgress) : -1}
            />
          </ProgressCol>
          <QuorumInfoCol>
            <span>{stats.votes} Votes</span>

            <Countdown date={stats.approvalDeadline} renderer={countdownRenderer} />
          </QuorumInfoCol>
        </VotingResultContainer>

        <VotingResultContainer>
          <ProgressCol>
            <Label>
              <ApprovalLabel flexWidth={stats.minimumApproval}>Current Approval Rate</ApprovalLabel>
              <ApprovalMinLabel flexWidth={100 - stats.minimumApproval}>
                <span>Minimum Approval Needed: {stats.minimumApproval}%</span>
              </ApprovalMinLabel>
            </Label>
            <ProgressBar
              variant="determinate"
              value={Number(stats.approvalProgress) > 0 ? Number(stats.approvalProgress) : -1}
            />
          </ProgressCol>
          <QuorumInfoCol>
            <span>YES:&nbsp;{stats.yesVotes} DGD</span>

            <span>NO:&nbsp;{stats.noVotes} DGD</span>
          </QuorumInfoCol>
        </VotingResultContainer>

        {isOnProposalVoting && (
          <VotingResultContainer>
            <ProgressCol>
              <Label>
                <QuorumLabel>Time Left To End of Commit</QuorumLabel>
              </Label>

              <Countdown
                date={stats.commitDeadline}
                baseLine={Date.now()}
                renderer={props => commitCountdownRenderer(props)}
              />
            </ProgressCol>
            <QuorumInfoCol countdown>
              <Countdown date={new Date(stats.commitDeadline)} renderer={countdownRenderer} />
            </QuorumInfoCol>
          </VotingResultContainer>
        )}
      </VotingResultWrapper>
    );
  }
}

const { object } = PropTypes;

VotingResult.propTypes = {
  proposal: object,
  daoInfo: object.isRequired,
};

VotingResult.defaultProps = {
  draftVoting: undefined,
  proposal: undefined,
};

export default VotingResult;

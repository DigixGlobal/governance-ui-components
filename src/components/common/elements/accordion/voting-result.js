import React from 'react';
import PropTypes from 'prop-types';
import Countdown from 'react-countdown-now';
import moment from 'moment';

import TimeAgo from 'react-timeago';
import { parseBigNumber } from 'spectrum-lightsuite/src/helpers/stringUtils';
import { formatPercentage, truncateNumber } from '@digix/gov-ui/utils/helpers';

import {
  VotingResultWrapper,
  VotingResultContainer,
  ProgressCol,
  QuorumLabel,
  MinimumLabel,
  Label,
  QuorumInfoCol,
  ApprovalLabel,
  VotingProgressBar,
} from '@digix/gov-ui/pages/proposals/style';

// eslint-disable-next-line
const countdownRenderer = ({
  date,
  days,
  hours,
  minutes,
  seconds,
  completed,
}) => {
  const pastDate = moment().add(date, 'milliseconds');

  if (completed) {
    return (
      <span>
        {'Ended '} <TimeAgo date={pastDate} />
      </span>
    );
  }

  return <span>{`${days}D:${hours}H:${minutes}M:${seconds}S`}</span>;
};

class VotingResult extends React.Component {
  getVotingStats = voting => {
    const { daoInfo } = this.props;

    const votingDeadline = new Date(
      voting.votingDeadline ? voting.votingDeadline * 1000 : voting.revealDeadline * 1000
    );

    const quorum = parseBigNumber(voting.quorum, 0, false);
    const quota = parseBigNumber(voting.quota, 0, false);
    const totalModeratorLockedDgds = parseBigNumber(daoInfo.totalModeratorLockedDgds, 0, false);
    const totalVoterStake = parseBigNumber(voting.totalVoterStake, 0, false);

    const votes = Number(voting.totalVoterCount);
    const yesVotes = Number(voting.yes);
    const noVotes = Number(voting.no);

    const minimumQuorum = formatPercentage(quorum / totalModeratorLockedDgds);
    const quorumProgress = formatPercentage(totalVoterStake / totalModeratorLockedDgds);

    const minimumApproval = formatPercentage(quota);
    const approvalProgress = formatPercentage(voting.yes / totalVoterStake);

    return {
      votes,
      yesVotes,
      noVotes,
      votingDeadline,
      minimumQuorum,
      quorumProgress,
      minimumApproval,
      approvalProgress,
    };
  };

  render() {
    const { voting } = this.props;

    const stats = this.getVotingStats(voting);

    if (!stats || stats.votingDeadline > Date.now()) return null;

    const yesVotes = truncateNumber(stats.yesVotes);
    const noVotes = truncateNumber(stats.noVotes);
    return (
      <VotingResultWrapper>
        <VotingResultContainer>
          <ProgressCol past>
            <Label>
              <QuorumLabel past flexWidth={stats.minimumQuorum}>
                Quorum
              </QuorumLabel>
              <MinimumLabel past flexWidth={100 - stats.minimumQuorum}>
                <span>Minimum Quorum Needed: {stats.minimumQuorum}%</span>
                <QuorumInfoCol>
                  <span>{stats.votes} Votes</span>

                  <Countdown
                    date={stats.votingDeadline - Date.now()}
                    renderer={countdownRenderer}
                  />
                </QuorumInfoCol>
              </MinimumLabel>
            </Label>
            <VotingProgressBar
              variant="determinate"
              value={Number(stats.quorumProgress) > 0 ? Number(stats.quorumProgress) : -1}
            />
          </ProgressCol>
        </VotingResultContainer>

        <VotingResultContainer>
          <ProgressCol past>
            <Label>
              <ApprovalLabel past flexWidth={stats.minimumApproval}>
                Current Approval Rate
              </ApprovalLabel>
              <MinimumLabel past flexWidth={100 - stats.minimumApproval}>
                <span>Minimum Approval Needed: {stats.minimumApproval}%</span>
                <QuorumInfoCol>
                  <span>YES:&nbsp;{yesVotes} DGD</span>
                  <span>NO:&nbsp;{noVotes} DGD</span>
                </QuorumInfoCol>
              </MinimumLabel>
            </Label>
            <VotingProgressBar
              variant="determinate"
              value={Number(stats.approvalProgress) > 0 ? Number(stats.approvalProgress) : -1}
            />
          </ProgressCol>
        </VotingResultContainer>
      </VotingResultWrapper>
    );
  }
}

const { object } = PropTypes;

VotingResult.propTypes = {
  voting: object,
  daoInfo: object.isRequired,
};

VotingResult.defaultProps = {
  voting: undefined,
};

export default VotingResult;

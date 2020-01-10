import React from 'react';
import PropTypes from 'prop-types';
import Countdown from 'react-countdown-now';
import moment from 'moment';
import { connect } from 'react-redux';

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

// eslint-disable-next-line react/prop-types
const countdownRenderer = ({ date, days, hours, minutes, seconds, completed }) => {
  const pastDate = moment().add(date, 'milliseconds');

  if (completed) {
    return (
      <span data-digix="Vote-Countdown-Ended">
        {'Ended '} <TimeAgo date={pastDate} />
      </span>
    );
  }

  return (
    <span data-digix="Vote-Countdown-Timer">{`${days}D:${hours}H:${minutes}M:${seconds}S`}</span>
  );
};

class VotingResult extends React.Component {
  // NOTE: The "voting" argument can be from votingRounds or draftVoting
  // See Proposal::getPastVotingResults
  getVotingStats = voting => {
    const { DaoConfig, daoInfo, isModeratorVote, isSpecial } = this.props;
    const {
      CONFIG_SPECIAL_PROPOSAL_QUORUM_NUMERATOR,
      CONFIG_SPECIAL_PROPOSAL_QUORUM_DENOMINATOR,
      CONFIG_SPECIAL_QUOTA_NUMERATOR,
      CONFIG_SPECIAL_QUOTA_DENOMINATOR,
    } = DaoConfig;

    const votingDeadline = new Date(
      voting.votingDeadline ? voting.votingDeadline * 1000 : voting.revealDeadline * 1000
    );

    const quorum = parseBigNumber(voting.quorum, 0, false);
    const quota = parseBigNumber(voting.quota, 0, false);
    const totalModeratorLockedDgds = parseBigNumber(daoInfo.totalModeratorLockedDgds, 0, false);
    const totalLockedDgds = parseBigNumber(daoInfo.totalLockedDgds, 0, false);
    const totalVoterStake = parseBigNumber(voting.totalVoterStake, 0, false);

    const votes = Number(voting.totalVoterCount);
    const yesVotes = Number(voting.yes);
    const noVotes = Number(voting.no);

    let minimumQuorum = formatPercentage(quorum / totalLockedDgds);
    let quorumProgress = formatPercentage(totalVoterStake / totalLockedDgds);

    let minimumApproval = formatPercentage(quota);
    const approvalProgress = formatPercentage(yesVotes / totalVoterStake);

    if (isSpecial) {
      minimumQuorum = formatPercentage(
        CONFIG_SPECIAL_PROPOSAL_QUORUM_NUMERATOR / CONFIG_SPECIAL_PROPOSAL_QUORUM_DENOMINATOR
      );
      minimumApproval = formatPercentage(
        CONFIG_SPECIAL_QUOTA_NUMERATOR / CONFIG_SPECIAL_QUOTA_DENOMINATOR
      );
    }

    if (isModeratorVote) {
      minimumQuorum = formatPercentage(quorum / totalModeratorLockedDgds);
      quorumProgress = formatPercentage(totalVoterStake / totalModeratorLockedDgds);
    }

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
    const {
      voting,
      translations: {
        project: { votingResult },
        common: { buttons },
      },
    } = this.props;

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
                {votingResult.quorum}
              </QuorumLabel>
              <MinimumLabel past flexWidth={100 - stats.minimumQuorum}>
                <span>
                  {votingResult.miniumQuorumRequired}: {stats.minimumQuorum}%
                </span>
                <QuorumInfoCol>
                  <span data-digix="Vote-User-Count">
                    {stats.votes} {votingResult.votes}
                  </span>

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
                {votingResult.currentApprovalRate}
              </ApprovalLabel>
              <MinimumLabel past flexWidth={100 - stats.minimumApproval}>
                <span>
                  {votingResult.minimumApproval}: {stats.minimumApproval}%
                </span>
                <QuorumInfoCol>
                  <span data-digix="Vote-Yes-Count">
                    {buttons.yes}:&nbsp;{yesVotes} DGD
                  </span>
                  <span data-digix="Vote-No-Count">
                    {buttons.no}:&nbsp;{noVotes} DGD
                  </span>
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

const { bool, object } = PropTypes;

VotingResult.propTypes = {
  DaoConfig: object.isRequired,
  daoInfo: object.isRequired,
  isModeratorVote: bool,
  isSpecial: bool,
  translations: object.isRequired,
  voting: object,
};

VotingResult.defaultProps = {
  isModeratorVote: false,
  isSpecial: false,
  voting: undefined,
};

const mapStateToProps = ({ infoServer }) => ({
  DaoConfig: infoServer.DaoConfig.data,
});

export default connect(mapStateToProps, {})(VotingResult);

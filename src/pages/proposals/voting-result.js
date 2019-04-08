import React from 'react';
import PropTypes from 'prop-types';
import Countdown from 'react-countdown-now';

import { parseBigNumber } from 'spectrum-lightsuite/src/helpers/stringUtils';
import { formatPercentage, truncateNumber } from '@digix/gov-ui/utils/helpers';

import ProgressBar from '@digix/gov-ui/components/common/blocks/progress-bar';
import { VotingStages } from '@digix/gov-ui/constants';
import VotingResultHeader from '@digix/gov-ui/pages/proposals/voting-result-header';

import { HR } from '@digix/gov-ui/components/common/common-styles';

import {
  VotingResultWrapper,
  VotingResultContainer,
  ProgressCol,
  QuorumLabel,
  MinimumLabel,
  Label,
  QuorumInfoCol,
  ApprovalLabel,
} from '@digix/gov-ui/pages/proposals/style';

import {
  AccordionItem,
  Header,
  Content,
} from '@digix/gov-ui/components/common/elements/accordion/styles';

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
const commitCountdownRenderer = props => {
  // eslint-disable-next-line
  const { date, total, completed, baseLine } = props;
  const duration = date - baseLine;
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
      ? formatPercentage(quorum / totalModeratorLockedDgds)
      : EMPTY_PROGRESS_BAR_VALUE;
    const quorumProgress = totalModeratorLockedDgds
      ? formatPercentage(totalVoterStake / totalModeratorLockedDgds)
      : EMPTY_PROGRESS_BAR_VALUE;

    const minimumApproval = formatPercentage(quota);
    const approvalProgress = totalVoterStake
      ? formatPercentage(draftVoting.yes / totalVoterStake)
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

    const minimumQuorum = formatPercentage(quorum / totalModeratorLockedDgds);
    const quorumProgress = formatPercentage(totalVoterStake / totalModeratorLockedDgds);

    const minimumApproval = formatPercentage(quota);
    const approvalProgress = formatPercentage(currentRound.yes / totalVoterStake);

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

  render() {
    const { proposal, translations } = this.props;
    const isOnModeratorVoting = proposal.votingStage === VotingStages.draft;
    const isOnProposalVoting =
      proposal.votingStage === VotingStages.commit || proposal.votingStage === VotingStages.reveal;

    if (!proposal || (!isOnModeratorVoting && !isOnProposalVoting)) {
      return null;
    }

    const stats = isOnModeratorVoting
      ? this.getModeratorVotingStats(proposal)
      : this.getProposalVotingPhaseStats(proposal);

    if (Date.now() > stats.approvalDeadline) return null;

    const yesVotes = truncateNumber(stats.yesVotes);
    const noVotes = truncateNumber(stats.noVotes);

    const {
      translations: {
        project: { votingResult },
        common: { buttons },
      },
    } = this.props;

    return (
      <div>
        <AccordionItem voting>
          <Header>
            <VotingResultHeader
              votingRound={proposal.currentVotingRound}
              translations={translations}
            />
          </Header>
          <Content>
            <VotingResultWrapper>
              <VotingResultContainer>
                <ProgressCol>
                  <Label>
                    <QuorumLabel flexWidth={stats.minimumQuorum}>{votingResult.quorum}</QuorumLabel>
                    <MinimumLabel flexWidth={100 - stats.minimumQuorum}>
                      <span>
                        {votingResult.miniumQuorumRequired}: {stats.minimumQuorum}%
                      </span>
                      <QuorumInfoCol>
                        <span>
                          {stats.votes} {votingResult.votes}
                        </span>

                        <Countdown date={stats.approvalDeadline} renderer={countdownRenderer} />
                      </QuorumInfoCol>
                    </MinimumLabel>
                  </Label>
                  <ProgressBar
                    variant="determinate"
                    value={Number(stats.quorumProgress) > 0 ? Number(stats.quorumProgress) : -1}
                  />
                </ProgressCol>
              </VotingResultContainer>

              <VotingResultContainer>
                <ProgressCol>
                  <Label>
                    <ApprovalLabel flexWidth={stats.minimumApproval}>
                      {votingResult.currentApprovalRate}
                    </ApprovalLabel>
                    <MinimumLabel flexWidth={100 - stats.minimumApproval}>
                      <span>
                        {votingResult.minimumApproval}: {stats.minimumApproval}%
                      </span>
                      <QuorumInfoCol>
                        <span>
                          {buttons.yes}:&nbsp;{yesVotes} DGD
                        </span>
                        <span>
                          {buttons.no}:&nbsp;{noVotes} DGD
                        </span>
                      </QuorumInfoCol>
                    </MinimumLabel>
                  </Label>
                  <ProgressBar
                    variant="determinate"
                    value={Number(stats.approvalProgress) > 0 ? Number(stats.approvalProgress) : -1}
                  />
                </ProgressCol>
              </VotingResultContainer>

              {isOnProposalVoting && (
                <VotingResultContainer>
                  <ProgressCol>
                    <Label>
                      <QuorumLabel>{votingResult.timeLeftToCommit}</QuorumLabel>
                      <MinimumLabel>
                        <span />
                        <QuorumInfoCol countdown>
                          <Countdown
                            date={new Date(stats.commitDeadline)}
                            renderer={countdownRenderer}
                          />
                        </QuorumInfoCol>
                      </MinimumLabel>
                    </Label>

                    <Countdown
                      date={stats.commitDeadline}
                      baseLine={Date.now()}
                      renderer={props => commitCountdownRenderer(props)}
                    />
                  </ProgressCol>
                </VotingResultContainer>
              )}
            </VotingResultWrapper>
          </Content>
        </AccordionItem>
        <HR />
      </div>
    );
  }
}

const { object } = PropTypes;

VotingResult.propTypes = {
  proposal: object,
  daoInfo: object.isRequired,
  translations: object.isRequired,
};

VotingResult.defaultProps = {
  proposal: undefined,
};

export default VotingResult;

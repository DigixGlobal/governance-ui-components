import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Countdown from 'react-countdown-now';

import { parseBigNumber } from 'spectrum-lightsuite/src/helpers/stringUtils';
import { formatPercentage, truncateNumber } from '@digix/gov-ui/utils/helpers';

import ProgressBar from '@digix/gov-ui/components/common/blocks/progress-bar';
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

import VotingResultHeader from '@digix/gov-ui/pages/proposals/voting-result-header';

class SpecialProjectVotingResult extends React.Component {
  getProposalVotingPhaseStats = proposal => {
    const { DaoConfig, daoInfo } = this.props;
    const {
      CONFIG_SPECIAL_PROPOSAL_QUORUM_NUMERATOR,
      CONFIG_SPECIAL_PROPOSAL_QUORUM_DENOMINATOR,
    } = DaoConfig;
    const currentRound = proposal.votingRounds[0];

    const commitDeadline = new Date(currentRound.commitDeadline * 1000);
    const approvalDeadline = new Date(currentRound.revealDeadline * 1000);

    const quota = parseBigNumber(currentRound.quota, 0, false);
    const totalModeratorLockedDgds = parseBigNumber(daoInfo.totalModeratorLockedDgds, 0, false);
    const totalVoterStake = parseBigNumber(currentRound.totalVoterStake, 0, false);

    const votes = currentRound.totalVoterCount;
    const yesVotes = currentRound.yes;
    const noVotes = currentRound.no;

    const minimumQuorum = formatPercentage(
      CONFIG_SPECIAL_PROPOSAL_QUORUM_NUMERATOR / CONFIG_SPECIAL_PROPOSAL_QUORUM_DENOMINATOR
    );
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

  // eslint-disable-next-line
  countdownRenderer = ({ days, hours, minutes, seconds, completed }) => {
    const { translations } = this.props;
    if (completed) {
      return <span>{translations.project.votingResult.votingIsOver}</span>;
    }

    return <span>{`${days}D:${hours}H:${minutes}M:${seconds}S`}</span>;
  };

  // eslint-disable-next-line
  commitCountdownRenderer = props => {
    // eslint-disable-next-line
    const { date, total, completed, baseLine } = props;
    const duration = date - baseLine;
    if (completed) {
      return <ProgressBar variant="determinate" value={100} />;
    }
    return <ProgressBar variant="determinate" value={((duration - total) / duration) * 100} />;
  };

  render() {
    const { proposal, translations } = this.props;
    const stats = this.getProposalVotingPhaseStats(proposal);
    if (Date.now() > stats.approvalDeadline) {
      return null;
    }

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
            <VotingResultHeader votingRound={0} translations={translations} />
          </Header>
          <Content>
            <VotingResultWrapper>
              <VotingResultContainer>
                <ProgressCol>
                  <Label>
                    <QuorumLabel flexWidth={stats.minimumQuorum}>Quorum</QuorumLabel>
                    <MinimumLabel flexWidth={100 - stats.minimumQuorum}>
                      <span>Minimum Quorum Needed: {stats.minimumQuorum}%</span>
                      <QuorumInfoCol>
                        <span data-digix="Vote-User-Count">{stats.votes} Votes</span>

                        <Countdown
                          date={stats.approvalDeadline}
                          renderer={this.countdownRenderer}
                        />
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
                      Current Approval Rate
                    </ApprovalLabel>
                    <MinimumLabel flexWidth={100 - stats.minimumApproval}>
                      <span>Minimum Approval Needed: {stats.minimumApproval}%</span>
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
                  <ProgressBar
                    variant="determinate"
                    value={Number(stats.approvalProgress) > 0 ? Number(stats.approvalProgress) : -1}
                  />
                </ProgressCol>
              </VotingResultContainer>

              <VotingResultContainer>
                <ProgressCol>
                  <Label>
                    <QuorumLabel>{votingResult.timeLeftToCommit}</QuorumLabel>
                    <MinimumLabel noMin>
                      <span />
                      <QuorumInfoCol countdown>
                        <Countdown
                          date={new Date(stats.commitDeadline)}
                          renderer={this.countdownRenderer}
                        />
                      </QuorumInfoCol>
                    </MinimumLabel>
                  </Label>

                  <Countdown
                    date={stats.commitDeadline}
                    baseLine={Date.now()}
                    renderer={props => this.commitCountdownRenderer(props)}
                  />
                </ProgressCol>
              </VotingResultContainer>
            </VotingResultWrapper>
          </Content>
        </AccordionItem>
        <HR />
      </div>
    );
  }
}

const { object } = PropTypes;

SpecialProjectVotingResult.propTypes = {
  DaoConfig: object.isRequired,
  daoInfo: object.isRequired,
  proposal: object,
  translations: object.isRequired,
};

SpecialProjectVotingResult.defaultProps = {
  proposal: undefined,
};

const mapStateToProps = ({ infoServer }) => ({
  DaoConfig: infoServer.DaoConfig.data,
});

export default connect(
  mapStateToProps,
  {}
)(SpecialProjectVotingResult);

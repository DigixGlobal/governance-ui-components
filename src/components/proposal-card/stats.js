import React from 'react';
import PropTypes from 'prop-types';

import { toBigNumber, parseBigNumber } from 'spectrum-lightsuite/src/helpers/stringUtils';

import { VotingStages } from '@digix/gov-ui/constants';
import { formatPercentage, truncateNumber } from '@digix/gov-ui/utils/helpers';

import { Details, Info } from '@digix/gov-ui/components/proposal-card/style';

export default class ProposalCardStats extends React.Component {
  getVotingRoundDetails = proposal => {
    const { votingStage } = this.props;
    const { currentVotingRound, draftVoting, votingRounds } = proposal;

    switch (votingStage) {
      case VotingStages.draft:
        if (currentVotingRound === -1) {
          return draftVoting;
        }

        break;
      case VotingStages.commit:
      case VotingStages.reveal:
        return votingRounds[currentVotingRound];
      default:
        return null;
    }
  };

  getStats = proposal => {
    const votingRoundDetails = this.getVotingRoundDetails(proposal);
    let approvalRating = 0;
    let participantCount = 0;

    if (votingRoundDetails) {
      const approval = toBigNumber(votingRoundDetails.yes);
      const totalStake = toBigNumber(votingRoundDetails.totalVoterStake);

      approvalRating = totalStake > 0 ? approval.div(totalStake) : 0;
      approvalRating = parseBigNumber(approvalRating, 0, false);
      participantCount = votingRoundDetails.totalVoterCount || 0;
    }

    return {
      approvalRating: formatPercentage(approvalRating),
      participantCount,
    };
  };

  render() {
    const { details, votingStage, translations } = this.props;
    if (!details) {
      return null;
    }
    const { approvalRating, participantCount } = this.getStats(details);

    const versionCount = details.proposalVersions ? details.proposalVersions.length : undefined;
    let funding = versionCount ? details.proposalVersions[versionCount - 1].totalFunding / 1e18 : 0;
    funding = truncateNumber(funding);

    const {
      data: {
        dashboard: { ProposalCard: cardTranslation },
      },
    } = translations;

    return (
      <Details second noPadding>
        <Info>
          {cardTranslation.funding}
          <span data-digix="Total-Funding">{funding} ETH</span>
        </Info>
        <Info stage={details.stage} votingStage={votingStage}>
          {cardTranslation.approval}
          <span data-digix="Approval-Rating">{approvalRating}%</span>
        </Info>
        <Info stage={details.stage} votingStage={votingStage}>
          {cardTranslation.participants}
          <span data-digix="Participant-Count">{participantCount}</span>
        </Info>
      </Details>
    );
  }
}
ProposalCardStats.propTypes = {
  details: PropTypes.object.isRequired,
  votingStage: PropTypes.string,
  translations: PropTypes.object.isRequired,
};

ProposalCardStats.defaultProps = {
  votingStage: undefined,
};

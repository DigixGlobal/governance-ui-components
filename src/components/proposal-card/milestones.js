import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import LogDashboard from '@digix/gov-ui/analytics/dashboard';
import { Button } from '@digix/gov-ui/components/common/elements/index';
import { Details, Info, Label, Data } from '@digix/gov-ui/components/proposal-card/style';
import { getUserStatus } from '@digix/gov-ui/utils/helpers';
import { UserStatus } from '@digix/gov-ui/constants';

const determineDeadline = proposal => {
  let deadline = Date.now();
  const mileStone = proposal.currentMilestone > 0 ? proposal.currentMilestone : 0;

  switch (proposal.stage.toLowerCase()) {
    case 'draft':
      if (proposal.votingStage === 'draftVoting' && proposal.draftVoting !== null) {
        deadline = proposal.draftVoting.votingDeadline;
      } else {
        return undefined;
      }
      break;
    case 'proposal': {
      if (Date.now() < proposal.votingRounds[0].commitDeadline) {
        deadline = proposal.votingRounds[0].commitDeadline || undefined;
      } else deadline = proposal.votingRounds[0].revealDeadline;
      break;
    }
    case 'ongoing':
      return undefined;

    case 'review':
      if (Date.now() < proposal.votingRounds[mileStone].commitDeadline) {
        deadline = proposal.votingRounds[mileStone].commitDeadline || undefined;
      } else deadline = proposal.votingRounds[mileStone].revealDeadline;
      break;
    default:
      deadline = proposal.votingRounds ? proposal.votingRounds[0].commitDeadline : undefined;
      break;
  }

  if (deadline) return new Intl.DateTimeFormat('en-US').format(deadline * 1000);
  return deadline;
};

class ProposalCardMilestone extends React.Component {
  redirectToProposalPage = () => {
    const { AddressDetails, details, history } = this.props;

    const userType = getUserStatus(AddressDetails.data, UserStatus);
    LogDashboard.viewProject(userType);
    history.push(`/proposals/${details.proposalId}`);
  };

  render() {
    const { details, translations } = this.props;
    const { currentMilestone } = details;
    const mileStones = currentMilestone ? Object.keys(currentMilestone) : [];
    const {
      data: {
        dashboard: { ProposalCard: cardTranslation },
        common: { buttons },
      },
    } = translations;

    return (
      <Details noPadding third>
        <Info>
          <Label>{cardTranslation.milestones}</Label>
          <ul data-digix="Milestone-Count">
            {mileStones && mileStones.map(milestone => <li key={milestone} />)}
          </ul>
        </Info>
        <Info>
          <Label>{cardTranslation.votingDeadline}</Label>
          <Data data-digix="Proposal-Deadline">{determineDeadline(details) || 'N/A'} </Data>
        </Info>
        <Info>
          <Button primary onClick={this.redirectToProposalPage} data-digix="Participate-Btn">
            {buttons.participate}
          </Button>
        </Info>
      </Details>
    );
  }
}

const { object } = PropTypes;
ProposalCardMilestone.propTypes = {
  AddressDetails: object,
  details: object.isRequired,
  history: object.isRequired,
  translations: object.isRequired,
};

ProposalCardMilestone.defaultProps = {
  AddressDetails: {
    data: undefined,
  },
};

const mapStateToProps = state => ({
  AddressDetails: state.infoServer.AddressDetails,
});

export default connect(
  mapStateToProps,
  {}
)(ProposalCardMilestone);

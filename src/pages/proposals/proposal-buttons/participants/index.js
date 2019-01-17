import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import { ProposalStages } from '@digix/gov-ui/constants';

import Button from '@digix/gov-ui/components/common/elements/buttons/index';
import AbortButton from '@digix/gov-ui/pages/proposals/proposal-buttons/abort';
import FinalizeButton from '@digix/gov-ui/pages/proposals/proposal-buttons/finalize';
import ClaimApprovalButton from '@digix/gov-ui/pages/proposals/proposal-buttons/claim-approval';
import ClaimResultsButton from '@digix/gov-ui/pages/proposals/proposal-buttons/claim-results';
import MilestoneCompletedButton from '@digix/gov-ui/pages/proposals/proposal-buttons/milestone-completed';
import ClaimFundingButton from '@digix/gov-ui/pages/proposals/proposal-buttons/claim-funding';
import VoteCommitButton from '@digix/gov-ui/pages/proposals/proposal-buttons/vote-commit';
import RevealButton from '@digix/gov-ui/pages/proposals/proposal-buttons/reveal-button';
import EditFundingButton from '@digix/gov-ui/pages/proposals/proposal-buttons/edit-funding';

class ParticantButtons extends React.Component {
  constructor(props) {
    super(props);
    this.STAGES_THAT_CAN_EDIT = [ProposalStages.idea, ProposalStages.draft];
  }

  handleEditClick = () => {
    const { history, proposal } = this.props;
    history.push(`/proposals/edit/${proposal.data.proposalId}`);
  };

  render() {
    const {
      isProposer,
      proposal: { data },
      history,
      addressDetails,
    } = this.props;

    const showEditButton =
      isProposer && this.STAGES_THAT_CAN_EDIT.includes(data.stage) && !data.votingStage;

    return (
      <Fragment>
        <AbortButton
          stage={data.stage}
          isProposer={isProposer}
          proposalId={data.proposalId}
          finalVersionIpfsDoc={data.finalVersionIpfsDoc}
          history={history}
        />
        {showEditButton && (
          <Button kind="round" onClick={this.handleEditClick}>
            Edit
          </Button>
        )}
        <EditFundingButton proposal={data} isProposer={isProposer} />
        <FinalizeButton
          endorser={data.endorser}
          stage={data.stage}
          isProposer={isProposer}
          proposalId={data.proposalId}
          finalVersionIpfsDoc={data.finalVersionIpfsDoc}
          history={history}
          timeCreated={data.timeCreated}
        />
        <ClaimApprovalButton
          isProposer={isProposer}
          draftVoting={data.draftVoting}
          history={history}
          votingStage={data.votingStage}
          proposalId={data.proposalId}
        />
        <VoteCommitButton
          isParticipant={addressDetails.data.isParticipant}
          history={history}
          proposal={data}
          proposalId={data.proposalId}
          votingStage={data.votingStage}
          votes={addressDetails.data.votes}
        />
        <RevealButton
          isParticipant={addressDetails.data.isParticipant}
          history={history}
          proposal={data}
          proposalId={data.proposalId}
          votingStage={data.votingStage}
          votes={addressDetails.data.votes}
        />
        <ClaimResultsButton isProposer={isProposer} proposal={data} history={history} />
        <ClaimFundingButton isProposer={isProposer} proposal={data} history={history} />
        <MilestoneCompletedButton isProposer={isProposer} proposal={data} history={history} />
      </Fragment>
    );
  }
}

const { object, bool } = PropTypes;

ParticantButtons.propTypes = {
  proposal: object.isRequired,
  isProposer: bool.isRequired,
  addressDetails: object.isRequired,
  history: object.isRequired,
};

export default ParticantButtons;

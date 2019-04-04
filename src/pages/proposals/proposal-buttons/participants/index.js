/* eslint-disable react/jsx-no-bind */

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withApollo } from 'react-apollo';

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
import ErrorMessageOverlay from '@digix/gov-ui/components/common/blocks/overlay/error-message';
import web3Connect from 'spectrum-lightsuite/src/helpers/web3/connect';
import { getUnmetProposalRequirements } from '@digix/gov-ui/utils/helpers';
import { ProposalStages } from '@digix/gov-ui/constants';
import { showRightPanel } from '@digix/gov-ui/reducers/gov-ui/actions';

class ParticipantButtons extends React.Component {
  constructor(props) {
    super(props);
    this.STAGES_THAT_CAN_EDIT = [ProposalStages.idea, ProposalStages.draft];
  }

  showErrorOverlay(errors) {
    this.props.showRightPanel({
      component: <ErrorMessageOverlay errors={errors} />,
      show: true,
    });
  }

  checkUnmetRequirements(proposalAction, customErrors) {
    const { client, DaoDetails, translations } = this.props;

    getUnmetProposalRequirements(client, DaoDetails, translations).then(errors => {
      let totalErrors = errors;
      if (customErrors) {
        totalErrors = errors.concat(customErrors);
      }

      if (totalErrors.length) {
        this.showErrorOverlay(totalErrors);
      } else {
        proposalAction();
      }
    });
  }

  editProject() {
    const { history, proposal } = this.props;
    history.push(`/proposals/edit/${proposal.data.proposalId}`);
  }

  render() {
    const {
      isProposer,
      proposal: { data },
      history,
      addressDetails,
    } = this.props;

    const checkProposalRequirements = this.checkUnmetRequirements.bind(this);
    const editAction = this.editProject.bind(this);
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
          checkProposalRequirements={checkProposalRequirements}
        />
        {showEditButton && (
          <Button large onClick={() => checkProposalRequirements(editAction)}>
            Edit
          </Button>
        )}
        <EditFundingButton
          proposal={data}
          proposalId={data.proposalId}
          history={history}
          isProposer={isProposer}
          checkProposalRequirements={checkProposalRequirements}
        />
        <FinalizeButton
          endorser={data.endorser}
          stage={data.stage}
          isProposer={isProposer}
          proposalId={data.proposalId}
          finalVersionIpfsDoc={data.finalVersionIpfsDoc}
          history={history}
          timeCreated={data.timeCreated}
          checkProposalRequirements={checkProposalRequirements}
        />
        <ClaimApprovalButton
          isProposer={isProposer}
          draftVoting={data.draftVoting}
          history={history}
          votingStage={data.votingStage}
          proposalId={data.proposalId}
          checkProposalRequirements={checkProposalRequirements}
          match={this.props.match}
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
        <ClaimResultsButton
          checkProposalRequirements={checkProposalRequirements}
          match={this.props.match}
          isProposer={isProposer}
          history={history}
          proposal={data}
        />
        <ClaimFundingButton
          checkProposalRequirements={checkProposalRequirements}
          isProposer={isProposer}
          history={history}
          proposal={data}
        />
        <MilestoneCompletedButton
          checkProposalRequirements={checkProposalRequirements}
          isProposer={isProposer}
          history={history}
          proposal={data}
        />
      </Fragment>
    );
  }
}

const { object, bool, func } = PropTypes;

ParticipantButtons.propTypes = {
  addressDetails: object.isRequired,
  client: object.isRequired,
  DaoDetails: object.isRequired,
  history: object.isRequired,
  isProposer: bool.isRequired,
  match: object.isRequired,
  proposal: object.isRequired,
  showRightPanel: func.isRequired,
  translations: object.isRequired,
};

const mapStateToProps = ({ infoServer }) => ({
  DaoDetails: infoServer.DaoDetails.data,
});

export default withApollo(
  web3Connect(
    connect(
      mapStateToProps,
      {
        showRightPanel,
      }
    )(ParticipantButtons)
  )
);

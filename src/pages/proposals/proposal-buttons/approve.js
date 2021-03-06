import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Button from '@digix/gov-ui/components/common/elements/buttons/index';
import ApproveProposalOverlay from '@digix/gov-ui/components/common/blocks/overlay/approve-draft/index';
import web3Connect from 'spectrum-lightsuite/src/helpers/web3/connect';
import { showRightPanel } from '@digix/gov-ui/reducers/gov-ui/actions';
import { VotingStages } from '@digix/gov-ui/constants';

class ApproveProjectButton extends React.PureComponent {
  showOverlay = () => {
    const { history, proposalId, showRightPanelAction, translations, txnTranslations } = this.props;

    showRightPanelAction({
      component: (
        <ApproveProposalOverlay
          history={history}
          proposalId={proposalId}
          translations={translations}
          txnTranslations={txnTranslations}
        />
      ),
      show: true,
    });
  };

  render() {
    const {
      checkProposalRequirements,
      isModerator,
      proposal,
      translations: { buttons },
    } = this.props;
    if (!isModerator || !proposal.draftVoting || proposal.votingStage !== VotingStages.draft) {
      return null;
    }

    const approveDeadline = new Date(proposal.draftVoting.votingDeadline * 1000);
    const canApprove = approveDeadline > Date.now();
    if (!canApprove) {
      return null;
    }

    return (
      <Button large onClick={() => checkProposalRequirements(this.showOverlay)}>
        {buttons.moderatorVote}
      </Button>
    );
  }
}

const { bool, func, object, string } = PropTypes;

ApproveProjectButton.propTypes = {
  checkProposalRequirements: func.isRequired,
  isModerator: bool,
  proposal: object.isRequired,
  proposalId: string.isRequired,
  history: object.isRequired,
  showRightPanelAction: func.isRequired,
  translations: object.isRequired,
  txnTranslations: object.isRequired,
};

ApproveProjectButton.defaultProps = {
  isModerator: false,
};

const mapStateToProps = () => ({});

export default web3Connect(
  connect(
    mapStateToProps,
    {
      showRightPanelAction: showRightPanel,
    }
  )(ApproveProjectButton)
);

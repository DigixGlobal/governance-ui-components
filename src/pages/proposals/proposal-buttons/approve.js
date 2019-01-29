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
    const { history, proposalId, showRightPanelAction } = this.props;
    showRightPanelAction({
      component: <ApproveProposalOverlay history={history} proposalId={proposalId} />,
      show: true,
    });
  };

  render() {
    const { isModerator, proposal } = this.props;
    if (!isModerator || !proposal.draftVoting || proposal.votingStage !== VotingStages.draft) {
      return null;
    }

    const approveDeadline = new Date(proposal.draftVoting.votingDeadline * 1000);
    const canApprove = approveDeadline > Date.now();
    if (!canApprove) {
      return null;
    }

    return (
      <Button kind="round" large onClick={this.showOverlay}>
        Approve
      </Button>
    );
  }
}

const { bool, func, object, string } = PropTypes;

ApproveProjectButton.propTypes = {
  isModerator: bool,
  proposal: object.isRequired,
  proposalId: string.isRequired,
  history: object.isRequired,
  showRightPanelAction: func.isRequired,
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

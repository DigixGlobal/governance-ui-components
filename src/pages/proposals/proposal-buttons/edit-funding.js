import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Button from '@digix/gov-ui/components/common/elements/buttons/index';
import ChangeFundingOverlay from '@digix/gov-ui/components/common/blocks/overlay/change-funding';
import { showRightPanel } from '@digix/gov-ui/reducers/gov-ui/actions';
import { ProposalStages } from '@digix/gov-ui/constants';

class EditFundingButton extends React.PureComponent {
  onPanelClose = () => {
    this.props.onCompleted();
    this.props.showRightPanelAction({ show: false });
  };

  showOverlay = () => {
    const { history, showRightPanelAction } = this.props;
    showRightPanelAction({
      component: <ChangeFundingOverlay history={history} onCompleted={this.onPanelClose} />,
      show: true,
    });
  };

  render() {
    const { isProposer, proposal } = this.props;
    const canEdit = proposal.stage === ProposalStages.ongoing && isProposer;
    const proposalDetails = proposal.proposalVersions[proposal.proposalVersions.length - 1];
    const hasUnfinishedMilestones =
      proposal.currentMilestone < proposalDetails.milestoneFundings.length;

    if (!canEdit || !hasUnfinishedMilestones) return null;

    return (
      <Button kind="round" onClick={() => this.showOverlay()}>
        Edit Funding
      </Button>
    );
  }
}

const { bool, func, object } = PropTypes;

EditFundingButton.propTypes = {
  isProposer: bool,
  proposal: object.isRequired,
  history: object.isRequired,
  onCompleted: func.isRequired,
  showRightPanelAction: func.isRequired,
};

EditFundingButton.defaultProps = {
  isProposer: false,
};

const mapStateToProps = () => ({});

export default connect(
  mapStateToProps,
  {
    showRightPanelAction: showRightPanel,
  }
)(EditFundingButton);

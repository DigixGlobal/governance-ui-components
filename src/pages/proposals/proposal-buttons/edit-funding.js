import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Button from '@digix/gov-ui/components/common/elements/buttons/index';
import ChangeFundingOverlay from '@digix/gov-ui/components/common/blocks/overlay/change-funding';
import { showRightPanel } from '@digix/gov-ui/reducers/gov-ui/actions';
import { ProposalStages } from '@digix/gov-ui/constants';

class EditFundingButton extends React.PureComponent {
  onPanelClose = () => {
    this.props.showRightPanelAction({ show: false });
  };

  showOverlay = () => {
    const { history, proposal, showRightPanelAction, translations } = this.props;
    showRightPanelAction({
      component: (
        <ChangeFundingOverlay
          history={history}
          proposalDetails={proposal}
          onCompleted={this.onPanelClose}
          translations={translations}
        />
      ),
      show: true,
    });
  };

  editFunding() {
    this.props.checkProposalRequirements(this.showOverlay);
  }

  render() {
    const {
      isProposer,
      proposal,
      translations: { buttons },
    } = this.props;
    if (proposal.isSpecial) return null;
    const canEdit = proposal.stage === ProposalStages.ongoing && isProposer;
    const proposalDetails = proposal.proposalVersions[proposal.proposalVersions.length - 1];
    const hasUnfinishedMilestones =
      proposal.currentMilestone < proposalDetails.milestoneFundings.length;

    if (!canEdit || !hasUnfinishedMilestones) return null;

    return (
      <Button
        kind="round"
        large
        data-digix="ProposalAction-EditFunding"
        onClick={() => this.editFunding()}
      >
        {buttons.editFunding}
      </Button>
    );
  }
}

const { bool, func, object } = PropTypes;

EditFundingButton.propTypes = {
  checkProposalRequirements: func.isRequired,
  isProposer: bool,
  proposal: object.isRequired,
  history: object.isRequired,
  showRightPanelAction: func.isRequired,
  translations: object.isRequired,
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

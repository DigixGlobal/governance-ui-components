import React from 'react';
import PropTypes from 'prop-types';
import ProposalForms from '@digix/gov-ui/pages/proposals/forms/index';
import { withFetchProposal } from '@digix/gov-ui/api/graphql-queries/proposal';

class EditProposal extends React.Component {
  render() {
    const { history, proposalDetails } = this.props;

    return (
      <ProposalForms
        contractMethod="modifyProposal"
        dataDigixPrefix="Edit-Proposal"
        history={history}
        ProposalDetails={proposalDetails}
        submitButtonLabel="Update Now"
        successMessage="Your Edit Proposal Transaction is pending confirmation. See More"
        transactionTitle="Edit Proposal"
      />
    );
  }
}

const { object } = PropTypes;
EditProposal.propTypes = {
  proposalDetails: object.isRequired,
  history: object.isRequired,
};

export default withFetchProposal(EditProposal);

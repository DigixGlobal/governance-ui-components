import React from 'react';
import PropTypes from 'prop-types';
import ProposalForms from '@digix/gov-ui/pages/proposals/forms/index';

class CreateProposal extends React.Component {
  render() {
    const { history } = this.props;

    return (
      <ProposalForms
        contractMethod="submitPreproposal"
        dataDigixPrefix="Create-Proposal"
        history={history}
        submitButtonLabel="Create Now"
        successMessage="Your Create Proposal Transaction is pending confirmation. See More"
        transactionTitle="Submit Proposal"
      />
    );
  }
}

const { object } = PropTypes;
CreateProposal.propTypes = {
  history: object.isRequired,
};

export default CreateProposal;

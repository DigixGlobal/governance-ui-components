import React from 'react';
import PropTypes from 'prop-types';
import ProposalForms from '@digix/gov-ui/pages/proposals/forms/index';
import { connect } from 'react-redux';

class CreateProposal extends React.Component {
  render() {
    const {
      history,
      addressDetails: { isDigix },
      Translations: {
        data,
        data: {
          common: { buttons },
          snackbar: { snackbars },
        },
      },
    } = this.props;

    return (
      <ProposalForms
        contractMethod="submitPreproposal"
        dataDigixPrefix="Create-Proposal"
        history={history}
        submitButtonLabel={buttons.createNow}
        successMessage={snackbars.createProject.message}
        transactionTitle={snackbars.createProject.title}
        translations={data}
        isDigix={isDigix}
      />
    );
  }
}

const { object } = PropTypes;
CreateProposal.propTypes = {
  history: object.isRequired,
  Translations: object.isRequired,
  addressDetails: object.isRequired,
};

const mapStateToProps = state => ({
  Translations: state.daoServer.Translations,
  addressDetails: state.infoServer.AddressDetails.data,
});

export default connect(mapStateToProps)(CreateProposal);

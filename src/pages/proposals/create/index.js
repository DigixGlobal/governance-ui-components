import React from 'react';
import PropTypes from 'prop-types';
import ProposalForms from '@digix/gov-ui/pages/proposals/forms/index';
import { connect } from 'react-redux';

class CreateProposal extends React.Component {
  render() {
    const {
      history,
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
      />
    );
  }
}

const { object } = PropTypes;
CreateProposal.propTypes = {
  history: object.isRequired,
  Translations: object.isRequired,
};

const mapStateToProps = state => ({
  Translations: state.daoServer.Translations,
});

export default connect(mapStateToProps)(CreateProposal);

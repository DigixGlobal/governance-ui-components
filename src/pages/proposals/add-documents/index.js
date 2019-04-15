import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Documents from '@digix/gov-ui/pages/proposals/forms/documents';

class AddDocuments extends React.PureComponent {
  render() {
    return <Documents {...this.props} />;
  }
}

const { object } = PropTypes;

AddDocuments.propTypes = {
  history: object.isRequired,
  Translations: object.isRequired,
};

const mapStateToProps = state => ({
  Translations: state.daoServer.Translations,
});

export default connect(mapStateToProps)(AddDocuments);

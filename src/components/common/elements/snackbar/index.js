import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import { showHideAlert } from '@digix/gov-ui/reducers/gov-ui/actions';

import { SnackbarContainer, SnackbarDesc, SnackbarAction } from './style';

class Snackbar extends React.Component {
  componentWillReceiveProps = nextProps => {
    const { alertData } = nextProps;
    if (alertData && alertData.message) {
      this.interval = setInterval(
        () => this.props.showHideAlert({ message: undefined }),
        1000 * 10
      );
    }
  };

  render() {
    const { alertData } = this.props;
    if (!alertData || !alertData.message) return null;
    //   return alertData.message && <Container>{alertData.message}</Container>;
    // }
    return (
      <SnackbarContainer>
        <SnackbarDesc>Monkeys are now bringing your vote to the Ethereum tree</SnackbarDesc>
        <SnackbarAction>SEE IT HAPPEN FIRST HAND!</SnackbarAction>
      </SnackbarContainer>
    );
  }
}

Snackbar.propTypes = {
  alertData: PropTypes.object,
  showHideAlert: PropTypes.func.isRequired,
};

Snackbar.defaultProps = {
  alertData: undefined,
};

export default connect(
  ({ govUI: { Alert: alertData } }) => ({
    alertData,
  }),
  { showHideAlert }
)(Snackbar);

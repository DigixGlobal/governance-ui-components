import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { showHideAlert } from '@digix/gov-ui/reducers/gov-ui/actions';
import { ETHERSCAN_URL } from '@digix/gov-ui/constants';

import { SnackbarContainer, SnackbarDesc, SnackbarAction, TransactionLink } from './style';

class Snackbar extends React.Component {
  componentWillReceiveProps = nextProps => {
    const { alertData } = nextProps;
    if (alertData && alertData.message) {
      this.interval = setTimeout(() => this.props.showHideAlert({ message: undefined }), 1000 * 5);
    }
  };

  render() {
    const { alertData } = this.props;
    if (!alertData || !alertData.message) return null;
    return (
      <SnackbarContainer data-digix="Snackbar-Container">
        <SnackbarDesc>
          <TransactionLink to="/history" href="/history" data-digix="Snackbar-Message">
            {alertData.message}
          </TransactionLink>
        </SnackbarDesc>
        {alertData.txHash && (
          <SnackbarAction
            href={`${ETHERSCAN_URL}${alertData.txHash}`}
            target="_blank"
            data-digix="Snackbar-Hash"
          >
            {alertData.txHash}
          </SnackbarAction>
        )}
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

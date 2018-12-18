import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import { showHideAlert } from '@digix/gov-ui/reducers/gov-ui/actions';
import { ETHERSCAN_URL } from '@digix/gov-ui/constants';

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
    console.log({ alertData });
    if (!alertData || !alertData.message) return null;

    return (
      <SnackbarContainer>
        <SnackbarDesc>
          {alertData.message || 'Monkeys are now bringing your vote to the Ethereum tree'}
        </SnackbarDesc>
        {alertData.txHash && (
          <SnackbarAction href={`${ETHERSCAN_URL}${alertData.txHash}`}>
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

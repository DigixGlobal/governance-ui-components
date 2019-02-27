import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import { showHideAlert } from '@digix/gov-ui/reducers/reducers/gov-ui/actions';

import { Container } from './style';

class Alert extends React.PureComponent {
  componentWillReceiveProps = nextProps => {
    const { alertData } = nextProps;
    if (alertData && alertData.message) {
      this.interval = setInterval(
        () => this.props.showHideAlert({ message: undefined }),
        1000 * 10
      );
    }
  };

  componentWillUnmount = () => {
    this.interval = undefined;
  };

  render() {
    const { alertData } = this.props;
    if (!alertData || !alertData.message) return null;
    return alertData.message && <Container>{alertData.message}</Container>;
  }
}
Alert.propTypes = {
  alertData: PropTypes.object,
  showHideAlert: PropTypes.func.isRequired,
};

Alert.defaultProps = {
  alertData: undefined,
};

export default connect(
  ({ govUI: { Alert: alertData } }) => ({
    alertData,
  }),
  { showHideAlert }
)(Alert);

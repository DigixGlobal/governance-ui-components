import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import { showHideAlert } from '../../../../reducers/gov-ui/actions';

import { Container } from './style';

class Alert extends React.Component {
  // componentDidMount = () => {
  //   const { alertData } = this.props;
  //   if (alertData && alertData.message) {
  //     this.interval = setInterval(()=>{
  //       this.props.showHideAlert(undefined);
  //     })
  //   }
  // };

  render() {
    const { alertData } = this.props;

    return alertData && <Container>{alertData.message}</Container>;
  }
}
Alert.propTypes = {
  alertData: PropTypes.string,
  showHideAlert: PropTypes.func.isRequired,
};

Alert.defaultProps = {
  alertData: '',
};

export default connect(
  ({ govUI: { Alert: alertData } }) => ({
    alertData,
  }),
  { showHideAlert }
)(Alert);

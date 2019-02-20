import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import { getDefaultAddress } from 'spectrum-lightsuite/src/selectors';
import { getAddressDetails } from '@digix/gov-ui/reducers/info-server/actions';

class AddressWatcher extends React.PureComponent {
  componentDidMount = () => {
    const { defaultAddress } = this.props;
    if (defaultAddress && defaultAddress.address) {
      this.props.getAddressDetails(defaultAddress.address);
    }
    console.log('ahem');
  };
  render() {
    return <div>watching {JSON.stringify(this.props)}</div>;
  }
}

const { object, func } = PropTypes;
AddressWatcher.propTypes = {
  defaultAddress: object,
  getAddressDetails: func.isRequired,
};

AddressWatcher.defaultProps = {
  defaultAddress: undefined,
};
const mapStateToProps = state => ({
  AddressDetails: state.infoServer.AddressDetails,
  defaultAddress: getDefaultAddress(state),
  // lockDgdOverlay: state.govUI.lockDgdOverlay,
  // addressMaxAllowance: state.govUI.addressMaxAllowance,
  // challengeProof: state.daoServer.ChallengeProof,
  // DaoDetails: state.infoServer.DaoDetails,
  // addresses: getAddresses(state),
  // enableLockDgd: state.govUI.CanLockDgd,
});

export default connect(
  mapStateToProps,
  {
    // showHideAlert,
    // showHideWalletOverlay,
    // showHideLockDgdOverlay,
    // canLockDgd,
    getAddressDetails,
    // getDaoDetails,
    // fetchMaxAllowance,
    // showTxSigningModal,
    // sendTransactionToDaoServer,
  }
)(AddressWatcher);

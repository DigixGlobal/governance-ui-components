import React from 'react';
import PropTypes from 'prop-types';

import { getDefaultAddress } from 'spectrum-lightsuite/src/selectors';
import { connect } from 'react-redux';

import { showHideLockDgdOverlay } from '../../../../reducers/gov-ui/actions';

import Button from '../../elements/buttons/';

import { WalletWrapper, AddressLabel } from './style';

class Wallet extends React.Component {
  render() {
    const { onWalletClick, defaultAddress, addressDetails, showHideLockDgd } = this.props;
    const canLockDgd = defaultAddress && addressDetails.data !== 'notFound';
    return (
      <WalletWrapper>
        {!defaultAddress && (
          <Button kind="capsule" primary sm onClick={onWalletClick}>
            {'Load Wallet'}
          </Button>
        )}
        {canLockDgd && (
          <Button kind="capsule" primary sm onClick={showHideLockDgd}>
            {'Lock DGD'}
          </Button>
        )}
        {defaultAddress && <AddressLabel>{defaultAddress.address}</AddressLabel>}
      </WalletWrapper>
    );
  }
}

const { func, string, object, oneOfType } = PropTypes;
Wallet.propTypes = {
  onWalletClick: func.isRequired,
  showHideLockDgd: func.isRequired,
  defaultAddress: oneOfType([string, object]),
  addressDetails: object,
};

Wallet.defaultProps = {
  defaultAddress: undefined,
  addressDetails: undefined,
};

const mapStateToProps = state => ({
  defaultAddress: getDefaultAddress(state),
  addressDetails: state.infoServer.AddressDetails,
});

export default connect(
  mapStateToProps,
  { showHideLockDgd: showHideLockDgdOverlay }
)(Wallet);

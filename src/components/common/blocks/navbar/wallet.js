import React from 'react';
import PropTypes from 'prop-types';

import { getDefaultAddress } from 'spectrum-lightsuite/src/selectors';
import { connect } from 'react-redux';

import { showHideLockDgdOverlay } from '../../../../reducers/gov-ui/actions';

import Button from '../../elements/buttons/';

import { WalletWrapper, AddressLabel } from './style';

class WalletButton extends React.Component {
  render() {
    const { onWalletClick, defaultAddress, showHideLockDgd, canLockDgd } = this.props;
    return (
      <WalletWrapper>
        {!defaultAddress && (
          <Button kind="round" primary sm ghost onClick={onWalletClick}>
            {'Load Wallet'}
          </Button>
        )}
        {canLockDgd &&
          canLockDgd.show && (
            <Button kind="round" primary sm ghost onClick={showHideLockDgd}>
              {'Lock DGD'}
            </Button>
          )}
        {defaultAddress && <AddressLabel>{defaultAddress.address}</AddressLabel>}
      </WalletWrapper>
    );
  }
}

const { func, string, object, oneOfType } = PropTypes;
WalletButton.propTypes = {
  onWalletClick: func.isRequired,
  showHideLockDgd: func.isRequired,
  defaultAddress: oneOfType([string, object]),
  addressDetails: object,
  canLockDgd: object,
};

WalletButton.defaultProps = {
  defaultAddress: undefined,
  addressDetails: undefined,
  canLockDgd: undefined,
};

const mapStateToProps = state => ({
  defaultAddress: getDefaultAddress(state),
  addressDetails: state.infoServer.AddressDetails,
  canLockDgd: state.govUI.CanLockDgd,
});

export default connect(
  mapStateToProps,
  { showHideLockDgd: showHideLockDgdOverlay }
)(WalletButton);

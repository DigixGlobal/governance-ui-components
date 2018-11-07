import React from 'react';
import PropTypes from 'prop-types';

import { getDefaultAddress } from 'spectrum-lightsuite/src/selectors';
import { connect } from 'react-redux';

import { showHideLockDgdOverlay } from '../../../../reducers/gov-ui/actions';

import Button from '../../elements/buttons/';

import { WalletWrapper, AddressLabel } from './style';

class Wallet extends React.Component {
  render() {
    const { onWalletClick, defaultAddress, showHideLockDgd } = this.props;
    return (
      <WalletWrapper>
        {!defaultAddress && (
          <Button kind="capsule" ghostBtnSm onClick={onWalletClick}>
            {'Load Wallet'}
          </Button>
        )}
        {defaultAddress && (
          <Button kind="capsule" ghostBtnSm onClick={showHideLockDgd}>
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
};

Wallet.defaultProps = {
  defaultAddress: undefined,
};

const mapStateToProps = state => ({
  defaultAddress: getDefaultAddress(state),
});

export default connect(
  mapStateToProps,
  { showHideLockDgd: showHideLockDgdOverlay }
)(Wallet);

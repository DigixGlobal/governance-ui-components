import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { getDefaultAddress } from 'spectrum-lightsuite/src/selectors';
import { connect } from 'react-redux';

import Button from '@digix/gov-ui/components/common/elements/buttons/';
import { WalletWrapper, AddressLabel } from '@digix/gov-ui/components/common/blocks/navbar/style';

import {
  showHideLockDgdOverlay,
  showHideWalletOverlay,
} from '@digix/gov-ui/reducers/gov-ui/actions';

class WalletButton extends React.Component {
  onWalletClick = () => {
    this.props.showHideWalletOverlay(true);
  };

  render() {
    const { defaultAddress, showHideLockDgd, canLockDgd } = this.props;

    return (
      <WalletWrapper>
        {!defaultAddress && (
          <Button
            kind="round"
            primary
            small
            data-digix="Header-LoadWallet"
            onClick={() => this.onWalletClick()}
          >
            Load Wallet
          </Button>
        )}
        {canLockDgd && canLockDgd.show && (
          <Button
            kind="round"
            primary
            small
            data-digix="Header-LockDgd"
            onClick={() => showHideLockDgd(true)}
          >
            Lock DGD
          </Button>
        )}
        {defaultAddress && (
          <Fragment>
            <Button
              kind="round"
              primary
              small
              data-digix="Header-LoadWallet"
              onClick={() => window.location.reload()}
            >
              Logout
            </Button>
            <AddressLabel data-digix="Header-Address">{defaultAddress.address}</AddressLabel>
          </Fragment>
        )}
      </WalletWrapper>
    );
  }
}

const { func, string, object, oneOfType } = PropTypes;
WalletButton.propTypes = {
  showHideLockDgd: func.isRequired,
  showHideWalletOverlay: func.isRequired,
  defaultAddress: oneOfType([string, object]),
  canLockDgd: object,
};

WalletButton.defaultProps = {
  defaultAddress: undefined,
  canLockDgd: undefined,
};

const mapStateToProps = state => ({
  defaultAddress: getDefaultAddress(state),
  addressDetails: state.infoServer.AddressDetails,
  canLockDgd: state.govUI.CanLockDgd,
});

export default connect(
  mapStateToProps,
  {
    showHideLockDgd: showHideLockDgdOverlay,
    showHideWalletOverlay,
  }
)(WalletButton);

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { getDefaultAddress } from 'spectrum-lightsuite/src/selectors';
import { connect } from 'react-redux';

import { Accordion, Button, Icon } from '@digix/gov-ui/components/common/elements/index';
import {
  NavItem,
  AddressButton,
  Dropdown,
  DropdownMenu,
  MenuItem,
} from '@digix/gov-ui/components/common/blocks/navbar/style';

import {
  showHideLockDgdOverlay,
  showHideWalletOverlay,
} from '@digix/gov-ui/reducers/gov-ui/actions';

class WalletButton extends React.Component {
  state = {
    open: false,
  };

  onWalletClick = () => {
    this.props.showHideWalletOverlay(true);
  };

  showDropdownMenu = () => {
    this.setState(state => ({
      open: !state.open,
    }));
  };

  showLockDgdOverlay = () => {
    this.props.showHideLockDgd(true, null, 'Header');
  };

  render() {
    if (this.props.HasCountdown) {
      return null;
    }

    const { defaultAddress, canLockDgd } = this.props;
    return (
      <Fragment>
        <NavItem cta>
          {!defaultAddress && (
            <Button
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
              primary
              xsmall
              data-digix="Header-LockDgd"
              onClick={() => this.showLockDgdOverlay()}
            >
              Lock DGD
            </Button>
          )}
        </NavItem>

        {defaultAddress && (
          <NavItem wallet>
            <AddressButton
              kind="link"
              xsmall
              data-digix="Header-Address"
              onClick={() => this.showDropdownMenu()}
            >
              <span>{defaultAddress.address}</span>
              <Icon kind="arrow" />
            </AddressButton>

            {this.state.open && (
              <DropdownMenu>
                <MenuItem>
                  <Button
                    kind="text"
                    primary
                    small
                    data-digix="Header-LoadWallet"
                    onClick={() => window.location.reload()}
                  >
                    Logout
                  </Button>
                </MenuItem>
              </DropdownMenu>
            )}
          </NavItem>
        )}
      </Fragment>
    );
  }
}

const { bool, func, string, object, oneOfType } = PropTypes;
WalletButton.propTypes = {
  showHideLockDgd: func.isRequired,
  showHideWalletOverlay: func.isRequired,
  defaultAddress: oneOfType([string, object]),
  canLockDgd: object,
  HasCountdown: bool.isRequired,
};

WalletButton.defaultProps = {
  defaultAddress: undefined,
  canLockDgd: undefined,
};

const mapStateToProps = state => ({
  defaultAddress: getDefaultAddress(state),
  addressDetails: state.infoServer.AddressDetails,
  canLockDgd: state.govUI.CanLockDgd,
  HasCountdown: state.govUI.HasCountdown,
});

export default connect(
  mapStateToProps,
  {
    showHideLockDgd: showHideLockDgdOverlay,
    showHideWalletOverlay,
  }
)(WalletButton);

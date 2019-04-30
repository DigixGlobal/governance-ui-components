import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { getDefaultAddress } from 'spectrum-lightsuite/src/selectors';
import { connect } from 'react-redux';

import { withAppUser } from '@digix/gov-ui/api/graphql-queries/users';
import { Button, Icon } from '@digix/gov-ui/components/common/elements/index';
import {
  NavItem,
  TransButton,
  Selector,
  Item,
} from '@digix/gov-ui/components/common/blocks/navbar/style';

import {
  showHideLockDgdOverlay,
  showHideWalletOverlay,
  showRightPanel,
} from '@digix/gov-ui/reducers/gov-ui/actions';

import ErrorMessageOverlay from '@digix/gov-ui/components/common/blocks/overlay/error-message';
import { LogLoadWallet } from '@digix/gov-ui/analytics/loadWallet';

class WalletButton extends React.Component {
  state = {
    open: false,
  };

  onWalletClick = () => {
    LogLoadWallet.initiate();
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

  showErrorOverlay(errors) {
    const {
      common: { proposalErrors },
    } = this.props.translations;
    this.props.showRightPanel({
      component: (
        <ErrorMessageOverlay
          errors={[errors]}
          location={proposalErrors.returnToDashboard}
          translations={this.props.translations.data}
        />
      ),
      show: true,
    });
  }

  render() {
    if (this.props.HasCountdown || !this.props.translations.loadWallet) {
      return null;
    }

    const { defaultAddress, canLockDgd, appUser } = this.props;
    const tHeader = this.props.translations.header;
    const {
      loadWallet: { banned },
    } = this.props.translations;

    return (
      <Fragment>
        <NavItem cta>
          {!defaultAddress && (
            <Button
              primary
              small
              data-digix="Header-LoadWallet"
              onClick={() =>
                appUser.isUnavailable
                  ? this.showErrorOverlay({
                      title: banned.title || "DigixDAO isn't available in your country yet",
                      details:
                        banned.details ||
                        'Please contact us via the Help button below for any enquiries.',
                      description:
                        banned.description || "You don't have permission to view this page.",
                    })
                  : this.onWalletClick()
              }
            >
              {tHeader.loadWallet || 'Load Wallet'}
            </Button>
          )}
          {canLockDgd && canLockDgd.show && (
            <Button
              primary
              xsmall
              data-digix="Header-LockDgd"
              onClick={() => this.showLockDgdOverlay()}
            >
              {tHeader.lockDgd || 'Lock DGD'}
            </Button>
          )}
        </NavItem>

        {defaultAddress && (
          <NavItem dropdown wallet>
            <TransButton
              kind="link"
              data-digix="Header-Address"
              onClick={() => this.showDropdownMenu()}
            >
              <span className="wallet">{defaultAddress.address}</span>
              <Icon kind="arrow" />
            </TransButton>

            <Selector>
              <Item>
                <Button
                  kind="text"
                  primary
                  small
                  data-digix="Header-LoadWallet"
                  onClick={() => window.location.reload()}
                >
                  {tHeader.logout || 'Logout'}
                </Button>
              </Item>
            </Selector>
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
  translations: object,
  showRightPanel: func.isRequired,
  appUser: PropTypes.object.isRequired,
};

WalletButton.defaultProps = {
  defaultAddress: undefined,
  canLockDgd: undefined,
  translations: {
    header: {},
  },
};

const mapStateToProps = state => ({
  defaultAddress: getDefaultAddress(state),
  addressDetails: state.infoServer.AddressDetails,
  canLockDgd: state.govUI.CanLockDgd,
  HasCountdown: state.govUI.HasCountdown,
  translations: state.daoServer.Translations.data,
});

export default connect(
  mapStateToProps,
  {
    showHideLockDgd: showHideLockDgdOverlay,
    showHideWalletOverlay,
    showRightPanel,
  }
)(withAppUser(WalletButton));

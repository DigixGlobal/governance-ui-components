import PropTypes from 'prop-types';
import { LogLoadWallet } from '@digix/gov-ui/analytics/loadWallet';
import { getDefaultAddress } from 'spectrum-lightsuite/src/selectors';
import { connect } from 'react-redux';
import { showHideWalletOverlay } from '@digix/gov-ui/reducers/gov-ui/actions';
import { withTranslation } from 'react-i18next';
import {
  Button,
  Icon,
} from '@digix/gov-ui/components/common/elements/index';
import {
  NavItem,
  TransButton,
  Selector,
  Item,
} from '@digix/gov-ui/components/common/blocks/navbar/style';
import React, { Fragment } from 'react';

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

  render() {
    const { defaultAddress, t } = this.props;

    return (
      <Fragment>
        <NavItem cta>
          {!defaultAddress && (
            <Button
              primary
              small
              data-digix="Header-LoadWallet"
              onClick={this.onWalletClick}
            >
              {t('loadWallet')}
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
                  {t('logout')}
                </Button>
              </Item>
            </Selector>
          </NavItem>
        )}
      </Fragment>
    );
  }
}

const {
  func,
  string,
  object,
  oneOfType,
} = PropTypes;

WalletButton.propTypes = {
  defaultAddress: oneOfType([string, object]),
  showHideWalletOverlay: func.isRequired,
  t: func.isRequired,
};

WalletButton.defaultProps = {
  defaultAddress: undefined,
};

const mapStateToProps = state => ({
  defaultAddress: getDefaultAddress(state),
});

export default withTranslation('Header')(
  connect(
    mapStateToProps, { showHideWalletOverlay }
  )(WalletButton)
);

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getDefaultAddress } from 'spectrum-lightsuite/src/selectors';
import { connect } from 'react-redux';
import Icon from '@digix/gov-ui/components/common/elements/icons/';
import lightTheme from '@digix/gov-ui/theme/light';

import {
  MenuContainer,
  ProfileContainer,
  Welcome,
  UserType,
  MenuList,
  MenuItem,
} from '@digix/gov-ui/components/common/blocks/collapsible-menu/style.js';

const DEFAULT_MENU = [
  {
    kind: 'home',
    caption: 'Home',
    url: '/',
    public: true,
  },
  {
    kind: 'activity',
    caption: 'Activity',
    url: '/activity',
    public: true,
  },
  {
    kind: 'wallet',
    caption: 'Wallet',
    url: '/wallet',
    public: true,
  },
  {
    kind: 'profile',
    caption: 'Profile',
    url: '/profile',
    public: false,
  },
  {
    kind: 'history',
    caption: 'Transaction History',
    url: '/history',
    public: true,
  },
  {
    kind: 'product',
    caption: 'Help / DAO Tour',
    url: '/help',
    public: true,
  },
];

class CollapsibleMenu extends React.Component {
  getUserType = details => {
    if (!details) {
      return null;
    }

    if (details.data.isModerator) {
      return 'Moderator';
    }

    if (details.data.isParticipant) {
      return 'Participant';
    }

    return null;
  };

  renderMenuItem = item => {
    const { ChallengeProof, location, theme } = this.props;
    const authorized = ChallengeProof.data && ChallengeProof.data.client;
    const samePath = location.pathname.toLowerCase() === item.url.toLowerCase();

    if (!item.public && !authorized) {
      return null;
    }

    return (
      <MenuItem key={item.caption} selected={samePath}>
        <Link to={item.url} href={item.url}>
          <Icon kind={item.kind} theme={theme || lightTheme} selected={samePath} />
          <span>{item.caption}</span>
        </Link>
      </MenuItem>
    );
  };

  render() {
    const { addressDetails, defaultAddress, menuItems } = this.props;
    const userType = this.getUserType(addressDetails);
    const menu = menuItems || DEFAULT_MENU;
    const menuItemElements = menu.map(item => this.renderMenuItem(item));

    return (
      <MenuContainer>
        {defaultAddress && (
          <ProfileContainer>
            <Welcome>
              Welcome, <span>{defaultAddress.address}</span>
            </Welcome>
            <UserType>{userType}</UserType>
          </ProfileContainer>
        )}

        <MenuList>{menuItemElements}</MenuList>
      </MenuContainer>
    );
  }
}

const { array, object } = PropTypes;
CollapsibleMenu.propTypes = {
  menuItems: array,
  theme: object,
  defaultAddress: object,
  addressDetails: object,
  location: object.isRequired,
  ChallengeProof: object,
};

CollapsibleMenu.defaultProps = {
  menuItems: DEFAULT_MENU,
  theme: lightTheme,
  defaultAddress: undefined,
  addressDetails: undefined,
  ChallengeProof: undefined,
};

const mapStateToProps = state => ({
  defaultAddress: getDefaultAddress(state),
  addressDetails: state.infoServer.AddressDetails,
  ChallengeProof: state.daoServer.ChallengeProof,
});

export default connect(
  mapStateToProps,
  {}
)(CollapsibleMenu);

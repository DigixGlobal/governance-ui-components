import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { getDefaultAddress } from 'spectrum-lightsuite/src/selectors';

import { connect } from 'react-redux';

import Icon from '@digix/gov-ui/components/common/elements/icons/';
import lightTheme from '@digix/gov-ui/theme/light';

import {
  MenuContainer,
  // CloseMenu,
  ProfileContainer,
  Welcome,
  UserType,
  MenuList,
  MenuItem,
} from './style';

const mockMenu = [
  { kind: 'home', caption: 'Home', url: '/' },
  { kind: 'activity', caption: 'Activity', url: '/activity' },
  { kind: 'wallet', caption: 'Wallet', url: '/wallet' },
  { kind: 'profile', caption: 'Profile', url: '/profile' },
  { kind: 'history', caption: 'Transaction History', url: '/history' },
  { kind: 'product', caption: 'Help / DAO Tour', url: '/help' },
];

const getUserType = details => {
  if (!details) return null;

  if (details.data.isModerator) return 'Moderator';
  if (details.data.isParticipant) return 'Participant';

  return null;
};
class CollapsibleMenu extends React.Component {
  render() {
    const {
      defaultAddress,
      menuItems,
      theme,
      addressDetails,
      location: { pathname },
    } = this.props;

    const menu = menuItems || mockMenu;
    return (
      <MenuContainer>
        {defaultAddress && (
          <ProfileContainer>
            <Welcome>
              Welcome, <span>{defaultAddress.address}</span>
            </Welcome>
            <UserType>{getUserType(addressDetails)}</UserType>
          </ProfileContainer>
        )}
        <MenuList>
          {menu.map(item => {
            const samePath = pathname.toLowerCase() === item.url.toLowerCase();
            return (
              <MenuItem key={item.caption} selected={samePath}>
                <Link to={item.url} href={item.url}>
                  <Icon kind={item.kind} theme={theme || lightTheme} selected={samePath} />
                  <span>{item.caption}</span>
                </Link>
              </MenuItem>
            );
          })}
        </MenuList>
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
};

CollapsibleMenu.defaultProps = {
  menuItems: mockMenu,
  theme: lightTheme,
  defaultAddress: undefined,
  addressDetails: undefined,
};

const mapStateToProps = state => ({
  defaultAddress: getDefaultAddress(state),
  addressDetails: state.infoServer.AddressDetails,
});

export default connect(
  mapStateToProps,
  {}
)(CollapsibleMenu);

import React from 'react';
import PropTypes from 'prop-types';

import { getDefaultAddress } from 'spectrum-lightsuite/src/selectors';

import { connect } from 'react-redux';

import lightTheme from '../../../../theme/light';

import {
  MenuContainer,
  // CloseMenu,
  ProfileContainer,
  Welcome,
  UserType,
  MenuList,
  MenuItem,
} from './style';

import Icon from '../../elements/icons/';

const mockMenu = [
  { kind: 'home', caption: 'Home', selected: true },
  { kind: 'activity', caption: 'Activity' },
  { kind: 'wallet', caption: 'Wallet' },
  { kind: 'profile', caption: 'Profile' },
  { kind: 'product', caption: 'Help / DAO Tour' },
];
class CollapsibleMenu extends React.Component {
  render() {
    const { defaultAddress, menuItems, theme, userType } = this.props;
    const menu = menuItems || mockMenu;
    return (
      <MenuContainer>
        {defaultAddress && (
          <ProfileContainer>
            <Welcome>
              Welcome <span>{defaultAddress.address}</span>
            </Welcome>
            <UserType>{userType}</UserType>
          </ProfileContainer>
        )}
        <MenuList>
          {menu.map(item => (
            <MenuItem key={item.caption} selected={item.selected}>
              <Icon kind={item.kind} theme={theme || lightTheme} selected={item.selected} />
              <span>{item.caption}</span>
            </MenuItem>
          ))}
        </MenuList>
      </MenuContainer>
    );
  }
}

const { string, array, object } = PropTypes;
CollapsibleMenu.propTypes = {
  userType: string,
  menuItems: array,
  theme: object,
  defaultAddress: object,
};

CollapsibleMenu.defaultProps = {
  userType: 'Badge Holder',
  menuItems: mockMenu,
  theme: lightTheme,
  defaultAddress: undefined,
};

const mapStateToProps = state => ({
  defaultAddress: getDefaultAddress(state),
});

export default connect(
  mapStateToProps,
  {}
)(CollapsibleMenu);

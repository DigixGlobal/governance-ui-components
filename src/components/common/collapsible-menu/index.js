import React from 'react';
import PropTypes from 'prop-types';

import lightTheme from '../../../theme/light';

import {
  MenuContainer,
  // CloseMenu,
  ProfileContainer,
  Welcome,
  UserType,
  MenuList,
  MenuItem,
} from './style';

import Icon from '../elements/Icons/';

const mockMenu = [
  { kind: 'home', caption: 'Home' },
  { kind: 'activity', caption: 'Activity' },
  { kind: 'wallet', caption: 'Wallet' },
  { kind: 'profile', caption: 'Profile' },
  { kind: 'product', caption: 'Help / DAO Tour' },
];
class CollapsibleMenu extends React.Component {
  render() {
    const { address, menuItems, theme, userType } = this.props;
    const menu = menuItems || mockMenu;
    return (
      <MenuContainer>
        <ProfileContainer>
          <Welcome>
            Welcome <span>{address}</span>
          </Welcome>
          <UserType>{userType}</UserType>
        </ProfileContainer>
        <MenuList>
          {menu.map(item => (
            <MenuItem>
              <Icon kind={item.kind} theme={theme || lightTheme} />
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
  address: string,
  userType: string,
  menuItems: array,
  theme: object,
};

CollapsibleMenu.defaultProps = {
  address: '0x9f56f330bceb9d4e756be94581298673e94ed592',
  userType: 'Badge Holder',
  menuItems: mockMenu,
  theme: lightTheme,
};

export default CollapsibleMenu;

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

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
  { kind: 'home', caption: 'Home', selected: true, url: '/' },
  { kind: 'activity', caption: 'Activity', url: '/' },
  { kind: 'wallet', caption: 'Wallet', url: '/' },
  { kind: 'profile', caption: 'Profile', url: '/' },
  { kind: 'product', caption: 'Help / DAO Tour', url: '/' },
  {
    kind: 'product',
    caption: 'Tmp Create Proposal',
    url: '/proposals/create',
  },
  {
    kind: 'product',
    caption: 'Tmp Draft Proposal',
    url: '/proposals/draft/',
  },
  {
    kind: 'product',
    caption: 'Tmp Preview Proposal',
    url: '/proposals/preview/',
  },
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
              <Link to={item.url} href={item.url}>
                <Icon kind={item.kind} theme={theme || lightTheme} selected={item.selected} />
                <span>{item.caption}</span>
              </Link>
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

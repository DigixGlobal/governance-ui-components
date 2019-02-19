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
];

const getUserType = details => {
  if (!details) return null;

  if (details.data.isModerator) return 'Moderator';
  if (details.data.isParticipant) return 'Participant';

  return null;
};
class CollapsibleMenu extends React.Component {
  render() {
    const { defaultAddress, menuItems, theme, addressDetails } = this.props;

    const menu = menuItems || mockMenu;
    return (
      <MenuContainer>
        {defaultAddress && (
          <ProfileContainer>
            <Welcome>
              Welcome <span>{defaultAddress.address}</span>
            </Welcome>
            <UserType>{getUserType(addressDetails)}</UserType>
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

const { array, object } = PropTypes;
CollapsibleMenu.propTypes = {
  menuItems: array,
  theme: object,
  defaultAddress: object,
  addressDetails: object,
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

import React from 'react';
// import PropTypes from 'prop-types';

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
// import { Avatar } from '../common-styles';

import Icon from '../elements/Icons/';
// import profilePic from '../../../assets/images/realtor-1.jpeg';

class CollapsibleMenu extends React.Component {
  render() {
    // const { closeText } = this.props;
    return (
      <MenuContainer>
        <ProfileContainer>
          <Welcome>
            Welcome <span>0x9f56f330bceb9d4e756be94581298673e94ed592</span>
          </Welcome>
          <UserType>Badge Holder</UserType>
        </ProfileContainer>
        <MenuList>
          <MenuItem>
            <Icon kind="home" theme={lightTheme} />
            <span>Home</span>
          </MenuItem>
          <MenuItem>
            <Icon kind="activity" theme={lightTheme} />
            <span>Activity</span>
          </MenuItem>
          <MenuItem>
            <Icon kind="wallet" theme={lightTheme} />
            <span>Wallet</span>
          </MenuItem>
          <MenuItem>
            <Icon kind="profile" theme={lightTheme} />
            <span>Profile</span>
          </MenuItem>
          <MenuItem>
            <Icon kind="product" theme={lightTheme} />
            <span>Help / DAO Tour</span>
          </MenuItem>
        </MenuList>
      </MenuContainer>
    );
  }
}

// const { string } = PropTypes;
CollapsibleMenu.propTypes = {
  // closeText: string,
};

CollapsibleMenu.defaultProps = {
  // closeText: 'close',
};

export default CollapsibleMenu;

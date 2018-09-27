import React from 'react';
import PropTypes from 'prop-types';

import {
  MenuContainer,
  CloseMenu,
  ProfileContainer,
  Welcome,
  UserType,
  MenuList,
  MenuItem,
} from './style';
import { Avatar } from '../common-styles';

import Icon from '../../icons/icon';
import profilePic from '../../../assets/images/realtor-1.jpeg';

class CollapsibleMenu extends React.Component {
  render() {
    const { closeText } = this.props;
    return (
      <MenuContainer>
        <CloseMenu>
          {closeText || 'close'} <Icon width="3rem" height="3rem" kind="close" />
        </CloseMenu>
        <div style={{ clear: 'both' }} />
        <ProfileContainer>
          <Avatar src={profilePic} />
          <Welcome>Welcome, John Doe</Welcome>
          <UserType>Badge Holder</UserType>
        </ProfileContainer>
        <MenuList>
          <MenuItem>dash board</MenuItem>
          <MenuItem>preliminary ideas</MenuItem>
          <MenuItem>draft phase</MenuItem>
          <MenuItem>voting phase</MenuItem>
          <MenuItem>interim voting phase</MenuItem>
          <MenuItem>wallet</MenuItem>
          <MenuItem>rewards</MenuItem>
        </MenuList>
      </MenuContainer>
    );
  }
}

const { string } = PropTypes;
CollapsibleMenu.propTypes = {
  closeText: string,
};

CollapsibleMenu.defaultProps = {
  closeText: 'close',
};

export default CollapsibleMenu;

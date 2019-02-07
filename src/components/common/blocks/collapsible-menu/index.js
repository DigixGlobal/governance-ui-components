import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { push as Menu } from 'react-burger-menu';
import { renderDisplayName } from '@digix/gov-ui/api/graphql-queries/users';
import Icon from '@digix/gov-ui/components/common/elements/icons/';
import lightTheme from '@digix/gov-ui/theme/light';

import { showHideLeftMenu } from '@digix/gov-ui/reducers/gov-ui/actions';

import {
  MenuContainer,
  ProfileContainer,
  Welcome,
  UserType,
  MenuList,
  MenuItem,
} from '@digix/gov-ui/components/common/blocks/collapsible-menu/style.js';
import { getUserStatus } from '@digix/gov-ui/utils/helpers';

const DEFAULT_MENU = [
  {
    kind: 'home',
    caption: 'Home',
    url: '/',
    public: true,
  },
  {
    kind: 'wallet',
    caption: 'Wallet',
    url: '/wallet',
    public: false,
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
    public: false,
  },
  {
    kind: 'product',
    caption: 'Help / DAO Tour',
    url: '/help',
    public: true,
  },
];

class CollapsibleMenu extends React.Component {
  shouldComponentUpdate = (nextProps, nextState) => !_.isEqual(this.props, nextProps);

  handleStateChange(state) {
    this.props.showHideLeftMenu(state.isOpen);
  }

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
    const { addressDetails, ChallengeProof, menuItems, showLeftMenu } = this.props;
    const userType = getUserStatus(addressDetails.data);
    const menu = menuItems || DEFAULT_MENU;
    const menuItemElements = menu.map(item => this.renderMenuItem(item));

    return (
      <Menu
        noOverlay
        pageWrapId="page-wrap"
        outerContainerId="App"
        isOpen={showLeftMenu && showLeftMenu.show}
        onStateChange={state => this.handleStateChange(state)}
        width={210}
      >
        <MenuContainer>
          {ChallengeProof.data && (
            <ProfileContainer>
              <Welcome>
                Welcome, &nbsp;
                {renderDisplayName('Sidebar-DisplayName')}
              </Welcome>
              <UserType data-digix="Sidebar-UserStatus">{userType}</UserType>
            </ProfileContainer>
          )}

          <MenuList>{menuItemElements}</MenuList>
        </MenuContainer>
      </Menu>
    );
  }
}

const { array, object, func } = PropTypes;
CollapsibleMenu.propTypes = {
  menuItems: array,
  theme: object,
  addressDetails: object,
  showLeftMenu: object,
  location: object.isRequired,
  ChallengeProof: object,
  showHideLeftMenu: func.isRequired,
};

CollapsibleMenu.defaultProps = {
  menuItems: DEFAULT_MENU,
  showLeftMenu: undefined,
  theme: lightTheme,
  addressDetails: undefined,
  ChallengeProof: undefined,
};

const mapStateToProps = state => ({
  addressDetails: state.infoServer.AddressDetails,
  ChallengeProof: state.daoServer.ChallengeProof,
  showLeftMenu: state.govUI.showLeftMenu,
});

export default connect(
  mapStateToProps,
  { showHideLeftMenu }
)(CollapsibleMenu);

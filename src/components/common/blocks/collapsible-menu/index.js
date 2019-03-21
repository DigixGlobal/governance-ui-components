import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { Query } from 'react-apollo';
import { renderDisplayName, fetchUserQuery } from '@digix/gov-ui/api/graphql-queries/users';

import { push as Menu } from 'react-burger-menu';

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
    icon: 'home',
    title: 'Home',
    url: '/',
    public: true,
  },
  {
    icon: 'wallet',
    title: 'Wallet',
    url: '/wallet',
    public: false,
  },
  {
    icon: 'profile',
    title: 'Profile',
    url: '/profile',
    public: false,
  },
  {
    icon: 'history',
    title: 'Transaction History',
    url: '/history',
    public: false,
  },
  {
    icon: 'product',
    title: 'Help / DAO Tour',
    url: '/help',
    public: true,
  },
];

const ADMIN_MENU = [
  {
    icon: 'dashboard',
    title: 'KYC Dashboard',
    url: '/kyc/admin',
    requirement: 'isKycOfficer',
  },
  {
    icon: 'user',
    title: 'Admin',
    url: '/forum/admin',
    requirement: 'isForumAdmin',
  },
];

class CollapsibleMenu extends React.Component {
  componentDidMount = () => {
    const { showLeftMenu } = this.props;
    this.toggleShrink(showLeftMenu ? showLeftMenu.show : false);
  };

  shouldComponentUpdate = (nextProps, nextState) => !_.isEqual(this.props, nextProps);

  handleStateChange(state) {
    this.toggleShrink(state.isOpen);
    this.props.showHideLeftMenu(state.isOpen);
  }

  toggleShrink = shrink => {
    const wrapper = document.querySelector('#page-wrap');
    if (shrink && wrapper) {
      wrapper.style.marginRight = '210px';
      wrapper.style.width = 'auto';
      wrapper.style.transition = 'all 200ms';
    } else if (wrapper) {
      wrapper.style.width = '100%';
      wrapper.style.transition = 'all 200ms';
    }
  };

  renderMenuItem = item => {
    const { ChallengeProof, location, theme } = this.props;
    const authorized = ChallengeProof.data && ChallengeProof.data.client;
    const samePath = location.pathname.toLowerCase() === item.url.toLowerCase();

    if (!item.public && !authorized) {
      return null;
    }

    return (
      <MenuItem key={item.title} selected={samePath}>
        <Link to={item.url} href={item.url}>
          <Icon kind={item.icon} theme={theme || lightTheme} selected={samePath} />
          <span>{item.title}</span>
        </Link>
      </MenuItem>
    );
  };

  renderAdminMenuItem = menu => (
    <Query query={fetchUserQuery} key={menu.title}>
      {({ loading, error, data }) => {
        const isAllowed = data.currentUser && data.currentUser[menu.requirement];
        if (loading || error || !isAllowed) {
          return null;
        }

        const path = menu.url;
        const currentPath = this.props.location.pathname.toLowerCase();
        const samePath = currentPath === path;

        return (
          <MenuItem key={menu.title} selected={samePath}>
            <Link to={path} href={path}>
              <Icon kind={menu.icon} theme={this.props.theme || lightTheme} selected={samePath} />
              <span>{menu.title}</span>
            </Link>
          </MenuItem>
        );
      }}
    </Query>
  );

  render() {
    if (this.props.HasCountdown) {
      return null;
    }

    const { addressDetails, ChallengeProof, menuItems, showLeftMenu } = this.props;
    const userType = getUserStatus(addressDetails.data);
    const menu = menuItems || DEFAULT_MENU;
    const menuItemElements = menu.map(item => this.renderMenuItem(item));
    const adminMenuItems = ADMIN_MENU.map(item => this.renderAdminMenuItem(item));

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
          <MenuList>
            {menuItemElements}
            {ChallengeProof.data && adminMenuItems}
          </MenuList>
        </MenuContainer>
      </Menu>
    );
  }
}

const { array, bool, object, func } = PropTypes;
CollapsibleMenu.propTypes = {
  menuItems: array,
  theme: object,
  addressDetails: object,
  showLeftMenu: object,
  location: object.isRequired,
  ChallengeProof: object,
  showHideLeftMenu: func.isRequired,
  HasCountdown: bool.isRequired,
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
  HasCountdown: state.govUI.HasCountdown,
});

export default connect(
  mapStateToProps,
  { showHideLeftMenu }
)(CollapsibleMenu);

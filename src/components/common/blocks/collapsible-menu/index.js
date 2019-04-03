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

const getDefaultMenu = translation => [
  {
    icon: 'home',
    title: translation.home,
    url: '/',
    public: true,
  },
  {
    icon: 'wallet',
    title: translation.wallet,
    url: '/wallet',
    public: false,
  },
  {
    icon: 'profile',
    title: translation.profile,
    url: '/profile',
    public: false,
  },
  {
    icon: 'history',
    title: translation.history,
    url: '/history',
    public: false,
  },
  {
    icon: 'product',
    title: translation.help,
    url: 'https://ipfs.infura.io/ipfs/QmXg8UNeoStwFc561QzRedkpXJRZAnwikobRydjw3CDem9',
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

    if (item.icon === 'product') {
      return (
        <MenuItem key={item.title} selected={samePath}>
          <a target="_blank" rel="noopener noreferrer" href={item.url}>
            <Icon kind={item.icon} theme={theme || lightTheme} selected={samePath} />
            <span>{item.title}</span>
          </a>
        </MenuItem>
      );
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
        if (loading || error) {
          return null;
        }

        const isAllowed = data.currentUser && data.currentUser[menu.requirement];

        if (!isAllowed) {
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

    const { addressDetails, ChallengeProof, showLeftMenu, Translations } = this.props;
    const userType = getUserStatus(addressDetails.data);
    const {
      data: { sidebar },
    } = Translations;
    const menu = getDefaultMenu(sidebar);
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
                {sidebar.welcome}, &nbsp;
                {renderDisplayName('Sidebar-DisplayName')} {'!'}
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

const { bool, object, func } = PropTypes;
CollapsibleMenu.propTypes = {
  theme: object,
  addressDetails: object,
  showLeftMenu: object,
  location: object.isRequired,
  ChallengeProof: object,
  showHideLeftMenu: func.isRequired,
  HasCountdown: bool.isRequired,
  Translations: object.isRequired,
};

CollapsibleMenu.defaultProps = {
  showLeftMenu: undefined,
  theme: lightTheme,
  addressDetails: undefined,
  ChallengeProof: undefined,
};

const mapStateToProps = state => ({
  addressDetails: state.infoServer.AddressDetails,
  ChallengeProof: state.daoServer.ChallengeProof,
  Translations: state.daoServer.Translations,
  showLeftMenu: state.govUI.showLeftMenu,
  HasCountdown: state.govUI.HasCountdown,
});

export default connect(
  mapStateToProps,
  { showHideLeftMenu }
)(CollapsibleMenu);

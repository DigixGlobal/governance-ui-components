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
      <MenuItem key={item.caption} selected={samePath}>
        <Link to={item.url} href={item.url}>
          <Icon kind={item.kind} theme={theme || lightTheme} selected={samePath} />
          <span>{item.caption}</span>
        </Link>
      </MenuItem>
    );
  };

  renderKycOfficerMenu = () => (
    <Query query={fetchUserQuery}>
      {({ loading, error, data }) => {
        if (loading) {
          return null;
        }

        if (error) {
          return null;
        }
        const samePath = this.props.location.pathname.toLowerCase() === '/kyc/admin';
        return data.currentUser !== null && data.currentUser.isKycOfficer ? (
          <MenuItem selected={samePath}>
            <Link to="/kyc/admin" href="/kyc/admin">
              <Icon kind="dashboard" theme={this.props.theme || lightTheme} selected={samePath} />
              <span>KYC Dashboard</span>
            </Link>
          </MenuItem>
        ) : null;
      }}
    </Query>
  );

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
          <MenuList>
            {menuItemElements}
            {ChallengeProof.data && this.renderKycOfficerMenu()}
          </MenuList>
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

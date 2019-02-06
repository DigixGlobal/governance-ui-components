import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Query } from 'react-apollo';
import { renderDisplayName, fetchUserQuery } from '@digix/gov-ui/api/graphql-queries/users';
import Icon from '@digix/gov-ui/components/common/elements/icons/';
import lightTheme from '@digix/gov-ui/theme/light';

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
    const { addressDetails, ChallengeProof, menuItems } = this.props;
    const userType = getUserStatus(addressDetails.data);
    const menu = menuItems || DEFAULT_MENU;
    const menuItemElements = menu.map(item => this.renderMenuItem(item));

    return (
      <MenuContainer>
        {ChallengeProof.data && (
          <ProfileContainer>
            <Welcome>
              Welcome,&nbsp;
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
    );
  }
}

const { array, object } = PropTypes;
CollapsibleMenu.propTypes = {
  menuItems: array,
  theme: object,
  addressDetails: object,
  location: object.isRequired,
  ChallengeProof: object,
};

CollapsibleMenu.defaultProps = {
  menuItems: DEFAULT_MENU,
  theme: lightTheme,
  addressDetails: undefined,
  ChallengeProof: undefined,
};

const mapStateToProps = state => ({
  addressDetails: state.infoServer.AddressDetails,
  ChallengeProof: state.daoServer.ChallengeProof,
});

export default connect(
  mapStateToProps,
  {}
)(CollapsibleMenu);

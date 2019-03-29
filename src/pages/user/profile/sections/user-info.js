import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import EmailOverlay from '@digix/gov-ui/components/common/blocks/overlay/profile-email';
import UsernameOverlay from '@digix/gov-ui/components/common/blocks/overlay/profile-username';
import { getUserStatus } from '@digix/gov-ui/utils/helpers';
import { Icon } from '@digix/gov-ui/components/common/elements';
import { showRightPanel } from '@digix/gov-ui/reducers/gov-ui/actions';
import { withFetchAddress } from '@digix/gov-ui/api/graphql-queries/address';
import { withFetchUser } from '@digix/gov-ui/api/graphql-queries/users';
import {
  SetUserInfoBtn,
  UserData,
  UserInfo,
  UserItem,
  UserLabel,
} from '@digix/gov-ui/pages/user/profile/style';

class ProfileUserInfo extends React.Component {
  componentDidMount() {
    this.props.refetchUser();
  }

  showSetUsernameOverlay() {
    this.props.showRightPanel({
      component: <UsernameOverlay />,
      show: true,
    });
  }

  showSetEmailOverlay() {
    const { email } = this.props.userData;
    this.props.showRightPanel({
      component: <EmailOverlay currentEmail={email} />,
      show: true,
    });
  }

  render() {
    const { displayName, email, username } = this.props.userData;
    const { AddressDetails } = this.props;
    const { address } = AddressDetails;
    const status = getUserStatus(AddressDetails);

    return (
      <UserInfo>
        <UserItem>
          <UserLabel>User:</UserLabel>
          <UserData data-digix="Profile-UserName">{displayName}</UserData>
          {!username && (
            <SetUserInfoBtn
              xsmall
              data-digix="Profile-UserName-Cta"
              onClick={() => this.showSetUsernameOverlay()}
            >
              <Icon kind="plus" />
              Set Username
            </SetUserInfoBtn>
          )}
        </UserItem>
        <UserItem>
          <UserLabel>Status:</UserLabel>
          <UserData data-digix="Profile-Status">{status}</UserData>
        </UserItem>
        <UserItem>
          <UserLabel>Email:</UserLabel>
          {email && <UserData data-digix="Profile-Email">{email}</UserData>}
          <SetUserInfoBtn
            xsmall
            data-digix="Profile-Email-Cta"
            onClick={() => this.showSetEmailOverlay()}
          >
            <Icon kind="plus" />
            Set Email
          </SetUserInfoBtn>
        </UserItem>
        <UserItem>
          <UserLabel>Address:</UserLabel>
          <UserData data-digix="Profile-Address">{address}</UserData>
        </UserItem>
      </UserInfo>
    );
  }
}

const { func, object, shape, string } = PropTypes;

ProfileUserInfo.propTypes = {
  AddressDetails: object.isRequired,
  refetchUser: func.isRequired,
  showRightPanel: func.isRequired,
  userData: shape({
    displayName: string,
    email: string,
  }),
};

ProfileUserInfo.defaultProps = {
  userData: undefined,
};

const mapStateToProps = () => ({});
const ProfileComponent = connect(
  mapStateToProps,
  {
    showRightPanel,
  }
)(ProfileUserInfo);

export default withFetchAddress(withFetchUser(ProfileComponent));

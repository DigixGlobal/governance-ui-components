import React from 'react';
import PropTypes from 'prop-types';

import ModeratorRequirements from '@digix/gov-ui/pages/user/profile/sections/moderator-requirements';
import ProfileActivitySummary from '@digix/gov-ui/pages/user/profile/sections/activity-summary';
import ProfileUserInfo from '@digix/gov-ui/pages/user/profile/sections/user-info';
import UserAddressStats from '@digix/gov-ui/components/common/blocks/user-address-stats';
import { Heading, ProfileWrapper } from '@digix/gov-ui/pages/user/profile/style';

class Profile extends React.Component {
  render() {
    const { history } = this.props;

    return (
      <ProfileWrapper>
        <Heading>Profile</Heading>
        <ProfileUserInfo />
        <UserAddressStats />
        <ProfileActivitySummary />
        <ModeratorRequirements history={history} />
      </ProfileWrapper>
    );
  }
}

const { object } = PropTypes;

Profile.propTypes = {
  history: object.isRequired,
};

export default Profile;

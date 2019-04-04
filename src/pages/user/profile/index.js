import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import ModeratorRequirements from '@digix/gov-ui/pages/user/profile/sections/moderator-requirements';
import ProfileActivitySummary from '@digix/gov-ui/pages/user/profile/sections/activity-summary';
import ProfileUserInfo from '@digix/gov-ui/pages/user/profile/sections/user-info';
import UserAddressStats from '@digix/gov-ui/components/common/blocks/user-address-stats';
import { Heading, ProfileWrapper } from '@digix/gov-ui/pages/user/profile/style';

class Profile extends React.Component {
  render() {
    const { history, Translations } = this.props;

    return (
      <ProfileWrapper>
        <Heading>Profile</Heading>
        <ProfileUserInfo translations={Translations} />
        <UserAddressStats translations={Translations} />
        <ProfileActivitySummary translations={Translations} />
        <ModeratorRequirements translations={Translations} history={history} />
      </ProfileWrapper>
    );
  }
}

const { object } = PropTypes;

Profile.propTypes = {
  history: object.isRequired,
  Translations: object.isRequired,
};

const mapStateToProps = state => ({
  Translations: state.daoServer.Translations,
});

export default connect(mapStateToProps)(Profile);

import React from 'react';
import PropTypes from 'prop-types';

import ParticipationReward from '@digix/gov-ui/pages/user/wallet/sections/participation-reward';
import VotingStake from '@digix/gov-ui/pages/user/wallet/sections/voting-stake';
import { QtrSummary } from '@digix/gov-ui/pages/user/wallet/style';

class QuarterSummary extends React.Component {
  render() {
    const t = this.props.translations;

    return (
      <QtrSummary>
        <VotingStake translations={t.LockedDgd} />
        <ParticipationReward translations={t.ParticipationReward} />
      </QtrSummary>
    );
  }
}

const { object } = PropTypes;
QuarterSummary.propTypes = {
  translations: object.isRequired,
};

export default QuarterSummary;

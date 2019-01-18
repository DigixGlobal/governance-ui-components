import React from 'react';
import PropTypes from 'prop-types';

import { truncateNumber } from '@digix/gov-ui/utils/helpers';
import { Container, Point } from '@digix/gov-ui/components/common/blocks/user-DAO-stats/style';

class UserDAOStats extends React.Component {
  render() {
    const { stats } = this.props;
    const stake = truncateNumber(stats.data.lockedDgdStake || 0);

    return (
      <Container>
        <Point>
          Quarter Points
          <span data-digix="Dashboard-Stats-QuarterPoints">{stats.data.quarterPoint || 0}</span>
        </Point>
        <Point>
          Reputation Points
          <span data-digix="Dashboard-Stats-ReputationPoints">
            {stats.data.reputationPoint || 0}
          </span>
        </Point>
        <Point>
          My Stake
          <span data-digix="Dashboard-Stats-Stake">{stake}</span>
        </Point>
      </Container>
    );
  }
}

const { object } = PropTypes;

UserDAOStats.propTypes = {
  stats: object.isRequired,
};

export default UserDAOStats;

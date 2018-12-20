import React from 'react';
import PropTypes from 'prop-types';

import { truncateNumber } from '@digix/gov-ui/utils/helpers';
import { Container, Point } from './style';

class UserDAOStats extends React.Component {
  render() {
    const { stats } = this.props;
    const stake = truncateNumber(stats.data.lockedDgdStake || 0);

    return (
      <Container>
        <Point>
          Quarter Points
          <span>{stats.data.quarterPoint || 0}</span>
        </Point>
        <Point>
          Reputation Points <span>{stats.data.reputationPoint || 0}</span>
        </Point>
        <Point>
          My Stake
          <span>{stake}</span>
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

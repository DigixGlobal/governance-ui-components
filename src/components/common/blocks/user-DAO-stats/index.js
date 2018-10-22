import React from 'react';
import PropTypes from 'prop-types';

import { Container, Point } from './style';

class UserDAOStats extends React.Component {
  render() {
    const { stats } = this.props;
    console.log(stats);
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
          <span>{stats.data.lockedDgdStake || 0}</span>
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

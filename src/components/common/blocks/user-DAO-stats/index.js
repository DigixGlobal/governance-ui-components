import React from 'react';
import PropTypes from 'prop-types';

import { Container, Point } from './style';

class UserDAOStats extends React.Component {
  render() {
    const { quarterPoints, repurationPoints, stake } = this.props;
    return (
      <Container>
        <Point>
          Quarter Points
          <span>{quarterPoints || 82}</span>
        </Point>
        <Point>
          Repuation Points <span>{repurationPoints || 134}</span>
        </Point>
        <Point>
          My Stake
          <span>{stake || 65.75}</span>
        </Point>
      </Container>
    );
  }
}

const { number } = PropTypes;
UserDAOStats.propTypes = {
  quarterPoints: number,
  repurationPoints: number,
  stake: number,
};
export default UserDAOStats;

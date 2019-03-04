import React from 'react';
import PropTypes from 'prop-types';

import { truncateNumber } from '@digix/gov-ui/utils/helpers';
import {
  UserStats,
  Item,
  Label,
  Data,
} from '@digix/gov-ui/components/common/blocks/user-DAO-stats/style';

class UserDAOStats extends React.Component {
  render() {
    const { stats } = this.props;
    const stake = truncateNumber(stats.data.lockedDgdStake || 0);
    if (!stats.data.address) return null;
    return (
      <UserStats>
        <Item>
          <Label>Quarter Points</Label>
          <Data data-digix="Dashboard-Stats-QuarterPoints">{stats.data.quarterPoint || 0}</Data>
        </Item>
        <Item>
          <Label>Reputation Points</Label>
          <Data data-digix="Dashboard-Stats-ReputationPoints">
            {stats.data.reputationPoint || 0}
          </Data>
        </Item>
        <Item>
          <Label>My Stake</Label>
          <Data data-digix="Dashboard-Stats-Stake">
            <span>{stake}</span> <span className="equiv">({stats.data.lockedDgd} DGD LOCKED)</span>
          </Data>
        </Item>
      </UserStats>
    );
  }
}

const { object } = PropTypes;

UserDAOStats.propTypes = {
  stats: object.isRequired,
};

export default UserDAOStats;

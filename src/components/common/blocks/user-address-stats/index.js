import React from 'react';
import PropTypes from 'prop-types';
import { truncateNumber } from '@digix/gov-ui/utils/helpers';
import { withFetchAddress } from '@digix/gov-ui/api/graphql-queries/address';

import {
  Data,
  Item,
  Label,
  UserStats,
} from '@digix/gov-ui/components/common/blocks/user-address-stats/style';

class UserAddressStats extends React.Component {
  componentDidMount() {
    this.props.subscribeToAddress();
  }

  render() {
    const { AddressDetails } = this.props;
    if (!AddressDetails.address) {
      return null;
    }

    const {
      lockedDgd,
      lockedDgdStake,
      quarterPoint,
      reputationPoint,
      isModerator,
      moderatorQuarterPoint,
    } = this.props.AddressDetails;
    const stake = truncateNumber(lockedDgdStake || 0);
    const dgd = truncateNumber(lockedDgd || 0);
    return (
      <UserStats>
        <Item>
          <Label>Quarter Points</Label>
          <Data data-digix="Dashboard-Stats-QuarterPoints">
            <span>{quarterPoint || 0}</span>
            {isModerator && (
              <span className="equiv">
                <span>( </span>
                <span data-digix="Dashboard-Mod-QtrPts">{moderatorQuarterPoint}</span>
                <span>&nbsp; Moderator Qtr Pts )</span>
              </span>
            )}
          </Data>
        </Item>
        <Item>
          <Label>Reputation Points</Label>
          <Data data-digix="Dashboard-Stats-ReputationPoints">{reputationPoint || 0}</Data>
        </Item>
        <Item>
          <Label>My Stake</Label>
          <Data data-digix="Dashboard-Stats-Stake">
            <span data-digix="Dashboard-DGD-Stake">{stake}</span>
            <span className="equiv">
              <span>( </span>
              <span data-digix="Dashboard-DGD-Stake">{dgd}</span>
              <span>&nbsp;DGD LOCKED )</span>
            </span>
          </Data>
        </Item>
      </UserStats>
    );
  }
}

const { func, object } = PropTypes;

UserAddressStats.propTypes = {
  AddressDetails: object.isRequired,
  subscribeToAddress: func.isRequired,
};

export default withFetchAddress(UserAddressStats);

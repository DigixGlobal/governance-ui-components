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
    const { AddressDetails, translations } = this.props;
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

    const {
      data: { dashboard },
    } = translations;

    const stake = truncateNumber(lockedDgdStake || 0);
    const dgd = truncateNumber(lockedDgd || 0);
    return (
      <UserStats>
        <Item>
          <Label>{dashboard.UserStats.quarterPoints}</Label>
          <Data>
            <span data-digix="Dashboard-Stats-QuarterPoints">{quarterPoint || 0}</span>
            {isModerator && (
              <span className="equiv">
                <span>( </span>
                <span data-digix="Dashboard-Mod-QtrPts">{moderatorQuarterPoint}</span>
                <span>&nbsp; {dashboard.UserStats.moderatorPoints} )</span>
              </span>
            )}
          </Data>
        </Item>
        <Item>
          <Label>{dashboard.UserStats.reputationPoints}</Label>
          <Data data-digix="Dashboard-Stats-ReputationPoints">{reputationPoint || 0}</Data>
        </Item>
        <Item>
          <Label>{dashboard.UserStats.stake}</Label>
          <Data data-digix="Dashboard-Stats-Stake">
            <span data-digix="Dashboard-Locked-Stake">{stake}</span>
            <span className="equiv">
              <span>( </span>
              <span data-digix="Dashboard-Locked-DGD">{dgd}</span>
              <span>&nbsp;{dashboard.UserStats.dgdLocked} )</span>
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
  translations: object.isRequired,
};

export default withFetchAddress(UserAddressStats);

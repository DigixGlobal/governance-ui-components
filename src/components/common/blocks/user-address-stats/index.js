import React from 'react';
import PropTypes from 'prop-types';
import { truncateNumber } from '@digix/gov-ui/utils/helpers';
import { withFetchAddress } from '@digix/gov-ui/api/graphql-queries/address';

import { Data, Item, Stats } from '@digix/gov-ui/components/common/blocks/user-address-stats/style';

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
      <Stats className="stats">
        <Item>
          <Data data-digix="Dashboard-Stats-QuarterPoints">
            {quarterPoint || 0} Points
            {isModerator && (
              <span data-digix="Dashboard-Mod-QtrPts" className="small-info">
                ({moderatorQuarterPoint} {dashboard.UserStats.moderatorPoints})
              </span>
            )}
          </Data>
          <span className="equiv">
            <span>{dashboard.UserStats.quarterPoints}</span>
          </span>
        </Item>
        <Item>
          <Data data-digix="Dashboard-Stats-ReputationPoints">{reputationPoint || 0} Points</Data>
          <span className="equiv">
            <span>{dashboard.UserStats.reputationPoints}</span>
          </span>
        </Item>
        <Item>
          <Data data-digix="Dashboard-Stats-Stake">
            {stake} ETH
            <span data-digix="Dashboard-Locked-DGD" className="small-info">
              ({dgd} {dashboard.UserStats.dgdLocked})
            </span>
          </Data>
          <span className="equiv">
            <span>{dashboard.UserStats.stake}</span>
          </span>
        </Item>
      </Stats>
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

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
    const { AddressDetails, translations, white } = this.props;
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
      <Stats white={white} data-digix="User-Address-Stats">
        <Item>
          <Data>
            <span>
              <span data-digix="Dashboard-Stats-QuarterPoints">{quarterPoint || 0}</span>
              {isModerator && (
                <span className="small-info">
                  (<span data-digix="Dashboard-Stats-ModQtrPts">{moderatorQuarterPoint}</span>{' '}
                  {dashboard.UserStats.moderatorPoints})
                </span>
              )}
            </span>
          </Data>
          <span className="equiv">
            <span>{dashboard.UserStats.quarterPoints}</span>
          </span>
        </Item>
        <Item>
          <Data data-digix="Dashboard-Stats-ReputationPoints">
            <span>{reputationPoint || 0}</span>
          </Data>
          <span className="equiv">
            <span>{dashboard.UserStats.reputationPoints}</span>
          </span>
        </Item>
        <Item>
          <Data>
            <span>
              <span data-digix="Dashboard-Stats-Stake">{stake}</span> {dashboard.Timeline.stake}
              <span className="small-info">
                (<span data-digix="Dashboard-Stats-LockedDGD">{dgd}</span>{' '}
                {dashboard.UserStats.dgdLocked})
              </span>
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

const { func, object, bool } = PropTypes;

UserAddressStats.propTypes = {
  AddressDetails: object.isRequired,
  subscribeToAddress: func.isRequired,
  translations: object.isRequired,
  white: bool,
};

UserAddressStats.defaultProps = {
  white: false,
};

export default withFetchAddress(UserAddressStats);

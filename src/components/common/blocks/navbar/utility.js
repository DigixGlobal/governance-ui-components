import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';

import { getTransactions, getChallenge } from '../../../../reducers/dao-server/actions';
import { getAddressDetails } from '../../../../reducers/info-server/actions';

import Icon from '../../elements/icons';

import {
  UtilityWrapper,
  Notification,
  NotificationCount,
  NotificationHeader,
  NotificationContent,
  TxHash,
  NotificationItem,
  TxStatus,
} from './style';

class Utility extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showNotice: false,
    };
  }

  componentWillReceiveProps = nextProps => {
    if (!_.isEqual(nextProps, this.props)) {
      const { challengeProof } = this.props;
      const { userAddress } = nextProps;
      if (!this.props.challenge.data && userAddress) {
        this.getDetailsInterval = setInterval(() => {
          if (!this.props.challenge.data && userAddress) {
            if (userAddress.fetching === null || !userAddress.fetching) {
              this.props.getAddressDetails(userAddress.address);
            }
          }
        }, 1000 * 60);
      }
      if (!this.props.challenge.data && userAddress.data && userAddress.data.isParticipant) {
        if (this.props.challenge.fetching === null || !this.props.challenge.fetching)
          this.props.getChallenge(userAddress.address);
      }

      this.interval = setInterval(() => {
        if (challengeProof.data) {
          this.props.getTransactions({
            token: challengeProof.data['access-token'],
            client: challengeProof.data.client,
            uid: challengeProof.data.uid,
          });
        }
      }, 1000 * 60);
    }
  };

  // shouldComponentUpdate = (nextProps, nextState) =>
  //   !_.isEqual(nextState, this.state) && !_.isEqual(nextProps, this.props);

  showHideNotifications = () => {
    this.setState({ showNotice: !this.state.showNotice });
  };
  render() {
    const { showNotice } = this.state;
    const { transactions } = this.props;

    return (
      <UtilityWrapper>
        <Icon kind="notification" onClick={this.showHideNotifications} />
        {transactions && <NotificationCount>{transactions.length}</NotificationCount>}
        {showNotice && (
          <Notification>
            <NotificationHeader>Notifications</NotificationHeader>
            <NotificationContent>
              {transactions &&
                transactions.map(t => (
                  <NotificationItem key={t.id}>
                    <TxHash>{t.txhash}</TxHash>
                    <TxStatus>{t.status}</TxStatus>
                  </NotificationItem>
                ))}
              {!transactions && <NotificationItem>No Notifications available</NotificationItem>}
            </NotificationContent>
          </Notification>
        )}
      </UtilityWrapper>
    );
  }
}

const { array, func, object } = PropTypes;

Utility.propTypes = {
  transactions: array,
  challenge: object,
  challengeProof: object,
  getTransactions: func.isRequired,
  getChallenge: func.isRequired,
  getAddressDetails: func.isRequired,
  userAddress: object,
};

Utility.defaultProps = {
  transactions: undefined,
  challengeProof: undefined,
  userAddress: undefined,
};

export default connect(
  ({ daoServer: { Transactions, ChallengeProof, Challenge }, govUI: { UserAddress } }) => ({
    transactions: Transactions.data.transactions,
    challengeProof: ChallengeProof,
    challenge: Challenge,
    userAddress: UserAddress,
  }),
  { getTransactions, getAddressDetails, getChallenge }
)(Utility);

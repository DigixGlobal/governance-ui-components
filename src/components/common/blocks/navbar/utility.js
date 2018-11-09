import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

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

  componentDidMount = () => {
    const { challengeProof } = this.props;
    this.interval = setInterval(() => {
      if (challengeProof.data) {
        this.props.getTransactions({
          token: challengeProof.data['access-token'],
          client: challengeProof.data.client,
          uid: challengeProof.data.uid,
        });
      }
    }, 1000 * 60);
  };

  componentWillReceiveProps = nextProps => {
    const { challengeProof } = this.props;
    const { userAddress } = nextProps;
    if (!challengeProof.data && userAddress) {
      this.proofInterval = setInterval(() => {
        this.props.getChallenge(userAddress.address);
      }, 1000 * 60);
    }
  };

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
  challengeProof: object,
  getTransactions: func.isRequired,
  getChallenge: func.isRequired,
  userAddress: object,
};

Utility.defaultProps = {
  transactions: undefined,
  challengeProof: undefined,
  userAddress: undefined,
};

export default connect(
  ({ daoServer: { Transactions, ChallengeProof }, govUI: { UserAddress } }) => ({
    transactions: Transactions.data.transactions,
    challengeProof: ChallengeProof,
    userAddress: UserAddress,
  }),
  { getTransactions, getAddressDetails, getChallenge }
)(Utility);

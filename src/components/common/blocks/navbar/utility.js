import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getTransactions } from '../../../../reducers/dao-server/actions';

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
    this.interval = setInterval(() => {
      const { challengeProof } = this.props;
      if (challengeProof.data) {
        this.props.getTransactions({
          token: challengeProof.data['access-token'],
          client: challengeProof.data.client,
          uid: challengeProof.data.uid,
        });
      }
    }, 1000 * 60);
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
                  <NotificationItem id={t.id}>
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
};

Utility.defaultProps = {
  transactions: undefined,
  challengeProof: undefined,
};

export default connect(
  ({ daoServer: { Transactions, ChallengeProof } }) => ({
    transactions: Transactions.data.transactions,
    challengeProof: ChallengeProof,
  }),
  { getTransactions }
)(Utility);

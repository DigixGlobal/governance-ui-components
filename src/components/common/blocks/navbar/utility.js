import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';

import { getTransactions, getChallenge } from '@digix/gov-ui/reducers/dao-server/actions';
import { getAddressDetails } from '@digix/gov-ui/reducers/info-server/actions';

import Icon from '@digix/gov-ui/components/common/elements/icons';

import { UtilityWrapper } from './style';

class Utility extends React.Component {
  componentWillReceiveProps = nextProps => {
    if (!_.isEqual(nextProps, this.props)) {
      const { userAddress } = nextProps;
      if (!userAddress) return;
      if (!this.props.challenge.data && userAddress) {
        this.getDetailsInterval = setInterval(() => {
          if (!this.props.challenge.data && userAddress) {
            if (userAddress.fetching === null || !userAddress.fetching) {
              this.props.getAddressDetails(userAddress.address);
            }
          }
        }, 1000 * 60);
      }
      if (
        (!this.props.challenge.data ||
          (this.props.challenge.data && this.props.challenge.data.errors)) &&
        userAddress.data &&
        userAddress.data.isParticipant
      ) {
        if (this.props.challenge.fetching === null || !this.props.challenge.fetching)
          this.props.getChallenge(userAddress.address);
      }
    }
  };

  getNotifications = () => {
    const {
      challengeProof,
      transactions: { fetching },
    } = this.props;
    if (challengeProof.data && !fetching) {
      this.props.getTransactions({
        token: challengeProof.data['access-token'],
        client: challengeProof.data.client,
        uid: challengeProof.data.uid,
      });
    }
  };

  showHideNotifications = () => {
    const { challengeProof, history } = this.props;
    if (challengeProof.data && challengeProof.data.client) history.push('/history');
  };
  render() {
    return (
      <UtilityWrapper>
        <Icon
          kind="notification"
          onClick={this.showHideNotifications}
          style={{ cursor: 'pointer' }}
        />
      </UtilityWrapper>
    );
  }
}

const { func, object } = PropTypes;

Utility.propTypes = {
  transactions: object,
  challenge: object,
  challengeProof: object,
  getTransactions: func.isRequired,
  getChallenge: func.isRequired,
  getAddressDetails: func.isRequired,
  history: object,
  userAddress: object, // eslint-disable-line
};

Utility.defaultProps = {
  transactions: undefined,
  challengeProof: undefined,
  userAddress: undefined,
  challenge: undefined,
  history: undefined,
};

export default connect(
  ({ daoServer: { Transactions, ChallengeProof, Challenge }, govUI: { UserAddress } }) => ({
    transactions: Transactions,
    challengeProof: ChallengeProof,
    challenge: Challenge,
    userAddress: UserAddress,
  }),
  { getTransactions, getAddressDetails, getChallenge }
)(Utility);

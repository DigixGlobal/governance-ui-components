import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getTransactions } from '@digix/gov-ui/reducers/dao-server/actions';
import { ETHERSCAN_URL } from '@digix/gov-ui/constants';
import Icon from '@digix/gov-ui/components/common/elements/icons/';

import {
  HistoryHeading,
  Title,
  HistoryListView,
  HistoryCard,
  TxDetails,
  TxTitle,
  TxStatus,
  TxIcon,
} from './style';

class History extends React.Component {
  componentWillMount = () => {
    const { challengeProof, history } = this.props;
    if (!challengeProof.data || !challengeProof.data.client) history.push('/');

    if (challengeProof.data && challengeProof.data['access-token']) {
      this.props.getTransactions({
        token: challengeProof.data['access-token'],
        client: challengeProof.data.client,
        uid: challengeProof.data.uid,
      });
    }
  };
  render() {
    const { transactions } = this.props;
    const history = Array.from(transactions.data);
    return (
      <div>
        <div>
          <HistoryHeading>
            <Title>Transactions</Title>
            <div />
          </HistoryHeading>

          {history && history.length > 0 && (
            <HistoryListView>
              {history.map(transaction => (
                <HistoryCard key={transaction.id}>
                  <TxDetails href={`${ETHERSCAN_URL}${transaction.txhash}`} target="_blank">
                    <TxTitle>{transaction.title}</TxTitle>
                    <TxStatus>8/10 Confirmation(s)</TxStatus>
                    <TxIcon
                      pending={transaction.status === 'pending'}
                      failed={transaction.status === 'failed'}
                      success={transaction.status === 'confirmed'}
                    >
                      {transaction.status === 'pending' && <Icon kind="option" />}
                      {transaction.status === 'failed' && <Icon kind="xmark" />}
                      {transaction.status === 'confirmed' && <Icon kind="check" />}
                    </TxIcon>
                  </TxDetails>
                </HistoryCard>
              ))}
            </HistoryListView>
          )}
        </div>
      </div>
    );
  }
}

const { func, object } = PropTypes;
History.propTypes = {
  transactions: object.isRequired,
  challengeProof: object.isRequired,
  getTransactions: func.isRequired,
  history: object.isRequired,
};

export default connect(
  ({ daoServer: { Transactions, ChallengeProof } }) => ({
    transactions: Transactions,
    challengeProof: ChallengeProof,
  }),
  { getTransactions }
)(History);

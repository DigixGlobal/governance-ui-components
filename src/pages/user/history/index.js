import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getTransactions } from '@digix/gov-ui/reducers/dao-server/actions';
import { getBlockConfig } from '@digix/gov-ui/reducers/info-server/actions';
import { ETHERSCAN_URL } from '@digix/gov-ui/constants';
import Icon from '@digix/gov-ui/components/common/elements/icons/';

import {
  ButtonLink,
  EmptyStateContainer,
  IconContainer,
  EmptyStateTitle,
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
    const { challengeProof } = this.props;
    // if (!challengeProof.data || !challengeProof.data.client) history.push('/');

    if (challengeProof.data && challengeProof.data['access-token']) {
      this.props.getTransactions({
        token: challengeProof.data['access-token'],
        client: challengeProof.data.client,
        uid: challengeProof.data.uid,
      });

      this.props.getBlockConfig();
    }
  };
  render() {
    const { transactions, blockConfig, challengeProof } = this.props;
    const notAuthorized = !challengeProof.data || !challengeProof.data.client;
    const history = transactions.data ? Array.from(transactions.data) : [];
    return (
      <div>
        <HistoryHeading>
          <Title>Transactions</Title>
          <div />
        </HistoryHeading>

        {!history ||
          (history.length === 0 && (
            <EmptyStateContainer>
              <IconContainer>
                <Icon kind="history" width="80px" height="80px" />
              </IconContainer>

              <EmptyStateTitle>Transaction Empty</EmptyStateTitle>
              {!notAuthorized && history.length === 0 && (
                <p>
                  Looks like there are no transactions at the moment. Please lock your DGD to
                  continue.
                </p>
              )}
              {notAuthorized && (
                <div>
                  <p>
                    You will need to load your wallet to view your transactions, which will allow
                    you to view and participate on all governance proposals. Load your wallet to
                    continue.
                  </p>
                  <Link to="/">
                    <ButtonLink kind="link">Go back to Dashboard</ButtonLink>
                  </Link>
                </div>
              )}
            </EmptyStateContainer>
          ))}

        {history && history.length > 0 && (
          <HistoryListView>
            {history.map(transaction => {
              const { blockNumber } = transaction;
              const { CURRENT_BLOCK_NUMBER, BLOCK_CONFIRMATIONS } = blockConfig.data;
              const confirmation = CURRENT_BLOCK_NUMBER + BLOCK_CONFIRMATIONS - blockNumber + 1;
              const showConfirmations = transaction.status === 'seen';
              const showPendingIcons =
                transaction.status === 'seen' || transaction.status === 'pending';
              return (
                <HistoryCard key={transaction.id}>
                  <TxDetails href={`${ETHERSCAN_URL}${transaction.txhash}`} target="_blank">
                    <TxTitle>{transaction.title}</TxTitle>
                    <TxStatus>
                      {showConfirmations
                        ? `${confirmation}/${BLOCK_CONFIRMATIONS} Confirmation(s)`
                        : null}
                    </TxStatus>
                    <TxIcon
                      pending={showPendingIcons}
                      failed={transaction.status === 'failed'}
                      success={transaction.status === 'confirmed'}
                    >
                      {showPendingIcons && <Icon kind="option" />}
                      {transaction.status === 'failed' && <Icon kind="xmark" />}
                      {transaction.status === 'confirmed' && <Icon kind="check" />}
                    </TxIcon>
                  </TxDetails>
                </HistoryCard>
              );
            })}
          </HistoryListView>
        )}
      </div>
    );
  }
}

const { func, object } = PropTypes;
History.propTypes = {
  transactions: object.isRequired,
  challengeProof: object.isRequired,
  getTransactions: func.isRequired,
  getBlockConfig: func.isRequired,
  blockConfig: object.isRequired,
  // history: object.isRequired,
};

export default connect(
  ({ daoServer: { Transactions, ChallengeProof }, infoServer: { BlockConfig } }) => ({
    transactions: Transactions,
    challengeProof: ChallengeProof,
    blockConfig: BlockConfig,
  }),
  { getTransactions, getBlockConfig }
)(History);

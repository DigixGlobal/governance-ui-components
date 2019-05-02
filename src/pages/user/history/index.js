import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getTransactions } from '@digix/gov-ui/reducers/dao-server/actions';
import { getBlockConfig } from '@digix/gov-ui/reducers/info-server/actions';
import { ETHERSCAN_URL } from '@digix/gov-ui/constants';
import Icon from '@digix/gov-ui/components/common/elements/icons/';

import {
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
  constructor(props) {
    super(props);
    this.TRANSACTION_STATUS = {
      pending: 'pending',
      seen: 'seen',
      failed: 'failed',
      confirmed: 'confirmed',
    };

    this.PENDING_STATUSES = [this.TRANSACTION_STATUS.seen, this.TRANSACTION_STATUS.pending];
  }

  componentWillMount = () => {
    const { challengeProof } = this.props;

    if (challengeProof.data && challengeProof.data['access-token']) {
      this.props.getTransactions({
        token: challengeProof.data['access-token'],
        client: challengeProof.data.client,
        uid: challengeProof.data.uid,
      });

      this.props.getBlockConfig();
    }
  };

  renderEmpty() {
    const t = this.props.translations.Empty;

    return (
      <EmptyStateContainer>
        <IconContainer>
          <Icon kind="history" width="80px" height="80px" />
        </IconContainer>

        <EmptyStateTitle>{t.title}</EmptyStateTitle>
        <p>{t.description}</p>
      </EmptyStateContainer>
    );
  }

  renderItem = transaction => {
    const { blockConfig } = this.props;
    const { blockNumber } = transaction;
    const { CURRENT_BLOCK_NUMBER, BLOCK_CONFIRMATIONS } = blockConfig.data;
    const confirmation = CURRENT_BLOCK_NUMBER + BLOCK_CONFIRMATIONS - blockNumber + 1;

    const showConfirmations = transaction.status === this.TRANSACTION_STATUS.seen;
    const showPendingIcons = this.PENDING_STATUSES.includes(transaction.status);

    return (
      <HistoryCard key={transaction.id} data-digix="Transaction-Card">
        <TxDetails href={`${ETHERSCAN_URL}${transaction.txhash}`} target="_blank">
          <TxTitle data-digix="Transaction-Title">{transaction.title}</TxTitle>
          <TxStatus data-digix="Transaction-Status">
            {showConfirmations && `${confirmation}/${BLOCK_CONFIRMATIONS} Confirmation(s)`}
          </TxStatus>
          <TxIcon
            pending={showPendingIcons}
            failed={transaction.status === this.TRANSACTION_STATUS.failed}
            success={transaction.status === this.TRANSACTION_STATUS.confirmed}
          >
            {showPendingIcons && <Icon kind="option" />}
            {transaction.status === this.TRANSACTION_STATUS.failed && <Icon kind="xmark" />}
            {transaction.status === this.TRANSACTION_STATUS.confirmed && <Icon kind="check" />}
          </TxIcon>
        </TxDetails>
      </HistoryCard>
    );
  };

  render() {
    const t = this.props.translations;
    const { challengeProof, transactions } = this.props;

    const notAuthorized = !challengeProof.data || !challengeProof.data.client;
    const history = transactions.data ? Array.from(transactions.data) : [];
    const items = history.map(transaction => this.renderItem(transaction));
    const emptyHistory = items.length === 0;

    return (
      <div>
        <HistoryHeading>
          <Title>{t.title}</Title>
          <div />
        </HistoryHeading>

        {emptyHistory && this.renderEmpty(notAuthorized)}
        {!emptyHistory && <HistoryListView>{items}</HistoryListView>}
      </div>
    );
  }
}

const { func, object } = PropTypes;
History.propTypes = {
  blockConfig: object.isRequired,
  challengeProof: object.isRequired,
  getBlockConfig: func.isRequired,
  getTransactions: func.isRequired,
  transactions: object.isRequired,
  translations: object.isRequired,
};

const mapStateToProps = ({ daoServer, infoServer }) => ({
  blockConfig: infoServer.BlockConfig,
  challengeProof: daoServer.ChallengeProof,
  transactions: daoServer.Transactions,
  translations: daoServer.Translations.data.transactionHistory,
});

export default connect(
  mapStateToProps,
  {
    getBlockConfig,
    getTransactions,
  }
)(History);

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SpectrumConfig from 'spectrum-lightsuite/spectrum.config';
import web3Connect from 'spectrum-lightsuite/src/helpers/web3/connect';
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

const network = SpectrumConfig.defaultNetworks[0];

class History extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentBlock: 0,
    };
  }
  componentWillMount = () => {
    const { challengeProof, history, web3Redux } = this.props;
    if (!challengeProof.data || !challengeProof.data.client) history.push('/');

    if (challengeProof.data && challengeProof.data['access-token']) {
      this.props.getTransactions({
        token: challengeProof.data['access-token'],
        client: challengeProof.data.client,
        uid: challengeProof.data.uid,
      });

      web3Redux.web3(network).eth.getBlockNumber(result => {
        let currentBlock = 0;
        if (result && result !== null) currentBlock = result;
        this.setState({ currentBlock });
      });
    }
  };
  render() {
    const { transactions } = this.props;
    const { currentBlock } = this.state;
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
                    <TxStatus>
                      {currentBlock -
                        (transaction.blockNumber !== null ? transaction.blockNumber : 0)}
                      {`/${currentBlock} `}
                      Confirmation(s)
                    </TxStatus>
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
  web3Redux: object.isRequired,
  history: object.isRequired,
};

export default web3Connect(
  connect(
    ({ daoServer: { Transactions, ChallengeProof } }) => ({
      transactions: Transactions,
      challengeProof: ChallengeProof,
    }),
    { getTransactions }
  )(History)
);

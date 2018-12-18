import React from 'react';
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
import Icon from '../../../components/common/elements/icons/';

class History extends React.Component {
  render() {
    return (
      <div>
        <div>
          <HistoryHeading>
            <Title>Transactions</Title>
            <div />
          </HistoryHeading>
          <HistoryListView>
            <HistoryCard>
              <TxDetails>
                <TxTitle>Claiming of Reward</TxTitle>
                <TxStatus>8/10 Confirmation(s)</TxStatus>
                <TxIcon pending>
                  <Icon kind="option" />
                </TxIcon>
              </TxDetails>
            </HistoryCard>
            <HistoryCard>
              <TxDetails>
                <TxTitle>Commiting a Vote</TxTitle>
                <TxStatus>8/10 Confirmation(s)</TxStatus>
                <TxIcon failed>
                  <Icon kind="xmark" />
                </TxIcon>
              </TxDetails>
            </HistoryCard>
            <HistoryCard>
              <TxDetails>
                <TxTitle>Redeeming a DGD Badge</TxTitle>
                <TxStatus>8/10 Confirmation(s)</TxStatus>
                <TxIcon success>
                  <Icon kind="check" />
                </TxIcon>
              </TxDetails>
            </HistoryCard>
          </HistoryListView>
        </div>
      </div>
    );
  }
}

export default History;

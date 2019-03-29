import React from 'react';
import { Button } from '@digix/gov-ui/components/common/elements/index';

import {
  Actions,
  Data,
  Desc,
  Detail,
  Label,
  QtrParticipation,
  Title,
} from '@digix/gov-ui/pages/user/wallet/style';

class ClaimFunding extends React.Component {
  render() {
    const eth = 0;
    return (
      <QtrParticipation>
        <Title>DigixDAO Project Funding</Title>
        <Detail>
          <Label>Your Funding Amount</Label>
          <Data>
            <span data-digix="Wallet-EthFund">{eth}</span>
            <span>&nbsp;ETH</span>
          </Data>
          <Desc>
            You can claim funding from DigixDAO after your project successfully passes a vote.
          </Desc>
          <Actions>
            <Button primary disabled={!eth} data-digix="Wallet-ClaimFunding">
              Claim Funding
            </Button>
          </Actions>
        </Detail>
      </QtrParticipation>
    );
  }
}

export default ClaimFunding;

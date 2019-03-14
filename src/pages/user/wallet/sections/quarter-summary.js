import React from 'react';

import ParticipationReward from '@digix/gov-ui/pages/user/wallet/sections/participation-reward';
import VotingStake from '@digix/gov-ui/pages/user/wallet/sections/voting-stake';
import { Button } from '@digix/gov-ui/components/common/elements/index';
import {
  Actions,
  Data,
  Desc,
  Detail,
  Label,
  QtrSummary,
  QtrParticipation,
  Title,
} from '@digix/gov-ui/pages/user/wallet/style';

class QuarterSummary extends React.Component {
  render() {
    const eth = 0;

    return (
      <QtrSummary>
        <VotingStake />
        <ParticipationReward />
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
      </QtrSummary>
    );
  }
}

export default QuarterSummary;

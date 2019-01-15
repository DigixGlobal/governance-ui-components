import React from 'react';

import { Button } from '@digix/gov-ui/components/common/elements/index';

import {
  WalletWrapper,
  Heading,
  WalletAddress,
  // WalletDetails,
  // WalletItem,
  DigixDAO,
  StakeRewards,
  Title,
  Content,
  Label,
  Data,
  Desc,
  Actions,
} from '@digix/gov-ui/pages/user/wallet/style';

class Wallet extends React.Component {
  render() {
    return (
      <WalletWrapper>
        <Heading>Wallet</Heading>
        <WalletAddress data-digix="Address">
          <span>Address: </span>0x8827837920C8b78f4F4344796a911ace99e56263
        </WalletAddress>
        {/* <WalletDetails>
          <WalletItem>&nbsp;</WalletItem>
          <WalletItem>&nbsp;</WalletItem>
          <WalletItem>&nbsp;</WalletItem>
        </WalletDetails> */}
        <DigixDAO>
          <StakeRewards>
            <Title>DigixDAO Voting Stake</Title>
            <Content>
              <Label>Your Current Stake</Label>
              <Data data-digix="Stake">65.75 Stake</Data>
              <Desc>
                You can lock more DGD to increase your voting power or unlock after a quarter to
                move your DGD back into your wallet.
              </Desc>
              <Actions>
                <Button primary data-digix="LockDGD">
                  Lock DGD
                </Button>
                <Button primary disabled data-digix="UnlockDGD">
                  Unlock DGD
                </Button>
              </Actions>
            </Content>
          </StakeRewards>
          <StakeRewards>
            <Title>DigixDAO Participation Reward</Title>
            <Content>
              <Label>Your Unclaimed Reward</Label>
              <Data data-digix="DGXReward">7.75 DGX</Data>
              <Desc>
                You can claim rewards from actively participating in the DigixDAO during a quarter.
              </Desc>
              <Actions>
                <Button primary data-digix="ClaimReward">
                  Claim Reward
                </Button>
              </Actions>
            </Content>
          </StakeRewards>
          <StakeRewards>
            <Title>DigixDAO Project Funding</Title>
            <Content>
              <Label>Your Funding Amount</Label>
              <Data data-digix="ETHFund">0 ETH</Data>
              <Desc>
                You can claim funding from DigixDAO after your project successfully passes a vote.
              </Desc>
              <Actions>
                <Button primary disabled data-digix="ClaimFunding">
                  Claim Funding
                </Button>
              </Actions>
            </Content>
          </StakeRewards>
        </DigixDAO>
      </WalletWrapper>
    );
  }
}

export default Wallet;

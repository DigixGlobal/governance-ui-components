import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Icon } from '@digix/gov-ui/components/common/elements/index';
import {
  ProfileWrapper,
  Heading,
  UserInfo,
  WalletInfo,
  UserStatus,
  RewardSummary,
  RewardItem,
  Label,
  Data,
  ActivitySummary,
  ActivityItem,
  Moderation,
  Criteria,
  ModeratorReputation,
  ModeratorStake,
  ModeratorLabel,
  Plus,
  Actions,
} from '@digix/gov-ui/pages/user/profile/style';

class Profile extends React.Component {
  render() {
    return (
      <ProfileWrapper>
        <Heading>Profile</Heading>
        <UserInfo>
          <WalletInfo>
            <span>User:</span>0x8827837920C8b78f4F4344796a911ace99e56263
          </WalletInfo>
          <UserStatus>
            <span>Status:</span>Participant
          </UserStatus>
        </UserInfo>
        <RewardSummary>
          <RewardItem column>
            <Label>Quarter Points</Label>
            <Data>82</Data>
          </RewardItem>
          <RewardItem column>
            <Label>Reputation Points</Label>
            <Data>134</Data>
          </RewardItem>
          <RewardItem column>
            <Label>My Stake</Label>
            <Data>65.75</Data>
          </RewardItem>
        </RewardSummary>
        <ActivitySummary>
          <ActivityItem>
            <Label>Participated In</Label>
            <Data>12</Data>
            <Label>Quarter(s)</Label>
            <Actions>
              <Button primary>More Info</Button>
            </Actions>
          </ActivityItem>
          <ActivityItem>
            <Label>Proposed</Label>
            <Data>0</Data>
            <Label>Project(s)</Label>
            <Actions>
              <Button primary>More Info</Button>
            </Actions>
          </ActivityItem>
          <ActivityItem>
            <Label>Claimed</Label>
            <Data>12</Data>
            <Label>DGX</Label>
            <Actions>
              <Button primary>More Info</Button>
            </Actions>
          </ActivityItem>
          <ActivityItem>
            <Label>KYC Status</Label>
            <Data>Not Verified</Data>
            <Label>&nbsp;</Label>
            <Actions>
              <Button primary>Submit KYC</Button>
            </Actions>
          </ActivityItem>
        </ActivitySummary>
        <Moderation>
          <Label>TO GAIN MODERATOR STATUS, YOU WILL NEED ANOTHER</Label>
          <Criteria>
            <ModeratorReputation>
              <Data>9866</Data>
              <ModeratorLabel>Reputation Points</ModeratorLabel>
            </ModeratorReputation>
            <Plus>
              <Icon kind="plus" />
            </Plus>
            <ModeratorStake>
              <Data>934.25</Data>
              <ModeratorLabel>Stake</ModeratorLabel>
            </ModeratorStake>
          </Criteria>
          <Actions>
            <Button primary>Redeem Badge</Button>
            <Button primary>Lock More DGD</Button>
          </Actions>
        </Moderation>
      </ProfileWrapper>
    );
  }
}

export default Profile;

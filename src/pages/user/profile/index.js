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
  ModeratorReqs,
  ReqLabel,
  Plus,
  Actions,
} from '@digix/gov-ui/pages/user/profile/style';

class Profile extends React.Component {
  render() {
    return (
      <ProfileWrapper>
        <Heading>Profile</Heading>
        <UserInfo>
          <WalletInfo data-digix="Address">
            <span>User:</span>0x8827837920C8b78f4F4344796a911ace99e56263
          </WalletInfo>
          <UserStatus>
            <span>Status:</span>Participant
          </UserStatus>
        </UserInfo>
        <RewardSummary>
          <RewardItem column>
            <Label>Quarter Points</Label>
            <Data data-digix="QuarterPoint">82</Data>
          </RewardItem>
          <RewardItem column>
            <Label>Reputation Points</Label>
            <Data data-digix="ReputationPoint">134</Data>
          </RewardItem>
          <RewardItem column>
            <Label>My Stake</Label>
            <Data data-digix="UserStake">65.75</Data>
          </RewardItem>
        </RewardSummary>
        <ActivitySummary>
          <ActivityItem>
            <Label>Participated In</Label>
            <Data data-digix="QtrParticipation">12</Data>
            <Label>Quarter(s)</Label>
            <Actions>
              <Button primary data-digix="QtrParticipationCTA">
                More Info
              </Button>
            </Actions>
          </ActivityItem>
          <ActivityItem>
            <Label>Proposed</Label>
            <Data data-digix="ProposedProjects">0</Data>
            <Label>Project(s)</Label>
            <Actions>
              <Button primary data-digix="ProposedProjectsCTA">
                More Info
              </Button>
            </Actions>
          </ActivityItem>
          <ActivityItem>
            <Label>Claimed</Label>
            <Data data-digix="ClaimedDGX">12</Data>
            <Label>DGX</Label>
            <Actions>
              <Button primary data-digix="ClaimedDGXCTA">
                More Info
              </Button>
            </Actions>
          </ActivityItem>
          <ActivityItem>
            <Label>KYC Status</Label>
            <Data data-digix="KYCStatus">Not Verified</Data>
            <Label>&nbsp;</Label>
            <Actions>
              <Button primary data-digix="KYCStatusCTA">
                Submit KYC
              </Button>
            </Actions>
          </ActivityItem>
        </ActivitySummary>
        <Moderation>
          <Label>TO GAIN MODERATOR STATUS, YOU WILL NEED ANOTHER</Label>
          <Criteria>
            <ModeratorReqs>
              <Data data-digix="ReqReputationPoints">9866</Data>
              <ReqLabel>Reputation Points</ReqLabel>
            </ModeratorReqs>
            <Plus>
              <Icon kind="plus" />
            </Plus>
            <ModeratorReqs>
              <Data data-digix="ReqStake">934.25</Data>
              <ReqLabel>Stake</ReqLabel>
            </ModeratorReqs>
          </Criteria>
          <Actions>
            <Button primary data-digix="RedeemBadgeCTA">
              Redeem Badge
            </Button>
            <Button primary data-digix="LockMoreDGDCTA">
              Lock More DGD
            </Button>
          </Actions>
        </Moderation>
      </ProfileWrapper>
    );
  }
}

export default Profile;

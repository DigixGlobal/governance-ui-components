import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Button, Icon } from '@digix/gov-ui/components/common/elements/index';
import { DEFAULT_STAKE_PER_DGD } from '@digix/gov-ui/constants';
import { getDaoConfig, getDaoDetails } from '@digix/gov-ui/reducers/info-server/actions';
import { truncateNumber } from '@digix/gov-ui/utils/helpers';

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
  ModeratorLabel,
  Plus,
  Actions,
} from '@digix/gov-ui/pages/user/profile/style';

import RedeemBadge from './buttons/redeem-badge';

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.STATUS = {
      moderator: 'Moderator',
      participant: 'Participant',
      pastParticipant: 'Past Participant',
      guest: 'Have not participated',
    };
  }

  componentDidMount() {
    const { getDaoConfigAction, getDaoDetailsAction } = this.props;
    Promise.all([getDaoConfigAction(), getDaoDetailsAction()]);
  }

  getStakePerDgd = () => {
    const { DaoDetails } = this.props;
    const { startOfMainphase, startOfNextQuarter } = DaoDetails.data;

    const currentTime = Date.now() / 1000;
    const inLockingPhase = currentTime < startOfMainphase;
    if (inLockingPhase) {
      return DEFAULT_STAKE_PER_DGD;
    }

    return (startOfNextQuarter - currentTime) / (startOfNextQuarter - startOfMainphase);
  };

  getModeratorRequirements = () => {
    const { AddressDetails, DaoConfig } = this.props;
    const address = AddressDetails.data;
    const config = DaoConfig.data;

    const currentReputation = parseInt(address.reputationPoint, 10);
    const minReputation = parseInt(config.CONFIG_MINIMUM_REPUTATION_FOR_MODERATOR, 10);
    const requiredReputation = Math.max(0, minReputation - currentReputation);

    const currentStake = parseInt(address.lockedDgdStake, 10);
    const minStake = parseInt(config.CONFIG_MINIMUM_DGD_FOR_MODERATOR, 10);
    const stakePerDgd = this.getStakePerDgd();
    const requiredStake = stakePerDgd ? Math.max(0, (minStake - currentStake) / stakePerDgd) : 0;

    const requirements = {
      reputation: truncateNumber(requiredReputation),
      stake: truncateNumber(requiredStake),
    };

    return requirements;
  };

  getStatus = () => {
    const { AddressDetails } = this.props;
    const address = AddressDetails.data;

    if (address.isModerator) {
      return this.STATUS.moderator;
    } else if (address.isParticipant) {
      return this.STATUS.participant;
    } else if (address.lastParticipatedQuarter > 0) {
      return this.STATUS.pastParticipant;
    }

    return this.STATUS.guest;
  };

  render() {
    const { AddressDetails } = this.props;
    const address = AddressDetails.data;

    const status = this.getStatus();
    const stake = truncateNumber(address.lockedDgdStake);
    const moderatorRequirements = this.getModeratorRequirements();
    const hasUnmetModerationRequirements =
      !address.isModerator &&
      (moderatorRequirements.reputation > 0 || moderatorRequirements.stake > 0);

    return (
      <ProfileWrapper>
        <Heading>Profile</Heading>
        <UserInfo>
          <WalletInfo>
            <span>User:</span>
            <span data-digix="Profile-Address">{address.address}</span>
          </WalletInfo>
          <UserStatus>
            <span>Status:</span>
            <span data-digix="Profile-Status">{status}</span>
          </UserStatus>
        </UserInfo>

        <RewardSummary>
          <RewardItem column>
            <Label>Quarter Points</Label>
            <Data data-digix="Profile-QuarterPoints">{address.quarterPoint}</Data>
          </RewardItem>
          <RewardItem column>
            <Label>Reputation Points</Label>
            <Data data-digix="Profile-ReputationPoints">{address.reputationPoint}</Data>
          </RewardItem>
          <RewardItem column>
            <Label>My Stake</Label>
            <Data data-digix="Profile-Stake">{stake}</Data>
          </RewardItem>
        </RewardSummary>

        {/* TODO: Fetch data for this section */}
        <ActivitySummary>
          <ActivityItem>
            <Label>Participated In</Label>
            <Data data-digix="Profile-QuarterParticipation">12</Data>
            <Label>Quarter(s)</Label>
            <Actions>
              <Button primary data-digix="Profile-QuarterParticipation-Cta">
                More Info
              </Button>
            </Actions>
          </ActivityItem>
          <ActivityItem>
            <Label>Proposed</Label>
            <Data data-digix="Profile-Proposals">0</Data>
            <Label>Project(s)</Label>
            <Actions>
              <Button primary data-digix="Profile-Proposals-Cta">
                More Info
              </Button>
            </Actions>
          </ActivityItem>
          <ActivityItem>
            <Label>Claimed</Label>
            <Data data-digix="Profile-DgxClaimed">12</Data>
            <Label>DGX</Label>
            <Actions>
              <Button primary data-digix="Profile-DgxClaimed-Cta">
                More Info
              </Button>
            </Actions>
          </ActivityItem>
          <ActivityItem>
            <Label>KYC Status</Label>
            <Data data-digix="Profile-KycStatus">Not Verified</Data>
            <Label>&nbsp;</Label>
            <Actions>
              <Button primary data-digix="Profile-KycStatus-Cta">
                Submit KYC
              </Button>
            </Actions>
          </ActivityItem>
        </ActivitySummary>

        {hasUnmetModerationRequirements && (
          <Moderation data-digix="Profile-ModerationRequirements">
            <Label>TO GAIN MODERATOR STATUS, YOU WILL NEED ANOTHER</Label>
            <Criteria>
              <ModeratorReqs>
                <Data data-digix="Profile-ModerationRequirements-Reputation">
                  {moderatorRequirements.reputation}
                </Data>
                <ModeratorLabel>Reputation Points</ModeratorLabel>
              </ModeratorReqs>
              <Plus>
                <Icon kind="plus" />
              </Plus>
              <ModeratorReqs>
                <Data data-digix="Profile-ModerationRequirements-Stake">
                  {moderatorRequirements.stake}
                </Data>
                <ModeratorLabel>Stake</ModeratorLabel>
              </ModeratorReqs>
            </Criteria>
            <Actions>
              <RedeemBadge />
              <Button primary>Lock More DGD</Button>
            </Actions>
          </Moderation>
        )}
      </ProfileWrapper>
    );
  }
}

const { func, object } = PropTypes;

Profile.propTypes = {
  AddressDetails: object.isRequired,
  DaoConfig: object,
  DaoDetails: object,
  getDaoConfigAction: func.isRequired,
  getDaoDetailsAction: func.isRequired,
};

Profile.defaultProps = {
  DaoConfig: undefined,
  DaoDetails: undefined,
};

const mapStateToProps = ({ infoServer }) => ({
  AddressDetails: infoServer.AddressDetails,
  DaoConfig: infoServer.DaoConfig,
  DaoDetails: infoServer.DaoDetails,
});

export default connect(
  mapStateToProps,
  {
    getDaoConfigAction: getDaoConfig,
    getDaoDetailsAction: getDaoDetails,
  }
)(Profile);

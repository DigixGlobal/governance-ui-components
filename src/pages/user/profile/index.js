import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Button, Icon } from '@digix/gov-ui/components/common/elements/index';
import { DEFAULT_STAKE_PER_DGD } from '@digix/gov-ui/constants';
import { getDaoConfig, getDaoDetails } from '@digix/gov-ui/reducers/info-server/actions';
import { showRightPanel } from '@digix/gov-ui/reducers/gov-ui/actions';
import { parseBigNumber } from 'spectrum-lightsuite/src/helpers/stringUtils';
import { truncateNumber } from '@digix/gov-ui/utils/helpers';
import UsernameOverlay from '@digix/gov-ui/components/common/blocks/overlay/profile-username/index';
import EmailOverlay from '@digix/gov-ui/components/common/blocks/overlay/profile-email/index';

import {
  ProfileWrapper,
  Heading,
  UserInfo,
  UserItem,
  UserLabel,
  UserData,
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

    const currentReputation = Number(address.reputationPoint);
    const minReputation = parseBigNumber(config.CONFIG_MINIMUM_REPUTATION_FOR_MODERATOR);
    const requiredReputation = Math.max(0, minReputation - currentReputation);

    const currentStake = Number(address.lockedDgdStake);
    const minStake = Number(config.CONFIG_MINIMUM_DGD_FOR_MODERATOR);
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

  showSetUsernameOverlay() {
    this.props.showRightPanel({
      component: <UsernameOverlay />,
      show: true,
    });
  }

  showSetEmailOverlay() {
    this.props.showRightPanel({
      component: <EmailOverlay />,
      show: true,
    });
  }

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
          <UserItem>
            <UserLabel>User:</UserLabel>
            <UserData data-digix="Profile-UserName">someone_else</UserData>
            <Button
              primary
              icon
              data-digix="Profile-UserName-Cta"
              onClick={() => this.showSetUsernameOverlay()}
            >
              <Icon kind="plus" />
              Set Username
            </Button>
          </UserItem>
          <UserItem>
            <UserLabel>Status:</UserLabel>
            <UserData data-digix="Profile-Status">{status}</UserData>
          </UserItem>
          <UserItem>
            <UserLabel>Email:</UserLabel>
            <UserData data-digix="Profile-Email">example@email.com</UserData>
            <Button
              primary
              icon
              data-digix="Profile-Email-Cta"
              onClick={() => this.showSetEmailOverlay()}
            >
              <Icon kind="plus" />
              Set Email
            </Button>
          </UserItem>
          <UserItem>
            <UserLabel>Address:</UserLabel>
            <UserData data-digix="Profile-Address">{address.address}</UserData>
          </UserItem>
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
                <ReqLabel>Reputation Points</ReqLabel>
              </ModeratorReqs>
              <Plus>
                <Icon kind="plus" />
              </Plus>
              <ModeratorReqs>
                <Data data-digix="Profile-ModerationRequirements-Stake">
                  {moderatorRequirements.stake}
                </Data>
                <ReqLabel>Stake</ReqLabel>
              </ModeratorReqs>
            </Criteria>
            <Actions>
              <RedeemBadge />
              <Button primary data-digix="Profile-LockMoreDgd-Cta">
                Lock More DGD
              </Button>
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
  showRightPanel: func.isRequired,
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
    showRightPanel,
  }
)(Profile);

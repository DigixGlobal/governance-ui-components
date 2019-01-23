import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import EmailOverlay from '@digix/gov-ui/components/common/blocks/overlay/profile-email/index';
import KycOverlay from '@digix/gov-ui/components/common/blocks/overlay/kyc/index';
import UsernameOverlay from '@digix/gov-ui/components/common/blocks/overlay/profile-username/index';
import { Button, Icon } from '@digix/gov-ui/components/common/elements/index';
import { DEFAULT_STAKE_PER_DGD } from '@digix/gov-ui/constants';
import {
  getAddressDetails,
  getDaoConfig,
  getDaoDetails,
} from '@digix/gov-ui/reducers/info-server/actions';
import { getUserStatus, truncateNumber } from '@digix/gov-ui/utils/helpers';
import { showHideLockDgdOverlay, showRightPanel } from '@digix/gov-ui/reducers/gov-ui/actions';
import { withFetchUser } from '@digix/gov-ui/api/users';
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
    this.state = {
      stake: truncateNumber(props.AddressDetails.data.lockedDgdStake),
    };
  }

  componentDidMount() {
    const {
      AddressDetails,
      getAddressDetailsAction,
      getDaoConfigAction,
      getDaoDetailsAction,
    } = this.props;

    getDaoConfigAction();
    getDaoDetailsAction();
    getAddressDetailsAction(AddressDetails.data.address).then(() => {
      this.setStateFromAddressDetails();
    });
  }

  onLockDgd = amountLocked => {
    let { stake } = this.state;
    stake = truncateNumber(stake + amountLocked);
    this.setState({ stake });
  };

  setStateFromAddressDetails = () => {
    const address = this.props.AddressDetails.data;
    const stake = truncateNumber(address.lockedDgdStake);
    this.setState({ stake });
  };

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
    const minReputation = Number(config.CONFIG_MINIMUM_REPUTATION_FOR_MODERATOR);
    const requiredReputation = Math.max(0, minReputation - currentReputation);

    const currentStake = this.state.stake;
    const minStake = Number(config.CONFIG_MINIMUM_DGD_FOR_MODERATOR);
    const stakePerDgd = this.getStakePerDgd();
    const requiredStake = stakePerDgd ? Math.max(0, (minStake - currentStake) / stakePerDgd) : 0;

    const requirements = {
      reputation: truncateNumber(requiredReputation),
      stake: truncateNumber(requiredStake),
    };

    return requirements;
  };

  showSetUsernameOverlay() {
    this.props.showRightPanel({
      component: <UsernameOverlay />,
      show: true,
    });
  }

  showSetEmailOverlay() {
    const { email } = this.props.userData;
    this.props.showRightPanel({
      component: <EmailOverlay currentEmail={email} />,
      show: true,
    });
  }

  showKycOverlay() {
    this.props.showRightPanel({
      component: <KycOverlay />,
      show: true,
    });
  }

  render() {
    const { displayName, email } = this.props.userData;
    const { AddressDetails } = this.props;
    const { stake } = this.state;
    const address = AddressDetails.data;

    const status = getUserStatus(address);
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
            <UserData data-digix="Profile-UserName">{displayName}</UserData>
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
            {email && <UserData data-digix="Profile-Email">{email}</UserData>}
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
              <Button
                primary
                data-digix="Profile-KycStatus-Cta"
                onClick={() => this.showKycOverlay()}
              >
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
              <Button
                primary
                data-digix="Profile-LockMoreDgd-Cta"
                onClick={() => this.props.showHideLockDgdOverlay(true, this.onLockDgd)}
              >
                Lock More DGD
              </Button>
            </Actions>
          </Moderation>
        )}
      </ProfileWrapper>
    );
  }
}

const { func, object, shape, string } = PropTypes;

Profile.propTypes = {
  AddressDetails: object.isRequired,
  DaoConfig: object,
  DaoDetails: object,
  getAddressDetailsAction: func.isRequired,
  getDaoConfigAction: func.isRequired,
  getDaoDetailsAction: func.isRequired,
  showHideLockDgdOverlay: func.isRequired,
  showRightPanel: func.isRequired,
  userData: shape({
    displayName: string,
    email: string,
  }),
};

Profile.defaultProps = {
  DaoConfig: undefined,
  DaoDetails: undefined,
  userData: undefined,
};

const mapStateToProps = ({ infoServer }) => ({
  AddressDetails: infoServer.AddressDetails,
  DaoConfig: infoServer.DaoConfig,
  DaoDetails: infoServer.DaoDetails,
});

export default withFetchUser(
  connect(
    mapStateToProps,
    {
      getAddressDetailsAction: getAddressDetails,
      getDaoConfigAction: getDaoConfig,
      getDaoDetailsAction: getDaoDetails,
      showHideLockDgdOverlay,
      showRightPanel,
    }
  )(Profile)
);

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import EmailOverlay from '@digix/gov-ui/components/common/blocks/overlay/profile-email/index';
import KycOverlay from '@digix/gov-ui/components/common/blocks/overlay/kyc/index';
import RedeemBadge from '@digix/gov-ui/pages/user/profile/buttons/redeem-badge';
import UsernameOverlay from '@digix/gov-ui/components/common/blocks/overlay/profile-username/index';
import { Button, Icon } from '@digix/gov-ui/components/common/elements/index';
import { DEFAULT_STAKE_PER_DGD, KycStatus } from '@digix/gov-ui/constants';
import {
  getAddressDetails,
  getDaoConfig,
  getDaoDetails,
} from '@digix/gov-ui/reducers/info-server/actions';
import { getUserStatus, truncateNumber } from '@digix/gov-ui/utils/helpers';
import { showHideLockDgdOverlay, showRightPanel } from '@digix/gov-ui/reducers/gov-ui/actions';
import { withFetchUser } from '@digix/gov-ui/api/graphql-queries/users';

import {
  ProfileWrapper,
  Heading,
  UserInfo,
  UserItem,
  UserLabel,
  UserData,
  UserStats,
  Item,
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
  constructor(props) {
    super(props);
    this.state = {
      hasPendingLockTransaction: false,
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
    getAddressDetailsAction(AddressDetails.data.address);
    this.props.refetchUser();
  }

  onLockDgd = () => {
    this.setState({
      hasPendingLockTransaction: true,
    });
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

    const currentStake = Number(address.lockedDgdStake);
    const minStake = Number(config.CONFIG_MINIMUM_DGD_FOR_MODERATOR);
    const stakePerDgd = this.getStakePerDgd();
    const requiredStake = Math.max(0, (minStake - currentStake) / stakePerDgd);

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
    const { refetchUser } = this.props;
    const { kyc } = this.props.userData;

    if (kyc && kyc.status === KycStatus.approved) {
      return;
    }

    this.props.showRightPanel({
      component: <KycOverlay refetchUser={refetchUser} />,
      large: true,
      show: true,
    });
  }

  showLockDgdOverlay() {
    this.props.showHideLockDgdOverlay(true, this.onLockDgd, 'Profile Page');
  }

  renderActivitySummary() {
    const { email, kyc } = this.props.userData;
    let currentKycStatus = 'Not Verified';
    if (kyc && kyc.status) {
      currentKycStatus = kyc.status.charAt(0) + kyc.status.slice(1).toLowerCase();
    }

    const kycStatusesForResubmission = [KycStatus.expired, KycStatus.approved, KycStatus.rejected];
    const canResubmitKyc = kyc ? kycStatusesForResubmission.includes(kyc.status) : false;
    const canSubmitKyc = (email && !kyc) || (kyc && kyc.status === KycStatus.pending);
    const showSubmitKycButton = canSubmitKyc || canResubmitKyc;
    const setEmailForKyc = !email && !kyc;

    return (
      <ActivitySummary>
        <ActivityItem column>
          <Label>Participated In</Label>
          <Data data-digix="Profile-QuarterParticipation">12</Data>
          <Label>Quarter(s)</Label>
          <Actions>
            <Button primary data-digix="Profile-QuarterParticipation-Cta">
              More Info
            </Button>
          </Actions>
        </ActivityItem>

        <ActivityItem column>
          <Label>Proposed</Label>
          <Data data-digix="Profile-Proposals">0</Data>
          <Label>Project(s)</Label>
          <Actions>
            <Button primary data-digix="Profile-Proposals-Cta">
              More Info
            </Button>
          </Actions>
        </ActivityItem>

        <ActivityItem column>
          <Label>Claimed</Label>
          <Data data-digix="Profile-DgxClaimed">12</Data>
          <Label>DGX</Label>
          <Actions>
            <Button primary data-digix="Profile-DgxClaimed-Cta">
              More Info
            </Button>
          </Actions>
        </ActivityItem>

        <ActivityItem column>
          <Label>KYC Status</Label>
          <Data data-digix="Profile-KycStatus">{currentKycStatus}</Data>
          <Label>&nbsp;</Label>
          <Actions>
            {setEmailForKyc && (
              <Button
                primary
                data-digix="Profile-KycStatus-SetEmail"
                onClick={() => this.showSetEmailOverlay()}
              >
                Set Email to submit KYC
              </Button>
            )}

            {showSubmitKycButton && (
              <Button
                primary
                disabled={kyc && kyc.status === KycStatus.pending}
                data-digix="Profile-KycStatus-Submit"
                onClick={() => this.showKycOverlay()}
              >
                {canSubmitKyc && <span>Submit KYC</span>}
                {canResubmitKyc && <span>Re-submit KYC</span>}
              </Button>
            )}
          </Actions>
        </ActivityItem>
      </ActivitySummary>
    );
  }

  render() {
    const { displayName, email } = this.props.userData;
    const { AddressDetails } = this.props;
    const { hasPendingLockTransaction } = this.state;

    const address = AddressDetails.data;
    let stake = Number(address.lockedDgdStake);
    const usernameIsSet = this.props.userData.username;

    const status = getUserStatus(address);
    const moderatorRequirements = this.getModeratorRequirements();
    const hasUnmetModerationRequirements =
      !address.isModerator &&
      (moderatorRequirements.reputation > 0 || moderatorRequirements.stake > 0);

    stake = truncateNumber(stake);

    return (
      <ProfileWrapper>
        <Heading>Profile</Heading>
        <UserInfo>
          <UserItem>
            <UserLabel>User:</UserLabel>
            <UserData data-digix="Profile-UserName">{displayName}</UserData>
            {!usernameIsSet && (
              <Button
                primary
                icon
                xsmall
                data-digix="Profile-UserName-Cta"
                onClick={() => this.showSetUsernameOverlay()}
                style={{ margin: 0 }}
              >
                <Icon kind="plus" />
                Set Username
              </Button>
            )}
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
              xsmall
              data-digix="Profile-Email-Cta"
              onClick={() => this.showSetEmailOverlay()}
              style={{ margin: 0 }}
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

        <UserStats>
          <Item>
            <Label>Quarter Points</Label>
            <Data data-digix="Profile-QuarterPoints">{address.quarterPoint}</Data>
          </Item>
          <Item>
            <Label>Reputation Points</Label>
            <Data data-digix="Profile-ReputationPoints">{address.reputationPoint}</Data>
          </Item>
          <Item>
            <Label>My Stake</Label>
            <Data data-digix="Profile-Stake">
              <span>{stake}</span>
              <span className="equiv" data-digix="Profile-DGD-Locked">
                ({AddressDetails.data.lockedDgd} DGD LOCKED)
              </span>
            </Data>
          </Item>
        </UserStats>
        {this.renderActivitySummary()}

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
              <RedeemBadge history={this.props.history} />
              <Button
                primary
                data-digix="Profile-LockMoreDgd-Cta"
                disabled={hasPendingLockTransaction}
                onClick={() => this.showLockDgdOverlay()}
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
  history: object.isRequired,
  getAddressDetailsAction: func.isRequired,
  getDaoConfigAction: func.isRequired,
  getDaoDetailsAction: func.isRequired,
  refetchUser: func.isRequired,
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

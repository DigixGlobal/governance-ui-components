import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import EmailOverlay from '@digix/gov-ui/components/common/blocks/overlay/profile-email';
import KycOverlay from '@digix/gov-ui/components/common/blocks/overlay/kyc';
import { Button } from '@digix/gov-ui/components/common/elements';
import { KycStatus } from '@digix/gov-ui/constants';
import { showRightPanel } from '@digix/gov-ui/reducers/gov-ui/actions';
import { withFetchUser } from '@digix/gov-ui/api/graphql-queries/users';

import {
  Actions,
  ActivityItem,
  ActivitySummary,
  Data,
  Label,
} from '@digix/gov-ui/pages/user/profile/style';

class ProfileActivitySummary extends React.Component {
  constructor(props) {
    super(props);
    this.DEFAULT_KYC_STATUS = 'Not Verified';
    this.RESUBMIT_STATUSES = [KycStatus.expired, KycStatus.rejected];
  }

  componentDidMount() {
    this.props.refetchUser();
    this.props.subscribeToKyc();
  }

  getKycStatus() {
    const { kyc } = this.props.userData;
    if (kyc && kyc.status) {
      return kyc.status.charAt(0) + kyc.status.slice(1).toLowerCase();
    }

    return this.DEFAULT_KYC_STATUS;
  }

  showKycOverlay() {
    const { refetchUser } = this.props;

    this.props.showRightPanel({
      component: <KycOverlay refetchUser={refetchUser} />,
      large: true,
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

  renderKyc() {
    const { email, kyc } = this.props.userData;

    const currentKycStatus = this.getKycStatus();
    const canResubmitKyc = kyc ? this.RESUBMIT_STATUSES.includes(kyc.status) : false;
    const canSubmitKyc = (email && !kyc) || (kyc && kyc.status === KycStatus.pending);
    const showSubmitKycButton = canSubmitKyc || canResubmitKyc;
    const setEmailForKyc = !email && !kyc;

    return (
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
    );
  }

  render() {
    return (
      <ActivitySummary>
        {/* NOTE: no data to show yet, so we're hiding the summary for now */}
        {/* <ActivityItem column>
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
        </ActivityItem> */}
        {this.renderKyc()}
      </ActivitySummary>
    );
  }
}

const { func, shape, string } = PropTypes;

ProfileActivitySummary.propTypes = {
  refetchUser: func.isRequired,
  showRightPanel: func.isRequired,
  subscribeToKyc: func.isRequired,
  userData: shape({
    displayName: string,
    email: string,
  }),
};

ProfileActivitySummary.defaultProps = {
  userData: undefined,
};

const mapStateToProps = () => ({});
export default withFetchUser(
  connect(
    mapStateToProps,
    {
      showRightPanel,
    }
  )(ProfileActivitySummary)
);

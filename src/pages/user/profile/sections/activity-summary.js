import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import EmailOverlay from '@digix/gov-ui/components/common/blocks/overlay/profile-email';
import KycOverlay from '@digix/gov-ui/components/common/blocks/overlay/kyc';
import ErrorMessageOverlay from '@digix/gov-ui/components/common/blocks/overlay/error-message';
import { Button } from '@digix/gov-ui/components/common/elements';
import { KycErrors, KycStatus } from '@digix/gov-ui/constants';
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
    this.RESUBMIT_STATUSES = [KycStatus.expired, KycStatus.approved, KycStatus.rejected];
  }

  componentDidMount() {
    this.props.refetchUser();
    this.props.subscribeToKyc();
  }

  getKycStatus() {
    // TODO: translate for other languages
    const { kyc } = this.props.userData;
    if (kyc && kyc.status) {
      return kyc.status.charAt(0) + kyc.status.slice(1).toLowerCase();
    }

    return this.DEFAULT_KYC_STATUS;
  }

  resubmitKyc() {
    const { kyc } = this.props.userData;
    const hasRejectedKyc = kyc.status === KycStatus.rejected;

    if (hasRejectedKyc) {
      this.showKycOverlay();
    } else {
      this.showErrorOverlay();
    }
  }

  showErrorOverlay() {
    this.props.showRightPanel({
      component: (
        <ErrorMessageOverlay
          errors={[KycErrors.resubmit]}
          location={this.props.translations.proposalErrors.returnToProfile}
        />
      ),
      show: true,
    });
  }

  showKycOverlay() {
    const { refetchUser, translations } = this.props;

    this.props.showRightPanel({
      component: <KycOverlay refetchUser={refetchUser} translations={translations} />,
      large: true,
      show: true,
    });
  }

  showSetEmailOverlay() {
    const { tSetEmail } = this.props;
    const { email } = this.props.userData;

    this.props.showRightPanel({
      component: <EmailOverlay currentEmail={email} translations={tSetEmail} />,
      show: true,
    });
  }

  renderKyc() {
    const { email, kyc } = this.props.userData;

    const currentKycStatus = this.getKycStatus();
    const hasPendingKyc = kyc && kyc.status === KycStatus.pending;

    const canResubmitKyc = kyc ? this.RESUBMIT_STATUSES.includes(kyc.status) : false;
    const canSubmitKyc = email && !kyc;
    const showSubmitKycButton = canSubmitKyc || canResubmitKyc;
    const setEmailForKyc = !email && !kyc;

    const t = this.props.translations.kyc;
    const tOpenKycForm = t.OpenKycForm;
    const tResubmit = t.Errors.resubmit;
    const tKycStatus = t.Statuses[currentKycStatus.toLowerCase()] || currentKycStatus;

    return (
      <ActivityItem column>
        <Label>{t.Status}</Label>
        <Data data-digix="Profile-KycStatus">{tKycStatus}</Data>
        <Label>&nbsp;</Label>
        <Actions>
          {setEmailForKyc && (
            <Button
              primary
              data-digix="Profile-KycStatus-SetEmail"
              onClick={() => this.showSetEmailOverlay()}
            >
              {t.setEmail}
            </Button>
          )}

          {showSubmitKycButton && canSubmitKyc && (
            <Button
              primary
              disabled={hasPendingKyc}
              data-digix="Profile-KycStatus-Submit"
              onClick={() => this.showKycOverlay()}
            >
              {tOpenKycForm.overlayButton}
            </Button>
          )}
          {showSubmitKycButton && canResubmitKyc && (
            <Button
              primary
              disabled={hasPendingKyc}
              data-digix="Profile-KycStatus-Submit"
              onClick={() => this.resubmitKyc()}
            >
              {tResubmit.title}
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

const { func, object, shape, string } = PropTypes;

ProfileActivitySummary.propTypes = {
  refetchUser: func.isRequired,
  showRightPanel: func.isRequired,
  subscribeToKyc: func.isRequired,
  translations: object.isRequired,
  tSetEmail: object.isRequired,
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

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Button } from '@digix/gov-ui/components/common/elements/index';
import { withSubmitKyc } from '@digix/gov-ui/api/graphql-queries/kyc';

class SubmitKycButton extends React.Component {
  submit = () => {
    const { collectFormData, submitKyc } = this.props;
    const kycRequest = collectFormData();
    submitKyc(kycRequest);
    this.props.setHasPendingSubmission(true);
  };

  render() {
    const { disable, hasPendingSubmission } = this.props;
    const disableButton = disable || hasPendingSubmission;

    return (
      <Button
        secondary
        disabled={disableButton}
        data-digix="KycOverlay-Submit"
        onClick={this.submit}
      >
        Submit KYC
      </Button>
    );
  }
}
const { bool, func } = PropTypes;

SubmitKycButton.propTypes = {
  collectFormData: func.isRequired,
  disable: bool,
  hasPendingSubmission: bool.isRequired,
  setHasPendingSubmission: func.isRequired,
  submitKyc: func.isRequired,
};

SubmitKycButton.defaultProps = {
  disable: false,
};

const mapStateToProps = () => ({});
export default withSubmitKyc(
  connect(
    mapStateToProps,
    {}
  )(SubmitKycButton)
);

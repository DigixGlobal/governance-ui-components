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
  };

  render() {
    const { disable } = this.props;
    return (
      <Button secondary disabled={disable} data-digix="KycOverlay-Submit" onClick={this.submit}>
        Submit KYC
      </Button>
    );
  }
}
const { bool, func } = PropTypes;

SubmitKycButton.propTypes = {
  collectFormData: func.isRequired,
  disable: bool,
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

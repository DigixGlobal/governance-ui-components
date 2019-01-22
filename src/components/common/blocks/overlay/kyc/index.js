import React from 'react';
import { connect } from 'react-redux';

import KycOverlayIntro from '@digix/gov-ui/components/common/blocks/overlay/kyc/intro';
import KycOverlayBasicInformation from '@digix/gov-ui/components/common/blocks/overlay/kyc/basic-information';
import KycOverlayAddress from '@digix/gov-ui/components/common/blocks/overlay/kyc/address';
import KycOverlayPhotoUpload from '@digix/gov-ui/components/common/blocks/overlay/kyc/photo-upload';
import web3Connect from 'spectrum-lightsuite/src/helpers/web3/connect';
import { OverlayHeader as Header } from '@digix/gov-ui/components/common/common-styles';
import {
  WizardContainer,
  WizardMenu,
} from '@digix/gov-ui/components/common/blocks/overlay/kyc/style.js';

class KycOverlay extends React.Component {
  constructor(props) {
    super(props);

    this.STAGES = {
      intro: 1,
      basicInformation: 2,
      address: 3,
      photoUpload: 4,
    };

    this.MAX_STEPS = Object.keys(this.STAGES).length;
    this.state = {
      step: this.STAGES.intro,
    };
  }

  onPreviousStep = () => {
    let { step } = this.state;
    if (step < 1) {
      return;
    }

    step -= 1;
    this.setState({ step });
  };

  onNextStep = () => {
    let { step } = this.state;
    if (step >= this.MAX_STEPS) {
      return;
    }

    step += 1;
    this.setState({ step });
  };

  renderKycStep() {
    const { step } = this.state;

    switch (step) {
      case this.STAGES.basicInformation:
        return <KycOverlayBasicInformation onNextStep={this.onNextStep} />;
      case this.STAGES.address:
        return (
          <KycOverlayAddress onNextStep={this.onNextStep} onPreviousStep={this.onPreviousStep} />
        );
      case this.STAGES.photoUpload:
        return <KycOverlayPhotoUpload onPreviousStep={this.onPreviousStep} />;
      default:
        return <KycOverlayIntro onNextStep={this.onNextStep} />;
    }
  }

  render() {
    const { step } = this.state;
    return (
      <div>
        <Header uppercase>KYC</Header>

        {step !== this.STAGES.intro && (
          <WizardContainer>
            <WizardMenu active>Basic Information</WizardMenu>
            <WizardMenu>Residence Proof</WizardMenu>
            <WizardMenu>Photo Proof</WizardMenu>
          </WizardContainer>
        )}
        {this.renderKycStep()}
      </div>
    );
  }
}

KycOverlay.propTypes = {};
const mapStateToProps = () => ({});
export default web3Connect(
  connect(
    mapStateToProps,
    {}
  )(KycOverlay)
);

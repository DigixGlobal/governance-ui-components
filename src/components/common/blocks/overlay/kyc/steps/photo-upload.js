import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import WebCam from '@digix/react-webcam';

import Countdown from 'react-countdown-now';

import KycFormStep from '@digix/gov-ui/components/common/blocks/overlay/kyc/form-step';
import { Button, Select } from '@digix/gov-ui/components/common/elements/index';
import { Label } from '@digix/gov-ui/components/common/common-styles';
import {
  CamPreview,
  FieldGroup,
  FieldItem,
  FormSection,
  GetStarted,
  GuideItem,
  IdentificationCode,
  MediaContainer,
  Photo,
  PhotoVerification,
  PhotoViewer,
  SelfieGuide,
} from '@digix/gov-ui/components/common/blocks/overlay/kyc/style.js';

import SelfieGuideA from '@digix/gov-ui/assets/images/selfie_guide1.png';
import SelfieGuideB from '@digix/gov-ui/assets/images/selfie_guide2.png';
import SelfieGuideC from '@digix/gov-ui/assets/images/selfie_guide3.png';

import web3Connect from 'spectrum-lightsuite/src/helpers/web3/connect';
import SpectrumConfig from 'spectrum-lightsuite/spectrum.config';

const network = SpectrumConfig.defaultNetworks[0];

class KycOverlayPhotoUpload extends KycFormStep {
  constructor(props) {
    super(props);

    const { formValues } = props;
    this.state = {
      ticking: false,
      showWebcam: false,
      useWebcam: false,
      formValues: {
        identificationPoseDataUrl: formValues.identificationPoseDataUrl || undefined,
        identificationPoseVerificationCode: 'Loading...',
      },
      proofMethod: 'upload',
    };

    const stateValues = this.state.formValues;
    this.VALIDATION_RULES = {
      identificationPoseDataUrl: {
        customValidation: this.isImageFileValid,
        defaultErrorMessage: this.ERROR_MESSAGES.required,
        errorMessage: null,
        hasError: stateValues.identificationPoseDataUrl ? false : undefined,
        label: this.LABELS.imageFile,
        pattern: this.REGEX.nonEmptyString,
        type: this.FIELD_TYPES.fileInput,
      },

      identificationPoseVerificationCode: {
        hasError: false,
      },
    };

    this.PHOTO_PROOF_METHODS = [
      {
        text: 'Photo Upload',
        value: 'upload',
      },
      {
        text: 'Webcam Capture',
        value: 'webcam',
      },
    ];
  }

  setRef = webcam => {
    this.webcam = webcam;
  };

  componentDidMount() {
    const { web3Redux } = this.props;
    const { web3 } = web3Redux.networks[network];
    web3.eth.getBlock('latest').then(block => {
      const blockNumber = block.number;
      const firstTwoChars = block.hash.substring(2, 4);
      const lastTwoChars = block.hash.slice(-2);
      const identificationPoseVerificationCode = `${blockNumber}-${firstTwoChars}-${lastTwoChars}`;
      this.setState({ identificationPoseVerificationCode });
    });
  }

  capture = () => {
    const { onPhotoCaptured } = this.props;
    const capturedImage = this.webcam.getScreenshot();

    if (onPhotoCaptured) onPhotoCaptured(capturedImage);
    if (capturedImage) {
      this.toggleTicking(capturedImage);
    }
  };

  toggleWebcamDisplay = () => {
    this.setState({ useWebcam: true, showWebcam: true });
  };

  toggleTicking = capturedImage => {
    const { formValues, ticking } = this.state;
    formValues.identificationPoseDataUrl = capturedImage;
    if (!capturedImage) {
      this.setState({ showWebcam: true });
    }
    setTimeout(() => {
      this.setState({
        formValues: { ...formValues },
        ticking: !ticking,
        showWebcam: capturedImage === undefined,
      });
    }, 1000); // Add this delay to allow webcam to show
  };

  countdownRenderer = ({ seconds }) => <div>{`Taking a Photo in ${seconds}...`}</div>;

  changeProofMethod = e => {
    this.setState({
      proofMethod: e.target.value,
    });
  };

  renderCountdown = () => {
    setTimeout(() => {}, 1000); // delay timer to allow webcam to show
    return (
      <Countdown
        date={Date.now() + 5000}
        onStart={this.toggleTicking}
        onComplete={this.capture}
        renderer={props => this.countdownRenderer(props)}
      />
    );
  };

  renderWebCam() {
    const { identificationPoseDataUrl, identificationPoseVerificationCode } = this.state.formValues;
    const { ticking, showWebcam, useWebcam } = this.state;

    return (
      <section>
        {!useWebcam && (
          <PhotoVerification webcam>
            <MediaContainer>
              <GetStarted>
                <p>
                  Please allow activation of your webcam. Once you allow access, you may need to
                  refresh in order to proceed.
                  <br />
                  You will also be asked to write down a verification code on a piece of paper.
                  Please have a paper and pen handy.
                </p>
                <Label>WEBCAM PREVIEW</Label>
                <CamPreview>
                  <WebCam
                    audio={false}
                    height={450}
                    ref={this.setRef}
                    screenshotFormat="image/jpeg"
                    width={600}
                  />
                </CamPreview>
                <p>
                  Only continue when you can see the preview above.
                  <br />
                  If you do not have a webcam or are unable to see the preview after granting
                  permission, you will have the option of uploading an image instead.
                </p>
                <Button secondary width="60" onClick={this.toggleWebcamDisplay}>
                  Get Started
                </Button>
              </GetStarted>
            </MediaContainer>
          </PhotoVerification>
        )}

        {useWebcam && (
          <PhotoVerification webcam>
            <MediaContainer>
              <GetStarted>
                <IdentificationCode>{identificationPoseVerificationCode}</IdentificationCode>
                <p>
                  Write the above code on a piece of paper and show it to the webcam along with your
                  face and your identification document.
                </p>
                <PhotoViewer webcam>
                  <SelfieGuide webcam>
                    <GuideItem>
                      <img height="" src={SelfieGuideA} alt="Selfie Guide" />
                    </GuideItem>
                    <GuideItem>
                      <img height="" src={SelfieGuideB} alt="Selfie Guide" />
                    </GuideItem>
                    <GuideItem>
                      <img height="" src={SelfieGuideC} alt="Selfie Guide" />
                    </GuideItem>
                  </SelfieGuide>
                  <Photo>
                    {identificationPoseDataUrl && (
                      <img src={identificationPoseDataUrl} alt="Identification Pose Preview" />
                    )}

                    {showWebcam && (
                      <Fragment>
                        <WebCam
                          audio={false}
                          height={450}
                          ref={this.setRef}
                          screenshotFormat="image/jpeg"
                          width={450}
                          style={{ display: showWebcam ? 'block' : 'none' }}
                        />
                      </Fragment>
                    )}
                    {ticking && this.renderCountdown()}
                  </Photo>
                </PhotoViewer>

                {!ticking && (
                  <Button onClick={() => this.toggleTicking()} secondary>
                    Take a Photo (5 seconds countdown)
                  </Button>
                )}
              </GetStarted>
            </MediaContainer>
          </PhotoVerification>
        )}
      </section>
    );
  }

  renderPhotoUpload() {
    const { identificationPoseDataUrl } = this.state.formValues;

    return (
      <PhotoVerification>
        <MediaContainer>
          <FieldGroup>
            {this.renderField('identificationPoseDataUrl', { caption: 'Upload Photo' })}
          </FieldGroup>

          <PhotoViewer>
            <SelfieGuide>
              <GuideItem>
                <img height="" src={SelfieGuideA} alt="Selfie Guide" />
              </GuideItem>
              <GuideItem>
                <img height="" src={SelfieGuideB} alt="Selfie Guide" />
              </GuideItem>
              <GuideItem>
                <img height="" src={SelfieGuideC} alt="Selfie Guide" />
              </GuideItem>
            </SelfieGuide>
            <Photo>
              {identificationPoseDataUrl && (
                <img src={identificationPoseDataUrl} alt="Identification Pose Preview" />
              )}
            </Photo>
          </PhotoViewer>
        </MediaContainer>
      </PhotoVerification>
    );
  }

  render() {
    const { proofMethod } = this.state;
    return (
      <FormSection>
        <FieldGroup>
          <FieldItem>
            <Label>Photo Proof Method</Label>
            <Select
              fluid
              item="upload"
              items={this.PHOTO_PROOF_METHODS}
              onChange={this.changeProofMethod}
            />
          </FieldItem>
        </FieldGroup>
        {proofMethod === 'webcam' && this.renderWebCam()}
        {proofMethod === 'upload' && this.renderPhotoUpload()}
      </FormSection>
    );
  }
}

const { bool, func, number, object } = PropTypes;
KycOverlayPhotoUpload.propTypes = {
  currentStep: number.isRequired,
  formOptions: object.isRequired,
  isLastStep: bool.isRequired,
  setValidForm: func.isRequired,
  web3Redux: object.isRequired,
  updateKycFormValues: func.isRequired,
};

export default web3Connect(KycOverlayPhotoUpload);

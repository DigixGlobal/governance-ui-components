import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import Countdown from 'react-countdown-now';
import KycFormStep from '@digix/gov-ui/components/common/blocks/overlay/kyc/form-step';
import WebCam from '@digix/react-webcam';
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
  WebcamCountdown,
} from '@digix/gov-ui/components/common/blocks/overlay/kyc/style.js';

import SelfieGuideA from '@digix/gov-ui/assets/images/selfie_guide1.png';
import SelfieGuideB from '@digix/gov-ui/assets/images/selfie_guide2.png';
import SelfieGuideC from '@digix/gov-ui/assets/images/selfie_guide3.png';

class KycOverlayPhotoUpload extends KycFormStep {
  constructor(props) {
    super(props);

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

    const { formValues } = props;
    this.state = {
      ticking: false,
      showWebcam: false,
      useWebcam: false,
      formValues: {
        identificationPoseDataUrl: formValues.identificationPoseDataUrl || undefined,
        identificationPoseVerificationCode: props.idVerificationCode,
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

    this.webcam = undefined;
  }

  changeProofMethod = e => {
    const { formValues } = this.state;
    formValues.identificationPoseDataUrl = undefined;

    this.setState({
      formValues: { ...formValues },
      proofMethod: e.target.value,
    });
  };

  captureWebcamPhoto = () => {
    const { onPhotoCaptured } = this.props;
    const capturedImage = this.webcam.getScreenshot();

    if (onPhotoCaptured) {
      onPhotoCaptured(capturedImage);
    }

    if (capturedImage) {
      this.toggleTicking(capturedImage);
    }
  };

  setWebcamRef = webcam => {
    this.webcam = webcam;
  };

  toggleTicking = capturedImage => {
    const { formValues, ticking } = this.state;
    if (!capturedImage) {
      this.setState({ showWebcam: true });
    }

    formValues.identificationPoseDataUrl = capturedImage;
    this.handleInput(null, 'identificationPoseDataUrl');

    setTimeout(() => {
      this.setState({
        formValues: { ...formValues },
        showWebcam: !capturedImage,
        ticking: !ticking,
      });
    }, 1000); // Add this delay to allow webcam to show
  };

  toggleWebcamDisplay = () => {
    this.setState({
      showWebcam: true,
      useWebcam: true,
    });
  };

  countdownRenderer = ({ seconds }) => (
    <WebcamCountdown>{`Taking photo in ${seconds}...`}</WebcamCountdown>
  );

  renderCountdown = () => {
    setTimeout(() => {}, 1000); // delay timer to allow webcam to show
    return (
      <Countdown
        date={Date.now() + 5000}
        onStart={this.toggleTicking}
        onComplete={this.captureWebcamPhoto}
        renderer={props => this.countdownRenderer(props)}
      />
    );
  };

  renderAllowWebcam() {
    return (
      <PhotoVerification webcam>
        <MediaContainer>
          <GetStarted>
            <p>
              Please allow activation of your webcam. Once you allow access, you may need to refresh
              in order to proceed.
              <br />
              You will also be asked to write down a verification code on a piece of paper. Please
              have a paper and pen handy.
            </p>
            <Label>WEBCAM PREVIEW</Label>
            <CamPreview>
              <WebCam
                audio={false}
                data-digix="KycForm-Webcam-Preview"
                height={450}
                ref={this.setWebcamRef}
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
            <Button
              secondary
              width="60"
              data-digix="KycForm-Webcam-GetStarted"
              onClick={this.toggleWebcamDisplay}
            >
              Get Started
            </Button>
          </GetStarted>
        </MediaContainer>
      </PhotoVerification>
    );
  }

  renderActiveWebcam() {
    const { identificationPoseDataUrl, identificationPoseVerificationCode } = this.state.formValues;
    const { ticking, showWebcam } = this.state;

    return (
      <PhotoVerification>
        <MediaContainer>
          <GetStarted>
            <IdentificationCode>{identificationPoseVerificationCode}</IdentificationCode>
            <p>
              Write the above code on a piece of paper and show it to the webcam along with your
              face and your identification document.
            </p>
            <PhotoViewer>
              <SelfieGuide>
                <GuideItem>
                  <img
                    height=""
                    src={SelfieGuideA}
                    alt="Selfie Guide: Show both face and code clearly"
                  />
                </GuideItem>
                <GuideItem>
                  <img height="" src={SelfieGuideB} alt="Selfie Guide: Do not cover face" />
                </GuideItem>
                <GuideItem>
                  <img height="" src={SelfieGuideC} alt="Selfie Guide: Code must be visible" />
                </GuideItem>
              </SelfieGuide>
              <Photo>
                {identificationPoseDataUrl && (
                  <img
                    alt="Identification Pose Preview"
                    data-digix="KycForm-Webcam-CapturedImage"
                    src={identificationPoseDataUrl}
                  />
                )}

                {showWebcam && (
                  <Fragment>
                    <WebCam
                      audio={false}
                      data-digix="KycForm-Webcam"
                      ref={this.setWebcamRef}
                      screenshotFormat="image/jpeg"
                      style={{
                        display: showWebcam ? 'block' : 'none',
                        maxHeight: '100%',
                        maxWidth: '100%',
                      }}
                    />
                  </Fragment>
                )}
              </Photo>
            </PhotoViewer>

            {ticking && this.renderCountdown()}
            {!ticking && (
              <Button
                secondary
                data-digix="KycForm-Webcam-TakePhoto"
                onClick={() => this.toggleTicking()}
              >
                Take a Photo (5 seconds countdown)
              </Button>
            )}
          </GetStarted>
        </MediaContainer>
      </PhotoVerification>
    );
  }

  renderWebCam() {
    const { useWebcam } = this.state;

    return (
      <section>
        {!useWebcam && this.renderAllowWebcam()}
        {useWebcam && this.renderActiveWebcam()}
      </section>
    );
  }

  renderPhotoUpload() {
    const { identificationPoseDataUrl, identificationPoseVerificationCode } = this.state.formValues;

    return (
      <PhotoVerification>
        <MediaContainer>
          <GetStarted>
            <IdentificationCode>{identificationPoseVerificationCode}</IdentificationCode>
            <p>
              Write the above code on a piece of paper and show it to the webcam along with your
              face and your identification document.
            </p>
            <PhotoViewer>
              <SelfieGuide>
                <GuideItem>
                  <img
                    height=""
                    src={SelfieGuideA}
                    alt="Selfie Guide: Show both face and code clearly"
                  />
                </GuideItem>
                <GuideItem>
                  <img height="" src={SelfieGuideB} alt="Selfie Guide: Do not cover face" />
                </GuideItem>
                <GuideItem>
                  <img height="" src={SelfieGuideC} alt="Selfie Guide: Code must be visible" />
                </GuideItem>
              </SelfieGuide>
              <Photo>
                {identificationPoseDataUrl && (
                  <img src={identificationPoseDataUrl} alt="Identification Pose Preview" />
                )}
              </Photo>
            </PhotoViewer>
            <FieldGroup>
              {this.renderField('identificationPoseDataUrl', { caption: 'Upload Photo' })}
            </FieldGroup>
          </GetStarted>
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

const { func, number, object, string } = PropTypes;
KycOverlayPhotoUpload.propTypes = {
  currentStep: number.isRequired,
  formOptions: object.isRequired,
  idVerificationCode: string.isRequired,
  setValidForm: func.isRequired,
};

export default KycOverlayPhotoUpload;

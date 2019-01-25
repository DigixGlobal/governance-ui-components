import React from 'react';
import PropTypes from 'prop-types';

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
  }

  changeProofMethod = e => {
    this.setState({
      proofMethod: e.target.value,
    });
  };

  // TODO: add webcam
  renderWebCam() {
    const { identificationPoseDataUrl, identificationPoseVerificationCode } = this.state.formValues;

    return (
      <section>
        <PhotoVerification webcam>
          <MediaContainer>
            <GetStarted>
              <p>
                Please allow activation of your webcam. Once you allow access, you may need to
                refresh in order to proceed.
                <br />
                You will also be asked to write down a verification code on a piece of paper. Please
                have a paper and pen handy.
              </p>
              <Label>WEBCAM PREVIEW</Label>
              <CamPreview>&nbsp;</CamPreview>
              <p>
                Only continue when you can see the preview above.
                <br />
                If you do not have a webcam or are unable to see the preview after granting
                permission, you will have the option of uploading an image instead.
              </p>
              <Button secondary width="60">
                Get Started
              </Button>
            </GetStarted>
          </MediaContainer>
        </PhotoVerification>

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
              <Button secondary>Take a Photo (5 seconds countdown)</Button>
            </GetStarted>
          </MediaContainer>
        </PhotoVerification>
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

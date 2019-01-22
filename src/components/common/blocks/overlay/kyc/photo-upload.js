import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import web3Connect from 'spectrum-lightsuite/src/helpers/web3/connect';
import { Button, Select } from '@digix/gov-ui/components/common/elements/index';
import { IntroContainer, Label } from '@digix/gov-ui/components/common/common-styles';
import {
  WizardHeader,
  Title,
  FormSection,
  FieldGroup,
  FieldItem,
  PhotoVerification,
  MediaContainer,
  GetStarted,
  IdentificationCode,
  CamPreview,
  PhotoViewer,
  SelfieGuide,
  GuideItem,
  Photo,
} from '@digix/gov-ui/components/common/blocks/overlay/kyc/style.js';

import SelfieGuideA from '@digix/gov-ui/assets/images/selfie_guide1.png';
import SelfieGuideB from '@digix/gov-ui/assets/images/selfie_guide2.png';
import SelfieGuideC from '@digix/gov-ui/assets/images/selfie_guide3.png';

class KycOverlayPhotoUpload extends React.Component {
  constructor(props) {
    super(props);
    this.OptionsProofMethod = [
      {
        text: 'Please select',
        value: '',
      },
      {
        text: 'Webcam Capture',
        value: 'webcam',
      },
      {
        text: 'Photo Upload',
        value: 'uploadPhoto',
      },
    ];
  }
  render() {
    return (
      <IntroContainer>
        <WizardHeader>
          <Title>Photo Proof</Title>
          <Button secondary onClick={() => this.props.onPreviousStep()}>
            Previous
          </Button>
        </WizardHeader>
        <FormSection>
          <FieldGroup>
            <FieldItem>
              <Label>Photo Proof Method</Label>
              <Select fluid item="" items={this.OptionsProofMethod} />
            </FieldItem>
          </FieldGroup>
          <PhotoVerification webcam>
            <MediaContainer>
              <GetStarted>
                <p>
                  Please allow activation of your webcam. Once you allow access, you may need to
                  refresh in order to proceed. <br />
                  You will also be asked to write down a verification code on a piece of paper.
                  Please have a paper and pen handy.
                </p>
                <Label>WEBCAM PREVIEW</Label>
                <CamPreview>&nbsp;</CamPreview>
                <p>
                  Only continue when you can see the preview above. <br />
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
                <IdentificationCode>9047030-76-20</IdentificationCode>
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
                  <Photo>sdfsdf</Photo>
                </PhotoViewer>
                <Button secondary>Take a Photo (5 seconds countdown)</Button>
              </GetStarted>
            </MediaContainer>
          </PhotoVerification>
          <PhotoVerification>
            <MediaContainer>
              <FieldGroup>
                <FieldItem>
                  <Label>
                    Image must be in JPEG or PNG format &amp; file size must be lesser than 10MB.
                  </Label>
                  <Button
                    kind="upload"
                    accept="image/*"
                    secondary
                    fluid
                    large
                    multiple
                    type="file"
                    caption="Upload Photo"
                  />
                </FieldItem>
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
                <Photo>sadasfaf</Photo>
              </PhotoViewer>
            </MediaContainer>
          </PhotoVerification>
        </FormSection>
      </IntroContainer>
    );
  }
}

const { func } = PropTypes;

KycOverlayPhotoUpload.propTypes = {
  onPreviousStep: func.isRequired,
};

const mapStateToProps = () => ({});
export default web3Connect(
  connect(
    mapStateToProps,
    {}
  )(KycOverlayPhotoUpload)
);

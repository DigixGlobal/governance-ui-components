import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import web3Connect from 'spectrum-lightsuite/src/helpers/web3/connect';
import { Button, Input, Select } from '@digix/gov-ui/components/common/elements/index';
import { IntroContainer, Label } from '@digix/gov-ui/components/common/common-styles';
import {
  WizardHeader,
  Title,
  FormSection,
  FieldGroup,
  FieldItem,
  PreviewImage,
} from '@digix/gov-ui/components/common/blocks/overlay/kyc/style.js';

class KycOverlayAddress extends React.Component {
  constructor(props) {
    super(props);
    this.OptionsCountryResidence = [
      {
        text: 'Please select',
        value: '',
      },
      {
        text: 'Philippines',
        value: 'philippines',
      },
      {
        text: 'Singapore',
        value: 'singapore',
      },
    ];
    this.OptionsResidenceProof = [
      {
        text: 'Please select',
        value: '',
      },
      {
        text: 'Utility Bill',
        value: 'utility',
      },
    ];
  }
  render() {
    return (
      <IntroContainer>
        <WizardHeader>
          <Title>Residence Proof</Title>
          <div>
            <Button secondary onClick={() => this.props.onPreviousStep()}>
              Previous
            </Button>
            <Button secondary onClick={() => this.props.onNextStep()}>
              Next
            </Button>
          </div>
        </WizardHeader>
        <FormSection>
          <FieldItem style={{ paddingRight: '2rem' }}>
            <Label>Country of Residence</Label>
            <Select items={this.OptionsCountryResidence} />
          </FieldItem>
          <FieldItem style={{ paddingRight: '2rem' }}>
            <Label>Address</Label>
            <Input />
          </FieldItem>
          <FieldItem style={{ paddingRight: '2rem' }}>
            <Label>Address Line 2 (Optional)</Label>
            <Input />
          </FieldItem>
          <FieldGroup>
            <FieldItem col4>
              <Label>City</Label>
              <Input />
            </FieldItem>
            <FieldItem col4>
              <Label>State</Label>
              <Input />
            </FieldItem>
            <FieldItem col4>
              <Label>Zip Code</Label>
              <Input />
            </FieldItem>
          </FieldGroup>
          <FieldGroup>
            <FieldItem col6>
              <FieldGroup column>
                <FieldItem>
                  <Label>Residence Proof</Label>
                  <Select items={this.OptionsResidenceProof} />
                </FieldItem>
                <FieldItem>
                  <Label>
                    Image must be in JPEG or PNG format & filesize must be lesser than 10MB
                  </Label>
                  <Button
                    kind="upload"
                    accept="image/*"
                    secondary
                    fluid
                    large
                    multiple
                    type="file"
                    caption="Upload National I.D"
                  />
                </FieldItem>
              </FieldGroup>
            </FieldItem>
            <FieldItem col6>
              <PreviewImage>I.D IMAGE HOLDER</PreviewImage>
            </FieldItem>
          </FieldGroup>
        </FormSection>
      </IntroContainer>
    );
  }
}

const { func } = PropTypes;

KycOverlayAddress.propTypes = {
  onPreviousStep: func.isRequired,
  onNextStep: func.isRequired,
};

const mapStateToProps = () => ({});
export default web3Connect(
  connect(
    mapStateToProps,
    {}
  )(KycOverlayAddress)
);

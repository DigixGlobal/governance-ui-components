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
  ErrorMessage,
} from '@digix/gov-ui/components/common/blocks/overlay/kyc/style.js';

class KycOverlayBasicInformation extends React.Component {
  constructor(props) {
    super(props);
    this.OptionsGender = [
      {
        text: 'Please select',
        value: '',
      },
      {
        text: 'Male',
        value: 'male',
      },
      {
        text: 'Female',
        value: 'female',
      },
    ];
    this.OptionsEmployment = [
      {
        text: 'Please select',
        value: '',
      },
      {
        text: 'Self-employed',
        value: 'self-employed',
      },
    ];
    this.OptionsCountry = [
      {
        text: 'Please select',
        value: '',
      },
      {
        text: 'Singapore',
        value: 'singapore',
      },
      {
        text: 'Philippines',
        value: 'philippines',
      },
    ];
    this.OptionsNationality = [
      {
        text: 'Please select',
        value: '',
      },
      {
        text: 'Singapore',
        value: 'singapore',
      },
    ];
    this.OptionsIndustry = [
      {
        text: 'Please select',
        value: '',
      },
      {
        text: 'Fintech',
        value: 'fintech',
      },
    ];
    this.OptionsSalary = [
      {
        text: 'Please select',
        value: '',
      },
      {
        text: 'Below 1000 SGD',
        value: '',
      },
    ];
    this.OptionsIdentification = [
      {
        text: 'Please select',
        value: '',
      },
    ];
  }

  render() {
    return (
      <IntroContainer>
        <WizardHeader>
          <Title>Basic Information</Title>
          <Button secondary onClick={() => this.props.onNextStep()}>
            Next
          </Button>
        </WizardHeader>
        <FormSection>
          <FieldGroup>
            <FieldItem>
              <Label error>First Name</Label>
              <Input error />
              <ErrorMessage>Please enter a valid first name</ErrorMessage>
            </FieldItem>
            <FieldItem>
              <Label>Last Name</Label>
              <Input />
            </FieldItem>
          </FieldGroup>
          <FieldGroup>
            <FieldItem>
              <FieldGroup>
                <FieldItem>
                  <Label>Date Of Birth</Label>
                  <Input />
                </FieldItem>
                <FieldItem>
                  <Label>Gender</Label>
                  <Select items={this.OptionsGender} />
                </FieldItem>
              </FieldGroup>
            </FieldItem>
            <FieldItem>
              <Label>Country Of Birth</Label>
              <Select items={this.OptionsCountry} />
            </FieldItem>
          </FieldGroup>
          <FieldGroup>
            <FieldItem>
              <Label>Nationality</Label>
              <Select items={this.OptionsNationality} />
            </FieldItem>
            <FieldItem>
              <Label>Phone Number (Including Country Code)</Label>
              <Input />
            </FieldItem>
          </FieldGroup>
          <FieldGroup>
            <FieldItem>
              <Label>Employment Status</Label>
              <Select items={this.OptionsEmployment} />
            </FieldItem>
            <FieldItem>
              <Label>Industry</Label>
              <Select items={this.OptionsIndustry} />
            </FieldItem>
            <FieldItem>
              <Label>Income Range Per Annum (USD)</Label>
              <Select items={this.OptionsSalary} />
            </FieldItem>
          </FieldGroup>

          <FieldGroup>
            <FieldItem>
              <FieldGroup column>
                <FieldItem>
                  <Label>National I.D (Must Match Provided Nationality)</Label>
                  <Select items={this.OptionsIdentification} />
                </FieldItem>
                <FieldItem>
                  <Label>
                    Image must be in JPEG or PNG format &amp; filesize must be lesser than 10MB
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
              <FieldGroup>
                <FieldItem>
                  <Label>I.D Expiration Date</Label>
                  <Input />
                </FieldItem>
                <FieldItem>
                  <Label>I.D Number</Label>
                  <Input />
                </FieldItem>
              </FieldGroup>
            </FieldItem>
            <FieldItem>
              <PreviewImage>I.D IMAGE HOLDER</PreviewImage>
            </FieldItem>
          </FieldGroup>
        </FormSection>
      </IntroContainer>
    );
  }
}

const { func } = PropTypes;

KycOverlayBasicInformation.propTypes = {
  onNextStep: func.isRequired,
};

const mapStateToProps = () => ({});
export default web3Connect(
  connect(
    mapStateToProps,
    {}
  )(KycOverlayBasicInformation)
);

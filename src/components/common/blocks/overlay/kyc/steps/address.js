import React from 'react';
import PropTypes from 'prop-types';

import KycFormStep from '@digix/gov-ui/components/common/blocks/overlay/kyc/form-step';
import {
  FieldGroup,
  FieldItem,
  FormSection,
  PreviewImage,
} from '@digix/gov-ui/components/common/blocks/overlay/kyc/style.js';

class KycOverlayAddress extends KycFormStep {
  constructor(props) {
    super(props);

    const { formValues } = props;
    this.state = {
      formValues: {
        country: formValues.country || '',
        address: formValues.address || '',
        addressDetails: formValues.addressDetails || '',
        city: formValues.city || '',
        state: formValues.state || '',
        postalCode: formValues.postalCode || '',
        residenceProofType: formValues.residenceProofType || '',
        residenceProofDataUrl: formValues.residenceProofDataUrl || '',
      },
    };

    const stateValues = this.state.formValues;
    this.VALIDATION_RULES = {
      country: {
        customValidation: null,
        defaultErrorMessage: this.ERROR_MESSAGES.required,
        errorMessage: null,
        hasError: stateValues.country ? false : undefined,
        label: 'Country of Residence',
        pattern: this.REGEX.nonEmptyString,
        type: this.FIELD_TYPES.select,
      },

      address: {
        customValidation: null,
        defaultErrorMessage: this.ERROR_MESSAGES.required,
        errorMessage: null,
        hasError: stateValues.address ? false : undefined,
        label: 'Address',
        pattern: this.REGEX.nonEmptyString,
        type: this.FIELD_TYPES.input,
      },

      addressDetails: {
        customValidation: null,
        defaultErrorMessage: null,
        errorMessage: null,
        hasError: false,
        label: 'Address Line 2 (Optional)',
        pattern: null,
        type: this.FIELD_TYPES.input,
      },

      city: {
        customValidation: null,
        defaultErrorMessage: this.ERROR_MESSAGES.required,
        errorMessage: null,
        hasError: stateValues.city ? false : undefined,
        label: 'City',
        pattern: this.REGEX.nonEmptyString,
        type: this.FIELD_TYPES.input,
      },

      state: {
        customValidation: null,
        defaultErrorMessage: this.ERROR_MESSAGES.required,
        errorMessage: null,
        hasError: stateValues.state ? false : undefined,
        label: 'State',
        pattern: this.REGEX.nonEmptyString,
        type: this.FIELD_TYPES.input,
      },

      postalCode: {
        customValidation: null,
        defaultErrorMessage: this.ERROR_MESSAGES.required,
        errorMessage: null,
        hasError: stateValues.postalCode ? false : undefined,
        label: 'Zip Code',
        pattern: this.REGEX.nonEmptyString,
        type: this.FIELD_TYPES.input,
      },

      residenceProofType: {
        customValidation: null,
        defaultErrorMessage: this.ERROR_MESSAGES.required,
        errorMessage: null,
        hasError: stateValues.residenceProofType ? false : undefined,
        label: 'Residence Proof',
        pattern: this.REGEX.nonEmptyString,
        type: this.FIELD_TYPES.select,
      },

      residenceProofDataUrl: {
        customValidation: this.isImageFileValid,
        defaultErrorMessage: this.ERROR_MESSAGES.required,
        errorMessage: null,
        hasError: stateValues.residenceProofDataUrl ? false : undefined,
        label: this.LABELS.imageFile,
        pattern: this.REGEX.nonEmptyString,
        type: this.FIELD_TYPES.fileInput,
      },
    };
  }

  render() {
    const { residenceProofDataUrl } = this.state.formValues;

    return (
      <FormSection>
        <FieldGroup column>
          {this.renderField('country', { autoFocus: true })}
          {this.renderField('address')}
          {this.renderField('addressDetails')}
        </FieldGroup>
        <FieldGroup>
          {this.renderField('city', null, { col4: true })}
          {this.renderField('state', null, { col4: true })}
          {this.renderField('postalCode', null, { col4: true })}
        </FieldGroup>
        <FieldGroup upload>
          <FieldItem>
            <FieldGroup column>
              {this.renderField('residenceProofType')}
              {this.renderField('residenceProofDataUrl', {
                caption: 'Residence Proof',
              })}
            </FieldGroup>
          </FieldItem>
          <FieldItem>
            <PreviewImage>
              {residenceProofDataUrl && (
                <img
                  src={residenceProofDataUrl}
                  alt="Residence Proof Preview"
                  data-digix="KycForm-ResidenceProofPreview"
                />
              )}
            </PreviewImage>
          </FieldItem>
        </FieldGroup>
      </FormSection>
    );
  }
}

const { func, number, object } = PropTypes;
KycOverlayAddress.propTypes = {
  currentStep: number.isRequired,
  formOptions: object.isRequired,
  formValues: object.isRequired,
  setValidForm: func.isRequired,
};

export default KycOverlayAddress;

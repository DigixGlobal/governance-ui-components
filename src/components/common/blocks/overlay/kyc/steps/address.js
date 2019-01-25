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
        country: formValues.country || 'AFGHANISTAN',
        address: formValues.address || undefined,
        addressDetails: formValues.addressDetails || '',
        city: formValues.city || undefined,
        state: formValues.state || undefined,
        postalCode: formValues.postalCode || undefined,
        residenceProofType: formValues.residenceProofType || 'UTILITY_BILL',
        residenceProofDataUrl: formValues.residenceProofDataUrl || undefined,
      },
    };

    const stateValues = this.state.formValues;
    this.VALIDATION_RULES = {
      country: {
        customValidation: null,
        defaultErrorMessage: this.ERROR_MESSAGES.required,
        errorMessage: null,
        hasError: false,
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
        hasError: false,
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
          {this.renderField('country')}
          {this.renderField('address', { autoFocus: true })}
          {this.renderField('addressDetails')}
        </FieldGroup>
        <FieldGroup>
          {this.renderField('city', null, { col4: true })}
          {this.renderField('state', null, { col4: true })}
          {this.renderField('postalCode', null, { col4: true })}
        </FieldGroup>
        <FieldGroup>
          <FieldItem>
            <FieldGroup column>
              {this.renderField('residenceProofType')}
              {this.renderField('residenceProofDataUrl', { caption: 'Residence Proof' })}
            </FieldGroup>
          </FieldItem>
          <FieldItem>
            <PreviewImage>
              {residenceProofDataUrl && (
                <img src={residenceProofDataUrl} alt="Residence Proof Preview" />
              )}
            </PreviewImage>
          </FieldItem>
        </FieldGroup>
      </FormSection>
    );
  }
}

const { bool, func, number, object } = PropTypes;
KycOverlayAddress.propTypes = {
  currentStep: number.isRequired,
  formOptions: object.isRequired,
  formValues: object.isRequired,
  isLastStep: bool.isRequired,
  setValidForm: func.isRequired,
  updateKycFormValues: func.isRequired,
};

export default KycOverlayAddress;

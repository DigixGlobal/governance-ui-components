import React from 'react';
import PropTypes from 'prop-types';

import KycFormStep from '@digix/gov-ui/components/common/blocks/overlay/kyc/form-step';
import {
  FieldGroup,
  FieldItem,
  FormSection,
  PreviewImage,
} from '@digix/gov-ui/components/common/blocks/overlay/kyc/style.js';

class KycOverlayBasicInformation extends KycFormStep {
  constructor(props) {
    super(props);

    const { formValues } = props;
    this.state = {
      formValues: {
        firstName: formValues.firstName || undefined,
        lastName: formValues.lastName || undefined,
        birthdate: formValues.birthdate || undefined,
        gender: formValues.gender || 'MALE',
        birthCountry: formValues.birthCountry || 'AFGHANISTAN',
        nationality: formValues.nationality || 'AFGHANISTAN',
        phoneNumber: formValues.phoneNumber || undefined,
        employmentStatus: formValues.employmentStatus || 'EMPLOYED',
        employmentIndustry: formValues.employmentIndustry || 'ACCOUNTANCY_AUDIT',
        incomeRange: formValues.incomeRange || 'LOW',
        identificationProofType: formValues.identificationProofType || 'PASSPORT',
        identificationProofDataUrl: formValues.identificationProofDataUrl || undefined,
        identificationProofExpirationDate:
          formValues.identificationProofExpirationDate || undefined,
        identificationProofNumber: formValues.identificationProofNumber || undefined,
      },
    };

    const stateValues = this.state.formValues;
    this.VALIDATION_RULES = {
      firstName: {
        customValidation: null,
        defaultErrorMessage: this.ERROR_MESSAGES.required,
        errorMessage: null,
        hasError: stateValues.firstName ? false : undefined,
        label: 'First Name',
        pattern: this.REGEX.nonEmptyString,
        type: this.FIELD_TYPES.input,
      },

      lastName: {
        customValidation: null,
        defaultErrorMessage: this.ERROR_MESSAGES.required,
        errorMessage: null,
        hasError: stateValues.lastName ? false : undefined,
        label: 'Last Name',
        pattern: this.REGEX.nonEmptyString,
        type: this.FIELD_TYPES.input,
      },

      birthdate: {
        customValidation: this.isDateAtLeast18YearsAgo,
        defaultErrorMessage: this.ERROR_MESSAGES.date.format,
        errorMessage: null,
        hasError: stateValues.birthdate ? false : undefined,
        label: 'Date of Birth',
        pattern: this.REGEX.date,
        type: this.FIELD_TYPES.input,
      },

      gender: {
        customValidation: null,
        defaultErrorMessage: this.ERROR_MESSAGES.required,
        errorMessage: null,
        hasError: false,
        label: 'Gender',
        pattern: this.REGEX.nonEmptyString,
        type: this.FIELD_TYPES.select,
      },

      birthCountry: {
        customValidation: null,
        defaultErrorMessage: this.ERROR_MESSAGES.required,
        errorMessage: null,
        hasError: false,
        label: 'Country of Birth',
        pattern: this.REGEX.nonEmptyString,
        type: this.FIELD_TYPES.select,
      },

      nationality: {
        customValidation: null,
        defaultErrorMessage: this.ERROR_MESSAGES.required,
        errorMessage: null,
        hasError: false,
        label: 'Nationality',
        pattern: this.REGEX.nonEmptyString,
        type: this.FIELD_TYPES.select,
      },

      phoneNumber: {
        customValidation: null,
        defaultErrorMessage: 'Invalid phone number.',
        errorMessage: null,
        hasError: stateValues.phoneNumber ? false : undefined,
        label: 'Phone Number (Including Country Code)',
        pattern: this.REGEX.phoneNumber,
        type: this.FIELD_TYPES.input,
      },

      employmentStatus: {
        customValidation: null,
        defaultErrorMessage: this.ERROR_MESSAGES.required,
        errorMessage: null,
        hasError: false,
        label: 'Employment Status',
        pattern: this.REGEX.nonEmptyString,
        type: this.FIELD_TYPES.select,
      },

      employmentIndustry: {
        customValidation: null,
        defaultErrorMessage: this.ERROR_MESSAGES.required,
        errorMessage: null,
        hasError: false,
        label: 'Industry',
        pattern: this.REGEX.nonEmptyString,
        type: this.FIELD_TYPES.select,
      },

      incomeRange: {
        customValidation: null,
        defaultErrorMessage: this.ERROR_MESSAGES.required,
        errorMessage: null,
        hasError: false,
        label: 'Income Range Per Annum (USD)',
        pattern: this.REGEX.nonEmptyString,
        type: this.FIELD_TYPES.select,
      },

      identificationProofType: {
        customValidation: null,
        defaultErrorMessage: this.ERROR_MESSAGES.required,
        errorMessage: null,
        hasError: false,
        label: 'National I.D (Must Match Provided Nationality)',
        pattern: this.REGEX.nonEmptyString,
        type: this.FIELD_TYPES.select,
      },

      identificationProofDataUrl: {
        customValidation: this.isImageFileValid,
        defaultErrorMessage: this.ERROR_MESSAGES.required,
        errorMessage: null,
        hasError: stateValues.identificationProofDataUrl ? false : undefined,
        label: this.LABELS.imageFile,
        pattern: null,
        type: this.FIELD_TYPES.fileInput,
      },

      identificationProofExpirationDate: {
        customValidation: this.isDateInTheFuture,
        defaultErrorMessage: this.ERROR_MESSAGES.date.format,
        errorMessage: null,
        hasError: stateValues.identificationProofExpirationDate ? false : undefined,
        label: 'I.D Expiration Date',
        pattern: this.REGEX.date,
        type: this.FIELD_TYPES.input,
      },

      identificationProofNumber: {
        customValidation: null,
        defaultErrorMessage: this.ERROR_MESSAGES.required,
        errorMessage: null,
        hasError: stateValues.identificationProofNumber ? false : undefined,
        label: 'I.D Number',
        pattern: this.REGEX.nonEmptyString,
        type: this.FIELD_TYPES.input,
      },
    };
  }

  render() {
    const { identificationProofDataUrl } = this.state.formValues;

    return (
      <FormSection>
        <FieldGroup>
          {this.renderField('firstName', { autoFocus: true })}
          {this.renderField('lastName')}
        </FieldGroup>

        <FieldGroup>
          <FieldItem>
            <FieldGroup>
              {this.renderField('birthdate', { placeholder: `yyyy-mm-dd` })}
              {this.renderField('gender')}
            </FieldGroup>
          </FieldItem>

          {this.renderField('birthCountry')}
        </FieldGroup>

        <FieldGroup>
          {this.renderField('nationality')}
          {this.renderField('phoneNumber')}
        </FieldGroup>

        <FieldGroup>
          {this.renderField('employmentStatus')}
          {this.renderField('employmentIndustry')}
          {this.renderField('incomeRange')}
        </FieldGroup>

        <FieldGroup>
          <FieldItem>
            <FieldGroup column>
              {this.renderField('identificationProofType')}
              {this.renderField('identificationProofDataUrl', { caption: 'Upload National I.D' })}
            </FieldGroup>

            <FieldGroup>
              {this.renderField('identificationProofExpirationDate', { placeholder: `yyyy-mm-dd` })}
              {this.renderField('identificationProofNumber')}
            </FieldGroup>
          </FieldItem>
          <FieldItem>
            <PreviewImage>
              {identificationProofDataUrl && (
                <img src={identificationProofDataUrl} alt="National I.D. Preview" />
              )}
            </PreviewImage>
          </FieldItem>
        </FieldGroup>
      </FormSection>
    );
  }
}

const { bool, func, number, object } = PropTypes;
KycOverlayBasicInformation.propTypes = {
  currentStep: number.isRequired,
  formOptions: object.isRequired,
  formValues: object.isRequired,
  isLastStep: bool.isRequired,
  setValidForm: func.isRequired,
  updateKycFormValues: func.isRequired,
};

export default KycOverlayBasicInformation;

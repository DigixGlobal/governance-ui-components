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

    const t = props.translations.kyc.KycForm.Fields.BasicInformation;
    this.translations = t;

    const { formValues } = props;
    this.state = {
      formValues: {
        firstName: formValues.firstName || '',
        lastName: formValues.lastName || '',
        birthdate: formValues.birthdate || '',
        gender: formValues.gender || '',
        birthCountry: formValues.birthCountry || '',
        nationality: formValues.nationality || '',
        phoneNumber: formValues.phoneNumber || '',
        employmentStatus: formValues.employmentStatus || '',
        employmentIndustry: formValues.employmentIndustry || '',
        incomeRange: formValues.incomeRange || '',
        identificationProofType: formValues.identificationProofType || '',
        identificationProofDataUrl: formValues.identificationProofDataUrl || '',
        identificationProofExpirationDate: formValues.identificationProofExpirationDate || '',
        identificationProofNumber: formValues.identificationProofNumber || '',
      },
    };

    const stateValues = this.state.formValues;
    this.VALIDATION_RULES = {
      firstName: {
        customValidation: null,
        defaultErrorMessage: this.ERROR_MESSAGES.required,
        errorMessage: null,
        hasError: stateValues.firstName ? false : undefined,
        label: t.firstName,
        pattern: this.REGEX.nonEmptyString,
        type: this.FIELD_TYPES.input,
      },

      lastName: {
        customValidation: null,
        defaultErrorMessage: this.ERROR_MESSAGES.required,
        errorMessage: null,
        hasError: stateValues.lastName ? false : undefined,
        label: t.lastName,
        pattern: this.REGEX.nonEmptyString,
        type: this.FIELD_TYPES.input,
      },

      birthdate: {
        customValidation: this.isDateAtLeast18YearsAgo,
        defaultErrorMessage: this.ERROR_MESSAGES.date.format,
        errorMessage: null,
        hasError: stateValues.birthdate ? false : undefined,
        label: t.birthdate,
        pattern: this.REGEX.date,
        type: this.FIELD_TYPES.input,
      },

      gender: {
        customValidation: null,
        defaultErrorMessage: this.ERROR_MESSAGES.required,
        errorMessage: null,
        hasError: stateValues.gender ? false : undefined,
        label: t.gender,
        pattern: this.REGEX.nonEmptyString,
        type: this.FIELD_TYPES.select,
      },

      birthCountry: {
        customValidation: null,
        defaultErrorMessage: this.ERROR_MESSAGES.required,
        errorMessage: null,
        hasError: stateValues.birthCountry ? false : undefined,
        label: t.birthCountry,
        pattern: this.REGEX.nonEmptyString,
        type: this.FIELD_TYPES.select,
      },

      nationality: {
        customValidation: null,
        defaultErrorMessage: this.ERROR_MESSAGES.required,
        errorMessage: null,
        hasError: stateValues.nationality ? false : undefined,
        label: t.nationality,
        pattern: this.REGEX.nonEmptyString,
        type: this.FIELD_TYPES.select,
      },

      phoneNumber: {
        customValidation: null,
        defaultErrorMessage: 'Invalid phone number.',
        errorMessage: null,
        hasError: stateValues.phoneNumber ? false : undefined,
        label: t.phoneNumber,
        pattern: this.REGEX.phoneNumber,
        type: this.FIELD_TYPES.input,
      },

      employmentStatus: {
        customValidation: null,
        defaultErrorMessage: this.ERROR_MESSAGES.required,
        errorMessage: null,
        hasError: stateValues.employmentStatus ? false : undefined,
        label: t.employmentStatus,
        pattern: this.REGEX.nonEmptyString,
        type: this.FIELD_TYPES.select,
      },

      employmentIndustry: {
        customValidation: null,
        defaultErrorMessage: this.ERROR_MESSAGES.required,
        errorMessage: null,
        hasError: stateValues.employmentIndustry ? false : undefined,
        label: t.employmentIndustry,
        pattern: this.REGEX.nonEmptyString,
        type: this.FIELD_TYPES.select,
      },

      incomeRange: {
        customValidation: null,
        defaultErrorMessage: this.ERROR_MESSAGES.required,
        errorMessage: null,
        hasError: stateValues.incomeRange ? false : undefined,
        label: t.incomeRange,
        pattern: this.REGEX.nonEmptyString,
        type: this.FIELD_TYPES.select,
      },

      identificationProofType: {
        customValidation: null,
        defaultErrorMessage: this.ERROR_MESSAGES.required,
        errorMessage: null,
        hasError: stateValues.identificationProofType ? false : undefined,
        label: t.identificationProofType,
        pattern: this.REGEX.nonEmptyString,
        type: this.FIELD_TYPES.select,
      },

      identificationProofDataUrl: {
        customValidation: this.isImageFileValid,
        defaultErrorMessage: this.ERROR_MESSAGES.required,
        errorMessage: null,
        hasError: stateValues.identificationProofDataUrl ? false : undefined,
        label: t.identificationProofDataUrl,
        pattern: null,
        type: this.FIELD_TYPES.fileInput,
      },

      identificationProofExpirationDate: {
        customValidation: this.isDateInTheFuture,
        defaultErrorMessage: this.ERROR_MESSAGES.date.format,
        errorMessage: null,
        hasError: stateValues.identificationProofExpirationDate ? false : undefined,
        label: t.identificationProofExpirationDate,
        pattern: this.REGEX.date,
        type: this.FIELD_TYPES.input,
      },

      identificationProofNumber: {
        customValidation: null,
        defaultErrorMessage: this.ERROR_MESSAGES.required,
        errorMessage: null,
        hasError: stateValues.identificationProofNumber ? false : undefined,
        label: t.identificationProofNumber,
        pattern: this.REGEX.nonEmptyString,
        type: this.FIELD_TYPES.input,
      },
    };
  }

  render() {
    const { identificationProofDataUrl } = this.state.formValues;
    const t = this.translations;

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

        <FieldGroup upload>
          <FieldItem>
            <FieldGroup column>
              {this.renderField('identificationProofType')}
              {this.renderField('identificationProofDataUrl', {
                caption: t.identificationProofDataUrl,
              })}
            </FieldGroup>

            <FieldGroup>
              {this.renderField('identificationProofExpirationDate', { placeholder: `yyyy-mm-dd` })}
              {this.renderField('identificationProofNumber')}
            </FieldGroup>
          </FieldItem>
          <FieldItem>
            <PreviewImage>
              {identificationProofDataUrl && (
                <img
                  src={identificationProofDataUrl}
                  alt="National I.D. Preview"
                  data-digix="KycForm-NationalIdPreview"
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
KycOverlayBasicInformation.propTypes = {
  currentStep: number.isRequired,
  formOptions: object.isRequired,
  formValues: object.isRequired,
  setValidForm: func.isRequired,
  translations: object.isRequired,
};

export default KycOverlayBasicInformation;

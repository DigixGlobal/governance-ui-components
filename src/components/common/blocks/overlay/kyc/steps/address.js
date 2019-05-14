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

    const t = props.translations.KycForm.Fields.Residence;
    this.translations = t;

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
        label: t.country,
        pattern: this.REGEX.nonEmptyString,
        type: this.FIELD_TYPES.select,
      },

      address: {
        customValidation: null,
        defaultErrorMessage: this.ERROR_MESSAGES.required,
        errorMessage: null,
        hasError: stateValues.address ? false : undefined,
        label: t.address,
        pattern: this.REGEX.nonEmptyString,
        type: this.FIELD_TYPES.input,
      },

      addressDetails: {
        customValidation: null,
        defaultErrorMessage: null,
        errorMessage: null,
        hasError: false,
        label: t.addressDetails,
        pattern: null,
        type: this.FIELD_TYPES.input,
      },

      city: {
        customValidation: null,
        defaultErrorMessage: this.ERROR_MESSAGES.required,
        errorMessage: null,
        hasError: stateValues.city ? false : undefined,
        label: t.city,
        pattern: this.REGEX.nonEmptyString,
        type: this.FIELD_TYPES.input,
      },

      state: {
        customValidation: null,
        defaultErrorMessage: this.ERROR_MESSAGES.required,
        errorMessage: null,
        hasError: stateValues.state ? false : undefined,
        label: t.state,
        pattern: this.REGEX.nonEmptyString,
        type: this.FIELD_TYPES.input,
      },

      postalCode: {
        customValidation: null,
        defaultErrorMessage: this.ERROR_MESSAGES.required,
        errorMessage: null,
        hasError: stateValues.postalCode ? false : undefined,
        label: t.postalCode,
        pattern: this.REGEX.nonEmptyString,
        type: this.FIELD_TYPES.input,
      },

      residenceProofType: {
        customValidation: null,
        defaultErrorMessage: this.ERROR_MESSAGES.required,
        errorMessage: null,
        hasError: stateValues.residenceProofType ? false : undefined,
        label: t.residenceProofType,
        pattern: this.REGEX.nonEmptyString,
        type: this.FIELD_TYPES.select,
      },

      residenceProofDataUrl: {
        customValidation: this.isFileValid,
        defaultErrorMessage: this.ERROR_MESSAGES.required,
        errorMessage: null,
        hasError: stateValues.residenceProofDataUrl ? false : undefined,
        label: this.LABELS.file,
        pattern: this.REGEX.nonEmptyString,
        type: this.FIELD_TYPES.fileInput,
        alt: 'Residence Proof Preview',
        dataDigix: 'KycForm-ResidenceProofPreview',
      },
    };
  }

  render() {
    const t = this.translations;

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
                caption: t.residenceProofType,
              })}
            </FieldGroup>
          </FieldItem>
          <FieldItem>
            <PreviewImage>{this.renderFilePreview('residenceProofDataUrl')}</PreviewImage>
          </FieldItem>
        </FieldGroup>
        {this.renderFilePreviewModal('residenceProofDataUrl')}
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
  translations: object.isRequired,
};

export default KycOverlayAddress;

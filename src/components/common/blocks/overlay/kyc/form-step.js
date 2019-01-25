import React from 'react';
import PropTypes from 'prop-types';

import { Button, Input, Select } from '@digix/gov-ui/components/common/elements/index';
import { Label } from '@digix/gov-ui/components/common/common-styles';
import {
  FieldItem,
  ErrorMessage,
} from '@digix/gov-ui/components/common/blocks/overlay/kyc/style.js';

class KycFormStep extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formValues: {},
    };

    this.FIELD_TYPES = {
      fileInput: 1,
      input: 2,
      select: 3,
    };

    this.REGEX = {
      date: /^\d{4}-\d{2}-\d{2}$/,
      nonEmptyString: /^(?!\s*$).+/,
      phoneNumber: /^[+]?[0-9]+$/,
    };

    this.LABELS = {
      imageFile: 'Image must be in JPEG or PNG format & filesize must be less than 10MB.',
    };

    this.ERROR_MESSAGES = {
      date: {
        format: 'Please enter a valid date in the format yyyy-mm-dd.',
        isAdult: 'Must be at least 18 years old.',
        invalid: 'Date is invalid.',
        fromFuture: 'Date must be set in the future.',
      },
      file: {
        missing: 'Please upload a file.',
        isImage: 'Image must be in JPEG or PNG format',
        size: 'Filesize must be less than 10 MB.',
      },
      required: 'This field is required.',
    };

    // NOTE: replace this with your own validation rules when extending the class
    // The following is just to show an example of what it should look like
    this.VALIDATION_RULES = {
      sampleField: {
        // function that checks the validity of the field
        // parameters: fieldName
        // returns an object { isValid, errorMessage }
        // where the errorMessage will show up if isValid === false
        customValidation: this.isImageFileValid,

        // default message to show when input fails to match the pattern
        defaultErrorMessage: this.ERROR_MESSAGES.required,

        // message to show when there's an error
        // custom messages set by the customValidation go here
        errorMessage: null,

        // can be true, false, or undefined
        // undefined means there is no input yet or the field has not gone through validation
        hasError: false,

        // label to show in the UI
        label: 'First Name',

        // regex to match the input to
        pattern: this.REGEX.nonEmptyString,

        // determines what DOM element to render
        type: this.FIELD_TYPES.select,
      },
    };
  }

  componentWillUnmount() {
    if (this.props.isLastStep) {
      return;
    }

    this.props.updateKycFormValues(this.state.formValues);
  }

  getInputElement = fieldName => document.querySelector(`input[name="${fieldName}"]`);

  isDateValid = fieldName => {
    const inputElement = this.getInputElement(fieldName);
    const date = new Date(inputElement.value);

    // eslint-disable-next-line
    const isValid = !isNaN(date);

    return {
      isValid,
      errorMessage: this.ERROR_MESSAGES.date.invalid,
    };
  };

  isDateAtLeast18YearsAgo = fieldName => {
    const validDateTest = this.isDateValid(fieldName);
    if (!validDateTest.isValid) {
      return validDateTest;
    }

    const inputElement = this.getInputElement(fieldName);
    const date = new Date(inputElement.value);
    const dateAt18 = new Date(date.getFullYear() + 18, date.getMonth(), date.getDay());
    const isValid = dateAt18 <= Date.now();

    return {
      isValid,
      errorMessage: this.ERROR_MESSAGES.date.isAdult,
    };
  };

  isDateInTheFuture = fieldName => {
    const validDateTest = this.isDateValid(fieldName);
    if (!validDateTest.isValid) {
      return validDateTest;
    }

    const inputElement = this.getInputElement(fieldName);
    const givenDate = new Date(inputElement.value);
    const isValid = givenDate > Date.now();

    return {
      isValid,
      errorMessage: this.ERROR_MESSAGES.date.fromFuture,
    };
  };

  isImageFileValid = fieldName => {
    const inputElement = this.getInputElement(fieldName);

    // check that file exists
    if (!inputElement.files.length) {
      return {
        isValid: false,
        errorMessage: this.ERROR_MESSAGES.file.missing,
      };
    }

    // check file type
    const VALID_FILE_TYPES = ['image/jpg', 'image/jpeg', 'image/png'];
    const file = inputElement.files[0];
    if (!VALID_FILE_TYPES.includes(file.type)) {
      return {
        isValid: false,
        errorMessage: this.ERROR_MESSAGES.file.isImage,
      };
    }

    // check file size
    const fileSizeInMb = Math.floor(file.size / 1000000);
    if (fileSizeInMb >= 10) {
      return {
        isValid: false,
        errorMessage: this.ERROR_MESSAGES.file.size,
      };
    }

    return {
      isValid: true,
      errorMessage: null,
    };
  };

  handleInput = (e, fieldName) => {
    const { value } = e.target;
    const { currentStep, setValidForm } = this.props;
    const rule = this.VALIDATION_RULES[fieldName];

    const fieldValidity = this.isFieldValid(fieldName, value.trim());
    this.VALIDATION_RULES[fieldName] = {
      ...rule,
      errorMessage: fieldValidity.errorMessage,
      hasError: fieldValidity.hasError,
    };

    // let the parent component <KycOverlay /> know if form is valid
    setValidForm(currentStep, this.isFormValid());
    this.updateState(fieldName, value);
  };

  isFieldValid(fieldName, value) {
    const rule = this.VALIDATION_RULES[fieldName];
    if (!rule.pattern && !rule.customValidation) {
      return {
        hasError: false,
      };
    }

    if (rule.pattern && !rule.pattern.test(value)) {
      return {
        hasError: true,
        errorMessage: rule.defaultErrorMessage,
      };
    }

    if (rule.customValidation) {
      const test = rule.customValidation(fieldName);
      const hasError = !test.isValid;
      return {
        hasError,
        errorMessage: hasError ? test.errorMessage : null,
      };
    }

    return {
      hasError: false,
    };
  }

  isFormValid() {
    const fields = Object.values(this.VALIDATION_RULES);
    const fieldsWithErrors = fields.filter(fieldItem => fieldItem.hasError !== false);

    return fieldsWithErrors.length === 0;
  }

  updateState(fieldName, value) {
    const rule = this.VALIDATION_RULES[fieldName];
    const newFormValues = { ...this.state.formValues };

    if (rule.type !== this.FIELD_TYPES.fileInput) {
      newFormValues[fieldName] = value;
      this.setState({ formValues: newFormValues });
      return;
    }

    // convert files to base64
    const file = this.getInputElement(fieldName).files[0];
    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onload = () => {
      newFormValues[fieldName] = reader.result;
      this.setState({ formValues: newFormValues });
    };
  }

  _renderFileInput = (fieldName, props) => (
    <Button
      accept="image/*"
      dataDigix={`KycForm-${fieldName}`}
      fluid
      kind="upload"
      large
      name={fieldName}
      onChange={e => this.handleInput(e, fieldName)}
      secondary
      type="file"
      {...props}
    />
  );

  _renderInput = (fieldName, props) => {
    const { formValues } = this.state;
    const rules = this.VALIDATION_RULES;

    return (
      <Input
        data-digix={`KycForm-${fieldName}`}
        error={rules[fieldName].hasError}
        name={fieldName}
        onBlur={e => this.handleInput(e, fieldName)}
        onChange={e => this.handleInput(e, fieldName)}
        value={formValues[fieldName]}
        {...props}
      />
    );
  };

  _renderSelect = (fieldName, props) => {
    const { formValues } = this.state;
    const { formOptions } = this.props;
    const rules = this.VALIDATION_RULES;

    if (!formOptions) {
      return null;
    }

    return (
      <Select
        items={formOptions[fieldName]}
        data-digix={`KycForm-${fieldName}`}
        error={rules[fieldName].hasError}
        name={fieldName}
        onBlur={e => this.handleInput(e, fieldName)}
        onChange={e => this.handleInput(e, fieldName)}
        value={formValues[fieldName]}
        {...props}
      />
    );
  };

  _renderInputElement(ruleType, fieldName, props) {
    switch (ruleType) {
      case this.FIELD_TYPES.fileInput:
        return this._renderFileInput(fieldName, { ...props });
      case this.FIELD_TYPES.input:
        return this._renderInput(fieldName, { ...props });
      case this.FIELD_TYPES.select:
        return this._renderSelect(fieldName, { ...props });
      default:
        return null;
    }
  }

  renderField = (fieldName, props, fieldProps) => {
    const rules = this.VALIDATION_RULES;
    const rule = rules[fieldName];

    const hasValidator = rule.pattern || rule.customValidation;
    // NOTE: make sure hasError is not false;
    // if undefined, we should still show that the field is required
    const showRequired = hasValidator && rule.hasError !== false;

    return (
      <FieldItem {...fieldProps}>
        <Label error={rule.hasError} req={showRequired}>
          {rule.label}
          {showRequired && <span>&nbsp;*</span>}
        </Label>

        {this._renderInputElement(rule.type, fieldName, props)}
        {rule.hasError && <ErrorMessage>{rule.errorMessage}</ErrorMessage>}
      </FieldItem>
    );
  };
}

const { bool, func, number, object } = PropTypes;
KycFormStep.propTypes = {
  currentStep: number.isRequired,
  formOptions: object.isRequired,
  formValues: object.isRequired,
  isLastStep: bool.isRequired,
  setValidForm: func.isRequired,
  updateKycFormValues: func.isRequired,
};

export default KycFormStep;

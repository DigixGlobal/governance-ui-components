import React from 'react';
import Modal from 'react-responsive-modal';
import PropTypes from 'prop-types';

import PDFViewer from '@digix/gov-ui/components/common/elements/pdf-viewer';
import { Button, Icon, Input, Select } from '@digix/gov-ui/components/common/elements/index';
import { Label } from '@digix/gov-ui/components/common/common-styles';
import {
  Enlarge,
  ErrorMessage,
  FieldItem,
  FilePreview,
  ModalCta,
} from '@digix/gov-ui/components/common/blocks/overlay/kyc/style.js';

// NOTE: extend this class and add to KycOverlay.STAGES when adding a new step
// This class will handle form validation and rendering of fields
class KycFormStep extends React.Component {
  constructor(props) {
    super(props);
    const t = props.translations.KycForm;

    this.state = {
      formValues: {},
      openFilePreview: false,
    };

    this.FIELD_TYPES = {
      fileInput: 1,
      input: 2,
      select: 3,
    };

    this.VALID_IMAGE_FILE_TYPES = ['image/jpg', 'image/jpeg', 'image/png'];
    this.VALID_FILE_TYPES = this.VALID_IMAGE_FILE_TYPES.concat(['application/pdf']);

    this.REGEX = {
      date: /^\d{4}-\d{2}-\d{2}$/,
      nonEmptyString: /^(?!\s*$).+/,
      phoneNumber: /^[+]?[0-9][0-9]+[0-9]+$/,
    };

    this.LABELS = t.Labels;
    this.ERROR_MESSAGES = { ...t.Errors };

    // NOTE: replace this with your own validation rules when extending the class
    // The following is just to show an example of what it should look like
    this.VALIDATION_RULES = {
      sampleField: {
        // function that checks the validity of the field
        // it returns the object { isValid, errorMessage }
        // where the errorMessage will show up if isValid === false
        customValidation: this.isFileValid,

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

  getInputElement = fieldName => document.querySelector(`input[name="${fieldName}"]`);

  getAcceptableFileTypes = () => {
    if (this.state.proofMethod) {
      return this.VALID_IMAGE_FILE_TYPES;
    }

    return this.VALID_FILE_TYPES;
  };

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
    const dateAt18 = new Date(date.getFullYear() + 18, date.getMonth(), date.getDate());
    const dateNow = new Date();
    const isValid = dateAt18 <= dateNow;

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

  isFileValid = fieldName => {
    // if image is captured by webcam, we can assume it's valid
    // since it will have already passed the regex for it
    if (this.state.proofMethod === 'webcam') {
      return {
        isValid: true,
        errorMessage: null,
      };
    }

    // check that file exists
    const inputElement = this.getInputElement(fieldName);
    if (!inputElement.files.length) {
      return {
        isValid: false,
        errorMessage: this.ERROR_MESSAGES.file.missing,
      };
    }

    // check file type
    const file = inputElement.files[0];
    if (!this.getAcceptableFileTypes().includes(file.type)) {
      const { isValid, isImage } = this.ERROR_MESSAGES.file;
      const typeError = this.state.proofMethod ? isImage : isValid;
      return {
        isValid: false,
        errorMessage: typeError,
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
    const { currentStep, setValidForm } = this.props;
    const rule = this.VALIDATION_RULES[fieldName];

    const value = !e ? this.state.formValues[fieldName] : e.target.value;
    const fieldValidity = this.isFieldValid(fieldName, value);

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
      return { hasError: false };
    }

    const trimmedValue = value ? value.trim() : '';
    if (rule.pattern && !rule.pattern.test(trimmedValue)) {
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

    return { hasError: false };
  }

  isFormValid() {
    const fields = Object.values(this.VALIDATION_RULES);
    const fieldsWithErrors = fields.filter(fieldItem => fieldItem.hasError !== false);
    return fieldsWithErrors.length === 0;
  }

  toggleFilePreview() {
    this.setState({
      openFilePreview: !this.state.openFilePreview,
    });
  }

  updateState(fieldName, value) {
    // if input is captured by webcam, it should already be saved in the state
    if (this.state.proofMethod === 'webcam') {
      return;
    }

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
      accept={this.getAcceptableFileTypes().join(',')}
      dataDigix={`KycForm-${fieldName}`}
      fluid
      id={fieldName}
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
        id={fieldName}
        items={formOptions[fieldName]}
        data-digix={`KycForm-${fieldName}`}
        error={rules[fieldName].hasError}
        name={fieldName}
        onBlur={e => this.handleInput(e, fieldName)}
        onChange={e => this.handleInput(e, fieldName)}
        showPlaceholder
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

    const hasValidator = !!rule.pattern || rule.customValidation instanceof Function;
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

  renderFilePreview = fieldName => {
    const fileSrc = this.state.formValues[fieldName];
    const fileRules = this.VALIDATION_RULES[fieldName];
    const isFilePreviewPdf = fileSrc.startsWith('data:application/pdf');

    if (!fileSrc) {
      return null;
    }

    return (
      <div>
        <Enlarge kind="text" onClick={() => this.toggleFilePreview()}>
          <Icon kind="magnifier" />
        </Enlarge>
        {isFilePreviewPdf && <PDFViewer file={fileSrc} showNav={false} />}
        {!isFilePreviewPdf && (
          <img src={fileSrc} alt={fileRules.alt} data-digix={fileRules.dataDigix} />
        )}
      </div>
    );
  };

  renderFilePreviewModal = fieldName => {
    const fileSrc = this.state.formValues[fieldName];
    const isFilePreviewPdf = fileSrc.startsWith('data:application/pdf');

    return (
      <Modal
        open={!!this.state.openFilePreview}
        onClose={() => this.toggleFilePreview()}
        showCloseIcon={false}
        styles={{
          modal: {
            maxWidth: '45%',
            width: '100%',
          },
          overlay: {
            zIndex: 1100,
          },
        }}
      >
        <FilePreview>
          {!isFilePreviewPdf && <img alt="" style={{ width: '100%' }} src={fileSrc} />}
          {isFilePreviewPdf && <PDFViewer file={fileSrc} />}
        </FilePreview>
        <ModalCta>
          <Button primary invert onClick={() => this.toggleFilePreview()}>
            Close
          </Button>
        </ModalCta>
      </Modal>
    );
  };
}

const { func, number, object } = PropTypes;
KycFormStep.propTypes = {
  currentStep: number.isRequired,
  formOptions: object.isRequired,
  formValues: object.isRequired,
  setValidForm: func.isRequired,
  translations: object.isRequired,
};

export default KycFormStep;

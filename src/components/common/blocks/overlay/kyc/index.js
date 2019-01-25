import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import KycFormStep from '@digix/gov-ui/components/common/blocks/overlay/kyc/form-step';
import KycOverlayIntro from '@digix/gov-ui/components/common/blocks/overlay/kyc/steps/intro';
import KycOverlayBasicInformation from '@digix/gov-ui/components/common/blocks/overlay/kyc/steps/basic-information';
import KycOverlayAddress from '@digix/gov-ui/components/common/blocks/overlay/kyc/steps/address';
import KycOverlayPhotoUpload from '@digix/gov-ui/components/common/blocks/overlay/kyc/steps/photo-upload';
import SubmitKycButton from '@digix/gov-ui/components/common/blocks/overlay/kyc/buttons/submit-kyc';
import Wizard from '@digix/gov-ui/components/common/blocks/overlay/kyc/wizard-menu';
import { Button } from '@digix/gov-ui/components/common/elements/index';
import {
  IntroContainer,
  OverlayHeader as Header,
} from '@digix/gov-ui/components/common/common-styles';
import { showHideAlert, showRightPanel } from '@digix/gov-ui/reducers/gov-ui/actions';
import { Title, WizardHeader } from '@digix/gov-ui/components/common/blocks/overlay/kyc/style.js';
import { withFetchKycFormOptions } from '@digix/gov-ui/api/graphql-queries/kyc';

class KycOverlay extends React.Component {
  constructor(props) {
    super(props);

    this.STAGES = [
      {
        title: undefined,
        component: KycOverlayIntro,
      },
      {
        title: 'Basic Information',
        component: KycOverlayBasicInformation,
      },
      {
        title: 'Residence Proof',
        component: KycOverlayAddress,
      },
      {
        title: 'Photo Proof',
        component: KycOverlayPhotoUpload,
      },
    ];

    this.MAX_STEPS = this.STAGES.length - 1;
    this.ACTIONS = {
      goToPrevious: 1,
      goToNext: 2,
      submit: 3,
    };

    this.state = {
      currentAction: null,
      currentStep: 0,
      formData: this.STAGES.map(() => ({})),
      validForms: this.STAGES.map(stage => !this.stepHasFormData(stage.component)),
    };
  }

  onPreviousStep = () => {
    let { currentStep } = this.state;
    if (currentStep < 1) {
      return;
    }

    currentStep -= 1;
    this.setState({
      currentAction: this.ACTIONS.goToPrevious,
      currentStep,
    });
  };

  onNextStep = () => {
    let { currentStep } = this.state;
    if (currentStep >= this.MAX_STEPS) {
      return;
    }

    currentStep += 1;
    this.setState({
      currentAction: this.ACTIONS.goToNext,
      currentStep,
    });
  };

  onSubmitKyc = response => {
    console.log('KYC submitted:', response);
    this.props.showHideAlert({
      message: 'KYC submitted. Request is pending approval.',
    });

    this.props.showRightPanel({ show: false });
  };

  onSubmitKycError = response => {
    console.log('KYC error:', response);
    this.props.showHideAlert({
      message: 'Unable to submit KYC.',
    });
  };

  setValidForm = (index, isValid) => {
    const { validForms } = this.state;
    validForms[index] = isValid;
    this.setState({ validForms });
  };

  collectFormData = () => {
    const { currentStep, formData } = this.state;

    // get data from last step then flatten the data object
    // this.updateKycFormValues(currentStep);
    const formValues = Object.assign(...formData);
    console.log(formValues);

    return formValues;
  };

  stepHasFormData = component =>
    // eslint-disable-next-line
    KycFormStep.isPrototypeOf(component)

  updateKycFormValues = formValues => {
    const { currentAction, currentStep, formData } = this.state;

    const newFormDataKeys = Object.keys(formValues);
    const trimmedValues = Object.values(formValues).map(value => (value ? value.trim() : value));
    const newFormData = trimmedValues.reduce(
      (newData, value, index) => ({
        ...newData,
        [newFormDataKeys[index]]: value,
      }),
      {}
    );

    let formIndex = currentStep;
    if (currentAction === this.ACTIONS.goToPrevious) {
      formIndex = currentStep + 1;
    } else if (currentAction === this.ACTIONS.goToNext) {
      formIndex = currentStep - 1;
    }

    formData[formIndex] = newFormData;
    this.setState({
      formData,
      currentAction: null,
    });
  };

  renderNavigation() {
    const { currentStep, validForms } = this.state;
    const stage = this.STAGES[currentStep];

    const showPreviousButton = currentStep > 1;
    const showNextButton = currentStep < this.MAX_STEPS;
    const showSubmitButton = currentStep === this.MAX_STEPS;
    const disableNextButton = !validForms[currentStep];

    if (!stage.title) {
      return null;
    }

    return (
      <nav>
        <Wizard stages={this.STAGES} step={currentStep} />
        <WizardHeader>
          <Title>{stage.title}</Title>
          <div>
            {showPreviousButton && (
              <Button secondary onClick={this.onPreviousStep}>
                Previous
              </Button>
            )}
            {showNextButton && (
              <Button secondary disabled={disableNextButton} onClick={this.onNextStep}>
                Next
              </Button>
            )}
            {showSubmitButton && (
              <SubmitKycButton
                disable={disableNextButton}
                collectFormData={this.collectFormData}
                onSubmitKyc={this.onSubmitKyc}
                onSubmitKycError={this.onSubmitKycError}
              />
            )}
          </div>
        </WizardHeader>
      </nav>
    );
  }

  render() {
    const { currentStep, formData } = this.state;
    const formValues = formData[currentStep];
    const { formOptions } = this.props;
    const stage = this.STAGES[currentStep];

    return (
      <div>
        <Header uppercase>KYC</Header>
        <IntroContainer>
          {this.renderNavigation()}
          {React.createElement(stage.component, {
            currentStep,
            formOptions,
            formValues,
            isLastStep: currentStep === this.MAX_STEPS,
            onNextStep: this.onNextStep,
            setValidForm: this.setValidForm,
            updateKycFormValues: this.updateKycFormValues,
          })}
        </IntroContainer>
      </div>
    );
  }
}

const { array, func, shape, object } = PropTypes;
KycOverlay.propTypes = {
  formOptions: shape({
    countries: array,
    employmentStatus: object,
    gender: object,
    identificationProofType: object,
    incomeRanges: array,
    industries: array,
    residenceProofType: object,
  }),
  showHideAlert: func.isRequired,
  showRightPanel: func.isRequired,
};

KycOverlay.defaultProps = {
  formOptions: undefined,
};

const mapStateToProps = () => ({});
export default withFetchKycFormOptions(
  connect(
    mapStateToProps,
    {
      showHideAlert,
      showRightPanel,
    }
  )(KycOverlay)
);

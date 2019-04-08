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
  NoteContainer,
  OverlayHeader as Header,
} from '@digix/gov-ui/components/common/common-styles';
import { showHideAlert, showRightPanel } from '@digix/gov-ui/reducers/gov-ui/actions';
import { Title, WizardHeader } from '@digix/gov-ui/components/common/blocks/overlay/kyc/style.js';
import { withFetchKycFormOptions } from '@digix/gov-ui/api/graphql-queries/kyc';

import web3Connect from 'spectrum-lightsuite/src/helpers/web3/connect';
import SpectrumConfig from 'spectrum-lightsuite/spectrum.config';

const network = SpectrumConfig.defaultNetworks[0];

class KycOverlay extends React.Component {
  constructor(props) {
    super(props);
    const tSteps = props.translations.KycForm.Steps;

    this.STAGES = [
      {
        title: undefined,
        component: KycOverlayIntro,
        key: 'Intro',
        ref: undefined,
      },
      {
        title: tSteps.BasicInformation,
        component: KycOverlayBasicInformation,
        key: 'BasicInformation',
        ref: React.createRef(),
      },
      {
        title: tSteps.Residence,
        component: KycOverlayAddress,
        key: 'Address',
        ref: React.createRef(),
      },
      {
        title: tSteps.Photo,
        component: KycOverlayPhotoUpload,
        key: 'PhotoUpload',
        ref: React.createRef(),
      },
    ];

    this.MAX_STEPS = this.STAGES.length - 1;

    const t = props.translations.Submit;
    this.SUBMIT_ERROR_MESSAGE = t.error;

    this.state = {
      currentStep: 0,
      errorMessage: undefined,
      formData: this.STAGES.map(() => ({})),
      hasPendingSubmission: false,
      idVerificationCode: null,
      validForms: this.STAGES.map(stage => !this.stepHasFormData(stage.component)),
    };
  }

  componentDidMount() {
    const { web3Redux } = this.props;
    const { web3 } = web3Redux.networks[network];

    web3.eth.getBlock('latest').then(block => {
      const blockNumber = block.number;
      const firstTwoChars = block.hash.substring(2, 4);
      const lastTwoChars = block.hash.slice(-2);

      const idVerificationCode = `${blockNumber}-${firstTwoChars}-${lastTwoChars}`;
      this.setState({ idVerificationCode });
    });
  }

  onPreviousStep = () => {
    let { currentStep } = this.state;
    if (currentStep < 1) {
      return;
    }

    this.updateFormValues(currentStep);

    currentStep -= 1;
    this.setState({ currentStep });
  };

  onNextStep = () => {
    let { currentStep } = this.state;
    if (currentStep >= this.MAX_STEPS) {
      return;
    }

    this.updateFormValues(currentStep);

    currentStep += 1;
    this.setState({ currentStep });
  };

  onSubmitKyc = response => {
    const { errors } = response.submitKyc;
    const t = this.props.translations.Submit;

    if (errors.length) {
      this.setState({
        errorMessage: errors[0].message,
        hasPendingSubmission: false,
      });

      this.props.showHideAlert({
        message: this.SUBMIT_ERROR_MESSAGE,
      });
      return;
    }

    this.props.refetchUser();
    this.props.showRightPanel({ show: false });
    this.props.showHideAlert({
      message: t.success,
    });
  };

  onSubmitKycError = () => {
    this.setState({
      hasPendingSubmission: false,
    });

    this.props.showHideAlert({
      message: this.SUBMIT_ERROR_MESSAGE,
    });
  };

  setHasPendingSubmission = hasPendingSubmission => {
    this.setState({ hasPendingSubmission });
  };

  setValidForm = (index, isValid) => {
    const { validForms } = this.state;
    validForms[index] = isValid;
    this.setState({ validForms });
  };

  collectFormData = () => {
    const { currentStep, formData } = this.state;

    // get data from last step then flatten the data object
    this.updateFormValues(currentStep);
    return Object.assign(...formData);
  };

  stepHasFormData = component =>
    // eslint-disable-next-line
    KycFormStep.isPrototypeOf(component)

  updateFormValues = step => {
    const { formData } = this.state;
    const stage = this.STAGES[step];

    if (!this.stepHasFormData(stage.component)) {
      return;
    }

    // get form data from the current form and trim the values
    const currentForm = stage.ref.current;
    let newFormData = currentForm.state.formValues;
    const newFormDataKeys = Object.keys(newFormData);
    const trimmedValues = Object.values(newFormData).map(value => (value ? value.trim() : value));
    newFormData = trimmedValues.reduce(
      (newData, value, index) => ({
        ...newData,
        [newFormDataKeys[index]]: value,
      }),
      {}
    );

    formData[step] = newFormData;
    this.setState({ formData });
  };

  renderNavigation() {
    const { currentStep, errorMessage, hasPendingSubmission, validForms } = this.state;
    const stage = this.STAGES[currentStep];

    const showPreviousButton = currentStep > 1;
    const showNextButton = currentStep < this.MAX_STEPS;
    const showSubmitButton = currentStep === this.MAX_STEPS;
    const disableNextButton = !validForms[currentStep];

    if (!stage.title) {
      return null;
    }

    const t = this.props.translations;
    const tNav = t.KycForm.Navigation;

    return (
      <nav>
        <Wizard stages={this.STAGES} step={currentStep} />
        <WizardHeader>
          <Title>{stage.title}</Title>
          <div>
            {showPreviousButton && (
              <Button secondary data-digix="KycOverlay-Previous" onClick={this.onPreviousStep}>
                {tNav.previous}
              </Button>
            )}
            {showNextButton && (
              <Button
                secondary
                data-digix="KycOverlay-Next"
                disabled={disableNextButton}
                onClick={this.onNextStep}
              >
                {tNav.next}
              </Button>
            )}
            {showSubmitButton && (
              <SubmitKycButton
                collectFormData={this.collectFormData}
                disable={disableNextButton}
                hasPendingSubmission={hasPendingSubmission}
                onSubmitKyc={this.onSubmitKyc}
                onSubmitKycError={this.onSubmitKycError}
                setHasPendingSubmission={this.setHasPendingSubmission}
                translations={tNav}
              />
            )}
          </div>
        </WizardHeader>
        {errorMessage && <NoteContainer>{errorMessage}</NoteContainer>}
      </nav>
    );
  }

  render() {
    const { currentStep, formData, idVerificationCode } = this.state;
    const formValues = formData[currentStep];
    const { formOptions, translations } = this.props;
    const tForm = translations.KycForm;
    const stage = this.STAGES[currentStep];

    return (
      <div>
        <Header uppercase>{tForm.title}</Header>
        <IntroContainer>
          {this.renderNavigation()}
          {React.createElement(stage.component, {
            currentStep,
            formOptions,
            formValues,
            idVerificationCode,
            onNextStep: this.onNextStep,
            ref: stage.ref,
            setValidForm: this.setValidForm,
            translations,
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
    employmentStatus: array,
    gender: array,
    identificationProofType: array,
    incomeRanges: array,
    industries: array,
    residenceProofType: array,
  }),
  refetchUser: func.isRequired,
  showHideAlert: func.isRequired,
  showRightPanel: func.isRequired,
  translations: object.isRequired,
  web3Redux: object.isRequired,
};

KycOverlay.defaultProps = {
  formOptions: undefined,
};

const mapStateToProps = () => ({});
export default withFetchKycFormOptions(
  web3Connect(
    connect(
      mapStateToProps,
      {
        showHideAlert,
        showRightPanel,
      }
    )(KycOverlay)
  )
);

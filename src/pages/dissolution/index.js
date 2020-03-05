import ApproveStep from '@digix/gov-ui/pages/dissolution/steps/approve';
import BurnStep from '@digix/gov-ui/pages/dissolution/steps/burn';
import DissolutionModal from '@digix/gov-ui/pages/dissolution/modal';
import UnlockStep from '@digix/gov-ui/pages/dissolution/steps/unlock';
import Modal from 'react-responsive-modal';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';
import { Step } from '@digix/gov-ui/pages/dissolution/style';
import { connect } from 'react-redux';
import { getDefaultAddress } from 'spectrum-lightsuite/src/selectors';
import { withTranslation } from 'react-i18next';
import React, { Fragment } from 'react';

const {
  NavButton,
  Stepper,
  Wrapper,
} = Step;

const STEPS = {
  unlock: 1,
  approve: 2,
  burn: 3,
  success: 4,
};

class Dissolution extends React.PureComponent {
  constructor(props) {
    super(props);

    const isDgdUnlocked = this.isDgdUnlocked();
    const step = isDgdUnlocked
      ? STEPS.approve
      : STEPS.unlock;

    this.stepOffset = isDgdUnlocked
      ? -1
      : 0;

    this.state = {
      showModal: !this.hasLoadedWallet(),
      step,
    };
  }

  hasLoadedWallet = () => {
    const { defaultAddress } = this.props;
    return defaultAddress && defaultAddress.address;
  }

  isDgdUnlocked = () => {
    const { lockedDgd } = this.props;
    return this.hasLoadedWallet() && lockedDgd === 0;
  }

  isNavButtonEnabled = () => {
    const { step } = this.state;
    const { isBurnApproved } = this.props;

    switch (step) {
      case STEPS.unlock:
        return this.isDgdUnlocked();
      case STEPS.approve:
        return this.hasLoadedWallet() && isBurnApproved;
      default:
        return true;
    }
  }

  closeModal = () => {
    this.setState({
      showModal: false,
    });
  };

  goToNext = () => {
    this.setState(({ step }) => ({
      step: step + 1,
    }));
  };

  logOut = () => {
    window.location.reload();
  };

  render() {
    const { showModal, step } = this.state;
    const { t } = this.props;

    const isNavButtonEnabled = this.isNavButtonEnabled();
    const currentStep = step > 3 ? 3 : step;
    const stepLabel = t('Nav.steps', {
      currentStep: currentStep + this.stepOffset,
      maxStep: 3 + this.stepOffset,
    });

    return (
      <Fragment>
        <Wrapper wide={step >= STEPS.burn}>
          <Stepper>
            <ReactMarkdown
              escapeHtml={false}
              renderers={{ paragraph: 'span' }}
              source={stepLabel}
            />
          </Stepper>
          {step === STEPS.unlock && <UnlockStep />}
          {step === STEPS.approve && <ApproveStep />}
          {step >= STEPS.burn && (
            <BurnStep goToNext={this.goToNext} />
          )}
          {step < STEPS.burn && (
            <NavButton
              disabled={!isNavButtonEnabled}
              onClick={this.goToNext}
              primary
              width="100%"
            >
              {t('Nav.nextStep')}
            </NavButton>
          )}
          {step === STEPS.success && (
            <NavButton
              onClick={this.logOut}
              primary
              width="100%"
            >
              {t('Nav.logOut')}
            </NavButton>
          )}
        </Wrapper>
        <Modal
          closeOnEsc={false}
          closeOnOverlayClick={false}
          onClose={this.closeModal}
          open={showModal}
          showCloseIcon={false}
        >
          <DissolutionModal closeModal={this.closeModal} />
        </Modal>
      </Fragment>
    );
  }
}

const {
  bool,
  func,
  number,
  object,
} = PropTypes;

Dissolution.propTypes = {
  isBurnApproved: bool.isRequired,
  defaultAddress: object,
  lockedDgd: number.isRequired,
  t: func.isRequired,
};

Dissolution.defaultProps = {
  defaultAddress: {
    address: undefined,
  },
};

const mapStateToProps = state => ({
  defaultAddress: getDefaultAddress(state),
  isBurnApproved: state.govUI.Dissolution.isBurnApproved,
  lockedDgd: state.govUI.Dissolution.lockedDgd,
});

export default withTranslation('Dissolution')(
  connect(mapStateToProps, {})(Dissolution)
);

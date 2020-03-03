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

    const { defaultAddress } = this.props;
    const hasLoadedWallet = defaultAddress && defaultAddress.address;

    this.state = {
      showModal: !hasLoadedWallet,
      step: STEPS.unlock,
    };
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
    const stepLabel = t('Nav.steps', {
      currentStep: step > 3 ? 3 : step,
      maxStep: 3,
    });

    return (
      <Fragment>
        <Wrapper wide={step >= STEPS.burn}>
          <Stepper>
            {/* TODO: reduce by one for non-participants */}
            <ReactMarkdown
              escapeHtml={false}
              renderers={{ paragraph: 'span' }}
              source={stepLabel}
            />
          </Stepper>
          {step === STEPS.unlock && <UnlockStep />}
          {step === STEPS.approve && <ApproveStep />}
          {step >= STEPS.burn && <BurnStep />}
          {step < STEPS.burn && (
            <NavButton
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

const { object, func } = PropTypes;

Dissolution.propTypes = {
  defaultAddress: object,
  t: func.isRequired,
};

Dissolution.defaultProps = {
  defaultAddress: {
    address: undefined,
  },
};

const mapStateToProps = state => ({
  defaultAddress: getDefaultAddress(state),
});

export default withTranslation('Dissolution')(
  connect(mapStateToProps, {})(Dissolution)
);

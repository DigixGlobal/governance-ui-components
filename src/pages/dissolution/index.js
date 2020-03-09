import BurnStep from '@digix/gov-ui/pages/dissolution/steps/burn';
import DissolutionModal from '@digix/gov-ui/pages/dissolution/modal';
import UnlockStep from '@digix/gov-ui/pages/dissolution/steps/unlock';
import Modal from 'react-responsive-modal';
import PropTypes, { object } from 'prop-types';
import ReactMarkdown from 'react-markdown';
import { Step } from '@digix/gov-ui/pages/dissolution/style';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import React, { Fragment } from 'react';
import { fetchUsers, withApolloClient } from '@digix/gov-ui/pages/dissolution/api/queries';

const {
  NavButton,
  Stepper,
  Wrapper,
} = Step;

const STEPS = {
  unlock: 1,
  burn: 2,
  success: 3,
};

class Dissolution extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      showModal: !props.isAddressLoaded,
      step: STEPS.unlock,
      stepOffset: 0,
    };
  }

  componentDidMount() {
    this.props.client.query({
      query: fetchUsers,
      variables: {
        first: 50,
      },
    })
      .then((response) => {
        console.log('Fetched USERS');
        console.log(response);
      });
  }

  componentWillReceiveProps(nextProps) {
    const { isAddressLoaded, lockedDgd, loadWalletBalance } = nextProps;

    if (loadWalletBalance === 0) {
      this.setState({
        step: STEPS.success,
        stepOffset: 0,
      });
    } else if (!this.props.isAddressLoaded && isAddressLoaded) {
      const isDgdUnlocked = isAddressLoaded && lockedDgd === 0;
      const stepOffset = isDgdUnlocked ? -1 : 0;
      const step = isDgdUnlocked
        ? STEPS.burn
        : STEPS.unlock;

      this.setState({ step, stepOffset });
    }
  }

  isDgdUnlocked = () => {
    const { isAddressLoaded, lockedDgd } = this.props;
    return isAddressLoaded && lockedDgd === 0;
  }

  isNavButtonEnabled = () => {
    const { step } = this.state;
    const { isAddressLoaded, isBurnApproved } = this.props;

    switch (step) {
      case STEPS.unlock:
        return this.isDgdUnlocked();
      case STEPS.approve:
        return isAddressLoaded && isBurnApproved;
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
    const {
      showModal,
      step,
      stepOffset
    } = this.state;
    const { t } = this.props;

    const isNavButtonEnabled = this.isNavButtonEnabled();
    const currentStep = step > 2 ? 2 : step;
    const stepLabel = t('Nav.steps', {
      currentStep: currentStep + stepOffset,
      maxStep: 2 + stepOffset,
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
} = PropTypes;

Dissolution.propTypes = {
  isAddressLoaded: bool.isRequired,
  isBurnApproved: bool.isRequired,
  client: object.isRequired,
  loadWalletBalance: number.isRequired,
  lockedDgd: number.isRequired,
  t: func.isRequired,
};

const mapStateToProps = state => ({
  isAddressLoaded: state.govUI.Dissolution.isAddressLoaded,
  isBurnApproved: state.govUI.Dissolution.isBurnApproved,
  loadWalletBalance: state.govUI.Dissolution.loadWalletBalance,
  lockedDgd: state.govUI.Dissolution.lockedDgd,
});

export default withTranslation('Dissolution')(
  withApolloClient(
    connect(mapStateToProps, {})(Dissolution)
  )
);

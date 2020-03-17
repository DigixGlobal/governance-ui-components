import ApproveStep from '@digix/gov-ui/pages/dissolution/steps/approve';
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
import { withApolloClient } from '@digix/gov-ui/pages/dissolution/api/queries';

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

    this.state = {
      currentSubscription: undefined,
      showModal: !props.isAddressLoaded,
      step: STEPS.unlock,
      stepOffset: 0,
    };
  }

  componentWillReceiveProps(nextProps) {
    const {
      isAddressLoaded,
      lockedDgd,
      loadWalletBalance,
    } = nextProps;

    if (loadWalletBalance <= 0) {
      this.setState({
        step: STEPS.success,
        stepOffset: -2,
      });
    }

    if (!this.props.isAddressLoaded && isAddressLoaded) {
      const isDgdUnlocked = isAddressLoaded && lockedDgd <= 0;
      const stepOffset = isDgdUnlocked ? -1 : 0;
      const step = isDgdUnlocked
        ? STEPS.approve
        : STEPS.unlock;

      this.setState({ step, stepOffset });
    }
  }

  setCurrentSubscription = (currentSubscription) => {
    this.setState({ currentSubscription });
  }

  isDgdUnlocked = () => {
    const { isAddressLoaded, lockedDgd } = this.props;
    return isAddressLoaded && lockedDgd <= 0;
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

  confirmMinedTx = (txHash, web3, onDrop, pollInterval = 5000) => {
    const { t } = this.props;
    let timer = null;
    const cancelTimer = () => {
      if (timer) {
        clearInterval(timer);
      }
    };

    const poll = () => {
      web3.eth.getTransaction(txHash)
        .then((tx) => {
          if (!tx) {
            cancelTimer();
            onDrop(t('Snackbar:transactionDropped'));
          } else if (tx.blockNumber) {
            cancelTimer();
          } else {
            // NOOP
          }
        });
    };

    timer = setInterval(poll, pollInterval);
    return cancelTimer;
  };

  goToNext = () => {
    const { currentSubscription } = this.state;

    if (currentSubscription) {
      currentSubscription.unsubscribe();
      this.setState({ currentSubscription: undefined });
    }

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
    const currentStep = step > STEPS.burn
      ? STEPS.burn
      : step;

    const stepLabel = t('Dissolution:Nav.steps', {
      currentStep: currentStep + stepOffset,
      maxStep: STEPS.burn + stepOffset,
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
          {step === STEPS.unlock && (
            <UnlockStep
              confirmMinedTx={this.confirmMinedTx}
              setCurrentSubscription={this.setCurrentSubscription}
            />
          )}
          {step === STEPS.approve && (
            <ApproveStep
              confirmMinedTx={this.confirmMinedTx}
              setCurrentSubscription={this.setCurrentSubscription}
            />
          )}
          {step >= STEPS.burn && (
            <BurnStep
              confirmMinedTx={this.confirmMinedTx}
              goToNext={this.goToNext}
              setCurrentSubscription={this.setCurrentSubscription}
            />
          )}
          {step < STEPS.burn && (
            <NavButton
              disabled={!isNavButtonEnabled}
              onClick={this.goToNext}
              primary
              width="100%"
            >
              {t('Dissolution:Nav.nextStep')}
            </NavButton>
          )}
          {step === STEPS.success && (
            <NavButton
              onClick={this.logOut}
              primary
              width="100%"
            >
              {t('Dissolution:Nav.logOut')}
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
  loadWalletBalance: number,
  lockedDgd: number.isRequired,
  t: func.isRequired,
};

Dissolution.defaultProps = {
  loadWalletBalance: undefined,
};

const mapStateToProps = state => ({
  isAddressLoaded: state.govUI.Dissolution.isAddressLoaded,
  isBurnApproved: state.govUI.Dissolution.isBurnApproved,
  loadWalletBalance: state.govUI.Dissolution.loadWalletBalance,
  lockedDgd: state.govUI.Dissolution.lockedDgd,
});

export default withTranslation(['Dissolution', 'Snackbar'])(
  withApolloClient(
    connect(mapStateToProps, {})(Dissolution)
  )
);

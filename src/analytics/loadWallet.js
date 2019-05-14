import ReactGA from 'react-ga';
import Analytics from '@digix/gov-ui/analytics';

const CATEGORY = 'LoadWallet';
const TXN_LABEL = 'LoadWalletTxn';
const SIGN_MSG_TXN = 'SignProofofControlTxn';

const ACTIONS = {
  initiate: 'Initiate',
  proceedToSelection: 'Proceed to Wallet Select',
  selectWalletType: 'Select Wallet Type',
  load: 'Load Wallet Successfully',
  loadError: 'Load Wallet Error',
  cancelLoading: 'Cancel Loading of Wallet',
  signMessage: 'Sign Proof of Control',
  cancelSigning: 'Cancel Signing Proof of Control',
};

const LABELS = {
  walletType: 'Wallet Type',
};

export const LogLoadWallet = {
  initiate: () => {
    ReactGA.event({
      category: CATEGORY,
      action: ACTIONS.initiate,
    });
  },

  proceedToSelection: () => {
    ReactGA.event({
      category: CATEGORY,
      action: ACTIONS.proceedToSelection,
    });
  },

  selectWalletType: type => {
    ReactGA.event({
      category: CATEGORY,
      action: ACTIONS.selectWalletType,
      label: `${LABELS.walletType}: ${type}`,
    });
  },

  load: type => {
    ReactGA.event({
      category: CATEGORY,
      action: ACTIONS.load,
      label: `${LABELS.walletType}: ${type}`,
    });
  },

  loadError: error => {
    ReactGA.event({
      category: CATEGORY,
      action: ACTIONS.loadError,
      value: error,
    });
  },

  cancel: type => {
    ReactGA.event({
      category: CATEGORY,
      action: ACTIONS.cancelLoading,
      label: `${LABELS.walletType}: ${type}`,
    });
  },

  txn: Analytics.LogTxn(CATEGORY, TXN_LABEL),
};

export const LogSignMessage = {
  txn: Analytics.LogTxn(CATEGORY, SIGN_MSG_TXN),
};

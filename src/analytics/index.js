import ReactGA from 'react-ga';

const TRACKING_ID = 'UA-61278742-4';
const DEFAULT_OPTIONS = {
  // NOTE: set debug to true to view logs on console
  debug: false,
  titleCase: true,
};

const TXN_ACTIONS = {
  cancelSigning: 'Cancel Signing',
  failTxn: 'Fail Transaction',
  hideAdvanced: 'Hide Advanced Tab',
  hideDetails: 'Hide Details',
  passTxn: 'Pass Transaction',
  showAdvanced: 'Show Advanced Tab',
  showDetails: 'Show Details',
  sign: 'Sign Transaction',
};

const _parseMessage = msg => {
  if (msg) {
    return msg.message || msg;
  }

  return 'Unknown';
};

function init(opt) {
  const options = {
    ...DEFAULT_OPTIONS,
    ...opt,
  };

  ReactGA.initialize(TRACKING_ID, options);
}

// Base template for logging transaction events.
// Pass an instance of this in payload.logTxn of executeContractFunction
// to log transaction events from governance-ui.
const LogTxn = (category, txnLabel) => ({
  cancel: () =>
    ReactGA.event({
      category,
      action: TXN_ACTIONS.cancelSigning,
      label: txnLabel,
    }),

  completeTransaction: (isSuccessful, message) => {
    const action = isSuccessful ? TXN_ACTIONS.passTxn : TXN_ACTIONS.failTxn;
    const eventParams = {
      category,
      action,
    };

    if (!isSuccessful) {
      eventParams.label = _parseMessage(message);
    }

    ReactGA.event(eventParams);
  },

  // for json wallets
  sign: () =>
    ReactGA.event({
      category,
      action: TXN_ACTIONS.sign,
      label: txnLabel,
    }),

  toggleAdvanced: show => {
    const action = show ? TXN_ACTIONS.showAdvanced : TXN_ACTIONS.hideAdvanced;
    ReactGA.event({
      category,
      action,
      label: txnLabel,
    });
  },

  toggleDetails: show => {
    const action = show ? TXN_ACTIONS.showDetails : TXN_ACTIONS.hideDetails;
    ReactGA.event({
      category,
      action,
      label: txnLabel,
    });
  },
});

const Analytics = {
  init,
  LogTxn,
};

export default Analytics;

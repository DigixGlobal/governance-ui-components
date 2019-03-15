import ReactGA from 'react-ga';
import Analytics from '@digix/gov-ui/analytics';

const CATEGORY = 'LockDgd';
const TXN_LABEL = 'LockDgdTxn';

const ACTIONS = {
  closeOverlay: 'Close Overlay',
  openOverlay: 'Open Overlay',
  submit: 'Submit',
};

const LABELS = {
  submit: 'Amount of DGD',
};

const LogLockDgd = {
  submit: dgd => {
    ReactGA.event({
      category: CATEGORY,
      action: ACTIONS.submit,
      label: LABELS.submit,
      value: dgd,
    });
  },

  toggleOverlay: ({ show, source }) => {
    const action = show ? ACTIONS.openOverlay : ACTIONS.closeOverlay;
    const eventParams = {
      category: CATEGORY,
      action,
    };

    if (source) {
      eventParams.label = `Source: ${source}`;
    }

    ReactGA.event(eventParams);
  },

  txn: Analytics.LogTxn(CATEGORY, TXN_LABEL),
};

export default LogLockDgd;

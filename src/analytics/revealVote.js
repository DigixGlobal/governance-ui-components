import ReactGA from 'react-ga';
import Analytics from '@digix/gov-ui/analytics';

const CATEGORY = 'RevealVote';
const TXN_LABEL = 'RevealVoteTxn';

const ACTIONS = {
  initiate: 'Initiate',
  uploadJson: 'Upload Json',
  submit: 'Submit',
};

const LABELS = {
  proposal: 'Proposal ID',
  userType: 'User Type:',
};

const LogRevealVote = {
  initiate: type => {
    ReactGA.event({
      category: CATEGORY,
      action: ACTIONS.initiate,
      label: `${LABELS.userType}: ${type}`,
    });
  },

  uploadJson: () => {
    ReactGA.event({
      category: CATEGORY,
      action: ACTIONS.uploadJson,
    });
  },

  submit: proposalId => {
    ReactGA.event({
      category: CATEGORY,
      action: ACTIONS.submit,
      label: `${LABELS.proposal}: ${proposalId}`,
    });
  },

  txn: Analytics.LogTxn(CATEGORY, TXN_LABEL),
};

export default LogRevealVote;

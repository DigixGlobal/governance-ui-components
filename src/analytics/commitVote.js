import ReactGA from 'react-ga';
import Analytics from '@digix/gov-ui/analytics';

const CATEGORY = 'CommitVote';
const TXN_LABEL = 'CommitVoteTxn';

const ACTIONS = {
  initiate: 'Initiate',
  changeVote: 'Change Vote',
  proceedToChangeVote: 'Proceed to Change Vote',
  selectVote: 'Select Vote Option',
  downloadJson: 'Download Json',
  submit: 'Submit',
};

const LABELS = {
  yes: 'Yes',
  no: 'No',
  proposal: 'Proposal ID',
  userType: 'User Type:',
};

const LogCommitVote = {
  initiate: type => {
    ReactGA.event({
      category: CATEGORY,
      action: ACTIONS.initiate,
      label: `${LABELS.userType}: ${type}`,
    });
  },

  changeVote: type => {
    ReactGA.event({
      category: CATEGORY,
      action: ACTIONS.changeVote,
      label: `${LABELS.userType}: ${type}`,
    });
  },

  proceedToChangeVote: () => {
    ReactGA.event({
      category: CATEGORY,
      action: ACTIONS.proceedToChangeVote,
    });
  },

  selectVote: vote => {
    const label = vote ? LABELS.yes : LABELS.no;
    ReactGA.event({
      category: CATEGORY,
      action: ACTIONS.selectVote,
      label,
    });
  },

  downloadJson: () => {
    ReactGA.event({
      category: CATEGORY,
      action: ACTIONS.downloadJson,
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

export default LogCommitVote;

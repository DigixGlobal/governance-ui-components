// English (EN)
import Dissolution from '@digix/gov-ui/translations/english/dissolution.json';
import Header from '@digix/gov-ui/translations/english/header.json';
import LoadWallet from '@digix/gov-ui/translations/english/loadWallet.json';
import SignTransaction from '@digix/gov-ui/translations/english/signTransaction.json';
import Snackbar from '@digix/gov-ui/translations/english/snackbar.json';

// Chinese (CN)
import DissolutionCN from '@digix/gov-ui/translations/chinese/dissolution.json';
import HeaderCN from '@digix/gov-ui/translations/chinese/header.json';
import LoadWalletCN from '@digix/gov-ui/translations/chinese/loadWallet.json';
import SignTransactionCN from '@digix/gov-ui/translations/chinese/signTransaction.json';
import SnackbarCN from '@digix/gov-ui/translations/chinese/snackbar.json';

const translationsEN = {
  Dissolution,
  Header,
  LoadWallet,
  SignTransaction,
  Snackbar,
};

const translationsCN = {
  Dissolution: DissolutionCN,
  Header: HeaderCN,
  LoadWallet: LoadWalletCN,
  SignTransaction: SignTransactionCN,
  Snackbar: SnackbarCN,
};

const translations = {
  'en-US': translationsEN,
  en: translationsEN,
  cn: translationsCN,
};

export default translations;

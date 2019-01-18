import React from 'react';
import PropTypes from 'prop-types';

import Arrow from './Arrow';
import Close from './Close';
import Face from './Face';
import Check from './Check';
import Dashboard from './Dashboard';
// import DigixLogo from './Brand';
import Magnifier from './Magnifier';
import Menu from './Menu';
import Notification from './Notification';
import Ribbon from './Ribbon';
import Home from './Home';
import Activity from './Activity';
import Wallet from './Wallet';
import Profile from './Profile';
import Help from './Help';
import History from './History';
import Option from './Options';
import Product from './product-tour';
import JsonWallet from './JsonWallet';
import Ledger from './Ledger';
import Like from './Like';
import Metamask from './Metamask';
import Plus from './Plus';
import Reply from './Reply';
import Trash from './Trash';
import Trezor from './Trezor';
import ImToken from './ImToken';
import Ethereum from './Ethereum';
import Dgd from './DGD';
import XMark from './XMark';

const icons = {
  arrow: Arrow,
  close: Close,
  face: Face,
  check: Check,
  dasboard: Dashboard,
  // digixLogo: DigixLogo,
  magnifier: Magnifier,
  menu: Menu,
  notification: Notification,
  ribbon: Ribbon,
  home: Home,
  activity: Activity,
  wallet: Wallet,
  profile: Profile,
  help: Help,
  history: History,
  option: Option,
  product: Product,
  json: JsonWallet,
  ledger: Ledger,
  like: Like,
  metamask: Metamask,
  plus: Plus,
  reply: Reply,
  trash: Trash,
  trezor: Trezor,
  imtoken: ImToken,
  ethereum: Ethereum,
  dgd: Dgd,
  xmark: XMark,
};

const Icon = props => {
  const IconComponent = icons[props.kind];

  return <IconComponent {...props} />;
};

Icon.propTypes = {
  kind: PropTypes.string,
};

Icon.defaultProps = {
  kind: 'face',
};

export default Icon;

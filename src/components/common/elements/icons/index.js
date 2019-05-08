import React from 'react';
import PropTypes from 'prop-types';

import Activity from './Activity';
import Alarm from './Alarm';
import Arrow from './Arrow';
import Check from './Check';
import Close from './Close';
import Dashboard from './Dashboard';
import Delete from './Delete';
import Dgd from './DGD';
import Dgx from './Dgx';
import Ethereum from './Ethereum';
import Flag from './Flag';
import File from './File';
import Help from './Help';
import History from './History';
import Info from './Info';
import Home from './Home';
import ImToken from './ImToken';
import JsonWallet from './JsonWallet';
import Ledger from './Ledger';
import Like from './Like';
import DigixLogo from './Brand';
import Magnifier from './Magnifier';
import Menu from './Menu';
import Metamask from './Metamask';
import Notification from './Notification';
import Option from './Options';
import Padlock from './Padlock';
import Product from './product-tour';
import Profile from './Profile';
import Plus from './Plus';
import Repair from './Repair';
import Reply from './Reply';
import Restore from './Restore';
import Ribbon from './Ribbon';
import Trash from './Trash';
import Trezor from './Trezor';
import Wallet from './Wallet';
import Warning from './Warning';
import XMark from './XMark';
import User from './User';

const icons = {
  activity: Activity,
  alarm: Alarm,
  arrow: Arrow,
  check: Check,
  close: Close,
  dashboard: Dashboard,
  delete: Delete,
  dgd: Dgd,
  dgx: Dgx,
  ethereum: Ethereum,
  flag: Flag,
  file: File,
  help: Help,
  history: History,
  home: Home,
  info: Info,
  imtoken: ImToken,
  json: JsonWallet,
  ledger: Ledger,
  logo: DigixLogo,
  like: Like,
  magnifier: Magnifier,
  menu: Menu,
  metamask: Metamask,
  notification: Notification,
  option: Option,
  padlock: Padlock,
  product: Product,
  profile: Profile,
  plus: Plus,
  repair: Repair,
  reply: Reply,
  restore: Restore,
  ribbon: Ribbon,
  trash: Trash,
  trezor: Trezor,
  wallet: Wallet,
  warning: Warning,
  xmark: XMark,
  user: User,
};

const Icon = props => {
  const IconComponent = icons[props.kind];

  return <IconComponent {...props} />;
};

Icon.propTypes = {
  kind: PropTypes.string,
};

Icon.defaultProps = {
  kind: 'user',
};

export default Icon;

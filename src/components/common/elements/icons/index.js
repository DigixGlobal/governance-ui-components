import React from 'react';
import PropTypes from 'prop-types';

import Activity from '@digix/gov-ui/components/common/elements/icons/Activity';
import Alarm from '@digix/gov-ui/components/common/elements/icons/Alarm';
import Arrow from '@digix/gov-ui/components/common/elements/icons/Arrow';
import Check from '@digix/gov-ui/components/common/elements/icons/Check';
import Close from '@digix/gov-ui/components/common/elements/icons/Close';
import Dashboard from '@digix/gov-ui/components/common/elements/icons/Dashboard';
import Delete from '@digix/gov-ui/components/common/elements/icons/Delete';
import Dgd from '@digix/gov-ui/components/common/elements/icons/DGD';
import Dgx from '@digix/gov-ui/components/common/elements/icons/Dgx';
import Ethereum from '@digix/gov-ui/components/common/elements/icons/Ethereum';
import Flag from '@digix/gov-ui/components/common/elements/icons/Flag';
import File from '@digix/gov-ui/components/common/elements/icons/File';
import Help from '@digix/gov-ui/components/common/elements/icons/Help';
import History from '@digix/gov-ui/components/common/elements/icons/History';
import Info from '@digix/gov-ui/components/common/elements/icons/Info';
import Home from '@digix/gov-ui/components/common/elements/icons/Home';
import ImToken from '@digix/gov-ui/components/common/elements/icons/ImToken';
import JsonWallet from '@digix/gov-ui/components/common/elements/icons/JsonWallet';
import Ledger from '@digix/gov-ui/components/common/elements/icons/Ledger';
import Like from '@digix/gov-ui/components/common/elements/icons/Like';
import DigixLogo from '@digix/gov-ui/components/common/elements/icons/Brand';
import Magnifier from '@digix/gov-ui/components/common/elements/icons/Magnifier';
import Menu from '@digix/gov-ui/components/common/elements/icons/Menu';
import Metamask from '@digix/gov-ui/components/common/elements/icons/Metamask';
import Notification from '@digix/gov-ui/components/common/elements/icons/Notification';
import Option from '@digix/gov-ui/components/common/elements/icons/Options';
import Padlock from '@digix/gov-ui/components/common/elements/icons/Padlock';
import Product from '@digix/gov-ui/components/common/elements/icons/product-tour';
import Profile from '@digix/gov-ui/components/common/elements/icons/Profile';
import Plus from '@digix/gov-ui/components/common/elements/icons/Plus';
import Repair from '@digix/gov-ui/components/common/elements/icons/Repair';
import Reply from '@digix/gov-ui/components/common/elements/icons/Reply';
import Restore from '@digix/gov-ui/components/common/elements/icons/Restore';
import Ribbon from '@digix/gov-ui/components/common/elements/icons/Ribbon';
import Trash from '@digix/gov-ui/components/common/elements/icons/Trash';
import Trezor from '@digix/gov-ui/components/common/elements/icons/Trezor';
import Wallet from '@digix/gov-ui/components/common/elements/icons/Wallet';
import Warning from '@digix/gov-ui/components/common/elements/icons/Warning';
import XMark from '@digix/gov-ui/components/common/elements/icons/XMark';
import User from '@digix/gov-ui/components/common/elements/icons/User';

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

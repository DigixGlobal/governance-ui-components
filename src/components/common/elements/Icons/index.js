import React from 'react';
import PropTypes from 'prop-types';

import Close from './Close';
import Face from './Face';
import Dashboard from './Dashboard';
import DigixLogo from './Brand';
import Magnifier from './Magnifier';
import Menu from './Menu';
import Notification from './Notification';
import Ribbon from './Ribbon';
import Home from './Home';
import Activity from './Activity';
import Wallet from './Wallet';
import Profile from './Profile';
import Help from './Help';
import Product from './Product-tour';

const icons = {
  close: Close,
  face: Face,
  dasboard: Dashboard,
  digixLogo: DigixLogo,
  magnifier: Magnifier,
  menu: Menu,
  notification: Notification,
  ribbon: Ribbon,
  home: Home,
  activity: Activity,
  wallet: Wallet,
  profile: Profile,
  help: Help,
  product: Product,
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

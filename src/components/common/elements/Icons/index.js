import React from 'react';
import PropTypes from 'prop-types';

import Close from './close';
import Face from './face';
import Dashboard from './dashboard';
// import DigixLogo from './Brand';
import Magnifier from './magnifier';
import Menu from './menu';
import Notification from './notification';
import Ribbon from './ribbon';
import Home from './home';
import Activity from './activity';
import Wallet from './wallet';
import Profile from './profile';
import Help from './help';
import Product from './product-tour';

const icons = {
  close: Close,
  face: Face,
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

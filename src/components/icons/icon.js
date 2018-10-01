import React from 'react';
import PropTypes from 'prop-types';

import Close from './close';
import Face from './face';
import Dashboard from './dashboard';
import DigixLogo from './digix-logo';
import Magnifier from './magnifier';
import Menu from './menu';
import Notification from './notification';
import Ribbon from './ribbon';

const icons = {
  close: Close,
  face: Face,
  dasboard: Dashboard,
  digixLogo: DigixLogo,
  magnifier: Magnifier,
  menu: Menu,
  notification: Notification,
  ribbon: Ribbon,
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

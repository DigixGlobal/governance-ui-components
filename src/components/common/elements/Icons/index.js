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

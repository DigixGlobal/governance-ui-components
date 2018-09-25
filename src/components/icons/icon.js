import React from 'react';
import PropTypes from 'prop-types';

import Close from './close';
import Face from './face';

const icons = {close: Close, face: Face};

const Icon = props => {
  const IconComponent = icons[props.kind];

  return <IconComponent {...props} />;
};
Icon.propTypes = {
  kind: PropTypes.string,
};

export default Icon;

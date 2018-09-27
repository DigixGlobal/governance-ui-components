import React from 'react';
import PropTypes from 'prop-types';

import CapsuleButton from './capsule-button';

const buttons = { capsule: CapsuleButton };

const Button = props => {
  const ButtonComponent = buttons[props.kind];

  return <ButtonComponent {...props} />;
};
Button.propTypes = {
  kind: PropTypes.string,
};

Button.defaultProps = {
  kind: 'capsule',
};

export default Button;

import React from 'react';
import PropTypes from 'prop-types';

import CapsuleButton from './capsule-button';
import FlatButton from './flat-button';
import RoundButton from './round-button';

const buttons = {
  round: RoundButton,
  capsule: CapsuleButton,
  flat: FlatButton,
};

const Button = props => {
  const ButtonComponent = buttons[props.kind];

  return <ButtonComponent {...props} />;
};
Button.propTypes = {
  kind: PropTypes.string,
};

Button.defaultProps = {
  kind: 'round',
};

export default Button;

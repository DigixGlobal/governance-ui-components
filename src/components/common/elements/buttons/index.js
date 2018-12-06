import React from 'react';
import PropTypes from 'prop-types';

import CapsuleButton from './capsule-button';
import FlatButton from './flat-button';
import RoundButton from './round-button';
import LabeledIconButton from './labeled-icon-button';
import TextButton from './text-button';

const buttons = {
  round: RoundButton,
  capsule: CapsuleButton,
  flat: FlatButton,
  iconLabeled: LabeledIconButton,
  text: TextButton,
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

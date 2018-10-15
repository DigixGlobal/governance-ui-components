import React from 'react';
import PropTypes from 'prop-types';

import CapsuleButton from './capsule-button';
import TagButton from './tag-button';
import RoundButton from './round-button';

const buttons = { round: RoundButton, capsule: CapsuleButton, tag: TagButton };

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

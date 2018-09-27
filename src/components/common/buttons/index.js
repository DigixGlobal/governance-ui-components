import React from 'react';
import PropTypes from 'prop-types';

import CapsuleButton from './capsule-button';
import TagButton from './tag-button';

const buttons = { capsule: CapsuleButton, tag: TagButton };

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

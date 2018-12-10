import React from 'react';
import PropTypes from 'prop-types';

import CapsuleButton from './capsule-button';
import FlatButton from './flat-button';
import RoundButton from './round-button';
import LabeledIconButton from './labeled-icon-button';
import LinkButton from './link-button';
import UploadButton from './upload-button';

const buttons = {
  round: RoundButton,
  capsule: CapsuleButton,
  flat: FlatButton,
  iconLabeled: LabeledIconButton,
  link: LinkButton,
  upload: UploadButton,
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

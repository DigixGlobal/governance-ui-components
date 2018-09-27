import React from 'react';
import PropTypes from 'prop-types';

import { Button } from './style';

const CapsuleButton = props => <Button {...props}>{props.children}</Button>;

CapsuleButton.propTypes = {
  children: PropTypes.object.isRequired,
};

export default CapsuleButton;

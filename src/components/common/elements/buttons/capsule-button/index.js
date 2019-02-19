import React from 'react';
import PropTypes from 'prop-types';

import { CapsuleBtn } from './style';

const CapsuleButton = props => <CapsuleBtn {...props}>{props.children}</CapsuleBtn>;

const { object, string, node, oneOfType } = PropTypes;

CapsuleButton.propTypes = {
  children: oneOfType([object, string, node]).isRequired,
};

export default CapsuleButton;

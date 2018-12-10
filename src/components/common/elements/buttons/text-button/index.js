import React from 'react';
import PropTypes from 'prop-types';

import { TextBtn } from './style';

const TextButton = props => <TextBtn {...props}>{props.children}</TextBtn>;

const { object, string, node, oneOfType } = PropTypes;
TextButton.propTypes = {
  children: oneOfType([object, string, node]).isRequired,
};

export default TextButton;

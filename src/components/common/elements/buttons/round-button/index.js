import React from 'react';
import PropTypes from 'prop-types';

import { RoundBtn } from '../style';

const RoundButton = props => <RoundBtn {...props}>{props.children}</RoundBtn>;

const { object, string, node, oneOfType } = PropTypes;

RoundButton.propTypes = {
  children: oneOfType([object, string, node]).isRequired,
};

export default RoundButton;

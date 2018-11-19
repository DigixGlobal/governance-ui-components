import React from 'react';
import PropTypes from 'prop-types';

import { LabeledIconBtn } from '../style';

const LabeledIconButton = props => <LabeledIconBtn {...props}>{props.children}</LabeledIconBtn>;

const { object, string, node, oneOfType } = PropTypes;
LabeledIconButton.propTypes = {
  children: oneOfType([object, string, node]).isRequired,
};

export default LabeledIconButton;

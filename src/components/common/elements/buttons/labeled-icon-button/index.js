import React from 'react';
import PropTypes from 'prop-types';

import { FlatBtn } from '../style';

const TagButton = props => <FlatBtn {...props}>{props.children}</FlatBtn>;

const { object, string, node, oneOfType } = PropTypes;
TagButton.propTypes = {
  children: oneOfType([object, string, node]).isRequired,
};

export default TagButton;

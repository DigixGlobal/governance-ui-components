import React from 'react';
import PropTypes from 'prop-types';

import { TagBtn } from '../style';

const TagButton = props => <TagBtn {...props}>{props.children}</TagBtn>;

const { object, string, node, oneOfType } = PropTypes;
TagButton.propTypes = {
  children: oneOfType([object, string, node]).isRequired,
};

export default TagButton;

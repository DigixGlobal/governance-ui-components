import React from 'react';
import PropTypes from 'prop-types';

import { Button } from './style';

const LinkButton = props => <Button {...props}>{props.children}</Button>;

const { object, string, node, oneOfType } = PropTypes;

LinkButton.propTypes = {
  children: oneOfType([object, string, node]).isRequired,
};

export default LinkButton;

import React from 'react';
import PropTypes from 'prop-types';

import { Button } from './style';

const RoundButton = props => <Button {...props}>{props.children}</Button>;

const { object, string, node, oneOfType } = PropTypes;

RoundButton.propTypes = {
  children: oneOfType([object, string, node]).isRequired,
};

export default RoundButton;

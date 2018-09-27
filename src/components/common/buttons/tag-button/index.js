import React from 'react';
import PropTypes from 'prop-types';

import { Button } from './style';

const TagButton = props => <Button {...props}>{props.children}</Button>;

TagButton.propTypes = {
  children: PropTypes.object.isRequired,
};

export default TagButton;

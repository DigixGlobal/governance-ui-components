import React from 'react';
import PropTypes from 'prop-types';

import { SyledInput, Container, Adornment, Error } from './style';

const Input = props => (
  <Container>
    <SyledInput {...props} />
    {props.adornment && <Adornment>{props.adornment}</Adornment>}
    {props.error && <Error>{props.message}</Error>}
  </Container>
);

const { bool, object, string, func, oneOfType } = PropTypes;

Input.propTypes = {
  error: oneOfType([bool, object, string]),
  message: oneOfType([string, bool]),
  adornment: oneOfType([object, func]),
};

Input.defaultProps = {
  error: false,
  message: undefined,
  adornment: undefined,
};

export default Input;

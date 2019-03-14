import React from 'react';
import { Container } from './style';

const RestoreIcon = props => (
  <Container {...props}>
    <svg viewBox="0 0 448 448">
      <path
        d="M448,224c0,106-86,192-192,192c-43.9,0-84.4-14.9-116.8-39.9l30.2-30.6c24.5,17.5,54.3,27.8,86.6,27.8
	c82.5,0,149.3-66.9,149.3-149.3S338.5,74.7,256,74.7S106.7,141.5,106.7,224h64l-85.3,85.3L0,224h64c0-106,86-192,192-192
	S448,118,448,224z M298.7,224c0-23.6-19.1-42.7-42.7-42.7c-23.6,0-42.7,19.1-42.7,42.7s19.1,42.7,42.7,42.7
	C279.6,266.7,298.7,247.6,298.7,224z"
      />
    </svg>
  </Container>
);

RestoreIcon.defaultProps = {
  width: '1.75rem',
  height: '1.75rem',
};

export default RestoreIcon;

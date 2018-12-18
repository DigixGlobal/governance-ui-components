import React from 'react';
import { Container } from './style';

const OptionIcon = props => (
  <Container {...props}>
    <svg viewBox="0 0 23.19 5.8">
      <path
        d="M24.3,19.3a2.9,2.9,0,1,0,2.9-2.9,2.91,2.91,0,0,0-2.9,2.9Zm-2.9,0a2.9,2.9,0,1,0-2.9,2.9,2.91,2.91,0,0,0,2.9-2.9Zm-8.7,0a2.9,2.9,0,1,0-2.9,2.9,2.9,2.9,0,0,0,2.9-2.9Z"
        transform="translate(-6.91 -16.4)"
      />
    </svg>
  </Container>
);

OptionIcon.defaultProps = {
  width: '1.75rem',
  height: '1.75rem',
};

export default OptionIcon;

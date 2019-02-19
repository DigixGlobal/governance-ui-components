import React from 'react';
import { Container } from './style';

const ArrowIcon = props => (
  <Container {...props}>
    <svg viewBox="0 0 24 24">
      <path d="M8,6.822v10.357c0,0.789,0.871,1.267,1.537,0.844l8.137-5.178c0.618-0.393,0.618-1.294,0-1.687L9.537,5.978 C8.871,5.554,8,6.033,8,6.822z" />
    </svg>
  </Container>
);

ArrowIcon.defaultProps = {
  width: '2.75rem',
  height: '2.75rem',
};

export default ArrowIcon;

import React from 'react';
import { Container } from './style';

const ArrowIcon = props => (
  <Container {...props}>
    <svg viewBox="0 0 306 306">
      {/* <path d="M8,6.822v10.357c0,0.789,0.871,1.267,1.537,0.844l8.137-5.178c0.618-0.393,0.618-1.294,0-1.687L9.537,5.978 C8.871,5.554,8,6.033,8,6.822z" /> */}
      <path d="M0,94.3l35.7-35.7L153,175.9L270.3,58.7L306,94.3l-153,153L0,94.3z" />
    </svg>
  </Container>
);

ArrowIcon.defaultProps = {
  // width: '2.75rem',
  // height: '2.75rem',
  width: '2rem',
  height: '2rem',
};

export default ArrowIcon;

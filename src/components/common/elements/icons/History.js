import React from 'react';
import { Container } from './style';

const HistoryIcon = props => (
  <Container {...props}>
    <svg viewBox="0 0 26 26">
      <path
        className="cls-1"
        d="M6,8.32v20a2,2,0,0,0,.5,1.31,1.7,1.7,0,0,0,.19.19,2,2,0,0,0,1.31.5H28a2,2,0,0,0,2-2v-20a2,2,0,0,0-2-2H8A2,2,0,0,0,6,8.32Zm5.5,4.5h7.73v2H11.46Zm0,5h12v2h-12Zm0,5h7v2h-7Zm12-3h-12v-2h12Zm-5,5h-7v-2h7Zm11.5-7h1V28.44a2.88,2.88,0,0,1-2.88,2.88H7.84A2.88,2.88,0,0,1,5,28.44V8.2A2.88,2.88,0,0,1,7.84,5.32H19.19v1H8a2,2,0,0,0-2,2v20a2,2,0,0,0,.5,1.31v.19h.19a2,2,0,0,0,1.31.5H28a2,2,0,0,0,2-2ZM6.46,29.63a1.7,1.7,0,0,0,.19.19H6.46ZM19.19,14.82H11.46v-2h7.73ZM31,8.2v9.61H30V8.32a2,2,0,0,0-2-2H19.19v-1h8.89A2.88,2.88,0,0,1,31,8.2Z"
        transform="translate(-4.96 -5.32)"
      />
    </svg>
  </Container>
);

HistoryIcon.defaultProps = {
  width: '1.75rem',
  height: '1.75rem',
};

export default HistoryIcon;

import React from 'react';
import { Container } from './style';

const WarningIcon = props => (
  <Container {...props}>
    <svg viewBox="0 0 24 22">
      <path
        fill="#131F35"
        d="M12,0 L0,22 L24,22 L12,0 Z M11,8 L13,8 L13,15 L11,15 L11,8 Z M12,19.25 C11.31,19.25 10.75,18.69 10.75,18 C10.75,17.31 11.31,16.75 12,16.75 C12.69,16.75 13.25,17.31 13.25,18 C13.25,18.69 12.69,19.25 12,19.25 Z"
        id="Shape"
      />
    </svg>
  </Container>
);

WarningIcon.defaultProps = {
  width: '1.75rem',
  height: '1.75rem',
};

export default WarningIcon;

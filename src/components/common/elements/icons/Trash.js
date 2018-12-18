import React from 'react';
import { Container } from './style';

const TrashIcon = props => (
  <Container {...props}>
    <svg width="12px" height="15px" viewBox="0 0 12 15">
      <path
        d="M6.5,5C6.7,5,7,5.2,7,5.5S6.7,6,6.5,6S6,5.8,6,5.5S6.2,5,6.5,5z M1,2.8v0.6H11V2.8
	c0,0,0-0.1-0.1-0.1L1,2.8C1,2.7,1,2.7,1,2.8z M4.3,1C4.3,1,4.3,1,4.3,1L4.3,1.7h3.4V1.1c0,0,0-0.1-0.1-0.1H4.3z M9.4,13.9l1-9.5H1.6
	l1,9.5c0,0,0,0.1,0.1,0.1L9.4,13.9C9.4,14,9.4,14,9.4,13.9z M11,1.7c0.6,0,1,0.5,1,1.1v1.1c0,0.3-0.2,0.5-0.5,0.5h-0.1l-1,9.6
	c-0.1,0.5-0.5,1-1,1H2.6c-0.5,0-1-0.4-1-0.9l-1-9.6H0.5C0.2,4.4,0,4.2,0,3.9V2.8c0-0.6,0.5-1.1,1-1.1h2.3V1.1c0-0.6,0.5-1.1,1-1.1
	h3.3c0.6,0,1,0.5,1,1.1v0.6H11z M6.5,7C6.7,7,7,7.2,7,7.5v5.8c0,0.3-0.2,0.5-0.5,0.5S6,13.6,6,13.3V7.5C6,7.2,6.2,7,6.5,7z M9.1,5
	c0.1,0,0.2,0.1,0.3,0.2c0.1,0.1,0.1,0.2,0.1,0.4L9,12.7c0,0.3-0.2,0.5-0.5,0.5c0,0,0,0,0,0h0c-0.1,0-0.2-0.1-0.3-0.2
	C8,12.9,8,12.8,8,12.6l0.6-7.2c0-0.1,0.1-0.3,0.2-0.3C8.8,5,8.9,5,9.1,5z M4,5.5l0.6,7.2c0,0.1,0,0.3-0.1,0.4
	c-0.1,0.1-0.2,0.2-0.3,0.2c0,0,0,0,0,0c-0.2,0-0.5-0.2-0.5-0.5L3,5.5c0-0.1,0-0.3,0.1-0.4C3.2,5.1,3.3,5,3.4,5c0.1,0,0.3,0,0.4,0.1
	C3.9,5.2,4,5.3,4,5.5z"
      />
    </svg>
  </Container>
);

TrashIcon.defaultProps = {
  width: '1.75rem',
  height: '1.75rem',
};

export default TrashIcon;
import React from 'react';
import { Container } from './style';

const LikeIcon = props => (
  <Container {...props}>
    <svg width="14.7px" height="13.3px" viewBox="0 0 14.7 13.3">
      <path
        d="M5.3,5.3l2.9-2.9L7.3,6h6v1.3l-2,4.7h-6V5.3z M5.3,13.3h6c0.6,0,1-0.3,1.2-0.8l2-4.7c0.1-0.2,0.1-0.3,0.1-0.5V6
	c0-0.7-0.6-1.3-1.3-1.3H9.1l0.6-3l0-0.2c0-0.3-0.1-0.5-0.3-0.7L8.8,0L4.4,4.4C4.1,4.6,4,5,4,5.3V12C4,12.7,4.6,13.3,5.3,13.3z
	 M0,5.3h2.7v8H0V5.3z"
      />
    </svg>
  </Container>
);

LikeIcon.defaultProps = {
  width: '1.75rem',
  height: '1.75rem',
  marginRight: '0.5rem',
};

export default LikeIcon;

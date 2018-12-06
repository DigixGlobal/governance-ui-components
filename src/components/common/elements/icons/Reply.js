import React from 'react';
import { Container } from './style';

const ReplyIcon = props => (
  <Container {...props}>
    <svg width="13px" height="14px" viewBox="0 0 13 14">
      <path
        d="M10,0.8H3c-1.2,0-2.2,1-2.2,2.2v4.9c0,1.2,1,2.2,2.2,2.2h1.5v2.7l5.2-2.7H10c1.2,0,2.2-1,2.2-2.2V3
	C12.2,1.8,11.2,0.8,10,0.8z"
      />
    </svg>
  </Container>
);

ReplyIcon.defaultProps = {
  width: '1.75rem',
  height: '1.75rem',
};

export default ReplyIcon;

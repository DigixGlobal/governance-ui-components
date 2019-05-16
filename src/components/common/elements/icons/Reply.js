import React from 'react';
import { Container } from './style';

const ReplyIcon = props => (
  <Container {...props}>
    <svg viewBox="0 0 13 14">
      <path
        d="M12.2,3v4.9c0,1.2-1,2.2-2.2,2.2H9.7l-5.2,2.7v-2.7H3c-1.2,0-2.2-1-2.2-2.2V3c0-1.2,1-2.2,2.2-2.2h7
	C11.2,0.8,12.2,1.8,12.2,3z"
      />
    </svg>
  </Container>
);

ReplyIcon.defaultProps = {
  width: '1.75rem',
  height: '1.75rem',
};

export default ReplyIcon;

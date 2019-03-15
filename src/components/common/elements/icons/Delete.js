import React from 'react';
import { Container } from './style';

const DeleteIcon = props => (
  <Container {...props}>
    <svg viewBox="0 0 510 510">
      <path
        d="M255,0C114.8,0,0,114.8,0,255s114.8,255,255,255s255-114.8,255-255S395.2,0,255,0z M382.5,280.5h-255v-51h255
		V280.5z"
      />
    </svg>
  </Container>
);

DeleteIcon.defaultProps = {
  width: '1.75rem',
  height: '1.75rem',
};

export default DeleteIcon;

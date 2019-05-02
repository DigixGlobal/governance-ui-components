import React from 'react';
import { Container } from './style';

const DeleteIcon = props => (
  <Container {...props}>
    <svg viewBox="0 0 16 16">
      <path
        d="M8,1.3c3.7,0,6.7,3,6.7,6.7s-3,6.7-6.7,6.7s-6.7-3-6.7-6.7S4.3,1.3,8,1.3z M8,0C3.6,0,0,3.6,0,8
	s3.6,8,8,8s8-3.6,8-8S12.4,0,8,0z M8.7,12H7.3V6.7h1.3V12z M8,3.8c0.5,0,0.8,0.4,0.8,0.8S8.5,5.5,8,5.5S7.2,5.1,7.2,4.7
	S7.5,3.8,8,3.8z"
      />
    </svg>
  </Container>
);

DeleteIcon.defaultProps = {
  width: '1.5rem',
  height: '1.5rem',
};

export default DeleteIcon;

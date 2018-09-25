import React from 'react';
import { Container } from './style';

const CloseIcon = props => (
  <Container {...props}>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18"><path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"/></svg>
  </Container>
);

CloseIcon.defaultProps = {
  width: '16px',
  height: '16px',
};

export default CloseIcon;

import React from 'react';
import { Container } from './style';

const CheckIcon = props => (
  <Container {...props}>
    <svg width="14px" height="14px" viewBox="0 0 24 24">
      <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-1.25 16.518l-4.5-4.319 1.396-1.435 3.078 2.937 6.105-6.218 1.421 1.409-7.5 7.626z" />
    </svg>
  </Container>
);

CheckIcon.defaultProps = {
  width: '1.75rem',
  height: '1.75rem',
};

export default CheckIcon;

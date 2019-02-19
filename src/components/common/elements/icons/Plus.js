import React from 'react';
import { Container } from './style';

const PlusIcon = props => (
  <Container {...props}>
    <svg viewBox="0 0 13.91 13.91">
      <path
        d="M12.3,6h1.16v6.38h6.37v1.16H13.46V20H12.3V13.58H5.92V12.42H12.3Z"
        transform="translate(-5.92 -6.04)"
      />
    </svg>
  </Container>
);

PlusIcon.defaultProps = {
  width: '1.5rem',
  height: '1.5rem',
};

export default PlusIcon;

import React from 'react';
import { Container } from './style';

const XMarkIcon = props => (
  <Container {...props}>
    <svg width="14" height="14" viewBox="0 0 24 24">
      <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm4.597 17.954l-4.591-4.55-4.555 4.596-1.405-1.405 4.547-4.592-4.593-4.552 1.405-1.405 4.588 4.543 4.545-4.589 1.416 1.403-4.546 4.587 4.592 4.548-1.403 1.416z" />
    </svg>
  </Container>
);

XMarkIcon.defaultProps = {
  width: '1.75rem',
  height: '1.75rem',
};

export default XMarkIcon;

import React from 'react';
import { Container } from './style';

const BookmarkIcon = props => (
  <Container {...props}>
    <svg viewBox="0 0 24 24">
      ><path strokeLinejoin="round" d="M5.5 4.5h13v15L12 15.3l-6.5 4.2z" />
    </svg>
  </Container>
);

BookmarkIcon.defaultProps = {};

export default BookmarkIcon;

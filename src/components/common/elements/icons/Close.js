import React from 'react';
import { Container } from './style';

const CloseIcon = props => (
  <Container {...props}>
    <svg viewBox="0 0 13.91 13.91">
      <a xlinkHref="#" target="_blank" cursor="pointer" pointerEvents="all">
        <path
          className="cls-1"
          d="M8.35,7l5.56,5.57-1.39,1.39L7,8.35,1.39,13.91,0,12.52,5.56,7,0,1.39,1.39,0,7,5.56,12.52,0l1.39,1.39Z"
          transform="translate(0 0)"
        />
        <rect x="0" y="0" width="100%" height="100%" fill="none" />
      </a>
    </svg>
  </Container>
);

CloseIcon.defaultProps = {
  width: '1.5rem',
  height: '1.5rem',
};

export default CloseIcon;

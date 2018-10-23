import React from 'react';
import { Container } from './style';

const PlusIcon = props => (
  <Container {...props}>
    <svg width="12px" height="11px" viewBox="0 0 12 11">
      <g id="Page-1" stroke="none" strokeWidth="1">
        <g id="01.-Dashboard" transform="translate(-498.000000, -459.000000)">
          <g id="Group" transform="translate(484.000000, 446.000000)">
            <rect id="Rectangle-9" x="20" y="13" width="1" height="12" />
            <rect
              id="Rectangle-9"
              transform="translate(20.500000, 19.000000) rotate(90.000000) translate(-20.500000, -19.000000) "
              x="20"
              y="13"
              width="1"
              height="12"
            />
          </g>
        </g>
      </g>
    </svg>
  </Container>
);

PlusIcon.defaultProps = {
  width: '2rem',
  height: '2rem',
};

export default PlusIcon;

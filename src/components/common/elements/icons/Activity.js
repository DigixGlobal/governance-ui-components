import React from 'react';
import { Container } from './style';

const ActivityIcon = props => (
  <Container {...props}>
    <svg width="26px" height="26px" viewBox="0 0 26 26">
      <g
        id="Symbols"
        stroke="none"
        strokeWidth="1"
        fill="none"
        fillRule="evenodd"
        transform="translate(-25.000000, -355.000000)"
      >
        <g id="DB-Builder" transform="translate(25.000000, 355.000000)">
          <rect id="Rectangle-9" stroke="#767676" x="0.5" y="2.5" width="23" height="23" rx="2" />
          <rect id="Rectangle" fill="#767676" x="6" y="12" width="2" height="10" />
          <rect id="Rectangle-Copy" fill="#767676" x="11" y="9" width="2" height="13" />
          <rect id="Rectangle-Copy-2" fill="#767676" x="16" y="15" width="2" height="7" />
          <polygon
            id="Path-7"
            fill="#FFFFFF"
            points="13.2302541 0.804873471 13.2302541 13.4929557 25.0779515 13.4929557 25.0779515 0.804873471"
          />
          <rect id="Rectangle-28" fill="#767676" x="18" y="2" width="2" height="10" />
          <rect id="Rectangle-28-Copy" fill="#767676" x="14" y="6" width="10" height="2" />
        </g>
      </g>
    </svg>
  </Container>
);

ActivityIcon.defaultProps = {
  width: '2.5rem',
  height: '2.5rem',
};

export default ActivityIcon;

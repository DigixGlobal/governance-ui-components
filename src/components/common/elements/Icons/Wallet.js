import React from 'react';
import { Container } from './Style';

const WalletIcon = props => (
  <Container {...props}>
    <svg width="24px" height="24px" viewBox="0 0 24 24">
      <g
        id="Symbols"
        stroke="none"
        strokeWidth="1"
        fill="none"
        fillRule="evenodd"
        transform="translate(-25.000000, -421.000000)"
      >
        <g id="sidepanel">
          <g id="Save-icon" transform="translate(21.000000, 421.000000)">
            <rect id="Rectangle-2" stroke="#767676" x="16.5" y="8.5" width="11" height="7" />
            <rect id="Rectangle-2" fill="#767676" x="18" y="11" width="3" height="3" />
            <rect id="Rectangle-9" stroke="#767676" x="4.5" y="0.5" width="23" height="23" rx="2" />
          </g>
        </g>
      </g>
    </svg>
  </Container>
);

WalletIcon.defaultProps = {
  width: '2.8rem',
  height: '2.8rem',
};

export default WalletIcon;

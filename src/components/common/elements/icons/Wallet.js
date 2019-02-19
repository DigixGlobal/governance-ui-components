import React from 'react';
import { Container } from './style';

const WalletIcon = props => (
  <Container {...props}>
    <svg viewBox="0 0 24 24">
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
            <rect
              id="Rectangle-2"
              stroke={
                props.selected
                  ? props.theme.iconSecondaryColor.default.toString()
                  : props.theme.iconDefaultColor.light.toString()
              }
              x="16.5"
              y="8.5"
              width="11"
              height="7"
            />
            <rect
              id="Rectangle-2"
              fill={
                props.selected
                  ? props.theme.iconSecondaryColor.default.toString()
                  : props.theme.iconDefaultColor.light.toString()
              }
              x="18"
              y="11"
              width="3"
              height="3"
            />
            <rect
              id="Rectangle-9"
              stroke={
                props.selected
                  ? props.theme.iconSecondaryColor.default.toString()
                  : props.theme.iconDefaultColor.light.toString()
              }
              x="4.5"
              y="0.5"
              width="23"
              height="23"
              rx="2"
            />
          </g>
        </g>
      </g>
    </svg>
  </Container>
);

WalletIcon.defaultProps = {
  // width: '2.2rem',
  // height: '2.2rem',
};

export default WalletIcon;

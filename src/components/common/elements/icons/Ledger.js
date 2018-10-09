import React from 'react';
import { Container } from './style';

const LedgerIcon = props => (
  <Container {...props}>
    <svg
      width="36px"
      height="36px"
      viewBox="0 0 36 36"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <g
          id="02.-Wallet-Popup---&gt;"
          transform="translate(-1298.000000, -127.000000)"
          fill="#243961"
          fillRule="nonzero"
        >
          <g id="01.-Access-Wallet" transform="translate(973.000000, 31.000000)">
            <g id="ledge-icon" transform="translate(325.000000, 96.000000)">
              <path
                d="M30.2933394,0 L13.6,0 L13.6,22.4 L36,22.4 L35.9999857,5.82553856 C36.0069792,2.67848892 33.440387,0 30.2933394,0 Z"
                id="Shape"
              />
              <path
                d="M8.8,0 L5.94979757,0 C2.74331984,0 0,2.60793522 0,5.94979757 L0,8.8 L8.8,8.8 L8.8,0 Z"
                id="Shape"
              />
              <polygon id="Rectangle-path" points="0 13.6 8.8 13.6 8.8 22.4 0 22.4" />
              <path
                d="M30.0502024,36 C33.2566802,36 36,33.3899514 36,30.0453809 L36,27.2 L27.2,27.2 L27.2,36 L30.0502024,36 Z"
                id="Shape"
              />
              <polygon id="Rectangle-path" points="13.6 27.2 22.4 27.2 22.4 36 13.6 36" />
              <path
                d="M0.8,27.2 L0.8,30.0502024 C0.8,33.2566802 3.40793522,36 6.74979757,36 L9.6,36 L9.6,27.2 L0.8,27.2 Z"
                id="Shape"
              />
            </g>
          </g>
        </g>
      </g>
    </svg>
  </Container>
);

LedgerIcon.defaultProps = {
  width: '3.6rem',
  height: '3.6rem',
};

export default LedgerIcon;

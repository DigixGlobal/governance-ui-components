import React from 'react';
import { Container } from './style';

const EthereumIcon = props => (
  <Container {...props}>
    <svg
      width="25px"
      height="40px"
      viewBox="0 0 25 40"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <g
          id="03.-Buy-DGD---&gt;"
          transform="translate(-1052.000000, -199.000000)"
          fill="#D8D8D8"
          fillRule="nonzero"
        >
          <path
            d="M1064.27332,228.95 L1052,221.7 L1064.27168,239 L1076.555,221.7 L1064.27332,228.95 Z M1064.45996,199 L1052.18328,219.37168 L1064.45828,226.628359 L1076.73328,219.378359 L1064.45996,199.000039 L1064.45996,199 Z"
            id="Shape"
          />
        </g>
      </g>
    </svg>
  </Container>
);

EthereumIcon.defaultProps = {
  width: '2rem',
  height: '2rem',
};

export default EthereumIcon;

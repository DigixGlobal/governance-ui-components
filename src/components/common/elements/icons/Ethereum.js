import React from 'react';
import { Container } from './style';

const EthereumIcon = props => (
  <Container {...props}>
    <svg viewBox="0 0 41 41">
      <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <path
          className="color"
          d="M41,20.3 C41,31.5 31.8,40.6 20.5,40.6 C9.2,40.6 0,31.5 0,20.3 C0,9.1 9.2,0 20.5,0 C31.8,0 41,9.1 41,20.3 L41,20.3 Z M20.6,39.6 C9.8,39.6 1.1,31 1.1,20.3 C1.1,9.6 9.8,1 20.6,1 C31.4,1 40.1,9.6 40.1,20.3 C40.1,30.9 31.3,39.6 20.6,39.6 L20.6,39.6 Z M20.6,0.6 C9.6,0.6 0.7,9.4 0.7,20.3 C0.7,31.2 9.6,40 20.6,40 C31.6,40 40.5,31.2 40.5,20.3 C40.5,9.4 31.6,0.6 20.6,0.6 L20.6,0.6 Z M34.7,20.3 C34.7,28.1 28.3,34.4 20.5,34.4 C12.7,34.4 6.3,28.1 6.3,20.3 C6.3,12.5 12.7,6.2 20.5,6.2 C28.3,6.2 34.7,12.5 34.7,20.3 L34.7,20.3 Z M20.5,36.4 C11.5,36.4 4.2,29.2 4.2,20.3 C4.2,11.4 11.5,4.2 20.5,4.2 C29.5,4.2 36.8,11.4 36.8,20.3 C36.8,29.2 29.5,36.4 20.5,36.4 L20.5,36.4 Z M20.5,3.9 C11.3,3.9 3.9,11.3 3.9,20.3 C3.9,29.4 11.3,36.7 20.5,36.7 C29.7,36.7 37.1,29.3 37.1,20.3 C37.1,11.2 29.7,3.9 20.5,3.9 L20.5,3.9 Z M14.6,20.5 L20.5,24 L26.4,20.5 L20.5,10.8 L14.6,20.5 Z M20.5,25 L14.6,21.5 L20.5,29.7 L26.4,21.5 L20.5,25 Z"
        />
      </g>
    </svg>
  </Container>
);

EthereumIcon.defaultProps = {
  width: '2rem',
  height: '2rem',
};

export default EthereumIcon;

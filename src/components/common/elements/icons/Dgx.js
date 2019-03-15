import React from 'react';
import { Container } from './style';

const EthereumIcon = props => (
  <Container {...props}>
    <svg viewBox="0 0 41 42" xmlSpace="preserve">
      <polygon fill="none" points="16.2,24.9 20.5,29.2 24.7,24.9 20.5,20.6 " />
      <path
        fill="none"
        d="M20.5,8.3c-6.8,0-12.4,5.6-12.4,12.5s5.5,12.5,12.4,12.5c6.8,0,12.4-5.6,12.4-12.5S27.3,8.3,20.5,8.3z
	 M20.5,29.8l-4.9-4.9l4.9-4.9l4.9,4.9L20.5,29.8z M26.2,24.1l-5.7-5.8l-5.7,5.8l-3.3-3.3l8.9-9.1l8.9,9.1L26.2,24.1z"
      />
      <polygon
        className="color"
        points="11.5,20.8 14.8,24.1 20.5,18.3 26.2,24.1 29.4,20.8 20.5,11.7 "
      />
      <path
        className="color"
        d="M32,9.1c-1.5-1.5-3.2-2.7-5.2-3.5c-2-0.9-4.2-1.3-6.4-1.3c-2.2,0-4.3,0.4-6.4,1.3c-1.9,0.8-3.7,2-5.2,3.5
	c-1.5,1.5-2.7,3.3-3.5,5.3c-0.9,2-1.3,4.2-1.3,6.4s0.4,4.4,1.3,6.4c0.8,2,2,3.7,3.5,5.3c1.5,1.5,3.2,2.7,5.2,3.5
	c2,0.9,4.2,1.3,6.4,1.3c2.2,0,4.3-0.4,6.4-1.3c1.9-0.8,3.7-2,5.2-3.5c1.5-1.5,2.7-3.3,3.5-5.3c0.9-2,1.3-4.2,1.3-6.4
	s-0.4-4.4-1.3-6.4C34.7,12.4,33.5,10.6,32,9.1z M20.5,33.3c-6.8,0-12.4-5.6-12.4-12.5S13.7,8.3,20.5,8.3c6.8,0,12.4,5.6,12.4,12.5
	S27.3,33.3,20.5,33.3z"
      />
      <path
        className="color"
        d="M15.6,24.9l4.9,4.9l4.9-4.9L20.5,20L15.6,24.9z M20.5,29.2l-4.2-4.3l4.2-4.3l4.2,4.3L20.5,29.2z"
      />
      <path
        className="color"
        d="M20.5,0C9.2,0,0,9.3,0,20.8c0,11.5,9.2,20.8,20.5,20.8c11.3,0,20.5-9.3,20.5-20.8C41,9.3,31.8,0,20.5,0z
	 M34.1,34.6c-1.8,1.8-3.8,3.2-6.1,4.2c-2.4,1-4.9,1.5-7.5,1.5s-5.1-0.5-7.5-1.5c-2.3-1-4.4-2.4-6.1-4.2c-1.8-1.8-3.2-3.9-4.1-6.2
	c-1-2.4-1.5-5-1.5-7.6s0.5-5.2,1.5-7.6c1-2.3,2.4-4.4,4.1-6.2c1.8-1.8,3.8-3.2,6.1-4.2c2.4-1,4.9-1.5,7.5-1.5s5.1,0.5,7.5,1.5
	c2.3,1,4.4,2.4,6.1,4.2c1.8,1.8,3.2,3.9,4.1,6.2c1,2.4,1.5,5,1.5,7.6s-0.5,5.2-1.5,7.6C37.3,30.7,35.9,32.8,34.1,34.6z"
      />
      <path
        className="color"
        d="M37.5,13.5c-0.9-2.2-2.3-4.2-4-5.9s-3.7-3.1-5.9-4c-2.3-1-4.7-1.5-7.2-1.5s-4.9,0.5-7.2,1.5
	c-2.2,0.9-4.2,2.3-5.9,4s-3,3.7-4,5.9c-1,2.3-1.5,4.8-1.5,7.3s0.5,5,1.5,7.3c0.9,2.2,2.3,4.2,4,5.9c1.7,1.7,3.7,3.1,5.9,4
	c2.3,1,4.7,1.5,7.2,1.5s4.9-0.5,7.2-1.5c2.2-0.9,4.2-2.3,5.9-4c1.7-1.7,3-3.7,4-5.9c1-2.3,1.5-4.8,1.5-7.3S38.5,15.8,37.5,13.5z
	 M35.7,27.3c-0.8,2-2,3.8-3.5,5.3c-1.5,1.5-3.3,2.7-5.3,3.6c-2,0.9-4.2,1.3-6.4,1.3s-4.4-0.4-6.4-1.3c-2-0.8-3.7-2.1-5.3-3.6
	c-1.5-1.5-2.7-3.3-3.5-5.3c-0.9-2.1-1.3-4.3-1.3-6.5c0-2.3,0.4-4.5,1.3-6.5c0.8-2,2-3.8,3.5-5.3c1.5-1.5,3.3-2.7,5.3-3.6
	c2-0.9,4.2-1.3,6.4-1.3s4.4,0.4,6.4,1.3c2,0.8,3.7,2.1,5.3,3.6s2.7,3.3,3.5,5.3c0.9,2.1,1.3,4.3,1.3,6.5C37,23,36.6,25.2,35.7,27.3z
	"
      />
      <path
        className="color"
        d="M38,13.3C37,11,35.6,9,33.9,7.2s-3.8-3.1-6-4.1c-2.3-1-4.8-1.5-7.4-1.5s-5,0.5-7.4,1.5c-2.3,1-4.3,2.4-6,4.1
	S4,11,3,13.3c-1,2.4-1.5,4.9-1.5,7.5S2,25.9,3,28.3c1,2.3,2.3,4.3,4.1,6.1c1.7,1.8,3.8,3.1,6,4.1c2.3,1,4.8,1.5,7.4,1.5
	s5-0.5,7.4-1.5c2.3-1,4.3-2.4,6-4.1c1.7-1.8,3.1-3.8,4.1-6.1c1-2.4,1.5-4.9,1.5-7.5S38.9,15.7,38,13.3z M37.6,28.1
	c-0.9,2.2-2.3,4.3-4,6c-1.7,1.7-3.7,3.1-5.9,4c-2.3,1-4.7,1.5-7.2,1.5s-4.9-0.5-7.2-1.5c-2.2-0.9-4.2-2.3-5.9-4c-1.7-1.7-3-3.7-4-6
	c-1-2.3-1.5-4.8-1.5-7.3c0-2.5,0.5-5,1.5-7.3c0.9-2.2,2.3-4.3,4-6c1.7-1.7,3.7-3.1,5.9-4c2.3-1,4.7-1.5,7.2-1.5s4.9,0.5,7.2,1.5
	c2.2,0.9,4.2,2.3,5.9,4c1.7,1.7,3,3.7,4,6c1,2.3,1.5,4.8,1.5,7.3C39.1,23.3,38.6,25.8,37.6,28.1z"
      />
    </svg>
  </Container>
);

EthereumIcon.defaultProps = {
  width: '2rem',
  height: '2rem',
};

export default EthereumIcon;

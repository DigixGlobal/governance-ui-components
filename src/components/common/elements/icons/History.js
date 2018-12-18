import React from 'react';
import { Container } from './style';

const HistoryIcon = props => (
  <Container {...props}>
    <svg viewBox="0 0 26 26">
      <path
        d="M6.5,7.5h7.7v2H6.5L6.5,7.5z M6.5,12.5h12v2h-12V12.5z M6.5,17.5h7v2h-7V17.5z M18.5,14.5h-12v-2h12V14.5z
	 M13.5,19.5h-7v-2h7V19.5z M25,12.5h1v10.6c0,1.6-1.3,2.9-2.9,2.9l0,0H2.9C1.3,26,0,24.7,0,23.1V2.9C0,1.3,1.3,0,2.9,0h11.4v1H3
	C1.9,1,1,1.9,1,3v20c0,0.5,0.2,0.9,0.5,1.3v0.2h0.2C2.1,24.8,2.6,25,3,25h20c1.1,0,2-0.9,2-2V12.5z M1.5,24.3
	c0.1,0.1,0.1,0.1,0.2,0.2H1.5V24.3z M14.2,9.5H6.5v-2h7.7V9.5z"
      />
    </svg>
  </Container>
);

HistoryIcon.defaultProps = {
  // width: '1.75rem',
  // height: '1.75rem',
};

export default HistoryIcon;

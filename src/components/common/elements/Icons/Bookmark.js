import React from 'react';
import { Container } from './Style';

const BookmarkIcon = props => (
  <Container {...props}>
    <svg
      width="16px"
      height="24px"
      viewBox="0 0 16 24"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
    >
      <desc>Created with Sketch.</desc>
      <defs />
      <g id="Symbols" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <g
          id="header"
          transform="translate(-1315.000000, -29.000000)"
          fill="#B8C5D0"
          fillRule="nonzero"
        >
          <path
            d="M1327,39.975 L1327,53 L1321,47.731 L1315,53 L1315,29 L1321.816,29 C1321.263,29.576 1320.812,30.251 1320.5,31 L1317,31 L1317,48.582 L1321,45.07 L1325,48.582 L1325,39.819 C1325.805,40.009 1326.379,40.022 1327,39.975 Z M1331,33.5 C1331,35.985 1328.982,38 1326.5,38 C1324.016,38 1322,35.985 1322,33.5 C1322,31.015 1324.016,29 1326.5,29 C1328.982,29 1331,31.015 1331,33.5 Z M1329,33 L1327,33 L1327,31 L1326,31 L1326,33 L1324,33 L1324,34 L1326,34 L1326,36 L1327,36 L1327,34 L1329,34 L1329,33 Z"
            id="Shape"
          />
        </g>
      </g>
    </svg>
  </Container>
);

BookmarkIcon.defaultProps = {
  width: '5rem',
  height: '5rem',
};

export default BookmarkIcon;

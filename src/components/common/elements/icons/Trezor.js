import React from 'react';
import { Container } from './style';

const TrezorIcon = props => (
  <Container {...props}>
    <svg viewBox="0 0 25 36">
      <g id="Page-1" stroke="none" strokeWidth="1">
        <g id="02.-Wallet-Popup---&gt;" transform="translate(-1076.000000, -330.000000)">
          <g id="01.-Access-Wallet" transform="translate(973.000000, 31.000000)">
            <path
              d="M115.408638,299 C110.4701,299 106.473422,302.996678 106.473422,307.935216 L106.473422,311.284053 C104.739203,311.598007 103,312.016611 103,312.559801 L103,330.036545 C103,330.036545 103,330.519934 103.543189,330.749169 C105.511628,331.546512 113.255814,334.287375 115.034884,334.915282 C115.26412,335 115.328904,335 115.388704,335 C115.473422,335 115.513289,335 115.742525,334.915282 C117.521595,334.287375 125.285714,331.546512 127.254153,330.749169 C127.757475,330.539867 127.777409,330.056478 127.777409,330.056478 L127.777409,312.559801 C127.777409,312.016611 126.063123,311.578073 124.32392,311.284053 L124.32392,307.935216 C124.348837,302.996678 120.327243,299 115.408638,299 Z M115.408638,303.270764 C118.318937,303.270764 120.078073,305.0299 120.078073,307.940199 L120.078073,310.850498 C116.813953,310.621262 114.028239,310.621262 110.744186,310.850498 L110.744186,307.940199 C110.744186,305.024917 112.503322,303.270764 115.408638,303.270764 Z M115.388704,315.136213 C119.450166,315.136213 122.858804,315.450166 122.858804,316.013289 L122.858804,326.916944 C122.858804,327.086379 122.83887,327.106312 122.689369,327.166113 C122.54485,327.230897 115.762458,329.677741 115.762458,329.677741 C115.762458,329.677741 115.488372,329.762458 115.408638,329.762458 C115.32392,329.762458 115.054817,329.657807 115.054817,329.657807 C115.054817,329.657807 108.272425,327.210963 108.127907,327.146179 C107.983389,327.081395 107.958472,327.061462 107.958472,326.89701 L107.958472,315.993355 C107.918605,315.430233 111.327243,315.136213 115.388704,315.136213 Z"
              id="path7"
            />
          </g>
        </g>
      </g>
    </svg>
  </Container>
);

TrezorIcon.defaultProps = {
  width: '4.6rem',
  height: '4.6rem',
};

export default TrezorIcon;

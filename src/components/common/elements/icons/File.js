import React from 'react';
import { Container } from './style';

const FileIcon = props => (
  <Container {...props}>
    <svg viewBox="0 0 27 34">
      <path
        d="M21.1,15.4c0.8,0.1,1.4,0.7,1.4,1.5v-0.1C22.5,16,21.9,15.4,21.1,15.4z M21.8,7h0.1c-1.2,0-2.1-0.9-2.1-2.1V1.4
	h-0.1v3.5C19.7,6.1,20.6,7,21.8,7z M5,5h7v1H5V5z M24.6,32.3h0.1c0.4,0,0.7-0.3,0.7-0.7h-0.1C25.3,32,25,32.3,24.6,32.3z M8,8h1v1H8
	V8z M21.2,4.9h-0.1c0,0.4,0.3,0.7,0.7,0.7h0.1C21.5,5.6,21.2,5.3,21.2,4.9z M23.2,5.6h0.1V7h-0.1V5.6z M26.5,5.8l-5.6-5.6
	C20.8,0.1,20.6,0,20.4,0H2.2C1,0,0.1,0.9,0.1,2.1v29.5c0,1.2,0.9,2.1,2.1,2.1h22.5c1.2,0,2.1-0.9,2.1-2.1V6.3
	C26.8,6.1,26.7,6,26.5,5.8z M25.4,31.6c0,0.4-0.3,0.7-0.7,0.7h-0.1H2.2c-0.4,0-0.7-0.3-0.7-0.7V2.1c0-0.4,0.3-0.7,0.7-0.7h17.5h0.1
	v3.5c0,1.2,0.9,2.1,2.1,2.1h1.3V5.6h-1.3h-0.1c-0.4,0-0.7-0.3-0.7-0.7h0.1V2.4l4.2,4.2C25.4,6.6,25.4,31.6,25.4,31.6z M5,8h1v1H5V8z
	 M14.1,27.1v-7.4h-1.4v7.4l-1.6-1.6l-1,1l2.8,2.8c0.1,0.1,0.3,0.2,0.5,0.2s0.4-0.1,0.5-0.2l2.8-2.8l-1-1L14.1,27.1z M21.1,15.4h-8.4
	v-0.7h7.7V14c0-0.4-0.3-0.7-0.7-0.7h-7c0-0.8-0.6-1.4-1.4-1.4H5.7c-0.8,0-1.4,0.6-1.4,1.4v14.9c0,0.8,0.6,1.4,1.4,1.4h3.5v-1.4H5.7
	V13.4h5.6v2.1H9.2v1.4H12h9.1v11.2h-3.5v1.4h3.5c0.8,0,1.4-0.6,1.4-1.4V16.9C22.5,16.1,21.9,15.5,21.1,15.4z"
      />
    </svg>
  </Container>
);

FileIcon.defaultProps = {
  width: '2rem',
  height: '2rem',
};

export default FileIcon;
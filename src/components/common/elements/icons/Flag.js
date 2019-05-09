import React from 'react';
import { Container } from './style';

const FileIcon = props => (
  <Container {...props}>
    <svg viewBox="0 0 20 20">
      <path
        transform="scale(0.01953125 0.01953125)"
        d="M392.6,614.4H102.4V1024H0V0h614.4l17.1,102.4H1024L870.4,409.6
	L1024,716.8H409.6L392.6,614.4z"
      />
    </svg>
  </Container>
);

FileIcon.defaultProps = {
  width: '1rem',
  height: '1rem',
};

export default FileIcon;

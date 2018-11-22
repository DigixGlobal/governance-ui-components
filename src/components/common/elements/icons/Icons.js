import React from 'react';
import { Container } from './style';

const Icons = props => (
  <Container {...props} style={{ display: 'none' }}>
    <svg xmlns="http://www.w3.org/2000/svg">
      <symbol viewBox="0 0 24 24" id="arrow_up">
        <path d="M23.245 20l-11.245-14.374-11.219 14.374-.781-.619 12-15.381 12 15.391-.755.609z" />
      </symbol>
      <symbol viewBox="0 0 24 24" id="arrow_down">
        <path d="M23.245 4l-11.245 14.374-11.219-14.374-.781.619 12 15.381 12-15.391-.755-.609z" />
      </symbol>
    </svg>
  </Container>
);

Icons.defaultProps = {};

export default Icons;

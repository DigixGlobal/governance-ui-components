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
      <symbol viewBox="0 0 24 24" id="check_mark">
        <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-1.25 16.518l-4.5-4.319 1.396-1.435 3.078 2.937 6.105-6.218 1.421 1.409-7.5 7.626z" />
      </symbol>
      <symbol viewBox="0 0 24 24" id="x_mark">
        <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm4.597 17.954l-4.591-4.55-4.555 4.596-1.405-1.405 4.547-4.592-4.593-4.552 1.405-1.405 4.588 4.543 4.545-4.589 1.416 1.403-4.546 4.587 4.592 4.548-1.403 1.416z" />
      </symbol>
    </svg>
  </Container>
);

Icons.defaultProps = {};

export default Icons;

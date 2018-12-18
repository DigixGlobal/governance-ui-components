import React from 'react';
import PropTypes from 'prop-types';
import { Container } from './style';

const HomeIcon = props => (
  <Container {...props}>
    <svg viewBox="0 0 24 23">
      <g id="Symbols" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <g
          id="sidepanel"
          transform="translate(-25.000000, -290.000000)"
          fillRule="nonzero"
          stroke={
            props.selected
              ? props.theme.textSecondary.default.toString()
              : props.theme.textPrimary.default.toString()
          }
        >
          <g id="Home-Icon" transform="translate(25.000000, 291.000000)">
            <polygon
              id="Shape"
              points="9.6 20.5714286 14.4 20.5714286 14.4 13.3109244 14.4 20.5714286 20.4 20.5714286 20.4 10.8907563 24 10.8907563 12 0 0 10.8907563 3.6 10.8907563 3.6 20.5714286"
            />
          </g>
        </g>
      </g>
    </svg>
  </Container>
);

const { string, object } = PropTypes;
HomeIcon.propTypes = {
  theme: object.isRequired,
  // width: string,
  // height: string,
};
HomeIcon.defaultProps = {
  // width: '2.5rem',
  // height: '2.5rem',
};

export default HomeIcon;

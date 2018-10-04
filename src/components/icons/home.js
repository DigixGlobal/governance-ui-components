import React from 'react';
import PropTypes from 'prop-types';
import { Container } from './style';

const HomeIcon = props => (
  <Container {...props}>
    <svg version="1.1" xmlns="http://www.w3.org/2000/svg">
      <desc>Created with Sketch.</desc>
      <defs />
      <g id="Symbols" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <g
          id="sidepanel"
          transform="translate(-25.000000, -290.000000)"
          fillRule="nonzero"
          stroke={props.theme.textColor.default.toString()}
        >
          <g id="Sidemenu">
            <g id="Home-Icon" transform="translate(25.000000, 291.000000)">
              <polygon
                id="Shape"
                points="9.6 20.5714286 14.4 20.5714286 14.4 13.3109244 14.4 20.5714286 20.4 20.5714286 20.4 10.8907563 24 10.8907563 12 0 0 10.8907563 3.6 10.8907563 3.6 20.5714286"
              />
            </g>
          </g>
        </g>
      </g>
    </svg>
  </Container>
);

HomeIcon.propTypes = {
  theme: PropTypes.object.isRequired,
  width: PropTypes.string,
  height: PropTypes.string,
};

HomeIcon.defaultProps = {
  width: '2.7rem',
  height: '2.7rem',
};

export default HomeIcon;

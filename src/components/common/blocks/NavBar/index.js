import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Menu from './Menu';
import Brand from './Brand';

const Wrapper = styled.section`
  background: ${props => props.theme.headerBackgroundColor.toString()};
  color: ${props => props.theme.textColor.toString()};
  border: 1px solid;
  border-color: ${props => props.theme.textColor.toString()}
  padding: 2em;
`;

class NavBar extends React.Component {
  render() {
    return (
      <Wrapper>
        <Menu />
        <Brand href="/">Digix</Brand>
      </Wrapper>
    );
  }
}

export default NavBar;

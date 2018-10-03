import React from 'react';
// import Router, { Link } from 'react-router-dom';
import styled from 'styled-components';
import SearchIcon from '../../elements/Icons/Magnifier';

const StyledLink = styled.a`
  display: flex;
  align-items: center;
  color: ${props => props.theme.headerBackgroundColor};
  text-decoration: none;
  padding: 0 2em;
  text-transform: uppercase;
  line-height: 30px;

  svg {
    height: 30px;
    width: 30px;
    border: 1px solid #ccc;
  }
`;

const MenuWrapper = styled.div`
  display: inline-flex;
`;

function Menu() {
  return (
    <MenuWrapper>
      <StyledLink href="./">
        <SearchIcon /> Search
      </StyledLink>
    </MenuWrapper>
  );
}

export default Menu;

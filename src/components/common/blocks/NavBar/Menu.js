import React from 'react';
// import Router, { Link } from 'react-router-dom';
import styled from 'styled-components';
import Icon from '../../elements/Icons';

const StyledLink = styled.a`
  display: inline-flex;
  align-self: center;
  text-decoration: none;
  padding: 0 1.5em;
  text-transform: uppercase;
  height: 50px;

  svg {
    display: inline-block;
    vertical-align: middle;
    height: 50px;
    width: 50px;
  }
`;

const MenuWrapper = styled.div`
  display: inline-flex;
`;

function Menu() {
  return (
    <MenuWrapper>
      <StyledLink href="./">
        <Icon kind="menu" />
      </StyledLink>
    </MenuWrapper>
  );
}

export default Menu;

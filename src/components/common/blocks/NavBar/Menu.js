import React from 'react';
// import Router, { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledLink = styled.a`
  display: inline-flex;
  border-left: 1px solid #ccc;
  color: ${props => props.theme.headerBackgroundColor};
  text-decoration: none;
  padding: 0 2em;
  text-transform: uppercase;
`;

const MenuWrapper = styled.div`
  display: inline-flex;
  border: 1px solid #ccc;
`;

function Menu() {
  return (
    <MenuWrapper>
      <StyledLink href="./">Create Proposal</StyledLink>
      <StyledLink href="./">Wallet</StyledLink>
    </MenuWrapper>
  );
}

export default Menu;

import React from 'react';
import styled from 'styled-components';
import Icon from '../../elements/Icons';

const StyledLink = styled.a`
  display: flex;
  align-items: center;
  color: ${props => props.theme.defaultTextColor.toString()};
  text-decoration: none;
  padding: 0 2em;
  text-transform: uppercase;

  svg {
    display: inline-block;
    vertical-align: middle;
  }
`;

const MenuWrapper = styled.div`
  display: inline-flex;
`;

function Search() {
  return (
    <MenuWrapper>
      <StyledLink href="./">
        <Icon kind="magnifier" />
        <span>Search</span>
      </StyledLink>
    </MenuWrapper>
  );
}

export default Search;

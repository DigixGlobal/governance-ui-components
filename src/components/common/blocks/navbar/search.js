import React from 'react';
import styled from 'styled-components';
import Icon from '../../elements/icons';

const MenuWrapper = styled.div`
  display: inline-flex;
  justify-content: flex-start;
`;

const StyledLink = styled.a`
  display: flex;
  align-items: center;
  color: ${props => props.theme.linkDefaultColor.default.toString()};
  text-decoration: none;
  font-family: 'Futura Pt Medium';
`;

function Search() {
  return (
    <MenuWrapper>
      <StyledLink href="./" style={{ pointerEvents: 'none' }}>
        <Icon kind="magnifier" />
        <span>Search</span>
      </StyledLink>
    </MenuWrapper>
  );
}

export default Search;

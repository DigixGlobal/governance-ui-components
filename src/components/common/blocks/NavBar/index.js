import React from 'react';
// import PropTypes from 'prop-types';
import styled from 'styled-components';
import Menu from './menu';
import Search from './search';
import Wallet from './wallet';
import Utility from './utility';
import Brand from '../../elements/icons/brand';

const HeaderWrapper = styled.section`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 68px;
  background-color: ${props => props.theme.headerBackgroundColor.toString()};
  color: ${props => props.theme.defaultTextColor.toString()};
  border-bottom: 1px solid ${props => props.theme.headerBorderColor.toString()};
  padding: 0;

  & > div {
    border-left: 1px solid ${props => props.theme.headerBorderColor.toString()};
    flex: 1 0 0;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    padding: 0 2em;

    &:nth-child(1) {
      flex: 0.5 0 0;
    }
    &:nth-child(2) {
      justify-content: flex-start;
      flex: 4 0 0;
    }
    &:nth-child(3) {
      flex: 3 0 0;
    }
  }
`;

class NavBar extends React.Component {
  render() {
    return (
      <HeaderWrapper>
        <Menu />
        <Search />
        <Wallet />
        <Utility />
        <Brand />
      </HeaderWrapper>
    );
  }
}

export default NavBar;

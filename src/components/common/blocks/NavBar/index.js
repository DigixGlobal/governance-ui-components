import React from 'react';
// import PropTypes from 'prop-types';
import styled from 'styled-components';
import Menu from './menu';
import Search from './search';
import Wallet from './wallet';
import Utility from './utility';
import Brand from '../../elements/Icons/Brand';

const Wrapper = styled.section`
  display: flex;
  flex-direction: row;
  //justify-content: flex-end;
  background-color: ${props => props.theme.headerBackgroundColor.toString()};
  color: ${props => props.theme.defaultTextColor.toString()};
  border-bottom: 1px solid ${props => props.theme.headerBorderColor.toString()};
  padding: 0;

  & > div {
    border-left: 1px solid ${props => props.theme.headerBorderColor.toString()};
    padding-left: 0.8em;
    padding-right: 0.8em;
    &:nth-child(1) {
      width: 6%;
    }
    &:nth-child(2) {
      width: 50%;
    }
    &:nth-child(3) {
      width: 19%;
    }
    &:nth-child(4) {
      width: 10%;
    }
    &:nth-child(5) {
      width: 15%;
    }
  }
`;

class NavBar extends React.Component {
  render() {
    return (
      <Wrapper>
        <Menu />
        <Search />
        <Wallet />
        <Utility />
        <Brand href="/">Digix</Brand>
      </Wrapper>
    );
  }
}

export default NavBar;

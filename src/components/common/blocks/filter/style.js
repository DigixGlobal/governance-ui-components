import styled, { css } from 'styled-components';

export const FilterWrapper = styled.div`
  margin-bottom: 3em;
  border-bottom: 1px solid ${props => props.theme.cardBorderColor.lightest.toString()};
`;
export const Heading = styled.h1``;
export const Filter = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 3em;

  div:first-child {
    flex: 6 0 0;
  }
  div:last-child {
    flex: 0.5 0 0;
    margin-bottom: 0.5em;
  }
`;
export const Category = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
`;
export const CategoryItem = styled.a`
  margin-right: 2em;
  text-transform: uppercase;

  span {
    display: inline-block;
    border-radius: 3px;
    color: #fff;
    margin-left: 0.3em;

    min-width: 1.5em;
    text-align: center;

    background-color: ${props => props.theme.filterCount.default.toString()};
    border: 1px solid ${props => props.theme.filterCount.default.toString()};
  }

  ${props =>
    props.active &&
    css`
      font-family: 'Futura PT Medium';
      color: ${props.theme.secondary.default.toString()};
      border-bottom: 5px solid ${props.theme.filterActive.toString()};
      span {
        font-family: 'Futura PT Book';
        background-color: ${props.theme.filterActive.toString()};
        border: 1px solid ${props.theme.filterActive.toString()};
      }
    `};
`;
export const Pulldown = styled.div``;

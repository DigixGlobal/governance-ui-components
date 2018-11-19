import styled, { css } from 'styled-components';

export const FilterWrapper = styled.div`
  margin-bottom: 3em;
  border-bottom: 1px solid ${props => props.theme.cardBorderColor.lightest.toString()};
`;
export const Heading = styled.div`
  display: flex;
  flex-direction: row;
  div:first-child {
    flex: 0.7;
  }
  div:last-child {
    flex: 5 0 0;
  }
`;
export const Filter = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 1.5em;

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
  display: flex;
  align-items: center;
  font-family: 'Futura PT Book';
  margin-right: 2em;
  text-transform: uppercase;

  span {
    font-size: 1.1rem;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 3px;
    color: #fff;
    margin-left: 0.8em;

    width: 22px;
    height: 20px;

    background-color: ${props => props.theme.filterCount.default.toString()};
    border: 1px solid ${props => props.theme.filterCount.default.toString()};
  }

  ${props =>
    props.active &&
    css`
      color: ${props.theme.textSecondary.default.toString()};
      border-bottom: 5px solid ${props.theme.filterActive.toString()};
      span {
        background-color: ${props.theme.filterActive.toString()};
        border: 1px solid ${props.theme.filterActive.toString()};
      }
    `};
`;
export const Pulldown = styled.div``;

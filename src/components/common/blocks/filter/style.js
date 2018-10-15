import styled from 'styled-components';

export const FilterWrapper = styled.div`
  margin-bottom: 3em;
  border-bottom: 1px solid ${props => props.theme.headerBorderColor.toString()};
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
    margin-bottom: 1em;
  }
`;
export const Category = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
`;
export const CategoryItems = styled.a`
  margin-right: 3em;
  cursor: pointer;

  padding-bottom: 1em;
  text-transform: uppercase;

  span {
    display: inline-block;
    border: 1px solid #ccc;
    background-color: #ccc;
    border-radius: 3px;
    color: #fff;
    margin-left: 0.5em;
    padding: 1px 3px;
    min-width: 1.8em;
    text-align: center;

    background-color: ${props => props.theme.filterCount.toString()};
    border: 1px solid ${props => props.theme.filterCount.toString()};
  }

  &:nth-child(1) {
    border-bottom: 5px solid ${props => props.theme.filterActive.toString()};

    span {
      background-color: ${props => props.theme.filterActive.toString()};
      border: 1px solid ${props => props.theme.filterActive.toString()};
    }
  }
`;
export const Pulldown = styled.div``;

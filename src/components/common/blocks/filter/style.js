import styled from 'styled-components';

export const FilterWrapper = styled.div`
  margin-bottom: 3em;
  border-bottom: 1px solid #ccc;
`;
export const Heading = styled.h1``;
export const Filter = styled.div`
  display: flex;
  flex-direction: row;

  & > div {
    flex: 1;
`;
export const Category = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  margin-top: 3em;
`;
export const CategoryItems = styled.a`
  margin-right: 3em;
  cursor: pointer;

  padding-bottom: 1.5em;
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
  }

  &:nth-child(4) {
    border-bottom: 5px solid #c00;

    span {
      background-color: #c00;
      border: 1px solid #c00;
    }
  }
`;
export const Pulldown = styled.div``;

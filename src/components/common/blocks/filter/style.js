import styled, { css } from 'styled-components';
import { Button } from '@digix/gov-ui/components/common/elements/index';

export const FilterWrapper = styled.div`
  margin-bottom: 2.5em;
  border-bottom: 1px solid ${props => props.theme.cardBorderColor.lighter.toString()};
`;
export const Heading = styled.div`
  display: flex;
  flex-direction: row;
  flex-direction: flex-start;
  h1 {
    margin-right: 2rem;
  }
`;
export const Filter = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1.5em;

  div:first-child {
    flex: 0 0 auto;
  }
  div:last-child {
    flex: 0 0 150px;
  }
`;
export const Category = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
`;
export const CategoryItem = styled.a`
  display: inline-flex;
  align-items: center;
  font-family: 'Futura PT Book', sans-serif;
  letter-spacing: 0.075rem;
  margin-right: 1.5em;
  text-transform: uppercase;

  span {
    font-size: 1.1rem;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    color: ${props => props.theme.tabMenu.inactive.base.toString()};
    margin-left: 0.75em;

    width: 20px;
    height: 20px;

    background: ${props => props.theme.background.white.toString()};
    border: 1px solid ${props => props.theme.borderColor.lighter.toString()};
    border-radius: ${props => props.theme.borderRadius};
  }

  ${props =>
    props.active &&
    css`
      color: ${props.theme.textColor.secondary.base.toString()};
      border-bottom: 4px solid ${props.theme.filterActive.toString()};
      span {
        color: ${props.theme.textColor.white.toString()};
        background: ${props.theme.tabMenu.active.base.toString()};
        border: 1px solid ${props.theme.tabMenu.active.base.toString()};
      }
    `};
`;
export const Pulldown = styled.div``;

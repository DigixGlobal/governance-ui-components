import styled, { css } from 'styled-components';
import { media } from '@digix/gov-ui/components/common/breakpoints';

export const FilterWrapper = styled.div`
  margin-bottom: 1em;
  margin-top: 5rem;
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
  margin-top: 1.5em;

  ${media.tablet`
    flex-direction: column;
  `}

  & > div {
    &:first-child {
      flex: 1;
      display: flex;
      justify-content: flex-start;

      ${media.tablet`
        margin-bottom: 1.5rem;
      `}
    }

    &:last-child {
      flex: 0 0 auto;
    }
  }
`;

export const SortBy = styled.div`
  display: flex;
  align-items: center;

  ${media.tablet`
      justify-content: space-between;
  `}
`;

export const Actionable = styled.div`
  display: flex;
  align-items: center;

  margin-right: 3rem;
  color: ${props => props.theme.textColor.default.base.toString()};
  font-size: 1.2rem;
  letter-spacing: 0.05rem;
  text-transform: uppercase;

  input {
    margin-right: 0.75rem;

    position: absolute;
    opacity: 0;

    & + label {
      position: relative;
      cursor: pointer;
      padding: 0;
      display: flex;
      align-items: center;
    }

    & + label:before {
      content: '';
      margin-right: 10px;
      width: 20px;
      height: 20px;
      background: ${props => props.theme.background.white.toString()};
      box-shadow: 0 0 0 3px ${props => props.theme.background.default.lighter.toString()};
    }

    &:hover + label:before {
      transition: ${props => props.theme.transition};
      background: ${props => props.theme.background.default.light.toString()};
    }

    &:focus + label:before {
      transition: ${props => props.theme.transition};
      box-shadow: 0 0 0 3px ${props => props.theme.background.default.lighter.toString()};
    }

    &:checked + label:before {
      transition: ${props => props.theme.transition};
      background: ${props => props.theme.background.default.light.toString()};
      box-shadow: 0 0 0 3px ${props => props.theme.background.default.light.toString()};
    }

    &:checked + label:after {
      content: '';
      position: absolute;
      left: 5px;
      top: 9px;
      background: ${props => props.theme.background.default.light.toString()};
      width: 2px;
      height: 2px;
      box-shadow: 2px 0 0 ${props => props.theme.background.white.toString()},
        4px 0 0 ${props => props.theme.background.white.toString()},
        4px -2px 0 ${props => props.theme.background.white.toString()},
        4px -4px 0 ${props => props.theme.background.white.toString()},
        4px -6px 0 ${props => props.theme.background.white.toString()},
        4px -8px 0 ${props => props.theme.background.white.toString()};
      transition: ${props => props.theme.transition};
      transform: rotate(45deg);
    }
  }
`;

export const Category = styled.div`
  display: flex;
  justify-content: space-between;

  ${media.tablet`
    flex-flow: row wrap;
  `}
`;
export const CategoryItem = styled.a`
  display: inline-flex;
  justify-content: center;
  align-items: center;

  background: ${props => props.theme.filter.default.background.toString()};
  border: 1px solid ${props => props.theme.filter.default.border.toString()};

  color: ${props => props.theme.filter.default.textColor.toString()};
  padding: 1.25rem 2rem;
  font-family: 'Futura PT Book', sans-serif;
  font-size: 1.2rem;
  letter-spacing: 0.05rem;
  margin-right: 0.5rem;
  text-transform: uppercase;
  transition: ${props => props.theme.transition};

  &:hover {
    background: ${props => props.theme.filter.default.backgroundHover.toString()};
  }

  ${media.tablet`
    padding: 1rem 0.25rem;
    margin-bottom: 0.75rem;
    flex: 1;
  `}

  span {
    font-family: 'Futura PT Medium', sans-serif;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    margin-left: 0.5em;

    ${media.tablet`
      display: none;
    `}
  }

  ${props =>
    props.active &&
    css`
      background: ${props.theme.filter.active.background.toString()};
      border: 1px solid ${props.theme.filter.active.border.toString()};
      color: ${props.theme.filter.active.textColor.toString()};

      &:hover {
        background: ${props.theme.filter.active.background.toString()};
      }
    `};
`;
export const Pulldown = styled.div`
  display: flex;
  align-items: center;

  span {
    font-family: 'Futura PT Heavy', sans-serif;
    font-size: 1.2rem;
  }
  select {
    margin: 0;
  }
`;

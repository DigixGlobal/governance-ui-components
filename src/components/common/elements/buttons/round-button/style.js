import styled, { css } from 'styled-components';

export const Button = styled.button`
  transition: all 0.3s ease;
  background: ${props =>
    props.primary ? props.theme.primary.default : props.theme.secondary.default.toString()};
  border: 2px solid ${props => props.theme.primary.default.toString()};
  border-radius: 3px;
  color: ${props =>
    props.primary
      ? props.theme.textColorInverted.default.toString()
      : props.theme.defaultTextColor.toString()};
  cursor: pointer;
  display: inline-block;
  font-weight: 500;
  padding: 1rem 2rem;
  text-align: center;
  text-decoration: none;
  text-transform: uppercase;
  font-family: 'Futura PT Light', 'Roboto', 'Arial', 'sans-serif';
  outline: none;
  margin: 1rem 0;

  &:hover {
    background: transparent;
    color: ${props => props.theme.defaultTextColor.toString()};
  }
  ${props =>
    props.fluid &&
    css`
      width: 100%;
    `};

  ${props =>
    props.ghost &&
    css`
      color: ${props.theme.secondary.default.toString()};
      background: transparent;
      border: none;
      &:hover {
        color: ${props.theme.primary.lighter.toString()};
      }
    `};
`;

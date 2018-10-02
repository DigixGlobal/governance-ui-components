import styled, { css } from 'styled-components';

export const Button = styled.button`
  transition: all 0.3s ease;
  background: ${props =>
    props.primary
      ? props.theme.primary.default.toString()
      : props.theme.secondary.default.toString()};
  border: 1px solid ${props => props.theme.primary.default.toString()};
  border-radius: 3px;
  color: ${props =>
    props.primary
      ? props.theme.textColorInverted.default.toString()
      : props.theme.textColor.default.toString()};
  cursor: pointer;
  display: inline-block;
  font-weight: 500;
  padding: 1rem 2rem;
  text-align: center;
  text-decoration: none;
  text-transform: uppercase;
  font-family: 'Futura PT Light', 'Roboto', 'Arial', 'sans-serif';

  &:hover {
    background: transparent;
    color: ${props => props.theme.textColor.default.toString()};
  }

  ${props =>
    props.text &&
    css`
      color: ${props.theme.secondary.default.toString()};
      background: transparent;
      border: none;
      &:hover {
        color: ${props.theme.primary.lighter.toString()};
      }
    `};
  ${props =>
    props.lg &&
    css`
      padding: 1.5rem;
      font-size: 1.2rem;
      color: #fff;
    `};
`;

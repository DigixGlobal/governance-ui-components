import styled, { css } from 'styled-components';

export const Button = styled.button`
  transition: all 0.3s ease;
  background: ${props =>
    props.primary ? props.theme.primary.default : props.theme.secondary.default};
  border: 1px solid ${props => props.theme.primary.default};
  border-radius: 3px;
  color: ${props =>
    props.primary ? props.theme.textColorInverted : props.theme.textColor.default};
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
    color: ${props => props.theme.textColor.default};
  }

  ${props =>
    props.text &&
    css`
      color: ${props.theme.secondary.default};
      background: transparent;
      border: none;
      &:hover {
        color: ${props.theme.primary.lighter};
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

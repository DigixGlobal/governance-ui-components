import styled, { css } from 'styled-components';

export const Button = styled.button`
  transition: all 0.3s ease;
  background: ${props =>
    props.primary
      ? props.theme.backgroundPrimary.default
      : props.theme.backgroundSecondary.default.toString()};
  border: 2px solid ${props => props.theme.buttonBorderPrimary.default.toString()};
  border-radius: 4px;
  color: ${props =>
    props.primary
      ? props.theme.textContrast.default.toString()
      : props.theme.textDefault.toString()};
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
    color: ${props => props.theme.textDefault.toString()};
  }
  ${props =>
    props.fluid &&
    css`
      width: 100%;
    `};

  ${props =>
    props.ghost &&
    css`
      color: ${props.theme.textSecondary.default.toString()};
      background: transparent;
      border: none;
      &:hover {
        color: ${props.theme.textPrimary.lighter.toString()};
      }
    `};
`;

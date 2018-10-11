import styled, { css } from 'styled-components';
/* eslint-disable */
export const Button = styled.button`
  transition: all 0.3s ease;

  background: ${props =>
    props.primary
      ? props.nobg
        ? '#fff'
        : props.theme.primary.default.toString()
      : props.theme.textColorInverted.default.toString()};
  border: 1px solid
    ${props =>
      props.primary
        ? props.theme.primary.default.toString()
        : props.theme.backgroundColor.darker.toString()};
  border-radius: 3px;
  color: ${props =>
    props.primary
      ? props.nobg
        ? props.theme.primary.default.toString()
        : props.theme.textColorInverted.default.toString()
      : props.disabled ? props.theme.backgroundColor.default.toString() : props.theme.textColor.default.toString()};


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
    color: ${props => props.disabled ? props.theme.backgroundColor.default.toString() : props.theme.textColor.default.toString()};
  }
  ${props =>
    props.fullWidth &&
    css`
      width: 100%;
    `};

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

  /* eslint-enable */
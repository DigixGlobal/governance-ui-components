import styled, { css } from 'styled-components';

export const Button = styled.button`
  background: ${props =>
    props.secondary
      ? props.theme.secondary.default.toString()
      : props.theme.primary.default.toString()};
  color: ${props => props.theme.textColor.default.toString()};
  cursor: pointer;
  border: 1px solid ${props => props.theme.textColor.default.toString()};

  width: ${props => (props.fullWidth ? '100%' : '')};
  // height: ${props => (props.fullWidth ? '5rem' : '3.6rem')};
  border-radius: ${props => (props.fullWidth ? '3rem' : '.5rem')};
  text-transform: ${props => (props.secondary ? 'none' : 'uppercase')};
  padding: 0.5rem 1.5rem;
  font-size: 110%;
  outline: none;
  font-family: 'Futura PT Light', 'Roboto', 'Arial', 'sans-serif';

  ${props =>
    props.lg &&
    css`
      padding: 1.5rem;
      font-size: 1.2rem;
      color: #fff;
    `};

  ${props =>
    props.sm &&
    css`
      font-size: 0.8rem;
    `};
`;

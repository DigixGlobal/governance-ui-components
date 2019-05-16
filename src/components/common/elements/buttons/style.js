import styled, { css } from 'styled-components';

export const ButtonGlobalStyles = css`
  display: inline-flex;
  justify-content: center;
  align-items: center;

  background: ${props => props.theme.buttonDefault.background.base.toString()};
  cursor: pointer;
  font-family: 'Futura PT Medium', sans-serif;
  font-size: 1.4rem;
  margin: 1rem;
  outline: none;
  padding: 1rem 1.75rem;
  text-align: center;
  text-decoration: none;
  text-transform: uppercase;
  transition: ${props => props.theme.transition};
  width: ${props => (props.width ? '' : 'auto')};

  ${props =>
    props.fluid &&
    css`
      width: 100%;
      margin: 1rem 0;
    `};
`;

export const Button = styled.button`
  ${ButtonGlobalStyles};

  ${props =>
    props.xsmall &&
    css`
      border-width: 1px;
      padding: 0.75rem 1rem;
      font-size: 1.2rem;
      margin-right: 0.5rem;

      & > div {
        margin-right: 0.5rem;
      }

      svg {
        width: 80%;
      }
    `};

  ${props =>
    props.small &&
    css`
      border-width: 2px;
      padding: 1rem 1.5rem;
      font-size: 1.2rem;
      margin-right: 0.5rem;
    `};

  ${props =>
    props.medium &&
    css`
      border-width: 2px;
      font-size: 1.4rem;
      padding: 1rem 1.75rem;
    `};

  ${props =>
    props.large &&
    css`
      border-width: 2px;
      padding: 1.25rem 2rem;
      font-size: 1.6rem;

      & > div {
        margin-right: 1rem;
      }
    `};

  ${props =>
    props.showIcon &&
    css`
      justify-content: space-between;
    `};

  ${props =>
    props.disabled &&
    css`
      background: ${props.theme.buttonDisabled.background.toString()};
      border: 2px solid ${props.theme.buttonDisabled.border.lighter.toString()};
      box-shadow: none;
      color: ${props.theme.buttonDisabled.textColor.light.toString()};
      cursor: default;

      &:hover {
        background: ${props.theme.buttonDisabled.background.toString()};
        border: 2px solid ${props.theme.buttonDisabled.border.lighter.toString()};
        color: ${props.theme.buttonDisabled.textColor.light.toString()};
      }
    `};
`;

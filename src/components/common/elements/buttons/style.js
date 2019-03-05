import styled, { css } from 'styled-components';

export const ButtonGlobalStyles = css`
  display: inline-flex;
  justify-content: center;
  align-items: center;

  background: ${props => props.theme.buttonDefault.background.base.toString()};
  cursor: pointer;
  font-family: 'Futura PT Medium';
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
      padding: 1rem 1.5rem;
      font-size: 1.2rem;
      margin-right: 0.5rem;
    `};

  ${props =>
    props.medium &&
    css`
      font-size: 1.4rem;
      padding: 1rem 1.75rem;
    `};

  ${props =>
    props.large &&
    css`
      padding: 1.5rem 3rem;
      font-size: 1.6rem;
    `};

  ${props =>
    props.xlarge &&
    css`
      // padding: 6rem;
      // font-size: 3.6rem;
      // font-family: 'Futura PT Heavy';
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

// Refactoring WIP: For Deletion in Sprint 5; used by Capsule
export const ButtonStyles = css`
  background: ${props =>
    props.primary
      ? props.theme.buttonBgPrimary.default.toString()
      : props.theme.buttonBgSecondary.default.toString()};

  border: 2px solid
    ${props =>
      props.primary
        ? props.theme.buttonBorderPrimary.default.toString()
        : props.theme.buttonBorderSecondary.default.toString()};

  color: #c00;

  text-align: center;

  &:hover {
    background: ${props =>
      props.primary
        ? props.theme.buttonBgSecondary.default.toString()
        : props.theme.buttonBgPrimary.default.toString()};

    color: ${props =>
      props.primary
        ? props.theme.buttonTextPrimaryReverse.default.toString()
        : props.theme.buttonTextSecondaryReverse.toString()};
  }
`;

// used by Capusule and Labeled Icon
export const GhostBtn = css`
  background-color: transparent;

  color: ${props =>
    props.primary
      ? props.theme.buttonTextPrimary.default.toString()
      : props.theme.buttonTextSecondary.default.toString()};

  &:hover {
    background: ${props =>
      props.primary
        ? props.theme.buttonBgSecondary.default.toString()
        : props.theme.buttonBgPrimary.default.toString()};

    color: ${props =>
      props.primary
        ? props.theme.buttonTextPrimaryReverse.default.toString()
        : props.theme.buttonTextSecondaryReverse.toString()};
  }
`;

export const DisabledBtn = css`
  background-color: transparent;
  border-color: ${props => props.theme.buttonBorderDisabled.toString()};
  color: ${props => props.theme.textDefault.lighter.toString()};
  &:hover {
    background-color: transparent;
    border-color: ${props => props.theme.buttonBorderDisabled.toString()};
    color: ${props => props.theme.textDefault.lighter.toString()};
  }
`;

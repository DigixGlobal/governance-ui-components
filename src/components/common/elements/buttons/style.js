import styled, { css } from 'styled-components';

export const ButtonGlobalStyles = css`
  cursor: pointer;
  font-family: 'Futura PT Medium';
  font-size: 1.6rem;
  margin: 1rem;
  outline: none;
  padding: 1rem 3rem;
  text-align: center;
  text-decoration: none;
  text-transform: uppercase;
  transition: ${props => props.theme.transition};

  ${props =>
    props.fluid &&
    css`
      width: 100%;
      margin: 2rem 0;
    `};
`;

export const Button = styled.button`
  ${ButtonGlobalStyles};

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
      font-size: 1.6rem;
      padding: 1rem 3rem;
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
      padding: 6rem;
      font-size: 3.6rem;
      font-family: 'Futura PT Heavy';
    `};

  ${props =>
    props.icon &&
    css`
      display: flex;
      align-items: center;
      justify-content: space-between;

      svg {
        fill: ${props.theme.buttonBgSecondary.light.toString()};
      }

      &:hover {
        svg {
          fill: ${props.theme.iconColorReverse.default.toString()};
        }
      }
    `};
`;

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

  color: ${props =>
    props.primary
      ? props.theme.buttonTextPrimary.default.toString()
      : props.theme.buttonTextSecondary.toString()};

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

/* eslint-disable */
export const CapsuleBtn = styled.button`
  border-radius: 30px;
  ${ButtonStyles};

  ${props =>
    props.ghost &&
    css`
      ${GhostBtn};
    `};
  ${props =>
    props.sm &&
    css`
      padding: 0.7em 1.25em;
      color: #ccc;
    `};
  ${props =>
    props.disabled &&
    css`
      ${DisabledBtn};
    `};
`;

export const RoundBtn = styled.button`
  border-radius: 3px;
  ${ButtonStyles};

  ${props =>
    props.ghost &&
    css`
      ${GhostBtn};
    `};

  ${props =>
    props.disabled &&
    css`
      ${DisabledBtn};
    `};

  ${props =>
    props.fluid &&
    css`
      margin-left: 0;
      margin-right: 0;
      width: 100%;
    `};

  ${props =>
    props.iconButton &&
    css`
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 1.4rem;

      svg {
        fill: ${props.theme.iconColor.default.toString()};
        width: 30px;
        height: 30px;
      }

      :hover {
        svg {
          fill: ${props.theme.iconColorReverse.default.toString()};
        }
      }
    `};

  ${props =>
    props.filled &&
    css`
      background-color: ${props => props.theme.buttonBgPrimary.fade.toString()};
      color: ${props => props.theme.buttonTextPrimary.toString()};
      font-size: 1.8rem;

      &:hover,
      &:focus {
        background-color: ${props =>
          props.theme.buttonBgPrimary.default.toString()};
        color: ${props => props.theme.buttonTextPrimaryReverse.toString()};
      }
    `};
`;

export const FlatBtn = styled.button`
  background-color: transparent;
  color: ${props => props.theme.buttonFlatColor.toString()};
  font-family: 'Futura PT Book', sans-serif;
  font-size: 1.1rem;
  text-decoration: none;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  border: 0;

  ::before {
    content: '● ';
    color: ${props => props.theme.buttonFlatColor.toString()};
    font-size: 140%;
  }
`;

export const LabeledIconBtn = styled.button`
  color: ${props => props.theme.buttonTextDefault.toString()};
  font-family: 'Futura PT Book', sans-serif;
  font-size: 1.4rem;
  text-decoration: none;
  text-transform: uppercase;
  ${props =>
    props.disabled &&
    css`
      color: #f2f2f2;
    `};
  ${props =>
    props.ghost &&
    css`
      ${GhostBtn};
    `};
  border: 0;
  cursor: pointer;

  :focus {
    outline: none;
  }
`;

import styled, { css } from 'styled-components';
// import { ButtonStyles, DisabledBtn, GhostBtn } from '../../common-styles';

export const ButtonStyles = css`
  background: ${props =>
    props.primary
      ? props.theme.buttonBgPrimary.default.toString()
      : props.theme.buttonBgSecondary.default.toString()};

  border: 2px solid
    ${props =>
      props.primary
        ? props.theme.buttonBorderPrimary.toString()
        : props.theme.buttonBorderSecondary.default.toString()};

  color: ${props =>
    props.primary
      ? props.theme.buttonTextPrimaryReverse.toString()
      : props.theme.buttonTextSecondaryReverse.toString()};

  cursor: pointer;
  font-family: 'Futura PT Medium';
  margin: 1rem;
  outline: none;
  padding: 1rem 2rem;
  text-align: center;
  text-decoration: none;
  text-transform: uppercase;
  transition: all 0.3s ease;

  &:hover {
    background-color: transparent;
    color: ${props =>
      props.primary
        ? props.theme.buttonTextPrimary.toString()
        : props.theme.buttonTextSecondary.toString()};
  }

  ${props =>
    props.xsmall &&
    css`
      padding: 0.5rem 1rem;
      font-size: 1.4rem;
      margin-right: 0.5rem;
    `};

  ${props =>
    props.small &&
    css`
      padding: 0.5rem 1rem;
      font-size: 1.4rem;
      margin-right: 0.5rem;
    `};

  ${props =>
    props.medium &&
    css`
      padding: 1rem 2rem;
    `};

  ${props =>
    props.large &&
    css`
      padding: 1rem 2rem;
    `};
`;

export const GhostBtn = css`
  background-color: transparent;
  color: ${props =>
    props.primary
      ? props.theme.buttonTextPrimary.toString()
      : props.theme.buttonTextSecondary.toString()};

  &:hover {
    background: ${props =>
      props.primary
        ? props.theme.buttonBgPrimary.default.toString()
        : props.theme.buttonBgSecondary.default.toString()};
    color: ${props =>
      props.primary
        ? props.theme.buttonTextPrimaryReverse.toString()
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
        fill: ${props.theme.iconColor.toString()};
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
    props.xlarge &&
    css`
      padding: 6rem;
      font-size: 3.6rem;
      font-family: 'Futura PT Heavy';
    `};

  ${props =>
    props.yes &&
    css`
      &:hover,
      &:focus {
        color: ${props => props.theme.buttonResponseYes.default.toString()};
        border-color: ${props =>
          props.theme.buttonResponseYes.default.toString()};
        background-color: ${props =>
          props.theme.buttonResponseYes.fade.toString()};
      }
    `};
  ${props =>
    props.no &&
    css`
      &:hover,
      &:focus {
        color: ${props => props.theme.buttonResponseNo.default.toString()};
        border-color: ${props =>
          props.theme.buttonResponseNo.default.toString()};
        background-color: ${props =>
          props.theme.buttonResponseNo.fade.toString()};
      }
    `};

  ${props =>
    props.confirmedYes &&
    css`
      &,
      &:hover,
      &:focus {
        color: ${props => props.theme.buttonResponseYes.default.toString()};
        border-color: ${props =>
          props.theme.buttonResponseYes.default.toString()};
        background-color: ${props =>
          props.theme.buttonResponseYes.fade.toString()};
      }
    `};
  ${props =>
    props.confirmedNo &&
    css`
      &,
      &:hover,
      &:focus {
        color: ${props => props.theme.buttonResponseNo.default.toString()};
        border-color: ${props =>
          props.theme.buttonResponseNo.default.toString()};
        background-color: ${props =>
          props.theme.buttonResponseNo.fade.toString()};
      }
    `};

  ${props =>
    props.fill &&
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

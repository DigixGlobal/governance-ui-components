import styled, { css } from 'styled-components';
import { Button } from '../style';

export const RoundBtn = styled(Button)`
  background: ${props => props.theme.buttonBgPrimary.default.toString()};
  border: none;
  border-radius: 4px;
  box-shadow: ${props => props.theme.boxShadow};
  color: ${props => props.theme.buttonTextPrimary.default.toString()};

  &:hover {
    background: ${props => props.theme.buttonBgHoverPrimary.default.toString()};
    color: ${props => props.theme.buttonTextPrimaryReverse.default.toString()};
  }

  ${props =>
    props.primary &&
    css`
      background: ${props.theme.buttonBgPrimary.default.toString()};
      border: 2px solid ${props.theme.buttonBorderPrimary.default.toString()};
      color: ${props.theme.buttonTextPrimary.default.toString()};
    `};

  ${props =>
    props.secondary &&
    css`
      background: ${props.theme.buttonBgSecondary.fade.toString()};
      border: 2px solid ${props.theme.buttonTextPrimary.default.toString()};
      color: ${props.theme.buttonTextPrimary.default.toString()};
      &:hover {
        background: ${props.theme.buttonBgSecondary.default.toString()};
        color: ${props.theme.buttonTextPrimaryReverse.default.toString()};
      }
    `};
  ${props =>
    props.tertiary &&
    css`
      background: ${props.theme.buttonBgTertiaryReverse.default.toString()};
      border: 2px solid ${props.theme.buttonBorderTertiary.default.toString()};
      color: ${props.theme.buttonTextTertiary.default.toString()};
      &:hover {
        background: ${props.theme.buttonBgTertiary.default.toString()};
        color: ${props.theme.buttonTextTertiaryReverse.default.toString()};
      }
    `};

  ${props =>
    props.disabled &&
    css`
      background: transparent;
      border: 2px solid ${props.theme.buttonBorderDisabled.light.toString()};
      color: ${props.theme.buttonTextDefault.light.toString()};
      &:hover {
        background: ${props.theme.buttonBorderDisabled.light.toString()};
        color: ${props.theme.buttonTextDefaultReverse.default.toString()};
      }
    `};

  ${props =>
    props.reverse &&
    css`
      background: ${props.theme.buttonBgHoverPrimary.default.toString()};
      color: ${props.theme.buttonTextPrimaryReverse.default.toString()};
      &:hover {
        background: ${props.theme.buttonBgPrimary.default.toString()};
        color: ${props.theme.buttonTextPrimary.default.toString()};
      }
    `};

  ${props =>
    props.success &&
    css`
      background: ${props.theme.backgroundSecondary.fade.toString()};
      border: 2px solid ${props.theme.buttonBorderSecondary.default.toString()};
      color: ${props.theme.textSecondary.default.toString()};
      &:hover {
        background: ${props.theme.backgroundSecondary.fade.toString()};
        border-color: ${props.theme.buttonBorderSecondary.default.toString()};
        color: ${props.theme.textSecondary.default.toString()};
      }
    `};

  ${props =>
    props.yes &&
    css`
      &:hover,
      &:focus {
        color: ${props.theme.buttonResponseYes.default.toString()};
        border: 2px solid ${props.theme.buttonResponseYes.default.toString()};
        background-color: ${props.theme.buttonResponseYes.fade.toString()};
      }
    `};
  ${props =>
    props.no &&
    css`
      &:hover,
      &:focus {
        color: ${props.theme.buttonResponseNo.default.toString()};
        border: 2px solid ${props.theme.buttonResponseNo.default.toString()};
        background-color: ${props.theme.buttonResponseNo.fade.toString()};
      }
    `};

  ${props =>
    props.confirmedYes &&
    css`
      &,
      &:hover,
      &:focus {
        color: ${props.theme.buttonResponseYes.default.toString()};
        border: 2px solid ${props.theme.buttonResponseYes.default.toString()};
        background-color: ${props.theme.buttonResponseYes.fade.toString()};
      }
    `};
  ${props =>
    props.confirmedNo &&
    css`
      &,
      &:hover,
      &:focus {
        color: ${props.theme.buttonResponseNo.default.toString()};
        border: 2px solid ${props.theme.buttonResponseNo.default.toString()};
        background-color: ${props.theme.buttonResponseNo.fade.toString()};
      }
    `};
`;

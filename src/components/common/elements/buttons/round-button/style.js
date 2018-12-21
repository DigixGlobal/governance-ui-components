import styled, { css } from 'styled-components';
import { Button } from '../style';

export const RoundBtn = styled(Button)`
  border-radius: 4px;
  background: ${props =>
    props.primary
      ? props.theme.buttonBgPrimary.default.toString()
      : props.theme.backgroundSecondary.default.toString()};
  border: 2px solid ${props => props.theme.buttonBorderPrimary.default.toString()};

  color: ${props =>
    props.primary
      ? props.theme.buttonTextPrimary.default.toString()
      : props.theme.buttonTextPrimary.default.toString()};

  &:hover {
    background: ${props => props.theme.buttonBgHoverPrimary.default.toString()};
    color: ${props => props.theme.buttonTextPrimaryReverse.default.toString()};
  }

  ${props =>
    props.secondary &&
    css`
      background: ${props.theme.buttonBgSecondary.fade.toString()};
      border-color: ${props.theme.buttonTextPrimary.default.toString()};
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
      border-color: ${props.theme.buttonBorderTertiary.default.toString()};
      color: ${props.theme.buttonTextTertiary.default.toString()};
      &:hover {
        background: ${props.theme.buttonBgTertiary.default.toString()};
        color: ${props.theme.buttonTextTertiaryReverse.default.toString()};
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
    props.fluid &&
    css`
      width: 100%;
      margin: 2rem 0;
    `};

  ${props =>
    props.success &&
    css`
      background: ${props.theme.backgroundSecondary.fade.toString()};
      border-color: ${props.theme.buttonBorderSecondary.default.toString()};
      color: ${props.theme.textSecondary.default.toString()};
      &:hover {
        background: ${props.theme.backgroundSecondary.fade.toString()};
        border-color: ${props.theme.buttonBorderSecondary.default.toString()};
        color: ${props.theme.textSecondary.default.toString()};
      }
    `};
`;

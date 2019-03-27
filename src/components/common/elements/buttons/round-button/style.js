import styled, { css } from 'styled-components';
import { Button } from '../style';

// eslint-disable-next-line no-undef

export const RoundBtn = styled(Button)`
  background: ${props =>
    props.disabled
      ? props.theme.buttonDisabled.background
      : props.theme.buttonDefault.background.base.toString()};
  border-width: 2px;
  border-style: solid;
  border-color: ${props =>
    props.disabled
      ? props.theme.buttonDisabled.border.lighter.toString()
      : props.theme.buttonDefault.border.base.toString()};
  border-radius: ${props => props.theme.borderRadius};
  box-shadow: ${props => props.theme.boxShadow};
  color: ${props =>
    props.disabled
      ? props.theme.buttonDisabled.textColor.lighter.toString()
      : props.theme.buttonDefault.textColor.base.toString()};

  svg {
    fill: ${props => props.theme.buttonDefault.iconColor.base.toString()};
  }

  &:hover {
    background: ${props =>
      props.disabled
        ? props.theme.buttonDisabled.background
        : props.theme.buttonSecondary.background.fade.toString()};
    border-color: ${props =>
      props.disabled
        ? props.theme.buttonDisabled.border.lighter.toString()
        : props.theme.buttonPrimary.border.base.toString()};
    color: ${props =>
      props.disabled
        ? props.theme.buttonDisabled.textColor.lighter.toString()
        : props.theme.buttonSecondary.textColor.base.toString()};

    svg {
      fill: ${props => props.theme.buttonDefault.invert.iconColor.base.toString()};
    }
  }

  ${props =>
    props.primary &&
    css`
      background: ${
        props.disabled
          ? props.theme.buttonDisabled.background
          : props.theme.buttonPrimary.background.base.toString()
      };
      border-color: ${
        props.disabled
          ? props.theme.buttonDisabled.color.lighter.toString()
          : props.theme.buttonPrimary.border.base.toString()
      };
      box-shadow: none;
      color: ${
        props.disabled
          ? props.theme.buttonDisabled.color.lighter.toString()
          : props.theme.buttonPrimary.textColor.base.toString()
      };

      svg {
        fill: ${props.theme.buttonPrimary.iconColor.base.toString()};
      }

      &:hover {
        background: ${
          props.disabled
            ? props.theme.buttonDisabled.background.toString()
            : props.theme.buttonPrimary.invert.background.fade.toString()
        };
        border-color: ${
          props.disabled
            ? props.theme.buttonDisabled.color.lighter.toString()
            : props.theme.buttonPrimary.invert.border.base.toString()
        };
        color: ${
          props.disabled
            ? props.theme.buttonDisabled.color.lighter.toString()
            : props.theme.buttonPrimary.invert.textColor.base.toString()
        };

        svg {
          fill: ${props.theme.buttonPrimary.invert.iconColor.base.toString()};
        }
    `};

  ${props =>
    props.secondary &&
    css`
      background: ${props.disabled
        ? 'transparent'
        : props.theme.buttonSecondary.background.fade.toString()};
      border-color: ${props.disabled
        ? props.theme.buttonDisabled.color.lighter.toString()
        : props.theme.buttonSecondary.border.base.toString()};
      box-shadow: none;
      color: ${props.disabled
        ? props.theme.buttonDisabled.color.lighter.toString()
        : props.theme.buttonSecondary.textColor.base.toString()};

      svg {
        fill: ${props.theme.buttonSecondary.iconColor.light.toString()};
      }

      &:hover {
        background: ${props.disabled
          ? 'transparent'
          : props.theme.buttonSecondary.invert.background.base.toString()};
        color: ${props.disabled
          ? props.theme.buttonDisabled.color.lighter.toString()
          : props.theme.buttonSecondary.invert.textColor.base.toString()};

        svg {
          fill: ${props.theme.iconColorReverse.default.toString()};
        }
      }
    `};

  ${props =>
    props.tertiary &&
    css`
      background: ${props.invert
        ? props.theme.buttonTertiary.background.base.toString()
        : 'transparent'};
      border-color: ${props.theme.buttonTertiary.border.base.toString()};
      box-shadow: none;
      color: ${props.invert
        ? props.theme.buttonInverted.textColor.base.toString()
        : props.theme.buttonTertiary.textColor.base.toString()};

      svg {
        fill: ${props.theme.buttonTertiary.iconColor.base.toString()};
      }

      &:hover {
        background: ${props.invert
          ? props.theme.buttonTertiary.background.fade.toString()
          : props.theme.buttonTertiary.invert.background.base.toString()};
        border-color: ${props.theme.buttonTertiary.border.base.toString()};
        color: ${props.invert
          ? props.theme.buttonTertiary.textColor.base.toString()
          : props.theme.buttonTertiary.invert.textColor.base.toString()};

        svg {
          fill: ${props.theme.buttonTertiary.invert.iconColor.base.toString()};
        }
      }
    `};

  ${props =>
    props.active &&
    css`
      background: ${props.theme.buttonInverted.background.base.toString()};
      color: ${props.theme.buttonInverted.textColor.base.toString()};
    `};

  ${props =>
    props.reverse &&
    css`
      background: ${props.theme.buttonInverted.background.base.toString()};
      border-color: ${props.theme.buttonInverted.border.base.toString()};
      box-shadow: none;
      color: ${props.theme.buttonInverted.textColor.base.toString()};

      &:hover {
        background: transparent;
        color: ${props.theme.buttonPrimary.textColor.base.toString()};
      }
    `};

  ${props =>
    props.disabled &&
    css`
      background: ${props.theme.buttonDisabled.background.toString()} !important;
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

  ${props =>
    props.success &&
    css`
  //  This looks like not in used. Will be deleted when no issues reported this sprint 5.
  //     background: ${props.theme.backgroundSecondary.fade.toString()};
  //     border: 2px solid ${props.theme.buttonBorderSecondary.default.toString()};
  //     box-shadow: none;
  //     color: ${props.theme.textSecondary.default.toString()};

  //     &:hover {
  //       background: ${props.theme.backgroundSecondary.fade.toString()};
  //       border-color: ${props.theme.buttonBorderSecondary.default.toString()};
  //       color: ${props.theme.textSecondary.default.toString()};
  //     }
    `};
`;

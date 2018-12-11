import styled, { css } from 'styled-components';
import {
  ButtonStyles,
  DisabledBtn,
  GhostBtn,
} from '@digix/gov-ui/components/common/elements/buttons/style';

export const Button = styled.a`
  border-radius: 3px;
  ${ButtonStyles};
  display: block;
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
    props.filled &&
    css`
      background-color: ${props.theme.buttonBgPrimary.fade.toString()};
      color: ${props.theme.buttonTextPrimary.toString()};
      font-size: 1.8rem;

      &:hover,
      &:focus {
        background-color: ${props.theme.buttonBgPrimary.default.toString()};
        color: ${props.theme.buttonTextPrimaryReverse.toString()};
      }
    `};
`;

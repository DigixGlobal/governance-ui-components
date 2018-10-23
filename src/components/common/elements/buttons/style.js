import styled, { css } from 'styled-components';
import { ButtonStyles, DisabledBtn, GhostBtn } from '../../common-styles';

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
    props.ghostBtnSm &&
    css`
      ${GhostBtn};
      border: 1px solid #ccc;
      padding: 0.8em 1.5em;
      color: #ccc;
      &:hover {
        background: none;
        color: #ccc;
      }
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
    props.icon &&
    css`
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 1.4rem;

      svg {
        fill: ${props => props.theme.iconColor.toString()};
        width: 30px;
        height: 30px;
      }

      :hover {
        svg {
          fill: ${props => props.theme.iconColorReverse.default.toString()};
        }
      }
    `};
`;

export const FlatBtn = styled.a`
  color: ${props => props.theme.buttonFlatColor.toString()};
  font-family: 'Futura PT Book', sans-serif;
  font-size: 1.1rem;
  text-decoration: none;
  text-transform: uppercase;
  letter-spacing: 0.1em;

  ::before {
    content: '● ';
    color: ${props => props.theme.buttonFlatColor.toString()};
    font-size: 140%;
  }
`;

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
`;

export const FlatBtn = styled.button`
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
  border: 0;
  cursor: pointer;

  :focus {
    outline: none;
  }
`;

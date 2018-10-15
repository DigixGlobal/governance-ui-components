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
  border-radius: 2px;
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
`;

export const TagBtn = styled.a`
  color: ${props => props.theme.buttonTagColor.toString()};
  font-weight: 600;
  font-size: 1.3rem;
  text-decoration: none;

  ::before {
    content: '● ';
    color: ${props => props.theme.buttonTagColor.toString()};
    font-size: 130%;
  }
`;

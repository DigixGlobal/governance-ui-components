import styled, { css } from 'styled-components';
import { ButtonStyles, GhostBtn, DisabledBtn } from '../style';

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

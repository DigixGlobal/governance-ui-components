import styled, { css } from 'styled-components';
import { ButtonStyles, GhostBtn, DisabledBtn } from '../../../common-styles';

/* eslint-disable */
export const Button = styled.button`
  border-radius: 4px;
  ${ButtonStyles};
  ${props =>
    props.ghost &&
    css`
      ${GhostBtn};
    `};
  ${props =>
    props.disabled &&
    css`
      background-color:orangered;
    `};
`;

import styled, { css } from 'styled-components';
import { GhostBtn } from '../style';

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

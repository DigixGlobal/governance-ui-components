import styled, { css } from 'styled-components';
import { Button } from '../style';

export const TextBtn = styled(Button)`
  background-color: transparent;
  border: 0;

  display: inline-flex;
  align-items: center;
  justify-content: flex-start;

  color: ${props =>
    props.primary
      ? props.theme.buttonTextPrimary.default.toString()
      : props.theme.buttonTextDefault.default.toString()};

  svg {
    fill: ${props => props.theme.backgroundTertiary.default.toString()};
  }

  ${props =>
    props.active &&
    css`
      color: ${props.theme.buttonTextSecondary.default.toString()};

      svg {
        fill: ${props.theme.backgroundSecondary.default.toString()};
      }
    `};
`;

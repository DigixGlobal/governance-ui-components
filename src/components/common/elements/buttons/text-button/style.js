import styled, { css } from 'styled-components';
import { Button } from '../style';

export const TextBtn = styled(Button)`
  display: inline-flex;
  align-items: center;
  justify-content: flex-start;

  background-color: transparent;
  border: 0;
  box-shadow: none;
  padding: 0;
  margin: 0;
  text-decoration: ${props => (props.underline ? 'underline' : 'inherit')};

  color: ${props => props.theme.textColor.primary.base.toString()};

  svg {
    fill: ${props => props.theme.icon.primary.default.toString()};
  }

  ${props =>
    props.secondary &&
    css`
      color: ${props.theme.textColor.secondary.base.toString()};
    `};

  ${props =>
    props.tertiary &&
    css`
      color: ${props.theme.textColor.default.base.toString()};
    `};

  ${props =>
    props.disabled &&
    css`
      color: ${props.theme.buttonTextDefault.light.toString()};
      svg {
        fill: ${props.theme.icon.disabled.light.toString()};
      }

      &:hover {
        color: ${props.theme.buttonTextDefault.light.toString()};
        border: none;
      }
    `};

  ${props =>
    props.active &&
    css`
      color: ${props.theme.buttonTextSecondary.default.toString()};

      svg {
        fill: ${props.theme.icon.active.default.toString()};
      }
    `};
`;

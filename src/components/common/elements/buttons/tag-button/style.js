import styled, { css } from 'styled-components';
import { Button } from '../style';

export const TagBtn = styled(Button)`
  border-radius: ${props => props.theme.borderRadius};
  color: ${props =>
    props.outline
      ? props.theme.tag.default.outline.textColor.base.toString()
      : props.theme.tag.default.textColor.base.toString()};
  background: ${props =>
    props.outline
      ? props.theme.tag.default.outline.background.fade.toString()
      : props.theme.tag.default.background.base.toString()};
  border: 1px solid ${props => props.theme.tag.default.border.base.toString()};
  font-family: 'Futura PT Medium', sans-serif;
  font-size: 1.2rem;
  letter-spacing: 0.025em;
  margin: 0 0.25rem;
  padding: 0.4rem 0.85rem;
  pointer-events: none;

  &:first-child {
    margin-left: 0;
  }

  svg {
    fill: ${props => props.theme.tag.default.outline.icon.base.toString()};
  }

  ${props =>
    props.actionable &&
    css`
      background: ${props.outline
        ? props.theme.tag.actionable.outline.background.fade.toString()
        : props.theme.tag.actionable.background.base.toString()};
      border: 1px dashed
        ${props.outline
          ? props.theme.tag.actionable.outline.border.base.toString()
          : props.theme.tag.actionable.border.base.toString()};
      color: ${props.outline
        ? props.theme.tag.actionable.outline.textColor.base.toString()
        : props.theme.tag.actionable.textColor.base.toString()};

      svg {
        fill: ${props.theme.tag.actionable.outline.icon.base.toString()};
      }
    `};
`;

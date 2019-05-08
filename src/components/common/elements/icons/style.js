import styled, { css } from 'styled-components';

export const Container = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: ${props => props.width || '2.8rem'};
  height: ${props => props.height || '2.8rem'};
  margin-right: 0.75rem;

  > svg {
    fill: ${props => {
      if (props.active) {
        return props.theme.icon.secondary.base.toString();
      }

      return props.selected
        ? props.theme.icon.secondary.default.toString()
        : props.theme.icon.default.light.toString();
    }};
    width: 100%;
    height: 100%;

    .color {
      fill: #c1c1c1;
    }
  }

  ${props =>
    props.large &&
    css`
      width: 8rem;
      height: 8rem;
    `};

  ${props =>
    props.primary &&
    css`
      svg {
        fill: ${props.theme.icon.primary.light.toString()};
      }
    `};
`;

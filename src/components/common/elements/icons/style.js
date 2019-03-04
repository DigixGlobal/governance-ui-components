import styled from 'styled-components';

export const Container = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: ${props => props.width || '2.8rem'};
  height: ${props => props.height || '2.8rem'};
  margin-right: 1rem;

  > svg {
    fill: ${props => {
      if (props.active) {
        return props.theme.buttonBgSecondary.default.toString();
      }

      return props.selected
        ? props.theme.icon.secondary.default.toString()
        : props.theme.icon.default.light.toString();
    }};
    width: 100%;
    height: 100%;

    .color {
      fill: #d8d8d8;
    }
  }
`;

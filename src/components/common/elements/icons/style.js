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
        ? props.theme.textSecondary.default.toString()
        : props.theme.iconColor.toString();
    }};
    width: 100%;
    height: 100%;
  }
`;

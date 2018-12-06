import styled from 'styled-components';
import { ButtonStyles } from '../style';

export const TextBtn = styled.button`
  ${ButtonStyles};
  background-color: transparent;
  border: 0;
  border-radius: 30px;
  color: ${props => props.theme.buttonTextDefault.toString()};
  display: inline-flex;
  align-items: center;
  justify-content: flex-start;

  &:hover {
    background-color: ${props => props.theme.backgroundTertiary.lightest.toString()};

    svg {
      fill: ${props => props.theme.buttonBgSecondary.default.toString()};
    }
  }
`;

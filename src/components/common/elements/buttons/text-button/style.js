import styled from 'styled-components';
import { ButtonStyles } from '../style';

export const TextBtn = styled.button`
  cursor: pointer;
  font-family: 'Futura PT Medium';
  margin: 1rem;
  outline: none;
  padding: 1rem 2rem;
  text-align: center;
  textd-ecoration: none;
  text-transform: uppercase;
  transition: all 0.3s ease;

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

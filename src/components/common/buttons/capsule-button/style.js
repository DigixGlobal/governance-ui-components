import styled from 'styled-components';
import { colors } from '../../../global';

export const Button = styled.button`
  background: ${props => props.secondary ? props.theme.secondary : props.theme.primary};
  color: ${props => props.theme.textColor};
  border: 1px solid ${props => props.theme.textColor};

  width:  ${props => (props.fullWidth ? '100%' : '')};
  height: ${props => (props.fullWidth ? '5rem' : '3.6rem')};
  border-radius: ${props => (props.fullWidth ? '3rem' : '.5rem')};
  text-transform: ${props => (props.secondary ? 'none' : 'uppercase')};
  padding: .5rem 1.5rem;
  font-size: 110%;
  outline: none;
  font-family: 'Futura PT Light', 'Roboto', 'Arial', 'sans-serif';
`;

import styled from 'styled-components';
import { colors } from '../../../global';

export const Button = styled.button`
  background: ${props => props.theme.primary};
  color: ${props => props.theme.textColor};
  border: 1px solid ${props => props.theme.textColor};

  width:  ${props => (props.fullWidth ? '100%' : '')};
  height: ${props => (props.fullWidth ? '50px' : '36px')};
  border-radius: ${props => (props.fullWidth ? '30px' : '5px')};
  //color: ${props => (!props.secondary ? colors.secondary : colors.primary)};
  text-transform: ${props => (props.secondary ? 'none' : 'uppercase')};
  padding: 5px 15px;
  font-size: 110%;
  /* min-width: 150px; */


  /* ${props => (props.fullWidth ? '3px' : '1px')} solid ${colors.primary}; */
`;

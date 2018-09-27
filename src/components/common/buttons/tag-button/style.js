import styled from 'styled-components';

export const Button = styled.a`
  background: ${props => props.backGround || '#fff'};
  color: ${props => props.theme.borderColor};
  border: 1px solid ${props => props.theme.borderColor};
  min-width: 10rem;
  width: ${props => props.width || '10rem'};
  height: 1.5rem;
  border-radius: 3rem;
  text-transform: ${props => (props.uppercase ? 'uppercase' : 'none')};
  padding: 0 1.1rem;
  font-size: 1.3rem;
  text-decoration: none;
  outline: none;
  /* font-family: 'Futura PT Light', 'Roboto', 'Arial', 'sans-serif'; */
`;

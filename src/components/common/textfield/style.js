import styled from 'styled-components';

export const SyledInput = styled.input`
  border-radius: ${props => (props.rounded ? '3rem' : '.5rem')};
  height: 5rem;
  min-width: ${props => props.width || '30rem'};
  border: 0.1rem solid ${props => props.theme.borderColor};
  padding: 1rem 2rem;
  font-size: 1.6rem;
  background-color: ${props => props.theme.backgroundColor};
  color: ${props => props.color || props.theme.primary};
  font-family: 'Futura PT Light', 'Roboto', 'Arial', 'sans-serif';
  opacity: 1 transparent;
  ::placeholder {
    color: ${props => props.theme.borderColor};
    text-align: center;
  }

  :focus {
    border: 0.2rem solid ${props => props.theme.primary};
    opacity: 1;
    transition: opacity 0.5s ease, border 0.5s ease;
    /* transition: background-color .4s ease; */
  }
`;

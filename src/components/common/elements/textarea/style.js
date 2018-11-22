import styled from 'styled-components';

export const SyledTextArea = styled.textarea`
  border: 1px solid ${props => props.theme.borderColor.light.toString()};
  border-radius: ${props => (props.rounded ? '2rem' : '.5rem')};
  color: ${props => props.theme.textDefault.default.toString()};
  margin: 1rem 0;
  padding: 2rem;
  width: ${props => props.width || '100%'};
  min-height: 30rem;
  outline: none;
  ::placeholder {
    color: ${props => props.theme.textDefault.lighter.toString()};
  }

  :focus {
    border: 1px solid ${props => props.theme.buttonBorderPrimary.toString()};
    opacity: 1;
    transition: opacity 650ms ease, border 650ms ease;
  }
`;

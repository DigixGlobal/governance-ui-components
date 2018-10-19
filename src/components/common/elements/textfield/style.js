import styled from 'styled-components';

export const SyledInput = styled.input`
  border: 1px solid ${props => props.theme.borderColor.default.toString()};
  border-radius: ${props => (props.rounded ? '2rem' : '.5rem')};
  color: ${props => props.color || props.theme.textDefault.toString()};
  padding: 0.8rem 2rem;
  font-size: 1.2rem;
  font-weight: 500;
  width: ${props => props.width || '100%'};

  ::placeholder {
    color: ${props => props.theme.textDefault.toString()};
    text-align: center;
  }

  :focus {
    border: 1px solid ${props => props.theme.buttonBorderPrimary.toString()};
    opacity: 1;
    transition: opacity 650ms ease, border 650ms ease;
  }
`;

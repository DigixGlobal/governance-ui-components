import styled from 'styled-components';

export const SyledInput = styled.input.attrs({
  type: 'text',
  //   size: props => (props.small ? 5 : undefined),
})`
  border: 1px solid ${props => props.theme.borderColor.light.toString()};
  border-radius: ${props => props.theme.borderRadius};
  color: ${props => props.theme.textDefault.default.toString()};
  padding: 2rem;
  font-size: 1.4rem;
  margin: 1rem 0;
  width: ${props => props.width || '100%'};
  transition: opacity 650ms ease, border 650ms ease;

  &::placeholder {
    color: ${props => props.theme.textDefault.default.toString()};
  }

  &:focus {
    border: 1px solid ${props => props.theme.buttonBorderPrimary.toString()};
    box-shadow: 0 0 1px ${props => props.theme.buttonBorderPrimary.toString()};
  }

  &.error {
    &:focus {
      border: 1px solid ${props => props.theme.buttonBorderPrimary.toString()};
      box-shadow: 0 0 1px ${props => props.theme.buttonBorderSecondary.default.toString()};
      color: ${props => props.theme.textDefault.default.toString()};
    }
  }
`;

import styled, { css } from 'styled-components';

export const TextArea = styled.textarea`
  border: 1px solid ${props => props.theme.borderColor.lighter.toString()};
  border-radius: ${props => props.theme.borderRadius};
  color: ${props => props.theme.textDefault.default.toString()};
  font-size: ${props => props.theme.fontSize};
  font-family: 'Futura PT Book', sans-serif;
  margin: 1rem 0;
  padding: 1.5rem 2rem;
  width: ${props => props.width || '100%'};
  min-height: 20rem;
  outline: none;
  resize: none;
  transition: opacity 650ms ease, border 650ms ease;

  &::placeholder {
    color: ${props => props.theme.textColor.default.lighter.toString()};
  }

  &:focus {
    outline: none;
    border: 1px solid ${props => props.theme.buttonPrimary.border.base.toString()};
    box-shadow: 0 0 1px ${props => props.theme.buttonPrimary.border.light.toString()};
  }

  &.error {
    &:focus {
      border: 1px solid ${props => props.theme.buttonBorderPrimary.toString()};
      box-shadow: 0 0 1px ${props => props.theme.buttonBorderSecondary.default.toString()};
      color: ${props => props.theme.textDefault.default.toString()};
    }
  }

  ${props =>
    props.error &&
    css`
      border: 1px solid ${props.theme.alertMessage.error.default.toString()};
    `};
`;

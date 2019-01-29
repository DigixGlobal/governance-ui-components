import styled, { css } from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: ${props => props.direction || 'row'};
`;

export const SyledInput = styled.input.attrs({
  type: 'text',
})`
  border: 1px solid
    ${props =>
      props.error ? props.theme.errorBorder.toString() : props.theme.borderColor.light.toString()};
  border-radius: ${props => props.theme.borderRadius};
  color: ${props => props.theme.textDefault.default.toString()};
  padding: 1.5rem 2rem;
  font-size: 1.6rem;
  margin: 0.5rem 0;
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

  ${props =>
    props.error &&
    css`
      border: 1px solid ${props.theme.alertMessage.error.default.toString()};
    `};
`;

export const Adornment = styled.div`
  position: relative;
  align-self: center;
`;

export const Error = styled.div`
  position: absolute;
  margin-left: 0.5rem;
  margin-top: 1.2rem;
  font-size: 1.2rem;
  color: red;
`;

export const Required = styled.span`
  /* position: absolute; */
  /* margin-left: 9.5rem; */
  padding-left: 0.2rem;
  font-size: 1.2rem;
  color: red;
`;

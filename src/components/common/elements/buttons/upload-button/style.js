import styled, { css } from 'styled-components';
import { ButtonGlobalStyles } from '@digix/gov-ui/components/common/elements/buttons/style';

export const UploadInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 2rem;
  width: 100%;
`;

export const UploadInput = styled.input`
  display: none;
`;
export const UploadButton = styled.label`
  ${ButtonGlobalStyles};
  display: inline-block;
  margin-left: 0;
  margin-top: 0;
  border-radius: ${props => props.theme.borderRadius};
  color: ${props => props.theme.buttonTextPrimary.default.toString()};

  &:hover {
    background: ${props => props.theme.buttonBgHoverPrimary.default.toString()};
    color: ${props => props.theme.buttonTextPrimaryReverse.default.toString()};
  }

  ${props =>
    props.primary &&
    css`
      background: ${props.theme.buttonBgPrimary.default.toString()};
      border: 2px solid ${props.theme.buttonBorderPrimary.default.toString()};
      box-shadow: none;
      color: ${props.theme.buttonTextPrimary.default.toString()};
    `};

  ${props =>
    props.secondary &&
    css`
      background: ${props.theme.buttonBgSecondary.fade.toString()};
      border: 2px solid ${props.theme.buttonTextPrimary.default.toString()};
      box-shadow: none;
      color: ${props.theme.buttonTextPrimary.default.toString()};
      &:hover {
        background: ${props.theme.buttonBgSecondary.default.toString()};
        color: ${props.theme.buttonTextPrimaryReverse.default.toString()};
      }
    `};

  ${props =>
    props.disabled &&
    css`
      background-color: orangered;
    `};
`;

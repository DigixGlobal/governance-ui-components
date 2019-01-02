import styled, { css } from 'styled-components';
import { ButtonGlobalStyles } from '@digix/gov-ui/components/common/elements/buttons/style';

export const UploadInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-right: 2rem;
  width: 100%;
`;

export const UploadInput = styled.input`
  display: none;
`;
export const UploadButton = styled.label`
  ${ButtonGlobalStyles};
  display: inline-block;
  border-radius: 4px;
  margin-left: 0;
  margin-top: 0;

  background: ${props =>
    props.primary
      ? props.theme.buttonBgPrimary.default.toString()
      : props.theme.backgroundSecondary.default.toString()};
  border: 2px solid ${props => props.theme.buttonBorderPrimary.default.toString()};

  color: ${props =>
    props.primary
      ? props.theme.buttonTextPrimary.default.toString()
      : props.theme.buttonTextPrimary.default.toString()};

  &:hover {
    background: ${props => props.theme.buttonBgHoverPrimary.default.toString()};
    color: ${props => props.theme.buttonTextPrimaryReverse.default.toString()};
  }

  ${props =>
    props.disabled &&
    css`
      background-color: orangered;
    `};
`;

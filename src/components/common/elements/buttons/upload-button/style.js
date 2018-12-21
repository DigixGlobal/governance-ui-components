import styled, { css } from 'styled-components';
import { ButtonStyles, GhostBtn } from '@digix/gov-ui/components/common/elements/buttons/style';

export const UploadButtonContainer = styled.div``;

export const UploadInput = styled.input`
  display: none;
`;
export const UploadButton = styled.label`
  display: inline-block;
  border-radius: 4px;
  cursor: pointer;
  font-family: 'Futura PT Medium';
  font-size: 1.4rem;
  margin: 1rem;
  outline: none;
  padding: 1.2rem 2rem;
  text-align: center;
  text-decoration: none;
  text-transform: uppercase;
  transition: all 0.3s ease;
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
    props.fullWidth &&
    css`
      width: 100%;
    `}

  margin-left: 0;
  ${props =>
    props.ghost &&
    css`
      ${GhostBtn};
    `};

  ${props =>
    props.disabled &&
    css`
      background-color: orangered;
    `};
`;

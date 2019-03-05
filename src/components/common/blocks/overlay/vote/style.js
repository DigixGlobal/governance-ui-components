import styled, { css } from 'styled-components';
import { Button } from '@digix/gov-ui/components/common/elements/index';
import { Notifications, Message } from '@digix/gov-ui/components/common/common-styles';

export const VoteButton = styled(Button)`
  padding: 6rem;
  font-size: 3.6rem;
  font-family: 'Futura PT Heavy';

  ${props =>
    props.confirmedYes &&
    css`
      &,
      &:hover,
      &:focus {
        color: ${props.theme.buttonInverted.textColor.base.toString()};
        background-color: ${props.theme.buttonInverted.background.base.toString()};
        border: 2px solid ${props.theme.buttonInverted.border.base.toString()};
        box-shadow: none;
      }
    `};
  ${props =>
    props.confirmedNo &&
    css`
      &,
      &:hover,
      &:focus {
        color: ${props.theme.buttonInverted.textColor.base.toString()};
        background-color: ${props.theme.buttonInverted.background.base.toString()};
        border: 2px solid ${props.theme.buttonInverted.border.base.toString()};
        box-shadow: none;
      }
    `};
`;

export const DownloadJson = styled(Notifications)`
  margin-top: 3rem;

  .vote {
    color: ${props => props.theme.alertMessage.response.base.toString()};
  }

  ${Message} {
    margin-bottom: 2rem;
  }
`;

export const DownloadButton = styled(Button)`
  background: ${props => props.theme.buttonTertiary.background.fade.toString()};
  border: 2px solid ${props => props.theme.buttonTertiary.border.base.toString()};
  border-radius: ${props => props.theme.borderRadius};
  color: ${props => props.theme.buttonTertiary.textColor.base.toString()};
  margin-bottom: 0;

  &:hover {
    background: ${props => props.theme.buttonTertiary.background.fade.toString()};
    color: ${props => props.theme.buttonTertiary.textColor.base.toString()};
  }

  svg {
    fill: ${props => props.theme.buttonTertiary.iconColor.base.toString()};
  }

  &:hover {
    svg {
      fill: ${props => props.theme.buttonTertiary.iconColor.base.toString()};
    }
  }
`;

import styled, { css } from 'styled-components';
import { Button } from '@digix/gov-ui/components/common/elements/index';
import { media } from '@digix/gov-ui/components/common/breakpoints';
import {
  Container,
  FieldsetStyle,
  Label as FormLabel,
  Card,
  Notifications,
} from '@digix/gov-ui/components/common/common-styles';

export const CreateWrapper = styled.div``;

export const TabPanel = styled.div`
  ${Container};
  justify-content: center;
`;
export const MenuItem = styled.div`
  flex: 1;
  font-family: 'Futura PT Medium', sans-serif;
  border-bottom: 1px solid #ccc;
  display: flex;
  justify-content: center;
  padding-bottom: 1rem;
  margin-bottom: 2rem;
  text-transform: uppercase;
  cursor: pointer;

  ${props =>
    props.active &&
    css`
      color: ${props.theme.textColor.secondary.base.toString()};
      border-bottom: 4px solid ${props.theme.buttonBorderSecondary.default.toString()};
    `};
`;

export const Header = styled.div`
  ${Container};
  background: ${props => props.theme.background.default.base.toString()};
  justify-content: space-between;
  padding: 1rem 2rem;
  margin-bottom: 3rem;
`;

export const LeftCol = styled.div`
  display: flex;
  align-items: center;
`;
export const RightCol = styled.div``;

export const Heading = styled.h1``;

export const Fieldset = styled.div`
  ${FieldsetStyle};
`;

export const FormItem = styled.div`
  margin-bottom: 2.5rem;
`;

export const Label = styled(FormLabel)`
  display: inline-block;
`;

export const MediaUploader = styled(Card)`
  align-items: flex-start;

  ${media.tablet`
    flex-direction: column;
  `}

  > div {
    &:first-child {
      margin-right: 2rem;
      flex: 1 0 45%;

      ${media.tablet`
        width: 100%;
      `}
    }
    &:last-child {
      flex: 0 1 auto;
      margin-top: 5px;

      ${media.tablet`
        margin-top: 2rem;
        width: 100%;
      `}
    }
  }
`;

export const ImageHolder = styled.div`
  background-color: ${props => props.theme.background.default.lighter.toString()};
  border: 1px solid ${props => props.theme.borderColor.lighter.toString()};
  border-radius: ${props => props.theme.borderRadius};
  width: 100%;
  min-height: 150px;
  padding: 0;
  display: flex;
  flex-flow: row wrap;

  img {
    height: auto;
    width: 100%;
    margin: 0;
  }
`;

export const ImageItem = styled.div`
  background: #fff;
  border-bottom: 1px solid ${props => props.theme.card.border.lighter.toString()};
  flex: 0 1 calc(50% - 0.5rem);
  margin-right: 1rem;
  margin-bottom: 1rem;
  position: relative;
  padding: 1rem;

  &:nth-child(even) {
    margin-right: 0;
  }

  &:last-child {
    border-bottom: 0;
  }

  canvas {
    width: 100%;
  }

  ${media.mobile`
    flex: 0 1 100%;
  `}

  ${props =>
    props.uploadForm &&
    css`
      flex: 0 1 100%;
      margin-right: 0;
      margin-bottom: 0;

      button {
        &:first-child {
          right: 1rem;
        }
        &:nth-of-type(2) {
          right: 10rem;
        }

        &:nth-of-type(3) {
          right: 5.5rem;
        }
      }
    `}

    ${props =>
      props.addUpdates &&
      css`
        flex: 0 1 100%;
        margin-right: 0;
        margin-bottom: 0;

        button {
          border-radius: 50%;

          &:first-child {
            right: -5.5rem;
            top: -6rem;

            ${media.tablet`
              top: -18rem; 
            `}

            ${media.mobile`
              top: -20rem; 
            `}
          }
          &:nth-of-type(2) {
            right: 5.5rem;
          }

          &:nth-of-type(3) {
            right: 1rem;
          }
        }
      `}

    ${props =>
      props.preview &&
      css`
        margin-right: 0;
        border-bottom: 0;
        padding: 0;
      `}
`;

const ButtonStyles = css`
  position: absolute;
  background: ${props => props.theme.background.white.toString()};
  border: 1px solid ${props => props.theme.borderColor.lighter.toString()};
  border-radius: ${props => props.theme.borderRadius};
  box-shadow: none;
  font-size: 1.2rem;
  margin: 0.5rem;
  padding: 1rem;
  top: 1rem;

  div {
    margin-right: 0;
    width: 1.75rem;
    height: 1.75rem;
  }

  &:hover {
    background: ${props => props.theme.background.white.toString()};
    border: 1px solid ${props => props.theme.borderColor.lighter.toString()};
  }
`;

export const Delete = styled(Button)`
  ${ButtonStyles};
  right: 1rem;
`;

export const Next = styled(Button)`
  ${ButtonStyles};
  right: 1rem;

  div {
    transform: rotate(275deg);
  }
`;

export const Previous = styled(Button)`
  ${ButtonStyles};
  right: 5.5rem;

  div {
    transform: rotate(90deg);
  }
`;

export const CreateMilestone = styled.div`
  background: ${props => props.theme.background.default.lighter.toString()};
  border: 1px solid ${props => props.theme.borderColor.lighter.toString()};
  border-radius: ${props => props.theme.borderRadius};
  padding: 2rem;
  margin-top: 2rem;
`;

export const EditorContainer = styled.div`
  border: none;
  margin: 1rem 0 5rem;

  & > div {
    height: 20rem;
  }

  ${props =>
    props.error &&
    css`
      & .ql-snow {
        border: 1px solid ${props.theme.alertMessage.error.default.toString()};
      }
    `};
`;

export const PreviewWrapper = styled.div``;

export const ErrorMessage = styled.span`
  color: ${props => props.theme.alertMessage.error.default.toString()};
  display: inline-block;
  font-size: 1.4rem;
`;

export const ErrorNotifications = styled(Notifications)`
  border: 0;
  box-shadow: none;
  color: ${props => props.theme.alertMessage.error.base.toString()};
  font-size: 1.4rem;
  padding: 1.5rem 2rem;
  margin-bottom: 0;
`;

export const AddMoreButton = styled(Button)`
  display: flex;
  flex-direction: column;
  color: ${props => props.theme.textColor.default.light.toString()};
  transition: ${props => props.theme.transition};

  & > div {
    margin-bottom: 1rem;
    margin-right: 0;
    border: 1px solid ${props => props.theme.icon.default.light.toString()};
    border-radius: 50%;
    width: 5rem;
    height: 5rem;
    transition: ${props => props.theme.transition};

    svg {
      fill: ${props => props.theme.icon.default.light.toString()};
      width: 50%;
    }
  }

  &:hover {
    color: ${props => props.theme.textColor.primary.base.toString()};

    & > div {
      background: ${props => props.theme.textColor.primary.fade.toString()};
      border: 1px solid ${props => props.theme.icon.primary.base.toString()};

      svg {
        fill: ${props => props.theme.icon.primary.light.toString()};
      }
    }
  }
`;

export const Note = styled.div`
  padding: 1.5rem 0;
  margin-bottom: 0;
`;

export const ModalCta = styled.div`
  display: flex;
  justify-content: flex-end;

  button {
    margin: 0;
  }
`;

import styled, { css } from 'styled-components';
import { Button } from '@digix/gov-ui/components/common/elements/index';
import { media } from '@digix/gov-ui/components/common/breakpoints';
import {
  Container,
  FieldsetStyle,
  Label as FormLabel,
  Card,
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
      flex: 0 1 auto;

      ${media.tablet`
        width: 100%;
      `}
    }
    &:last-child {
      flex: 1 0 0;
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
  min-height: 200px;
  padding: 0;

  & > div > img {
    height: auto;
    width: 100%;
    margin: 0;
  }
`;

export const ImageItem = styled.div`
  position: relative;
  margin: 0;
  padding: 0;
  border-bottom: 1px solid #fff;

  &:last-child {
    border-bottom: none;
  }

  canvas {
    width: 100%;
  }
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
  right: 5.5rem;

  div {
    transform: rotate(275deg);
  }
`;

export const Previous = styled(Button)`
  ${ButtonStyles};
  right: 10rem;

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

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
  font-family: 'Futura PT Medium';
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
  margin-bottom: 1rem;
`;

export const Label = styled(FormLabel)`
  display: inline-block;
`;

export const MediaUploader = styled(Card)`
  align-items: flex-start;

  ${media.mobile`
    flex-direction: column;
  `}

  > div {
    &:first-child {
      margin-right: 2rem;
      flex: 0 0 auto;

      ${media.mobile`
        width: 100%;
      `}
    }
    &:last-child {
      flex: 1 0 0;
      margin-top: 5px;

      ${media.tablet`git
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
  padding: 1rem;
  border-bottom: 1px solid #fff;

  &:last-child {
    border-bottom: none;
  }
`;

export const CloseButton = styled(Button)`
  position: absolute;
  right: 1rem;
  background: ${props => props.theme.background.white.toString()};
  border: 1px solid ${props => props.theme.borderColor.lighter.toString()};
  border-radius: ${props => props.theme.borderRadius};
  font-size: 1.2rem;
  margin: 0.5rem;
  padding: 1rem;

  div {
    svg {
      fill: ${props => props.theme.icon.default.base.toString()};
    }
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
  & > div {
    height: 20rem;
  }
  border: none;
  margin: 1rem 0;
`;

export const PreviewWrapper = styled.div``;

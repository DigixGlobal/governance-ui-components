import styled, { css } from 'styled-components';
import { Button } from '@digix/gov-ui/components/common/elements/index';
import {
  Container,
  FieldsetStyle,
  LabelStyle,
  H1,
  Card,
} from '@digix/gov-ui/components/common/common-styles';

import { media } from '@digix/gov-ui/components/common/breakpoints';

export const CreateWrapper = styled.div``;

export const TabPanel = styled.div`
  ${Container};
  justify-content: center;
  margin-bottom: 4rem;
`;
export const MenuItem = styled.div`
  flex: 1;

  display: flex;
  justify-content: center;

  border-bottom: 1px solid ${props => props.theme.tabMenu.inactive.lighter.toString()};
  cursor: pointer;
  font-family: 'Futura PT Medium';
  font-size: ${props => props.theme.fontSize};
  margin-bottom: 2rem;
  text-transform: uppercase;
  padding-bottom: 3rem;

  ${props =>
    props.active &&
    css`
      color: ${props.theme.tabMenu.active.base.toString()};
      border-bottom: 5px solid ${props.theme.tabMenu.active.base.toString()};
    `};

  ${media.mobile`
    border-bottom-width: 3px;
    font-family: 'Futura PT Book';
    font-size: 1.4rem;
    text-transform: capitalize;
    padding-bottom: 1.5rem;
    `}
`;

export const Header = styled.div`
  ${Container};
  justify-content: space-between;
  align-items: center;

  background: ${props => props.theme.backgroundDefault.default.toString()};
  border: 1px solid ${props => props.theme.borderColor.lighter.toString()};
  border-radius: ${props => props.theme.borderRadius};
  padding: 1rem 2rem;
  margin-bottom: 3rem;
`;

export const CallToAction = styled.div``;

export const LeftCol = styled.div`
  display: flex;
  align-items: center;
`;
export const RightCol = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const Heading = styled(H1)`
  font-size: 2rem;
  font-family: 'Futura PT Book';
  margin-left: 1rem;
`;

export const Fieldset = styled.div`
  ${FieldsetStyle};
`;

export const FormItem = styled.div`
  margin-bottom: 1rem;
`;

export const Label = styled.label`
  ${LabelStyle};
  margin-bottom: 1rem;
  font-family: 'Futura PT Medium';
`;

// BEGIN : Styles for Create Forms

export const MediaUploader = styled(Card)``;

export const ImageHolder = styled.div`
  background-color: ${props => props.theme.background.default.fade.toString()};
  border-radius: 3px;
  min-width: 500px;
  height: 200px;
  padding: 0.5rem;
  overflow: auto;
  & > img {
    height: 17rem;
    width: 20.5rem;
    margin: 2px;
  }
`;

export const CreateMilestone = styled.div`
  background: ${props => props.theme.background.default.lightest.toString()};
  border: 1px solid ${props => props.theme.borderColor.lightest.toString()};
  border-radius: ${props => props.theme.borderRadius};
  padding: 3rem;
  margin-top: 2rem;
`;

export const EditorContainer = styled.div`
  & > div {
    height: 20rem;
  }
  border: none;
`;

export const PreviewWrapper = styled.div``;

export const PreviewButton = styled(Button)`
  color: ${props => props.theme.buttonInverted.textColor.base.toString()};

  &:hover {
    color: ${props => props.theme.buttonTertiary.textColor.base.toString()};
  }
`;

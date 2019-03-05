import styled, { css } from 'styled-components';
import { Button } from '@digix/gov-ui/components/common/elements/index';
import { Container, FieldsetStyle, LabelStyle, H1 } from '../../../components/common/common-styles';

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
      color: ${props.theme.textSecondary.default.toString()};
      border-bottom: 4px solid ${props.theme.buttonBorderSecondary.default.toString()};
    `};
`;

export const Header = styled.div`
  ${Container};
  background: ${props => props.theme.backgroundDefault.default.toString()};
  border: 1px solid ${props => props.theme.borderColor.lighter.toString()};
  border-radius: ${props => props.theme.borderRadius};
  justify-content: space-between;
  padding: 1rem 2rem;
  margin-bottom: 3rem;
`;

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

export const MediaUploader = styled.div`
  ${Container};
  justify-content: space-between;
  align-items: flex-start;
  border: 1px solid ${props => props.theme.borderColor.lighter.toString()};
  background: ${props => props.theme.backgroundDefault.default.toString()};
  border-radius: 3px;
  padding: 2rem;
`;

export const ImageHolder = styled.div`
  background-color: ${props => props.theme.backgroundPrimary.default.toString()};
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
  background: ${props => props.theme.backgroundTertiary.default.toString()};
  border: 1px solid ${props => props.theme.borderColor.lighter.toString()};
  border-radius: 3px;
  padding: 2rem;
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

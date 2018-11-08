import styled, { css } from 'styled-components';
import { Container, FieldsetStyle, LabelStyle } from '../../../components/common/common-styles';

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

  ${props =>
    props.active &&
    css`
      color: ${props.theme.textSecondary.default.toString()};
      border-bottom: 4px solid ${props.theme.buttonBorderSecondary.toString()};
    `};
`;

export const Header = styled.div`
  ${Container};
  background: ${props => props.theme.backgroundDefault.default.toString()};
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
`;

export const CreateMilestone = styled.div`
  background: ${props => props.theme.backgroundLayout.default.toString()};
  border: 1px solid ${props => props.theme.borderColor.lighter.toString()};
  border-radius: 3px;
  padding: 2rem;
`;

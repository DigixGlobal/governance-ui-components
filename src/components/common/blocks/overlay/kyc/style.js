import styled, { css } from 'styled-components';
import { media } from '@digix/gov-ui/components/common/breakpoints';
import { H3 } from '@digix/gov-ui/components/common/common-styles';

export const WizardContainer = styled.div`
  display: flex;
  margin-bottom: 2rem;
`;
export const WizardMenu = styled.a`
  flex-grow: 1;
  text-align: center;
  border-bottom: 1px solid ${props => props.theme.borderColor.lighter.toString()};
  padding-bottom: 1rem;
  text-transform: uppercase;
  font-size: 1.4rem;

  ${props =>
    props.active &&
    css`
      color: ${props.theme.textSecondary.default.toString()};
      border-bottom: 3px solid ${props.theme.backgroundSecondary.default.toString()};
    `};
`;
export const WizardHeader = styled.div`
  display: flex;
  background: ${props => props.theme.backgroundDefault.default.toString()};
  box-shadow: ${props => props.theme.boxShadow};
  align-items: center;
  justify-content: space-between;
  padding: 1rem 2rem 1rem 3rem;

  margin-bottom: 3rem;
`;

export const CallToAction = styled.div`
  display: flex;

  margin-top: 3rem;
`;
export const Title = styled(H3)`
  margin-bottom: 0;
  font-family: 'Futura PT Medium', sans-serif;
`;
export const FormSection = styled.div`
  display: flex;
  flex-direction: column;
`;
export const FieldGroup = styled.div`
  display: flex;
  flex-direction: ${props => (props.column ? 'column' : '')};
  margin: 0 -1rem;
`;
export const FieldItem = styled.div`
  margin: 0 1rem 2rem 1rem;
  flex: 1;

  ${media.desktop`
  
  `};
  ${media.tablet``};
  ${media.mobile``};
`;

export const PreviewImage = styled.div`
  background: ${props => props.theme.backgroundPrimary.default.toString()};
  height: 85%;
  border-radius: ${props => props.theme.borderRadius};
  margin: 2.5rem 0;
`;

export const PhotoVerification = styled.div`
  display: flex;
  flex-direction: column;
  background: ${props => props.theme.backgroundPrimary.fade.toString()};
  border: 1px solid ${props => props.theme.borderColor.default.toString()};
  border-radius: ${props => props.theme.borderRadius};
  padding: 3rem;
  margin: 2rem 0 0 0;

  ${props =>
    props.webcam &&
    css`
      padding-left: 8rem;
      padding-right: 8rem;
    `};
`;

export const MediaContainer = styled.div`
  flex-direction: column;
  font-size: 1.4rem;
`;

export const GetStarted = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;
export const IdentificationCode = styled.div`
  background: ${props => props.theme.backgroundDefault.default.toString()};
  border: 1px solid ${props => props.theme.borderColorSecondary.light.toString()};
  border-radius: ${props => props.theme.borderRadius};
  box-shadow: ${props => props.theme.boxShadow};
  padding: 1rem 3rem;
  font-size: 3rem;
  margin-bottom: 2rem;
`;
export const CamPreview = styled.div`
  background: ${props => props.theme.backgroundPrimary.default.toString()};
  border-radius: ${props => props.theme.borderRadius};
  height: 300px;
  margin-bottom: 3rem;
  width: 60%;
`;

export const PhotoViewer = styled.div`
  display: flex;
  border: 1px solid ${props => props.theme.borderColor.default.toString()};
  border-radius: ${props => props.theme.borderRadius};
  margin: 3rem auto;
  width: 100%;

  ${props =>
    props.webcam &&
    css`
      width: 60%;
    `};
`;
export const SelfieGuide = styled.div`
  display: flex;
  justify-content: center;
  border-right: 1px solid ${props => props.theme.borderColorPrimary.light.toString()};
  background: ${props => props.theme.backgroundPrimary.fade.toString()};

  padding: 2rem 5rem;
  width: 100%;

  ${props =>
    props.webcam &&
    css`
      flex-direction: column;
      width: 28%;
      padding: 2rem 0;
    `};
`;
export const GuideItem = styled.div`
  margin: 1rem;
  img {
    width: 100%;
  }
`;
export const Photo = styled.div`
  background: ${props => props.theme.backgroundPrimary.default.toString()};
  width: 100%;
`;

export const ErrorMessage = styled.span`
  color: ${props => props.theme.alertMessage.error.default.toString()};
  display: inline-block;
  font-size: 1.4rem;
`;

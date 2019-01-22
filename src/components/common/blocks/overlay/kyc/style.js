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
  margin-right: -2rem;
`;
export const FieldGroup = styled.div`
  display: flex;
  flex-direction: ${props => (props.column ? 'column' : '')};
  margin: 0;
`;
export const FieldItem = styled.div`
  margin: 0 2rem 2rem 0;
  ${props =>
    props.col6 &&
    css`
      width: 50%;
    `};

  ${props =>
    props.col4 &&
    css`
      width: 33.33%;
    `};

  ${props =>
    props.col3 &&
    css`
      width: 25%;
    `};

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

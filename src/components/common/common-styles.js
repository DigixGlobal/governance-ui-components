import styled, { css } from 'styled-components';
import { media } from './breakpoints';

export const MainWrapper = styled.div`
  padding: 12em;

  ${media.tablet`
    padding: 12rem 8rem;
  `}
  ${media.mobile`
    padding: 12rem 3rem;
  `}
`;

export const Avatar = styled.img`
  width: 5rem;
  height: 5rem;
  border-radius: 50%;
`;

export const H1 = styled.h1`
  color: ${props =>
    props.primary
      ? props.theme.textPrimary.light.toString()
      : props.theme.textDefault.default.toString()};
  font-family: 'Futura PT Light';
  font-size: 4.6rem;
  margin: 0;
`;

export const H2 = styled.h2`
  color: ${props => props.color || props.theme.textDefault.default.toString()};
  font-family: 'Futura PT Light';
  font-size: 2.4rem;
  margin-bottom: 1.5rem;
  margin-top: 2rem;
  text-transform: ${props => (props.uppercase ? 'uppercase' : 'inherit')};
`;

export const H3 = styled.h3`
  color: ${props =>
    props.primary
      ? props.theme.textPrimary.light.toString()
      : props.theme.textDefault.default.toString()};
  font-family: 'Futura PT Light';
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
  text-transform: ${props => (props.uppercase ? 'uppercase' : 'inherit')};
`;

export const H4 = styled.h4`
  font-family: 'Futura PT Medium';
  color: ${props => props.color || props.theme.primary};
  font-size: 1.6rem;
  margin-bottom: 1.5rem;
`;

export const H5 = styled.h5`
  color: ${props => props.color || props.theme.primary};
  font-size: 1.4rem;
  margin: 0;
`;

export const Link = styled.a`
  color: ${props => props.theme.linkDefaultColor.default.toString()};

  ${props =>
    props.secondary &&
    css`
      color: ${props.theme.linkSecondaryColor.default.toString()};
    `};
`;

export const ContentWrapper = styled.div`
  flex: 5 0 0;
  padding: 12rem;
`;

export const LeftPanel = css``;
export const RightPanel = css``;

export const HR = styled.hr`
  border: 0.5px solid ${props => props.theme.background.default.lighter.toString()};
  width: 100%;
  margin-top: 4rem;
`;

export const Container = css`
  display: flex;
  flex-direction: ${props => props.column && 'column'};
`;

export const Message = styled.div`
  font-size: ${props => (props.title ? '1.8rem' : '')};
  text-transform: ${props => (props.uppercase ? 'uppercase' : '')};
  font-family: ${props => (props.title !== undefined ? 'Futura PT Medium, sans-serif' : '')};
  margin-bottom: 1em;
  font-weight: 300;

  ${props =>
    props.note &&
    css`
      margin-bottom: 0;
    `}
`;

export const Notifications = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: ${props => (props.centered ? 'center' : 'flex-start')};
  align-items: ${props => (props.centered ? 'center' : 'flex-start')};

  border-radius: ${props => props.theme.borderRadius};
  box-shadow: ${props => props.theme.boxShadow};
  font-family: 'Futura PT Book', sans-serif;
  font-size: 1.6rem;
  margin-bottom: 3rem;
  padding: 3rem 3rem;
  text-align: ${props => (props.centered ? 'center' : 'left')};
  white-space: pre-wrap;

  ${props =>
    props.withIcon &&
    css`
      flex-direction: row;
    `};

  ${Message} {
    span {
      font-family: 'Futura PT Heavy', sans-serif;
    }
  }

  svg {
    margin-top: 0rem;
  }

  h3 {
    font-size: 2.4rem;
    margin-bottom: 2rem;
    text-transform: uppercase;
  }

  span {
    font-family: 'Futura PT Medium', sans-serif;
  }

  span.highlight {
    display: block;
    font-size: 2rem;
    font-family: 'Futura PT Heavy', sans-serif;
    margin: 2rem 0;
  }

  ${props =>
    props.success &&
    css`
      background: ${props.theme.alertMessage.error.fade.toString()};
      border: 1px solid ${props.theme.alertMessage.error.light.toString()};
      color: ${props.theme.alertMessage.error.default.toString()};
    `};

  ${props =>
    props.error &&
    css`
      background: ${props.theme.alertMessage.error.fade.toString()};
      border: 1px solid ${props.theme.alertMessage.error.lightest.toString()};
      color: ${props.theme.textColor.black.toString()};

      ${Message} {
        color: ${props.theme.alertMessage.error.default.toString()};
      }
    `};

  ${props =>
    props.warning &&
    css`
      background: ${props.theme.alertMessage.warning.fader.toString()};
      border: 1px solid ${props.theme.alertMessage.warning.grayscale.toString()};
      color: ${props.theme.alertMessage.warning.default.toString()};

      ${Message} {
        color: ${props.theme.alertMessage.warning.default.toString()};
      }
    `};

  ${props =>
    props.info &&
    css`
      background: ${props.theme.textSecondary.fade.toString()};
      border: 1px solid ${props.theme.alertMessage.info.light.toString()};
      color: ${props.theme.textColor.black.toString()};

      ${Message} {
        color: ${props.theme.alertMessage.info.default.toString()};
        margin-bottom: 0;
      }
    `};
`;

export const FieldsetStyle = css`
  margin-bottom: 8rem;
`;

export const LabelStyle = css``;

// * * * * * * * * * * * *
// OVERLAY
// * * * * * * * * * * * *
export const InnerContainer = styled.div`
  color: ${props => props.theme.textPrimary.default.toString()};
  transition: ${props => props.theme.transition};
`;

export const IntroContainer = styled(InnerContainer)`
  font-size: 1.6rem;
  position: relative;
`;

// This will be replaced soon by 'Close' style component
export const CloseButton = styled.div`
  position: absolute;
  right: 0;
  margin-right: -1rem;
  cursor: pointer;
`;

export const Close = styled.div`
  position: absolute;
  right: 0;
  margin-right: -1rem;
  cursor: pointer;
`;

export const OverlayHeader = styled(H4)`
  text-transform: ${props => (props.uppercase ? 'uppercase' : 'none')};
`;

export const Note = styled.p`
  color: ${props => props.theme.textSecondary.default.toString()};
`;

export const ErrorCaption = styled.div`
  text-align: center;
  background-color: rgba(208, 2, 27, 0.2);
  padding: 1.5rem 2.5rem;
  border: 1px solid #d0021b;
  color: #d0021b;
  margin-bottom: 4rem;
  font-family: 'Futura PT Medium';
  border-radius: 0.5rem;
  box-shadow: ${props => props.theme.boxShadow};
`;

export const Wrapper = css`
  display: flex;
`;

export const Card = styled.div`
  display: flex;
  flex-direction: ${props => (props.column ? 'column' : '')};
  flex-grow: 1;

  background: ${props => props.theme.backgroundDefault.default.toString()};
  border: 1px solid ${props => props.theme.cardBorderColor.lighter.toString()};
  border-radius: ${props => props.theme.borderRadius};
  box-shadow: ${props => props.theme.boxShadow};
  margin-bottom: 5rem;
  padding: ${props => props.theme.cardPaddingX}rem ${props => props.theme.cardPaddingY}rem;
`;

export const CardItem = css`
  display: flex;
  flex-direction: ${props => (props.column ? 'column' : '')};
  flex-grow: 1;
`;

const WIDTH_OVERLAY = '480px';

export const TransparentOverlay = styled.div`
  background-color: #000;
  opacity: 0.75;
  transition: ${props => props.theme.transition};
  width: calc(100% - ${WIDTH_OVERLAY});

  ${media.tablet`width: 40%`}
  ${media.mobile`width: 0%`}

  ${props =>
    props.large &&
    css`
      width: 25%;

      ${media.tablet`
        width: 0%
      `};
    `}
`;

export const DrawerContainer = styled.div`
  background-color: ${props => props.theme.backgroundDefault.default.toString()};
  padding: 5rem;
  width: ${WIDTH_OVERLAY};
  overflow-y: scroll;

  ${media.tablet`width: 60%`}
  ${media.mobile`width: 100%`}

  ${props =>
    props.large &&
    css`
      overflow-y: scroll;
      width: 75%;
      background: ${props.theme.backgroundTertiary.lightest.toString()};

      ${media.tablet`
        width: 100%
      `};
    `}

`;
// TODO: Update NoteContainer on Overlay/KYC/index before deleting this
export const NoteContainer = styled.div`
  background-color: ${props => props.theme.backgroundSecondary.fade.toString()};
  border: 1px solid ${props => props.theme.buttonBorderSecondary.default.toString()};
  border-radius: 3px;
  box-shadow: ${props => props.theme.boxShadow};
  margin: 3rem 0;
  padding: 3rem 4rem;
  text-align: center;
`;

export const StatusNote = styled.p`
  color: ${props => props.theme.textSecondary.default.toString()};
  font-size: 2.4rem;

  span {
    display: block;
    color: ${props => props.theme.buttonResponseYes.default.toString()};
    font-family: 'Futura PT Heavy';
  }
`;

export const Label = styled.label`
  font-family: 'Futura PT Book', sans-serif;
  font-size: ${props => props.theme.fontSize};
  margin-bottom: 0.75rem;
  text-transform: ${props => (props.uppercase ? 'uppercase' : 'inherit')};

  span {
    ${props =>
      props.req &&
      css`
        color: ${props.theme.alertMessage.error.default.toString()};
      `};
  }

  ${props =>
    props.error &&
    css`
      color: ${props.theme.alertMessage.error.default.toString()};
    `};
`;

export const Hint = styled.div`
  color: ${props => props.theme.textDefault.light.toString()};
  font-family: 'Futura PT Book', sans-serif;
  font-size: 1.4rem;
  ${props =>
    props.error &&
    css`
      color: ${props.theme.alertMessage.error.default.toString()};
    `};
`;

export const FieldItem = styled.div`
  margin: 2rem 0;
`;

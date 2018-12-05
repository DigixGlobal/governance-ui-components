import styled, { css } from 'styled-components';

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
`;
export default H2;

export const H3 = styled.h3`
  color: ${props =>
    props.primary
      ? props.theme.textPrimary.light.toString()
      : props.theme.textDefault.default.toString()};
  font-family: 'Futura PT Light';
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
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
  padding: 8em 10em;
`;

export const LeftPanel = css``;
export const RightPanel = css``;

export const HR = styled.hr`
  border: 0.5px solid ${props => props.theme.backgroundLayout.default.toString()};
  width: 100%;
  margin: 2rem 0;
`;

const Button = {
  cursor: 'pointer',
  fontFamily: 'Futura PT Medium',

  textAlign: 'center',
  textDecoration: 'none',
  textTransform: 'uppercase',
  outline: 'none',
  padding: '1rem 2rem',
  margin: '1rem',
  transition: 'all 0.3s ease',
};

export const ButtonStyles = css`
  ${Button};

  background: ${props =>
    props.primary
      ? props.theme.buttonBgPrimary.default.toString()
      : props.theme.buttonBgSecondary.default.toString()};

  color: ${props =>
    props.primary
      ? props.theme.buttonTextPrimaryReverse.toString()
      : props.theme.buttonTextSecondaryReverse.toString()};

  border: 2px solid
    ${props =>
      props.primary
        ? props.theme.buttonBorderPrimary.toString()
        : props.theme.buttonBorderSecondary.default.toString()};
  &:hover {
    background-color: transparent;
    color: ${props =>
      props.primary
        ? props.theme.buttonTextPrimary.toString()
        : props.theme.buttonTextSecondary.toString()};
  }
`;

export const GhostBtn = css`
  background-color: transparent;
  color: ${props =>
    props.primary
      ? props.theme.buttonTextPrimary.toString()
      : props.theme.buttonTextSecondary.toString()};

  &:hover {
    background: ${props =>
      props.primary
        ? props.theme.buttonBgPrimary.default.toString()
        : props.theme.buttonBgSecondary.default.toString()};
    color: ${props =>
      props.primary
        ? props.theme.buttonTextPrimaryReverse.toString()
        : props.theme.buttonTextSecondaryReverse.toString()};
  }
`;

export const DisabledBtn = css`
  background-color: transparent;
  border-color: ${props => props.theme.buttonBorderDisabled.toString()};
  color: ${props => props.theme.textDefault.lighter.toString()};
  &:hover {
    background-color: transparent;
    border-color: ${props => props.theme.buttonBorderDisabled.toString()};
    color: ${props => props.theme.textDefault.lighter.toString()};
  }
`;

export const Container = css`
  display: flex;
  flex-direction: ${props => props.column && 'column'};
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

export const CloseButton = styled.div`
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

export const NoteContainer = styled.div`
  background-color: ${props => props.theme.buttonBgSecondary.fade.toString()};
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

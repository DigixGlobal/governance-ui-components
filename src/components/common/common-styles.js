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

  font-size: 4.6rem;
  margin: 0;
`;

export const H2 = styled.h2`
  color: ${props => props.color || props.theme.textDefault.default.toString()};
  margin-bottom: 2rem;
`;
export default H2;

export const H3 = styled.h3`
  color: ${props => props.color || props.theme.primary};
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
      color: ${props => props.theme.linkSecondaryColor.default.toString()};
    `};
`;

export const ContentWrapper = styled.div`
  flex: 5 0 0;
  padding: 8em 10em;
`;

export const HR = styled.hr`
  border: 0.5px solid ${props => props.theme.backgroundLayout.default.toString()};
  width: 100%;
  margin: 2rem 0;
`;

const Button = {
  cursor: 'pointer',
  textAlign: 'center',
  textDecoration: 'none',
  textTransform: 'uppercase',
  outline: 'none',
  padding: '1em 2em',
  margin: '1rem',
  transition: 'all 0.3s ease',
};

export const ButtonStyles = css`
  ${Button};

  background: ${props =>
    props.primary
      ? props.theme.buttonBgPrimary.toString()
      : props.theme.buttonBgSecondary.toString()};

  color: ${props =>
    props.primary
      ? props.theme.buttonTextPrimaryReverse.toString()
      : props.theme.buttonTextSecondaryReverse.toString()};

  border: 2px solid
    ${props =>
      props.primary
        ? props.theme.buttonBorderPrimary.toString()
        : props.theme.buttonBorderSecondary.toString()};
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
        ? props.theme.buttonBgPrimary.toString()
        : props.theme.buttonBgSecondary.toString()};
    color: ${props =>
      props.primary
        ? props.theme.buttonTextPrimaryReverse.toString()
        : props.theme.buttonTextSecondaryReverse.toString()};
  }
`;

export const DisabledBtn = css`
  background-color: transparent;
  border-color: ${props => props.theme.buttonBorderDisabled.toString()};
  color: ${props => props.theme.textDefault.lightest.toString()};
  &:hover {
    background-color: transparent;
    border-color: ${props => props.theme.buttonBorderDisabled.toString()};
    color: ${props => props.theme.textDefault.lightest.toString()};
  }
`;

import styled, { css } from 'styled-components';

export const Avatar = styled.img`
  width: 5rem;
  height: 5rem;
  border-radius: 50%;
`;

export const H1 = styled.h1`
  color: ${props => props.color || props.theme.primary};
  font-size: 5rem;
  margin: 0;
`;

const H2 = styled.h2`
  color: ${props => props.color || props.theme.primary};
  font-size: 2.4rem;
  margin-bottom: 1rem;
`;
export default H2;

export const H3 = styled.h3`
  color: ${props => props.color || props.theme.primary};
  font-size: 2rem;
  margin: 0;
`;

export const H4 = styled.h4`
  font-family: 'Futura PT Medium';
  color: ${props => props.color || props.theme.primary};
  font-size: 1.6rem;
  margin: 0;
`;

export const H5 = styled.h5`
  color: ${props => props.color || props.theme.primary};
  font-size: 1.4rem;
  margin: 0;
`;

export const A = styled.a`
  color: ${props => props.theme.primary};

  ${props =>
    props.secondary &&
    css`
      color: #c4a159;
    `};
`;

export const ContentWrapper = styled.div`
  flex: 5 0 0;
  padding: 8em 10em;
`;

export const HR = styled.hr`
  border: 0.5px solid ${props => props.theme.backgroundColor.default.toString()};
  width: 100%;
  margin: 2rem 0;
`;

const Button = {
  transition: 'all 0.3s ease',
  cursor: 'pointer',
  textAlign: 'center',
  textDecoration: 'none',
  textTransform: 'uppercase',
  fontFamily: '"Futura PT Light", Roboto, sans-serif',
  outline: 'none',
  padding: '1em 2em',
  margin: '1rem',
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
        : props.theme.buttonTextSecondaryReverse.toString()};
  }
`;

export const GhostBtn = css`
  background-color: transparent;
  color: ${props =>
    props.primary
      ? props.theme.buttonTextPrimary.toString()
      : props.theme.buttonTextSecondaryReverse.toString()};

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
  border-color: ${props => props.theme.buttonBorderDisabled.toString()};
`;

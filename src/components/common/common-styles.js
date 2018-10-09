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

export const H2 = styled.h2`
  color: ${props => props.color || props.theme.primary};
  font-size: 3.5rem;
  margin: 0;
`;

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

export const A = styled.a`
  color: ${props => props.theme.primary};

  ${props =>
    props.secondary &&
    css`
      color: #c4a159;
    `};
`;

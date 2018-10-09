import styled from 'styled-components';

export const Avatar = styled.img`
  width: 5rem;
  height: 5rem;
  border-radius: 50%;
`;

export const H1 = styled.h1`
  color: ${props => props.color || props.theme.primary};
  font-size: 2rem;
  margin: 0;
`;

const H2 = styled.h2`
  color: ${props => props.color || props.theme.primary};
  font-size: 2.4rem;
  margin: 1em 0;
`;
export default H2;

export const H3 = styled.h3`
  color: ${props => props.color || props.theme.primary};
  font-size: 1rem;
  margin: 0;
`;

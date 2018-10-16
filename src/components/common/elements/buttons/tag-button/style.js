import styled, { css } from 'styled-components';

export const Button = styled.a`
  color: ${props => props.theme.tagColor.toString()};
  font-weight: 600;
  font-size: 1.3rem;
  text-decoration: none;

  ${props =>
    props.uppercase &&
    css`
      text-transform: uppercase;
    `} ::before {
    content: '● ';
    color: ${props => props.theme.tagColor.toString()};
    font-size: 130%;
  }
`;

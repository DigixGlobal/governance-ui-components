import styled, { css } from 'styled-components';

export const Button = styled.a`
  color: ${props => props.theme.tagColor.toString()};
  font-weight: 600;
  font-size: 1.3rem;
  text-decoration: none;

  ::before {
    content: '● ';
    color: ${props => props.theme.buttonTagColor.toString()};
    font-size: 130%;
  }

  ${props =>
    props.uppercase &&
    css`
      text-transform: uppercase;
    `};
`;

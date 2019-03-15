import styled, { css } from 'styled-components';

export const TagBtn = styled.button`
  font-family: 'Futura PT Book', sans-serif;
  font-size: 1.1rem;
  padding: 0.5rem 0.75rem;
  text-decoration: none;
  text-transform: uppercase;
  letter-spacing: 0.075em;
  border: 0;
  pointer-events: none;

  ${props =>
    props.filled &&
    css`
      background: ${props.theme.buttonBgTertiaryReverse.default.toString()};
      border-radius: ${props.theme.borderRadius};
      color: ${props.theme.buttonTextDefaultReverse.default.toString()};

      margin-right: 1.25rem;
    `};

  ${props =>
    props.showIcon &&
    css`
    background: transparent;
    color: ${props.theme.buttonFlatColor.default.toString()};
    padding-left: 0;

    ::before {
      content: '● ';
      color: ${props.theme.buttonFlatColor.default.toString()};
      font-size: 140%;
  `};
`;

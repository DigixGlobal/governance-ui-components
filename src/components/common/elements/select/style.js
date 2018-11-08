import styled, { css } from 'styled-components';

const StyledSelect = styled.select`
  background-image: linear-gradient(
      45deg,
      transparent 50%,
      ${props => props.theme.borderColor.light.toString()} 50%
    ),
    linear-gradient(
      135deg,
      ${props => props.theme.borderColor.light.toString()} 50%,
      transparent 50%
    ),
    linear-gradient(
      to right,
      ${props => props.theme.borderColor.lightest.toString()},
      ${props => props.theme.borderColor.lightest.toString()}
    );
  background-color: ${props => props.theme.backgroundDefault.default.toString()};

  background-position: calc(100% - 20px) calc(2em + 2px), calc(100% - 15px) calc(2em + 2px),
    calc(100% - 3em) 0.5em;

  ${props =>
    props.small &&
    css`
      background-position: calc(100% - 20px) calc(1em + 2px), calc(100% - 15px) calc(1em + 2px),
        calc(100% - 2.5em) 0.5em;
    `};

  background-size: 5px 5px, 5px 5px, 1px 80%;
  background-repeat: no-repeat;
  border: 1px solid ${props => props.theme.borderColor.lighter.toString()};
  border-radius: ${props => (props.rounded ? '2rem' : '.5rem')};
  color: ${props => props.color || props.theme.textDefault.default.toString()};
  padding: ${props => (props.small ? '1rem' : '2rem')};
  font-size: 1.2rem;
  width: ${props => props.width || '100%'};
  outline: none;
  margin: 1rem 0;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;

  -webkit-appearance: none;
  -moz-appearance: none;
`;

export default StyledSelect;

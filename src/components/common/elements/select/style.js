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
  background-position: calc(100% - 20px) calc(1.5em + 2px), calc(100% - 15px) calc(1.5em + 2px),
    calc(100% - 3em) 0.5em;
  background-size: 5px 5px, 5px 5px, 1px 80%;
  background-repeat: no-repeat;

  color: ${props => props.color || props.theme.textDefault.default.toString()};
  padding: ${props => (props.small ? '1rem' : '1.75rem')};
  line-height: 1.6rem;
  font-size: 1.4rem;
  width: ${props => props.width || '100%'};
  outline: none;
  margin: 0.5rem 0;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;

  -webkit-appearance: none;
  -moz-appearance: none;

  border: none;
  border-radius: 0;
  cursor: pointer;

  ${props =>
    props.small &&
    css`
      background-position: calc(100% - 20px) calc(1em + 2px), calc(100% - 15px) calc(1em + 2px),
        calc(100% - 2.5em) 0.5em;
      max-width: 150px;
    `};

  ${props =>
    props.error &&
    css`
      border-color: ${props.theme.errorBorder.toString()};
    `};
`;

export default StyledSelect;

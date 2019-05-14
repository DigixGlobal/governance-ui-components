import styled, { css } from 'styled-components';

const StyledSelect = styled.select`
  display: block;
  font-size: 1.2rem;
  color: ${props => props.theme.textColor.default.base.toString()};
  border: none;
  padding: ${props => (props.small ? '1rem' : '0.5rem 2.5rem 0.75rem 0.75rem')};
  text-transform: uppercase;
  width: ${props => props.width || 'auto'};
  -moz-appearance: none;
  -webkit-appearance: none;
  appearance: none;
  outline: none;

  background-color: transparent;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 306 306'%3E%3Cpath fill='%23464E5B' d='M0,94.3l35.7-35.7L153,175.9L270.3,58.7L306,94.3l-153,153L0,94.3z' /%3E%3C/svg%3E");
  background-repeat: no-repeat, repeat;
  background-position: right 1em top 50%, 0 0;
  background-size: 1rem auto, 100%;

  &::-ms-expand {
    display: none;
  }

  &:hover {
  }

  &:focus {
    border-color: none;
    box-shadow: none;
    outline: 0;
  }

  & option {
    margin: 1rem;
  }

  ${props => props.small && css``};

  ${props =>
    props.error &&
    css`
      border-color: ${props.theme.errorBorder.toString()};
    `};
`;

export default StyledSelect;

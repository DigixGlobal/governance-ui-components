import styled, { css } from 'styled-components';
import { Button } from '../../../elements/index';

export const LinkButton = styled(Button)`
  cursor: pointer;
  font-family: 'Futura PT Medium';
  font-size: 1.4rem;
  margin: 1rem;
  outline: none;
  padding: 1.2rem 2rem;
  text-align: center;
  text-decoration: none;
  text-transform: uppercase;
  transition: all 0.3s ease;

  border-radius: 4px;
  background: ${props => props.theme.buttonBgSecondary.fade.toString()};
  border-color: ${props => props.theme.buttonTextPrimary.default.toString()};
  color: ${props => props.theme.buttonTextPrimary.default.toString()};
  &:hover {
    background: ${props => props.theme.buttonBgSecondary.default.toString()};
    color: ${props => props.theme.buttonTextPrimaryReverse.default.toString()};
  }

  ${props =>
    props.large &&
    css`
      padding: 1.5rem 3rem;
      font-size: 1.6rem;
    `};

  ${props =>
    props.fluid &&
    css`
      margin-left: 0;
      margin-right: 0;
      width: 100%;
    `};
`;

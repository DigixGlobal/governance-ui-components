import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Input } from '@digix/gov-ui/components/common/elements/index';

export const UnlockDGDContainer = styled.div`
  display: flex;
  align-items: center;
  background: ${props => props.theme.backgroundDefault.toString()};
  border-radius: ${props => props.theme.borderRadius};
  border: 1px solid ${props => props.theme.borderColor.light.toString()};
  color: ${props => props.theme.textDefault.default.toString()};
  margin: 1rem 0;
  position: relative;
`;

export const TextBox = styled(Input)`
  font-size: 1.6rem;
  margin: 0;
  width: calc(100% - 110px);
  border: 0;
  outline: 0;

  ::placeholder {
    text-align: right;
    transition: opacity 0.5s 0.5s ease;
    opacity: 0;
  }

  padding-right: 0.5rem;
`;

export const MaxAmount = styled(Link)`
  margin: 0 0.5rem;
  text-decoration: underline;
  color: ${props => props.theme.textDefault.light.toString()};
  font-family: 'Futura PT Light', sans-serif;
  font-size: 1.4rem;
`;

export const Currency = styled.div`
  font-size: 1.4rem;
`;

export const CallToAction = styled.div`
  margin-top: 2rem;
`;

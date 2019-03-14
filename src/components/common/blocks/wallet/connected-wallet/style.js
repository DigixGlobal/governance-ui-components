import styled from 'styled-components';

import { Icon } from '@digix/gov-ui/components/common/elements/index';

export const Container = styled.div`
  padding: 1rem 0;
  display: flex;
  flex-direction: column;
`;

export const Address = styled.div`
  color: ${props => props.theme.borderColor.darker.toString()};
  text-transform: uppercase;
  font-family: 'Futura PT Book', sans-serif;
  font-size: 1.4rem;
  color: ${props => props.theme.textColor.default.light.toString()};
  margin: 1rem 0;

  > span {
    color: ${props => props.theme.textPrimary.default.toString()};
    display: block;
    font-size: 1.6rem;
    margin-top: 0.5rem;
  }
`;

export const Token = styled.div`
  display: flex;
  align-items: center;

  background: ${props => props.theme.card.background.base.toString()};
  border: 1px solid ${props => props.theme.card.border.lighter.toString()};
  border-radius: ${props => props.theme.borderRadius};
  padding: 2rem;
  margin: 1rem 0;

  div:first-child {
    margin-right: 2rem;
  }
`;

export const TokenValue = styled.div`
  font-family: 'Futura PT Medium', sans-serif;
  font-size: 1.8rem;
`;

export const UsdEquivalent = styled.div`
  font-family: 'Futura PT Light', sans-serif;
  font-size: 1.4rem;
`;

export const Notes = styled.div`
  margin-top: 5rem;

  & > ul {
    margin-left: 1.5rem;

    li {
      margin-bottom: 0.5rem;
    }
  }
`;

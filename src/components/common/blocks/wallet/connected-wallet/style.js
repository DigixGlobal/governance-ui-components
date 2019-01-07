import styled from 'styled-components';

import { H5 } from '../../../common-styles';

import { Container as IconContainer } from '../../../../common/elements/icons/style.js';

export const Container = styled.div`
  padding: 1rem 0;
  display: flex;
  flex-direction: column;
`;

export const AddressInfo = styled.div`
  color: ${props => props.theme.borderColor.darker.toString()};
  text-transform: uppercase;
  font-family: 'Futura PT Book';
  > span {
    color: ${props => props.theme.textPrimary.default.toString()};
    font-family: 'Futura PT Medium';
    display: block;
  }
`;

export const TokenInfo = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid ${props => props.theme.borderColor.lighter.toString()};
  border-radius: ${props => props.theme.borderRadius};
  padding: 2rem;
  background-color: ${props => props.theme.textContrast.default.toString()};
  margin: 1rem 0;
`;

export const TokenIcon = styled.div`
  border: 3px solid ${props => props.theme.borderColor.darker.toString()};
  border-radius: 50%;
  margin-right: 1rem;
  height: 3.2rem;
  width: 3.2rem;
  padding: 1px;
  display: flex;
  justify-content: center;
  align-items: center;
  ${IconContainer} {
    margin-right: 0;
  }
`;

export const TokenDetails = styled.div`
  flex: 1;
`;

export const TokenValue = styled.div`
  font-family: 'Futura PT Medium';
  font-size: 1.6rem;
  & > span {
    margin-left: 0.5rem;
    color: ${props => props.theme.borderColor.default.toString()};
    font-family: 'Futura PT Book';
  }
`;

export const UsdEquivalent = styled.div`
  font-family: 'Futura PT Light';
  font-size: 1.4rem;
  & > span {
    color: ${props => props.theme.textDefault.default.toString()};
    margin-left: 0.5rem;
  }
`;

export const Notes = styled.div`
  margin-top: 5rem;

  & > ul {
    margin-left: 1.5rem;
  }
`;

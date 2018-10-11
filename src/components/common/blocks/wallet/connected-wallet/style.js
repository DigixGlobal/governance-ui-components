import styled from 'styled-components';

import { H5 } from '../../../common-styles';

import { DGD } from '../../../../common/elements/icons/DGD';

export const Container = styled.div`
  padding: 1rem 0;
  display: flex;
  flex-direction: column;
`;

export const AddressInfo = styled(H5)`
  color: ${props => props.theme.borderColor.darker.toString()};
  font-size: 1.2rem;
  text-transform: uppercase;
  > span {
    color: ${props => props.theme.primary.default.toString()};
    display: block;
  }
`;

export const TokenInfo = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid ${props => props.theme.borderColor.darker.toString()};
  padding: 2rem;
  background-color: ${props => props.theme.textColorInverted.default.toString()};
  margin: 1rem 0;
`;

export const TokenIcon = styled.div`
  border: 3px solid ${props => props.theme.borderColor.darker.toString()};
  border-radius: 50%;
  margin-right: 1rem;
  padding: 1px;
`;

export const TokenDetails = styled.div`
  flex: 1;
`;

export const TokenValue = styled.div`
  font-family: 'Futura PT Medium';
  & > span {
    margin-left: 0.5rem;
    color: ${props => props.theme.backgroundColor.darker.toString()};
    font-family: 'Futura PT Light';
  }
`;

export const UsdEquivalent = styled.div`
  font-family: 'Futura PT Light';
  font-size: 1rem;
  & > span {
    color: ${props => props.theme.backgroundColor.darker.toString()};
    margin-left: 0.5rem;
  }
`;

export const DevNote = styled.p`
  color: ${props => props.theme.borderColor.darker.toString()};
`;

export const Notes = styled.div`
  margin-top: 5rem;

  & > ul {
    margin-left: 1.5rem;
  }
`;

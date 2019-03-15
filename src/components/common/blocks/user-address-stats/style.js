import styled from 'styled-components';
import { Card } from '@digix/gov-ui/components/common/common-styles';
import { media } from '@digix/gov-ui/components/common/breakpoints';

export const UserStats = styled(Card)`
  text-transform: uppercase;

  ${media.mobile`
      flex-direction: column;
  `};
`;

export const Item = styled.div`
  border-right: 1px solid ${props => props.theme.cardBorderColor.lighter.toString()};
  display: inline-block;
  padding-left: 5%;
  flex: 1;

  :last-child {
    border-right: none;
  }

  ${media.mobile`
    border-right: none;
    margin-bottom: 2rem;
    padding-left: 0;
    
    &:last-child {
      margin-bottom: 0;
    }
  `};
`;

export const Label = styled.div`
  text-align: left;
  ${media.mobile`
    text-align: center;
  `};
`;

export const Data = styled.div`
  margin-top: 1rem;
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
  font-family: 'Futura PT Medium';
  font-size: 3.6rem;
  text-align: left;

  span {
    &.equiv {
      font-family: 'Futura PT Book', sans-serif;
      font-size: 1.4rem;
      margin-left: 1rem;
      margin-bottom: 0.75rem;
    }
  }

  ${media.mobile`
      flex-direction: column;
      align-items: center;
      margin-top: 0;
  `};
`;

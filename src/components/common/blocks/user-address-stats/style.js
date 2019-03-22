import styled from 'styled-components';
import { Card } from '@digix/gov-ui/components/common/common-styles';
import { media } from '@digix/gov-ui/components/common/breakpoints';

export const UserStats = styled(Card)`
  text-transform: uppercase;
  padding: 0;

  ${media.mobile`
      flex-direction: column;
  `};
`;

export const Item = styled.div`
  border-right: 1px solid ${props => props.theme.cardBorderColor.lighter.toString()};
  display: inline-block;
  padding: 3rem 5rem 2.5rem 5rem;
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
  font-family: 'Futura PT Heavy', sans-serif;

  ${media.mobile`
    text-align: center;
  `};
`;

export const Data = styled.div`
  margin-top: 1rem;
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
  font-family: 'Futura PT Heavy';
  font-size: 3.8rem;
  text-align: left;

  span {
    &.equiv {
      font-family: 'Futura PT Light', sans-serif;
      font-size: 1.6rem;
      color: ${props => props.theme.textColor.default.base.toString()};
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

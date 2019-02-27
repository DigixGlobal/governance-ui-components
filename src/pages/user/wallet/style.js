import styled from 'styled-components';
import { H1, Card, CardItem } from '@digix/gov-ui/components/common/common-styles';
import { media } from '@digix/gov-ui/components/common/breakpoints';

export const WalletWrapper = styled.div``;
export const Heading = styled(H1)``;
export const Address = styled.div`
  color: ${props => props.theme.textPrimary.light.toString()};
  font-family: 'Futura PT Book', sans-serif;
  font-size: 1.8rem;
  margin-bottom: 5rem;

  span {
    display: inline-block;
    min-width: 10rem;

    &:last-child {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
`;
export const WalletDetails = styled(Card)`
  ${media.mobile`
    flex-direction: column;
  `};
`;
export const WalletItem = styled.div`
  ${CardItem};
`;
export const QtrSummary = styled.div`
  display: flex;

  ${media.tablet`
    flex-direction: column;
  `}
`;

export const QtrParticipation = styled.div`
  flex: 1;
  color: ${props => props.theme.textPrimary.default.toString()};
  display: flex;
  flex-direction: column;
  margin-right: 3rem;
  &:last-child {
    margin-right: 0;
  }
  ${media.tablet`
    margin-top: 1rem; 
    margin-right: 0;
  `}
`;
export const Title = styled.div`
  color: ${props => props.theme.textPrimary.light.toString()};
  font-family: 'Futura PT Medium', sans-serif;
  font-size: 1.8rem;
  margin-bottom: 2rem;
`;
export const Detail = styled(Card)`
  flex-direction: column;
  flex: 1 0 auto;
`;
export const Label = styled.div`
  text-transform: uppercase;
  margin-top: 1rem;
`;
export const Data = styled.div`
  font-size: 3.8em;
  margin: 1rem 0 0;
  text-transform: uppercase;
`;
export const Desc = styled.p`
  margin-top: 3rem;
`;
export const Actions = styled.div`
  margin-top: 3rem;
  & > button:first-child {
    margin-left: 0;
  }
`;

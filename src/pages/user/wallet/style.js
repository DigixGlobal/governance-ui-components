import styled from 'styled-components';
import { H1, Card, CardItem } from '@digix/gov-ui/components/common/common-styles';
import { media } from '@digix/gov-ui/components/common/breakpoints';

export const WalletWrapper = styled.div``;
export const Heading = styled(H1)``;
export const WalletAddress = styled.div`
  color: ${props => props.theme.textPrimary.light.toString()};
  font-family: 'Futura PT Book', sans-serif;
  font-weight: 500;
  font-size: 2rem;
  margin-top: 3rem;

  span {
    display: inline-block;
    min-width: 10rem;
  }
`;
export const WalletDetails = styled(Card)`
  ${media.mobile`flex-direction: column;`};
`;
export const WalletItem = styled.div`
  ${CardItem};
`;
export const DigixDAO = styled.div`
  display: flex;
  ${media.mobile`flex-direction: column;`}
`;
export const StakeRewards = styled.div`
  width: calc(100% / 3);
  color: ${props => props.theme.textPrimary.default.toString()};
  display: flex;
  flex-direction: column;
  margin-top: 5rem;
  margin-right: 3rem;
  &:last-child {
    margin-right: 0;
  }
  ${media.mobile`margin-top: 1rem; margin-right: 0;`}
`;
export const Title = styled.div`
  color: ${props => props.theme.textPrimary.default.toString()};
  font-family: 'Futura PT Book', sans-serif;
  font-weight: 500;
  font-size: 2rem;
  margin-bottom: 2rem;
`;
export const Content = styled(Card)`
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
export const Desc = styled.div`
  margin-top: 3rem;
`;
export const Actions = styled.div`
  margin-top: 3rem;
  & > button:first-child {
    margin-left: 0;
  }
`;

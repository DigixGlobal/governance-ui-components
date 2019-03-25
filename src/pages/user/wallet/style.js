import styled from 'styled-components';
import { H1, Card } from '@digix/gov-ui/components/common/common-styles';
import { Icon } from '@digix/gov-ui/components/common/elements/index';
import { media } from '@digix/gov-ui/components/common/breakpoints';

export const WalletWrapper = styled.div``;
export const Heading = styled(H1)`
  margin-bottom: 3rem;
`;

export const Address = styled.div`
  color: ${props => props.theme.textColor.default.base.toString()};
  font-family: 'Futura PT Book', sans-serif;
  font-size: 2rem;
  margin-bottom: 1rem;

  span {
    display: inline-block;
    margin-right: 1rem;
  }
`;
export const WalletDetails = styled(Card)`
  ${media.tablet`
    flex-direction: column;
  `};
`;
export const Item = styled.div`
  border: 1px solid ${props => props.theme.borderColor.lighter.toString()};
  border-radius: ${props => props.theme.borderRadius};
  flex: 1;
  margin-right: 3rem;
  padding: 3rem;

  display: flex;

  > div {
    height: 100%;
  }

  &:last-child {
    margin-right: 0;
  }

  ${media.tablet`
    margin-right: 0;
    margin-bottom: 2rem;
    

    &:last-child {
      margin-bottom: 0;
    }
  `};

  ${media.tablet`
    padding: 2rem;
  `};
`;

export const Amount = styled.div`
  font-family: 'Futura PT Medium', sans-serif;
  div {
    &:first-child {
      font-size: 1.8rem;
      margin-bottom: 0.5rem;
    }
    &:last-child {
      font-size: 1.4rem;
      font-family: 'Futura PT Book', sans-serif;
      color: ${props => props.theme.textColor.default.light.toString()};
    }
  }
  span {
  }
`;

export const QtrSummary = styled.div`
  display: flex;

  ${media.tablet`
    flex-direction: column;
  `}
`;

export const QtrParticipation = styled.div`
  flex: 1;
  color: ${props => props.theme.textColor.default.base.toString()};
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
  color: ${props => props.theme.textColor.primary.base.toString()};
  font-family: 'Futura PT Medium', sans-serif;
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
`;

export const Detail = styled(Card)`
  flex-direction: column;
  flex: 1 0 auto;

  padding: 3rem 4rem;
`;

export const Label = styled.div`
  text-transform: uppercase;
  margin-top: 1rem;
  font-family: 'Futura PT Heavy', sans-serif;
`;

export const Data = styled.div`
  color: ${props => props.theme.textColor.default.base.toString()};
  font-size: 3.8rem;
  font-family: 'Futura PT Heavy', sans-serif;
  margin: 1rem 0 0;
  text-transform: uppercase;
`;

export const Desc = styled.p`
  margin-top: 1rem;
  font-size: ${props => props.theme.fontSize};
`;

export const Actions = styled.div`
  margin-top: 2rem;
  & > button:first-child {
    margin-left: 0;
  }
`;

export const WalletCurrencyIcon = styled(Icon)`
  width: 5rem;
`;

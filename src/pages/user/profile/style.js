import styled from 'styled-components';
import { H1, Card, CardItem } from '@digix/gov-ui/components/common/common-styles';
import { media } from '@digix/gov-ui/components/common/breakpoints';

export const ProfileWrapper = styled.div``;
export const Heading = styled(H1)`
  margin-bottom: 1rem;
`;
export const UserInfo = styled.div`
  margin-bottom: 5rem;
`;
export const UserItem = styled.div`
  display: flex;
  align-items: center;
  color: ${props => props.theme.textPrimary.default.toString()};
  font-family: 'Futura PT Medium', sans-serif;
  font-size: 1.6rem;
  margin: 1.5rem 0;
`;

export const UserLabel = styled.span`
  min-width: 10rem;
`;
export const UserData = styled.span`
  margin-right: 1rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

// BEGIN: Styles for User Stats

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

// END: Styles for User Stats

export const ActivitySummary = styled.div`
  display: flex;

  ${media.tablet`
    flex-direction: column;
  `}
`;
export const ActivityItem = styled(Card)`
  color: ${props => props.theme.textPrimary.default.toString()};
  flex-grow: 1;
  flex-basis: 0;
  font-family: 'Futura PT Medium', sans-serif;
  margin-right: 3rem;

  &:last-child {
    margin-right: 0;
  }

  ${media.tablet`
    align-items: center;
    flex-basis: auto;
    margin-right: 0;
  `}
`;
export const Moderation = styled(Card)`
  color: ${props => props.theme.textPrimary.default.toString()};
  flex-direction: column;
  font-family: 'Futura PT Medium', sans-serif;
`;
export const Criteria = styled.div`
  ${CardItem};
  align-items: center;
  justify-content: flex-start;
  font-family: 'Futura PT Medium', sans-serif;
  margin: 3rem 0 0;

  ${media.mobile`flex-direction: column;`}
`;
export const ModeratorReqs = styled.div`
  ${CardItem};
  flex-grow: 0;
  align-items: flex-end;
`;

export const ReqLabel = styled.div`
  margin-bottom: 1.1rem;
  margin-left: 1rem;
  text-transform: uppercase;
  letter-spacing: 0.2rem;
`;
export const Plus = styled.div`
  display: flex;
  margin: 0 3rem;

  svg {
    fill: ${props => props.theme.icon.default.default.toString()};
  }
`;

export const Actions = styled.div`
  margin-top: 3rem;

  & > button {
    margin-left: 0;
  }
`;

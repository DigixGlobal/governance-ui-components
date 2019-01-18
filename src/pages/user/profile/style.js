import styled from 'styled-components';
import { H1, Card, CardItem } from '@digix/gov-ui/components/common/common-styles';
import { media } from '@digix/gov-ui/components/common/breakpoints';

export const ProfileWrapper = styled.div``;
export const Heading = styled(H1)`
  margin-bottom: 1rem;
`;
export const UserInfo = styled.div`
  margin-bottom: 5rem;
  span {
    display: inline-block;
    min-width: 7rem;
  }
`;
export const WalletInfo = styled.div`
  color: ${props => props.theme.textPrimary.default.toString()};
  font-family: 'Futura PT Medium', sans-serif;
  font-size: 2rem;
  margin-bottom: 0.5rem;
`;
export const UserStatus = styled.div`
  color: ${props => props.theme.textSecondary.default.toString()};
  font-family: 'Futura PT Medium', sans-serif;
  font-size: 2rem;
`;
export const RewardSummary = styled.div`
  ${Card};

  color: ${props => props.theme.textPrimary.default.toString()};
  font-family: 'Futura PT Medium', sans-serif;
  margin-bottom: 5rem;

  ${media.mobile`flex-direction: column;`}
`;
export const RewardItem = styled.div`
  ${CardItem};

  border-right: 1px solid ${props => props.theme.borderColor.lighter.toString()};
  align-items: center;

  &:last-child {
    border-right: 0;
  }

  ${media.mobile`border-right: 0;`}
`;

export const Label = styled.div`
  text-transform: uppercase;
  letter-spacing: 0.2rem;
  margin-top: 1rem;
`;
export const Data = styled.div`
  font-size: 3.8em;
  margin: 1rem 0 0;
`;
export const ActivitySummary = styled.div`
  display: flex;
  ${media.mobile`flex-direction: column;`}
`;
export const ActivityItem = styled.div`
  ${Card};
  color: ${props => props.theme.textPrimary.default.toString()};
  flex-direction: column;
  flex-grow: 1;
  flex-basis: 0;
  font-family: 'Futura PT Medium', sans-serif;

  margin-right: 3rem;
  &:last-child {
    margin-right: 0;
  }
`;
export const Moderation = styled.div`
  ${Card};
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

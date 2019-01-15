import styled from 'styled-components';
import { H1, Card, CardItem } from '../../../components/common/common-styles';
import { media } from '../../../components/common/breakpoints';

export const ProfileWrapper = styled.div``;
export const Heading = styled(H1)``;
export const UserInfo = styled.div`
  span {
    display: inline-block;
    min-width: 7rem;
  }
`;
export const WalletInfo = styled.div`
  color: ${props => props.theme.textPrimary.default.toString()};
  font-family: 'Futura PT', sans-serif;
  font-size: 2rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
`;
export const UserStatus = styled.div`
  color: ${props => props.theme.textSecondary.default.toString()};
  font-family: 'Futura PT', sans-serif;
  font-size: 2rem;
  font-weight: 400;
`;
export const RewardSummary = styled.div`
  ${Card};

  color: ${props => props.theme.textPrimary.default.toString()};
  font-family: 'Futura PT', sans-serif;
  font-weight: 500;
  margin-top: 5rem;

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
  font-family: 'Futura PT', sans-serif;
  font-weight: 500;
  margin-right: 3rem;
  &:last-child {
    margin-right: 0;
  }
`;
export const Moderation = styled.div`
  ${Card};
  color: ${props => props.theme.textPrimary.default.toString()};
  flex-direction: column;
  font-family: 'Futura PT', sans-serif;
  font-weight: 500;
`;
export const Criteria = styled.div`
  ${CardItem};
  align-items: center;
  justify-content: flex-start;
  font-family: 'Futura PT', sans-serif;
  font-weight: 500;
  margin: 3rem 0 0;
  ${media.mobile`flex-direction: column;`}
`;
export const ModeratorReputation = styled.div`
  ${CardItem};
  flex-grow: 0;
  align-items: flex-end;
`;
export const ModeratorStake = styled.div`
  ${CardItem};
  flex-grow: 0;
  align-items: flex-end;
`;
export const ModeratorLabel = styled.div`
  margin-bottom: 1.1rem;
  margin-left: 1rem;
  text-transform: uppercase;
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

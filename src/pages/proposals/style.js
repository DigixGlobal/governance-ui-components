import styled from 'styled-components';
import { H1, H2 } from '../../components/common/common-styles';

export const ProposalsWrapper = styled.div``;

export const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const Title = styled(H1)`
  font-size: 3.6rem;
  font-family: 'Futura PT Medium';
`;

export const SubTitle = styled(H2)`
  font-family: 'Futura PT Medium';
  color: ${props => props.theme.textPrimary.lighter.toString()};
`;

export const LatestActivity = styled.div`
  color: ${props => props.theme.textDefault.lighter.toString()};
  display: flex;
  flex-direction: row;
  margin: 3rem 0;
  text-transform: uppercase;

  > div {
    display: flex;
    flex-direction: column;
  }

  span {
    font-size: 2rem;
    font-family: 'Futura PT Medium';
    color: ${props => props.theme.textPrimary.default.toString()};
    margin-top: 1rem;
  }
`;
export const SubmittedBy = styled.div`
  flex: 2;
`;
export const FundingStatus = styled.div`
  flex: 1;
`;
export const MilestonesStatus = styled.div`
  flex: 1;
`;

export const Reward = styled.div`
  flex: 1;
`;

export const UpvoteStatus = styled.div`
  flex: 1;
`;

export const DetailsContainer = styled.div``;

export const ShortDescription = styled.div`
  border-top: 1px solid ${props => props.theme.borderColor.lightest.toString()};
  border-bottom: 1px solid ${props => props.theme.borderColor.lightest.toString()};
  padding: 3rem 0 2em 0;
`;

export const ProjectSummary = styled.div``;

export const TrackActivity = styled.div`
  margin: 3rem auto;
`;

export const Details = styled.div``;

export const MilestonesContainer = styled.div``;

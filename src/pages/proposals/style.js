import styled from 'styled-components';
import { H1, H2, Container } from '../../components/common/common-styles';

export const ProposalsWrapper = styled.div``;

export const BrowseVersionHistory = styled.div`
  ${Container}
  background: ${props => props.theme.backgroundDefault.default.toString()};
  border: 1px solid ${props => props.theme.borderColor.lightest.toString()};
  box-shadow: ${props => props.theme.boxShadow};

  justify-content: space-between;
  margin-bottom: 7rem;
  padding: 2rem 2.5rem;
  position: relative;

  & > div {
    color: ${props => props.theme.textDefault.default.toString()};
    display: flex;
    align-items: center;
    font-family: 'Futura PT Book';

    &:nth-of-type(1) {
      flex: 1;
      text-align: left;
    }

    &:nth-of-type(2) {
      flex: 2;
      justify-content: center;
      font-family: 'Futura PT Medium';
      font-size: 2rem;

      text-transform: capitalize;
    }

    &:nth-of-type(3) {
      flex: 1;
      justify-content: flex-end;
    }

    i {
      position: relative;
      display: inline-block;
      vertical-align: middle;
      color: #c00;
      box-sizing: border-box;
      &:after,
      &:before {
        content: '';
        box-sizing: border-box;
        display: block;
        margin-top: -6px;
      }
      &:before {
        width: 0;
        height: 0;
        border-bottom: 9px solid ${props => props.theme.borderColor.default.toString()};
        border-left: 9px solid transparent;
        border-right: 9px solid transparent;
      }
    }
  }
`;

export const PreviousWrapper = styled.div`
  text-transform: uppercase;
  i {
    &:before {
      transform: rotate(-90deg);
      margin-right: 0.5rem;
    }
  }
`;

export const NextWrapper = styled.div`
  text-transform: uppercase;
  i {
    &:before {
      transform: rotate(90deg);
      margin-left: 0.5rem;
    }
  }
`;

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
  flex: 4;
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
  justify-content: flex-end;
  align-items: flex-end;
  margin-right: 2rem;
`;

export const DetailsContainer = styled.div``;

export const ShortDescription = styled.div`
  border-top: 1px solid ${props => props.theme.borderColor.lightest.toString()};
  border-bottom: 1px solid ${props => props.theme.borderColor.lightest.toString()};
  padding: 3rem 0 2em 0;
  margin-bottom: 3rem;
`;

export const ProjectSummary = styled.div``;

export const TrackActivity = styled.label`
  padding: 3rem 0;
  margin-bottom: 1.5rem;

  input {
    margin-right: 1rem;
  }
`;

export const ImageHolder = styled.div`
  border-radius: 3px;
  min-width: 500px;
  height: 40rem;
  padding: 0.5rem;
  overflow: auto;
  & > img {
    height: 30rem;
    width: 33rem;
    margin: 1rem;
    border: 2px solid ${props => props.theme.borderColor.default.toString()};
  }
`;

export const Details = styled.div`
  padding-top: 2rem;
`;

export const MilestonesContainer = styled.div``;

import styled, { css } from 'styled-components';
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
        border-bottom: 9px solid ${props =>
          props.disabled ? '#f2f2f2' : props.theme.borderColor.default.toString()};
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
      ${props =>
        props.disabled &&
        css`
          border-bottom: 9px solid #f2f2f2 !important;
        `};
    }
  }
`;

export const NextWrapper = styled.div`
  text-transform: uppercase;
  i {
    &:before {
      transform: rotate(90deg);
      margin-left: 0.5rem;
      ${props =>
        props.disabled &&
        css`
          border-bottom: 9px solid #f2f2f2 !important;
        `};
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
  font-size: 2rem;
  color: ${props => props.theme.textPrimary.light.toString()};
`;

export const LatestActivity = styled.div`
  color: ${props => props.theme.textDefault.light.toString()};
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
  border-bottom: 1px solid ${props => props.theme.borderColor.lighter.toString()};
  padding: 3rem 0 2em 0;
  margin-bottom: 6rem;
`;

export const ProjectSummary = styled.div`
  border-bottom: 1px solid ${props => props.theme.borderColor.lighter.toString()};
  margin-bottom: 4rem;
`;

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
  padding: 0rem;
  overflow: auto;
  & > img {
    height: 30rem;
    width: 33rem;
    margin: 2rem 2rem 0 0;
  }
`;

export const Details = styled.div`
  margin-bottom: 6rem;
`;

export const MilestonesContainer = styled.div`
  margin-bottom: 6rem;
`;

export const VotingResultWrapper = styled.div`
  ${Container};
  flex-direction: column;
  border-bottom: 1px solid ${props => props.theme.borderColor.lighter.toString()};
`;

export const VotingResultContainer = styled.div`
  ${Container};
  margin-bottom: 4rem;
`;
export const ProgressCol = styled.div`
  flex-grow: 1;
  margin-right: 2rem;
`;

export const Label = styled.div`
  ${Container};
  flex-wrap: nowrap;
`;

const LabelStyle = css`
  color: ${props => props.theme.textPrimary.default.toString()};
  font-family: 'Futura PT Heavy';
  padding-bottom: 2rem;
  text-transform: uppercase;
  flex-basis: 100%;

  &:last-child > span {
    margin-left: 2rem;
  }
`;

export const QuorumLabel = styled.div`
  ${LabelStyle};
  flex: ${props => props.flexWidth};
`;
export const QuorumMinLabel = styled.div`
  ${LabelStyle};
  border-left: 1px dashed ${props => props.theme.borderColor.light.toString()};
  flex: ${props => props.flexWidth};
`;

export const ApprovalLabel = styled.div`
  ${LabelStyle};
  flex: ${props => props.flexWidth};
`;
export const ApprovalMinLabel = styled.div`
  ${LabelStyle};
  border-left: 1px dashed ${props => props.theme.borderColor.light.toString()};
  flex: ${props => props.flexWidth};
`;

export const QuorumInfoCol = styled.div`
  ${Container};
  align-items: flex-end;
  justify-content: flex-end;

  flex-basis: ${props => (props.countdown ? 130 : 220)}px;

  color: ${props => props.theme.textDefault.light.toString()};
  font-family: 'Futura PT Medium';
  text-transform: uppercase;

  span:not(:last-child) {
    border-right: 1px solid #ccc;
    margin-right: 1.5rem;
    padding-right: 1.5rem;
  }
`;

import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const ProposalWrapper = styled.div`
  background-color: ${props => props.theme.backgroundDefault.default.toString()};
  display: flex;
  flex-direction: column;
  box-shadow: ${props => props.theme.boxShadow};
  margin-bottom: 3em;
`;

export const ProposalContainer = styled.div`
  color: ${props => props.theme.textDefault.default.toString()};
  display: flex;
  flex-direction: row;

  height: 36.6rem;
  border: 1px solid ${props => props.theme.cardBorderColor.lightest.toString()};
`;

export const ProposaDetaillWrapper = styled.div`
  flex: 4 1 0;
  padding: 2em 3em;
`;

export const ProposalCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: space-between;

  height: 100%;
  > div {
    width: 100%;
  }
`;

export const TagsContainer = styled.div``;

export const Description = styled.div`
  flex: 3 0 0;

  p {
    margin-bottom: 3em;
    color: ${props => props.theme.textDefault.light.toString()};
  }
`;

export const ProposalLink = styled(Link)`
  font-family: 'Futura PT Medium', sans-serif;

  &:link,
  &:visited {
    text-decoration: underline;
    color: ${props => props.theme.linkPrimaryColor.light.toString()};
  }

  &:hover {
    text-decoration: none;
  }
`;

export const ProposalFooter = styled.div`
  border-top: 1px solid ${props => props.theme.cardBorderColor.lightest.toString()};
  padding-top: 1.5em;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
export const PostedBy = styled.div``;

export const PostedByLink = styled.a`
  color: ${props => props.theme.textSecondary.default.toString()};
  text-decoration: none;
  text-transform: uppercase;
  font-weight: 600;
  a:link,
  &:visited {
    color: ${props => props.theme.linkPrimaryColor.default.toString()};
  }
`;

export const Label = styled.div`
  margin-bottom: 1.2em;
  text-align: center;
  text-transform: uppercase;
  font-size: 1.3rem;
`;
export const Data = styled.div`
  text-align: center;
  text-transform: uppercase;
  font-size: 1.3rem;
`;

export const StatsWrapper = styled.div`
  min-height: 100%;
  flex: 1 0 0;
  display: flex;
  flex-direction: column;
`;

export const Stats = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: space-between;

  border-left: 1px solid ${props => props.theme.cardBorderColor.lightest.toString()};
  border-right: 1px solid ${props => props.theme.cardBorderColor.lightest.toString()};
  height: 100%;
  text-transform: uppercase;

  > div:not(:last-child) {
    border-bottom: 1px solid ${props => props.theme.cardBorderColor.lightest.toString()};
  }
`;

export const StatItem = styled.div`
  font-size: 1.4rem;
  flex: 1;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  > span {
    font-family: 'Futura PT Heavy';
    font-size: 2.6rem;
    display: block;
  }
`;

export const MilestonesWrapper = styled.div`
  flex: 2 0 0;
`;

export const Milestones = styled.div`
  display: flex;
  flex-direction: column;

  & > div {
    padding: 3.5em 0;
    text-align: center;
    flex: 1;
  }
`;

export const MilestoneStatus = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  ul {
    width: 60%;
    margin: 0 auto;
  }
  li {
    display: inline-block;
    list-style: none;
    background: ${props => props.theme.backgroundPrimary.default.toString()};
    height: 10px;
    width: 20%;
    margin-right: 5px;
    &:last-child {
      margin-right: 5px;
    }
  }
`;
export const Deadline = styled.div``;
export const CallToAction = styled.div``;

// export const ProgressContainer = styled.div`
//   background-color: #b8c5d0;
//   height: 0.8rem;
// `;

// export const Progress = styled.div`
//   width: 70%;
//   height: 0.8rem;
//   background-color: #243961;
// `;

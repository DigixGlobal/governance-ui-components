import styled from 'styled-components';

export const ProposalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  box-shadow: 0 1rem 2rem rgba(0, 0, 0, 0.2);
  margin-bottom: 3em;
`;

export const ProposalContainer = styled.div`
  display: flex;
  flex-direction: row;

  height: 36.6rem;
  background-color: ${props => props.theme.mainBackgroundColor.toString()};
  border: 1px solid ${props => props.theme.borderColor.default.toString()};
`;

export const ProposaDetaillWrapper = styled.div`
  flex: 4 1 0;

  padding: 2em 3em;
  font-size: 1.6rem;
`;

export const ProposalDetail = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  height: 100%;
  > div {
    width: 100%;
  }
`;

export const TagsContainer = styled.div`
  margin-bottom: 1em;
`;

export const Description = styled.div`
  margin-bottom: 3em;
  p {
    margin-bottom: 3em;
  }
`;

export const ProposalFooter = styled.div`
  border-top: 1px solid ${props => props.theme.borderColor.default.toString()};
  padding: 1em 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const PostedBy = styled.div``;

export const UpVote = styled.div``;

export const Label = styled.div`
  color: ${props => props.theme.defaultTextColor.toString()};

  margin-bottom: 0.8em;
  text-align: center;
  text-transform: uppercase;
  font-size: 1.3rem;
`;
export const Data = styled.div`
  text-align: center;
  text-transform: uppercase;
  font-size: 1.3rem;
`;

export const Stats = styled.div`
  flex: 1 0 0;
  border-left: 1px solid ${props => props.theme.borderColor.default.toString()};
  border-right: 1px solid ${props => props.theme.borderColor.default.toString()};
  width: 16.8rem;
  text-transform: uppercase;
  margin: 0 auto;
  position: relative;
  text-align: center;
  height: 36.5rem;
  > div:not(:last-child) {
    border-bottom: 1px solid ${props => props.theme.borderColor.default.toString()};
  }
`;

export const StatItem = styled.div`
  padding-top: 4rem;
  height: 12.12rem;
  font-size: 1.6rem;
  vertical-align: middle;

  > span {
    font-size: 2.5rem;
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
    background: ${props => props.theme.primary.default.toString()};
    height: 8px;
    width: 47%;
    &:first-child {
      margin-right: 5px;
    }
  }
`;
export const Deadline = styled.div``;
export const CallToAction = styled.div``;

export const ProgressContainer = styled.div`
  background-color: #b8c5d0;
  height: 0.8rem;
`;

export const Progress = styled.div`
  width: 70%;
  height: 0.8rem;
  background-color: #243961;
`;

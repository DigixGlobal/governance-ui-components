import styled from 'styled-components';

export const ProposalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  box-shadow: 0 1rem 2rem rgba(0, 0, 0, 0.2);
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
  justify-content: center;
  flex-direction: column;
  flex: 1 1 0;
`;

export const TagsContainer = styled.div`
  margin-bottom: 1em;
  > a {
    margin-right: 0.5rem;
  }
`;

export const Description = styled.div`
  p {
    margin-bottom: 2em;
  }
`;
export const PostedBy = styled.div`
  border-top: 1px solid #ccc;
  padding: 1em 0;
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
    /* height: 4rem; */
  }
`;

export const Milestones = styled.div`
  flex: 2 0 0;
`;

export const ProgressContainer = styled.div`
  position: relative;
  background-color: #b8c5d0;
  height: 1rem;
  width: 50.4rem;
  z-index: 5;
`;

export const Progress = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 30%;
  z-index: 10;
  height: 1rem;
  background-color: #243961;
`;

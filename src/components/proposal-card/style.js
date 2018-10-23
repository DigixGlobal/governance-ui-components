import styled from 'styled-components';

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

export const TagsContainer = styled.div`
  flex: 0.5 0 0;
`;

export const Description = styled.div`
  flex: 3 0 0;

  p {
    margin-bottom: 3em;
    color: ${props => props.theme.textDefault.light.toString()};
  }
`;

export const ProposalLink = styled.a`
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

export const UpVote = styled.div`
  a {
    color: ${props => props.theme.linkDefaultColor.default.toString()};
    font-family: 'Futura PT Medium';
    &:visited {
      color: ${props => props.theme.linkDefaultColor.default.toString()};
    }
    &::before {
      content: '';
      display: inline-block;
      height: 16px;
      width: 20px;
      background-image: url('data:image/svg+xml;charset=UTF-8,<svg width="16" height="14" viewBox="0 0 16 14" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><defs><path d="M.667 5.667h2.666v8H.667v-8zm5.333 8h6c.553 0 1.027-.334 1.227-.814l2.013-4.7c.06-.153.093-.313.093-.486V6.333C15.333 5.6 14.733 5 14 5H9.793l.634-3.047.02-.213c0-.273-.114-.527-.294-.707l-.706-.7-4.394 4.394c-.24.24-.386.573-.386.94v6.666c0 .734.6 1.334 1.333 1.334zm0-8l2.893-2.894L8 6.333h6v1.334l-2 4.666H6V5.667z" id="a"/></defs><g fill="none" fill-rule="evenodd"><mask id="b" fill="#fff"><use xlink:href="#a"/></mask><g mask="url(#b)" fill="#000" fill-opacity=".54"><path d="M0-1h16v16H0z"/></g></g></svg>');
      background-repeat: no-repeat;
      // background-position: -16px 0px;
      vertical-align: middle;
      margin-right: 0.25em;
    }
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

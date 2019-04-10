import styled, { css } from 'styled-components';
import { Button } from '@digix/gov-ui/components/common/elements/index';
import { H2 } from '@digix/gov-ui/components/common/common-styles';
import { media } from '@digix/gov-ui/components/common/breakpoints';

export const ProposalContainer = styled.div`
  background-color: ${props => props.theme.background.white.toString()};
  box-shadow: ${props => props.theme.boxShadow};
  margin-bottom: 3em;
`;

export const Item = styled.div`
  display: flex;

  border: 1px solid ${props => props.theme.cardBorderColor.lighter.toString()};
  height: 36.6rem;

  & > div {
    flex: 0 1 auto;

    &:first-child {
      flex: 1;
    }
  }

  ${media.mobile``};
`;

export const Details = styled.div`
  padding: 2.5rem 5rem;
`;

export const StatsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100%;
`;

export const MilestonesWrapper = styled.div``;

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

export const Title = styled(H2)`
  color: ${props => props.theme.textColor.primary.base.toString()};
  margin-top: 0;

  overflow: hidden;
  position: relative;
  line-height: 1.2em;
  max-height: calc(1.2em * 2);
  margin-right: 0em;
  padding-right: 1em;

  &:before {
    content: '...';
    position: absolute;
    right: 2rem;
    bottom: 0;
  }
  &:after {
    content: '';
    position: absolute;
    right: 2rem;
    width: 1em;
    height: 1em;
    margin-top: 0.2em;
    background: #fff;
  }
`;

export const Description = styled.div`
  flex: 3 0 0;

  p {
    margin-bottom: 2em;
    color: ${props => props.theme.textColor.default.base.toString()};
    font-size: 1.6rem;

    overflow: hidden;
    position: relative;
    line-height: 1.2em;
    max-height: calc(1.2em * 4);
    text-align: justify;
    margin-right: 0;
    padding-right: 1em;

    &:before {
      content: '...';
      position: absolute;
      right: 0;
      bottom: 0;
    }
    &:after {
      content: '';
      position: absolute;
      right: 0;
      width: 1em;
      height: 1em;
      margin-top: 0.2em;
      background: #fff;
    }
  }
`;

export const ProposalFooter = styled.div`
  border-top: 1px solid ${props => props.theme.cardBorderColor.lighter.toString()};
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

export const Stats = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: space-between;

  border-left: 1px solid ${props => props.theme.cardBorderColor.lighter.toString()};
  border-right: 1px solid ${props => props.theme.cardBorderColor.lighter.toString()};
  height: 100%;
  text-transform: uppercase;

  > div:not(:last-child) {
    border-bottom: 1px solid ${props => props.theme.cardBorderColor.lighter.toString()};
  }
`;

export const StatItem = styled.div`
  font-size: 1.4rem;
  flex: 1;
  ${props =>
    props.stage &&
    (props.stage.toLowerCase() === 'idea' ||
      (props.votingStage && props.votingStage.toLowerCase() === 'commit')) &&
    css`
      color: ${props.theme.textDefault.light.toString()};
    `};
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

export const Milestones = styled.div`
  display: flex;
  flex-direction: column;

  & > div {
    padding: 2.5em 0;
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

export const LikeButton = styled(Button)`
  margin: 0;
  padding: 0;
`;

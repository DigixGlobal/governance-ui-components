import styled, { css } from 'styled-components';
import { H1, H2, Container } from '@digix/gov-ui/components/common/common-styles';
import { Icon } from '@digix/gov-ui/components/common/elements/index';
import { media } from '@digix/gov-ui/components/common/breakpoints';
import ProgressBar from '@digix/gov-ui/components/common/blocks/progress-bar';

export const ProposalsWrapper = styled.div``;

export const VersionHistory = styled.div`
  ${Container}
  background: ${props => props.theme.backgroundDefault.default.toString()};
  border: 1px solid ${props => props.theme.borderColor.lightest.toString()};
  box-shadow: ${props => props.theme.boxShadow};
  color: ${props => props.theme.textColor.default.base.toString()};

  justify-content: space-between;
  margin-bottom: 5rem;
  padding: 2rem 2.5rem;
  position: relative;

  & > div {
    display: flex;
    align-items: center;
    font-family: 'Futura PT Book', sans-serif;

    &:nth-of-type(1) {
      flex: 1;
      text-align: left;
    }

    &:nth-of-type(2) {
      flex: 2;
      justify-content: center;
      font-family: 'Futura PT Medium', sans-serif;
      font-size: 1.6rem;

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
  ${Container};
  align-items: center;

  svg {
    transform: rotate(90deg);
    width: 80%;
  }
`;

export const NextWrapper = styled.div`
  ${Container};
  align-items: center;

  svg {
    transform: rotate(275deg);
    width: 80%;
  }
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;

  ${media.mobile`
    flex-direction: column;
  `}
`;

export const Title = styled(H1)`
  font-size: 3.6rem;
  font-family: 'Futura PT Book';
  text-transform: capitalize;
`;

export const CallToAction = styled.div`
  display: flex;
  flex-wrap: nowrap;

  ${media.mobile`
    order: -1;
    margin: 0 -1rem 3rem -1rem;
  `}
`;

export const FundingInfo = styled.div`
  color: ${props => props.theme.textDefault.light.toString()};
  display: flex;
  flex: 1;

  margin-bottom: 2rem;

  ${media.mobile`
    flex-flow: row wrap;
  `}
`;
export const InfoItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  margin: 0 2rem 1rem 0;

  &:nth-of-type(1) {
    flex: 1;

    ${media.mobile`
      order: -2;
      margin-bottom: 3rem;
    `}
  }
  &:nth-of-type(2) {
    flex: 0 0 auto;

    ${media.mobile`
      flex-direcion: row;
      margin-right: 0;
      flex: 0 0 100%;
    `}
  }
  &:nth-of-type(3) {
    flex: 0 0 auto;

    ${media.mobile`
      flex: 0 0 100%;
    `}
  }

  &:nth-of-type(4) {
    flex: 0 0 90px;
    margin-right: 0rem;

    div {
      margin-right: 1rem;
    }

    ${media.mobile`
      order: -1;
      margin-bottom: 3rem;
    `}
  }

  ${props =>
    props.outlined &&
    css`
      border-radius: ${props.theme.borderRadius};
      justify-content: flex-start;
      padding: 2rem 3rem;
      border: 1px solid ${props.theme.borderColor.lighter.toString()};
      margin-right: 2rem;
    `};
`;

export const ItemTitle = styled.div`
  margin-bottom: 0.5rem;
  font-family: 'Futura PT Medium', sans-serif;
  text-transform: uppercase;
`;

export const Data = styled.div`
  display: flex;
  align-items: flex-end;
  font-family: 'Futura PT Heavy', sans-serif;
  font-size: 1.6rem;
  color: ${props => props.theme.textColor.primary.base.toString()};
  text-transform: uppercase;

  div:first-child {
    margin-right: 2rem;
  }

  .label {
    color: ${props => props.theme.textColor.default.base.toString()};
    font-family: 'Futura PT Light', sans-serif;
    font-size: 1.4rem;
    text-transform: capitalize;
  }

  span {
    &:nth-of-type(2) {
      color: ${props => props.theme.textColor.secondary.base.toString()};
    }
    &:last-child {
      color: ${props => props.theme.textColor.default.light.toString()};
    }
    &:first-child {
      color: ${props => props.theme.textColor.primary.base.toString()};
    }
  }
`;

export const Upvote = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  width: 100px;
  flex: none;
`;

export const DetailsContainer = styled.div`
  margin-top: 2rem;
`;

export const Content = styled.div`
  margin: 1.5rem 0 3rem 0;
`;

export const SubTitle = styled(H2)`
  font-family: 'Futura PT Book';
  font-size: 2rem;
  color: ${props => props.theme.textPrimary.light.toString()};
`;

export const AccordionHeading = styled(H2)`
  font-family: 'Futura PT Medium', sans-serif;
  font-size: 1.6rem;
  color: ${props => props.theme.textPrimary.light.toString()};
  margin: 0;
`;

export const ProjectSummary = styled.div`
  border-bottom: 1px solid ${props => props.theme.borderColor.lighter.toString()};
  margin-bottom: 3rem;
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

export const VotingResultWrapper = styled.div`
  ${Container};
  flex-direction: column;
`;

export const VotingResultContainer = styled.div`
  ${Container};
  margin-bottom: 4rem;
  &:last-child {
    margin-bottom: 0;
  }
`;
export const ProgressCol = styled.div`
  flex-grow: 1;

  ${props =>
    props.past &&
    css`
      div:last-child {
        & > div {
          background-color: ${props => props.theme.background.default.light.toString()};
        }
      }
    `};
`;

export const Label = styled.div`
  ${Container};
  flex-wrap: nowrap;
`;

const LabelStyle = css`
  color: ${props => props.theme.textColor.primary.base.toString()};
  font-family: 'Futura PT Heavy';
  padding-bottom: 2rem;
  text-transform: uppercase;
  flex-basis: 100%;

  &:last-child > span {
    margin-left: 2rem;
  }

  ${props =>
    props.past &&
    css`
      color: ${props.theme.textColor.default.light.toString()};
    `};
`;

export const QuorumLabel = styled.div`
  ${LabelStyle};

  flex: ${props => props.flexWidth};
`;

export const MinimumLabel = styled.div`
  ${LabelStyle};
  border-left: 1px dashed ${props => props.theme.borderColor.light.toString()};
  flex: ${props => props.flexWidth};
  font-family: 'Futura PT Medium', sans-serif;

  display: flex;
  justify-content: space-between;
`;

export const ApprovalLabel = styled.div`
  ${LabelStyle};
  flex: ${props => props.flexWidth};
`;

export const QuorumInfoCol = styled.span`
  ${Container};
  align-items: flex-end;
  justify-content: flex-end;

  color: ${props => props.theme.textDefault.light.toString()};
  font-family: 'Futura PT Medium';
  text-transform: uppercase;

  span:not(:last-child) {
    border-right: 1px solid #ccc;
    margin-right: 1.5rem;
    padding-right: 1.5rem;
  }
`;

export const WarningIcon = styled(Icon)`
  margin-right: 2rem;
  width: 40px;
  height: 40px;
  flex: 0 0 auto;

  ${props =>
    props.small &&
    css`
      width: 25px;
      height: 25px;
    `}
`;

export const VotingProgressBar = styled(ProgressBar)`
  border: 1px solid #ccc;
`;

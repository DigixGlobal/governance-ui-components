import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import { Button } from '@digix/gov-ui/components/common/elements/index';
import { H2 } from '@digix/gov-ui/components/common/common-styles';
import { media } from '@digix/gov-ui/components/common/breakpoints';

export const Container = styled.div`
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
  ${media.mobile`
        flex-direction: column;
  `};
`;

export const Details = styled.div`
  padding: ${props => (props.noPadding ? 0 : '2.5rem 5rem')};
  display: flex;
  flex-direction: column;
  ${media.mobile`
    padding: ${props => (props.noPadding ? 0 : '2rem')};
  `}
  ${props =>
    props.first &&
    css`
      display: flex;
      justify-content: space-between;
    `};
  ${props =>
    props.second &&
    css`
      & > div {
        border: 1px solid ${props.theme.cardBorderColor.lighter.toString()};
        border-top: none;
        &:last-child {
          border-bottom: none;
        }
      }
      ${media.mobile`
       display: none;
       `}
    `};
  ${props =>
    props.third &&
    css`
      ${media.tablet`
       display: none;
       `}
    `};
`;

export const Info = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 3rem;
  text-transform: uppercase;
  ${props =>
    props.stage &&
    (props.stage.toLowerCase() === 'idea' ||
      (props.votingStage && props.votingStage.toLowerCase() === 'commit')) &&
    css`
      color: ${props.theme.textDefault.light.toString()};
    `};
  span {
    font-family: 'Futura PT Heavy', sans-serif;
    font-size: 2.6rem;
    display: block;
    margin-top: 1rem;
  }
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

export const Tags = styled.div``;

export const AboutProposal = styled.div`
  &:last-child {
    display: flex;
    justify-content: space-between;
    border-top: 1px solid ${props => props.theme.cardBorderColor.lighter.toString()};
    padding-top: 1.5em;
  }
`;
export const Desc = styled.div`
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

export const Author = styled.div``;

export const AuthorName = styled.a`
  color: ${props => props.theme.link.secondary.base.toString()};
  text-decoration: none;
  text-transform: uppercase;
  font-weight: 600;
`;

export const ViewLink = styled(Link)`
  color: ${props => props.theme.link.secondary.base.toString()};
  font-family: 'Futura PT Book', sans-serif;
  display: none;
  text-decoration: underline;
  text-transform: uppercase;
  &:hover {
    text-decoration: none;
  }
  &:link,
  &:visited {
    text-decoration: underline;
  }
  ${props =>
    props.disabled &&
    css`
      color: ${props.theme.link.disabled.light.toString()};
      pointer-events: none;
    `}
  ${media.tablet`
    display: inline-block;
  `};
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

export const LikeButton = styled(Button)`
  margin: 0;
  padding: 0;
`;

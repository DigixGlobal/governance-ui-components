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
  min-height: 32rem;
  & > div {
    &:first-child {
      flex: 1;
    }
    &:last-child {
      flex: 0 1 200px;
    }
  }
  ${media.mobile`
        flex-direction: column;
  `};
`;

export const Details = styled.div`
  padding: ${props => (props.noPadding ? 0 : '4rem 5rem')};
  display: flex;
  flex-direction: column;
  ${media.mobile`
    padding: ${props => (props.noPadding ? 0 : '4rem')};
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
  padding: 2rem;
  text-transform: uppercase;
  font-family: 'Futura PT Book', sans-serif;

  ${props =>
    props.stage &&
    (props.stage.toLowerCase() === 'idea' ||
      (props.votingStage && props.votingStage.toLowerCase() === 'commit')) &&
    css`
      color: ${props.theme.textDefault.light.toString()};
    `};

  span {
    font-family: 'Futura PT Heavy', sans-serif;
    font-size: 2.2rem;
    display: block;
    margin-top: 0rem;
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

export const Tags = styled.div`
  margin-bottom: 2rem;

  display: flex;
  justify-content: space-between;

  & > div {
    display: flex;
    align-items: center;
  }
`;

export const LikeButton = styled(Button)`
  margin: 0;
  padding: 0;
`;

export const AboutProposal = styled.div``;
export const ShortDescr = styled.div`
  p {
    margin-bottom: 2em;
    color: ${props => props.theme.textColor.default.base.toString()};
    font-size: 1.6rem;
    position: relative;

    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
`;

export const Title = styled(H2)`
  color: ${props => props.theme.textColor.default.base.toString()};
  position: relative;

  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

export const Author = styled.div`
  text-transform: uppercase;
  color: ${props => props.theme.textColor.default.light.toString()};
  font-family: 'Futura PT Book', sans-serif;
  margin-bottom: 3rem;

  span {
    color: ${props => props.theme.textColor.default.base.toString()};
  }
`;

export const ViewCta = styled(Link)`
  background: transparent;
  border-width: 1px;
  border-color: ${props => props.theme.buttonPrimary.invert.border.base.toString()};
  border-radius: ${props => props.theme.borderRadius};

  box-shadow: none;
  color: ${props => props.theme.buttonPrimary.invert.textColor.base.toString()};
  cursor: pointer;

  font-family: 'Futura PT Medium', sans-serif;
  font-size: 1.2rem;
  outline: none;
  padding: 0.75rem 1rem;
  margin: 0;
  transition: ${props => props.theme.transition};
  text-transform: uppercase;
  text-align: center;
  text-decoration: none;
  width: ${props => (props.width ? '' : 'auto')};

  &:hover {
    color: ${props => props.theme.buttonPrimary.textColor.base.toString()};
  }

  ${props =>
    props.disabled &&
    css`
      border-color: ${props.theme.buttonDisabled.border.lighter.toString()};
      color: ${props.theme.buttonDisabled.textColor.lighter.toString()};
      pointer-events: none;

      &:hover {
        color: ${props.theme.buttonDisabled.textColor.lighter.toString()};
      }
    `}
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

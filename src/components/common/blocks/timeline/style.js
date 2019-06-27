import styled, { css } from 'styled-components';
import { media } from '@digix/gov-ui/components/common/breakpoints';
import { Card } from '@digix/gov-ui/components/common/common-styles';

export const Divider = styled.span`
  margin: 0 1.5em;
  font-family: 'Futura PT Light', sans-serif;

  ${media.mobile`
  margin: 0 1em;
  `}
`;

export const Wrapper = styled.div`
  position: relative;
  display: flex;
  margin-bottom: 5em;
  text-transform: uppercase;
  flex-direction: column;
  background-color: white;
  padding: 5rem;
  box-shadow: ${props => props.theme.boxShadow};
  border-radius: 0.3rem;
`;

export const Qtr = styled.div`
  color: ${props => props.theme.textColor.primary.base.toString()};
  font-family: 'Futura PT Medium', sans-serif;
  font-size: 2.2em;
  text-transform: none;
  flex: 0 1 auto;
  display: flex;
  align-items: left;
  margin-bottom: 5rem;
  ${media.mobile`
    margin-bottom: 2.5rem;
  `};
`;

export const Toggle = styled.a`
  color: ${props => props.theme.textColor.secondary.base.toString()};
  font-family: 'Futura PT Book', sans-serif;
  font-size: 1.4em;
  text-transform: uppercase;
  position: absolute;
  right: 5rem;
  top: 6rem;
  > div {
    width: 1.25rem;
    height: 1.25rem;
    margin-left: 1rem;

    svg {
      transform: rotate(-90deg);
    }
    
  ${media.mobile`
    position: relative;
    text-align: right;
    right: 0;
    top: 0;
    margin-bottom: 2.5rem;
  `};
`;

export const Stats = styled(Card)`
  text-transform: uppercase;
  padding: 0;
  background-color: ${props => props.theme.backgroundTertiary.lightest.toString()};
  box-shadow: none;
  ${props =>
    props.dashboard &&
    css`
      margin-bottom: 8rem;
    `};

  ${media.mobile`
    padding: 3rem 3rem;
    flex-direction: column;
  `};
`;

export const Item = styled.div`
  border-right: 1px solid ${props => props.theme.cardBorderColor.lighter.toString()};
  display: inline-block;
  padding: 3rem 5rem 2.5rem 5rem;
  flex: 1;

  :last-child {
    border-right: none;
  }

  ${media.mobile`
    border-right: none;
    margin-bottom: 2rem;
    padding: 0 0 1rem 0;
    
    &:last-child {
      margin-bottom: 0;
    }
  `};
`;

export const Data = styled.div`
  display: flex;
  text-transform: none;
  justify-content: flex-start;
  align-items: flex-end;
  font-family: 'Futura PT Medium';
  font-size: 1.8em;
  text-align: left;
  margin-bottom: 0.5em;

  span {
    &.equiv {
      font-family: 'Futura PT Light', sans-serif;
      font-size: 1.2em;
      color: ${props => props.theme.textColor.default.base.toString()};
      margin-left: 1rem;
      margin-bottom: 0.75rem;

      ${media.tablet`
        margin-left: 0;
      `};
      ${media.mobile`
        margin-left: 1rem;
      `};
    }
  }

  ${media.tablet`
      flex-direction: column;
      align-items: flex-start;
      margin-top: 0;
  `};

  ${media.mobile`
  flex-direction: row;
  `};
`;

export const TimelineBar = styled.div`
  display: flex;
  flex: 0 1 100%;
  flex-direction: column;
  justify-content: space-between;
  min-height: 90px;
`;

export const LockPhase = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-between;
  flex: 0 1 auto;
  margin-bottom: 5rem;
`;

export const MainPhase = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 0 1 100%;

  ${media.mobile`
  flex: 0 1 auto;
  `}
`;

export const Label = styled.div`
  display: flex;
  font-weight: 1.4em;
  margin-bottom: 1em;
  justify-content: space-between;
  font-family: 'Futura PT Heavy', sans-serif;
  flex: 1;

  & > div:first-child {
    display: flex;
  }

  ${media.mobile`
    font-family: 'Futura PT Medium', sans-serif;
    border-right: 0;
    margin-bottom: 0.5rem;
  `}
`;

export const Phase = styled.div`
  display: flex;
  margin-right: 0.75rem;
`;

export const Progress = styled.div`
  & > div {
    height: 10px;

    ${media.mobile`
      height: 8px;
    `}
  }
`;

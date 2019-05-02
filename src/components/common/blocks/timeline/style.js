import styled, { css } from 'styled-components';
import { media } from '@digix/gov-ui/components/common/breakpoints';

export const Divider = styled.span`
  margin: 0 1.5em;
  font-family: 'Futura PT Light', sans-serif;

  ${media.mobile`
  margin: 0 1em;
  `}
`;

export const Wrapper = styled.div`
  display: flex;
  margin-bottom: 5em;
  text-transform: uppercase;
  ${media.mobile`
    flex-direction: column;
  `}
`;

export const Qtr = styled.div`
  color: ${props => props.theme.textColor.primary.base.toString()};
  font-family: 'Futura PT Medium', sans-serif;
  font-size: 6em;
  line-height: 0.7em;
  flex: 0 1 auto;
  margin-right: 2rem;
  display: flex;
  align-items: center;

  ${media.mobile`
  margin-right: 1rem;
  margin-bottom: 3rem;
  `}
`;

export const TimelineBar = styled.div`
  display: flex;
  flex: 0 1 100%;

  ${media.mobile`
    flex-direction: column;
    justify-content: space-between;
    min-height: 90px;
  `}
`;

export const LockPhase = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-between;
  flex: 0 1 200px;

  ${media.mobile`
    flex: 0 1 auto;
  `}
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

  justify-content: space-between;
  font-family: 'Futura PT Heavy', sans-serif;
  flex: 1;

  ${props =>
    props.locking &&
    css`
      border-right: 1px dashed ${props.theme.borderColor.light.toString()};
      margin-right: 1rem;
    `}

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

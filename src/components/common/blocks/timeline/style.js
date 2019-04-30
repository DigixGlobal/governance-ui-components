import styled, { css } from 'styled-components';
import { media } from '@digix/gov-ui/components/common/breakpoints';

export const MainPhaseInfoDivider = styled.span`
  margin: 0 1.5em;
`;

export const Wrapper = styled.div`
  display: flex;
  margin-bottom: 5em;
  text-transform: uppercase;
`;

export const Qtr = styled.div`
  color: ${props => props.theme.textColor.primary.base.toString()};
  font-family: 'Futura PT Medium', sans-serif;
  font-size: 6em;
  line-height: 0.7em;
  flex: 0 1 auto;
  margin-right: 2rem;

  ${media.mobile`
  margin-right: 1rem;
  `}
`;

export const TimelineBar = styled.div`
  display: flex;
  flex: 0 1 100%;

  ${media.mobile`
    flex-direction: column;
    justify-content: space-between;
  `}
`;

export const LockPhase = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-between;
  flex: 0 1 220px;

  ${media.mobile`
  flex: 0 1 auto;
  `}
`;

export const MainPhase = styled.div`
  color: ${props => props.theme.textPrimary.default.toString()};
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
      margin-right: 2rem;
    `}

  ${media.mobile`
    font-family: 'Futura PT Book', sans-serif;
    font-size: 1.2rem;
    border-right: 0;
    margin-bottom: 0.5rem;
  `}
`;

export const Progress = styled.div`
  & > div {
    height: 10px;

    ${media.mobile`
      height: 5px;
    `}
  }
`;

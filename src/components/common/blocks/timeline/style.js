import styled from 'styled-components';

const lockingPhaseWidth = '13%';
const mainPhaseWidth = '87%';

export const LockingPhase = styled.div`
  border-right: 1px dashed ${props => props.theme.borderColor.light.toString()};
  width: ${lockingPhaseWidth};
`;

export const LockingPhaseStatus = styled.div`
  height: 8px;
  position: relative;
  width: ${lockingPhaseWidth};

  & > div {
    border-bottom-left-radius: 0.2rem;
    border-top-left-radius: 0.2rem;
    height: 10px;
  }
`;

export const MainPhase = styled.div`
  color: ${props => props.theme.textPrimary.default.toString()};
  display: flex;
  justify-content: space-between;
  padding-left: 1em;
  width: ${mainPhaseWidth};
`;

export const MainPhaseInfoDivider = styled.span`
  margin: 0 1.5em;
`;

export const MainPhaseStatus = styled.div`
  height: 8px;
  position: relative;
  width: ${mainPhaseWidth};

  & > div {
    border-bottom-right-radius: 0.2rem;
    border-top-right-radius: 0.2rem;
    height: 10px;
  }
`;

export const MainPhaseValue = styled.div`
  color: ${props => props.theme.textDefault.default.toString()};
  letter-spacing: 0.15em;
`;

export const Quarter = styled.div`
  color: ${props => props.theme.textPrimary.default.toString()};
  font-family: 'Futura PT Medium', sans-serif;
  font-size: 6em;
  line-height: 0.7em;
  margin-right: 20px;
`;

export const TimelineBar = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const TimelineDay = styled.div`
  display: flex;
  flex-direction: row;
  position: relative;
`;

export const TimelineLabel = styled.div`
  display: flex;
  font-family: 'Futura PT Heavy', sans-serif;
  height: 4.5rem;

  & > div {
    color: ${props => props.theme.textPrimary.default.toString()};
  }
`;

export const TimelineWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-bottom: 5em;
  text-transform: uppercase;
`;

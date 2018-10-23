import React from 'react';
import styled from 'styled-components';

import PropTypes from 'prop-types';
import moment from 'moment';

const TimelineWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  margin-bottom: 5em;
`;
const Quarter = styled.div`
  color: ${props => props.theme.textPrimary.default.toString()};
  font-family: 'Futura PT Medium';
  font-size: 6em;
  margin-right: 20px;
  line-height: 0.7em;
`;
const TimelineBar = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const TimelineLabel = styled.div`
  font-family: 'Futura PT Medium';
  display: flex;
  flex-direction: row;
  height: 48px;

  & > div {
    color: ${props => props.theme.textPrimary.default.toString()};
  }
`;

const StakingPhase = styled.div`
  width: 15%;
  border-right: 1px dashed ${props => props.theme.borderColor.lighter.toString()};
  font-weight: 600 !important;

  :after {
    content: '';
    display: block;
    background-color: ${props => props.theme.textPrimary.default.toString()};
    width: ${props => props.statusWidth};
    position: relative;
    top: 3rem;
    height: 0.8rem;
    z-index: 1;
  }
`;

const MainPhase = styled.div`
  color: ${props => props.theme.textPrimary.default.toString()};
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-left: 1em;

  & > div:last-child {
    color: ${props => props.theme.textDefault.lighter.toString()};
    letter-spacing: 0.2em;
    span {
      margin: 0 1.5em;
    }
  }
  :before {
    content: '';
    display: block;
    background-color: ${props => props.theme.textPrimary.default.toString()};
    width: ${props => props.statusWidth};
    position: absolute;
    top: 16rem;
    height: 0.8rem;
    left: 65.8rem;
    z-index: 1;
  }
`;

const MainPhaseValue = styled.div``;

const TimelineDay = styled.div`
  background: ${props => props.theme.timelineBgColor.lightest.toString()};
  display: flex;
  flex-direction: row;
  position: relative;
`;

const StakingPhaseStatus = styled.div`
  background: ${props => props.theme.timelineCurrentBgColor.default.toString()};
  width: ${props => props.width};
  height: 8px;
  position: relative;
`;

const MainPhaseStatus = styled.div`
  background: ${props => props.theme.timelineCurrentBgColor.default.toString()};
  position: relative;
  left: 3rem;
  width: ${props => props.width};
  height: 8px;
`;

class Timeline extends React.Component {
  render() {
    const { stats } = this.props;
    const now = moment(Date.now());
    const start = moment(new Date(stats.data.startOfQuarter * 1000));
    const ellapsed = now.diff(start, 'days');
    const mainPhaseWidth = 880.578;
    const stakingPhaseWidth = 131.938;
    const mainPhase = mainPhaseWidth * (ellapsed / 90);
    const stakingPhase = stakingPhaseWidth * (1 / 9);
    console.log({ mainPhase, stakingPhase });
    return (
      <TimelineWrapper>
        <Quarter>Q2</Quarter>
        <TimelineBar>
          <TimelineLabel>
            <StakingPhase statusWidth={`${stakingPhase}px` || '0px'}>STAKING PHASE</StakingPhase>

            <MainPhase statusWidth={`${mainPhase}px` || '0px'}>
              <div>MAIN PHASE</div>
              <MainPhaseValue>
                DAY {ellapsed} / 90 <span>|</span>
                {stats.data ? stats.data.totalDgdsLocked / 1e9 : 83423.45} STAKE
              </MainPhaseValue>
            </MainPhase>
          </TimelineLabel>

          <TimelineDay>
            <StakingPhaseStatus width="0px" />
            <MainPhaseStatus width="0px" />
          </TimelineDay>
        </TimelineBar>
      </TimelineWrapper>
    );
  }
}

const { object } = PropTypes;

Timeline.propTypes = {
  stats: object.isRequired,
};
export default Timeline;

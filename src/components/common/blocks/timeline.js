import React from 'react';
import styled from 'styled-components';

import PropTypes from 'prop-types';
import moment from 'moment';

import ProgressBar from '../blocks/progress-bar';

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
  height: 5.2rem;

  & > div {
    color: ${props => props.theme.textPrimary.default.toString()};
  }
`;

const StakingPhase = styled.div`
  width: 11.1111111%;
  border-right: 1px dashed ${props => props.theme.borderColor.lighter.toString()};
  font-weight: 600 !important;
`;

const MainPhase = styled.div`
  color: ${props => props.theme.textPrimary.default.toString()};
  width: 88.8888889%;
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
`;

const MainPhaseValue = styled.div``;

const TimelineDay = styled.div`
  /* background: ${props => props.theme.timelineBgColor.lightest.toString()}; */
  display: flex;
  flex-direction: row;
  position: relative;
`;

const StakingPhaseStatus = styled.div`
  /* background: ${props => props.theme.timelineCurrentBgColor.default.toString()}; */
  /* width:131.938px; */
  width: 11.1111111%;
  height: 8px;
  position: relative;
`;

const MainPhaseStatus = styled.div`
  /* background: ${props => props.theme.timelineCurrentBgColor.default.toString()}; */
  position: relative;
  /* width:880.578px; */
  width: 88.8888889%;
  height: 8px;
`;

class Timeline extends React.Component {
  render() {
    const { stats } = this.props;
    if (stats.fetching || stats.fetching === null) return null;
    const now = moment(Date.now());
    const start = moment(new Date(stats.data.startOfQuarter * 1000));
    const ellapsed = now.diff(start, 'days');
    const mainPhase = 100 * (ellapsed / 90);
    const stakingPhase = 100 * (1 / 9);
    return (
      <TimelineWrapper>
        <Quarter>Q2</Quarter>
        <TimelineBar>
          <TimelineLabel>
            <StakingPhase>STAKING PHASE</StakingPhase>

            <MainPhase>
              <div>MAIN PHASE</div>
              <MainPhaseValue>
                DAY {ellapsed} / 90 <span>|</span>
                {stats.data ? stats.data.totalLockedDgds / 1e9 : 83423.45} STAKE
              </MainPhaseValue>
            </MainPhase>
          </TimelineLabel>

          <TimelineDay>
            <StakingPhaseStatus>
              <ProgressBar variant="determinate" value={stakingPhase > 0 ? stakingPhase : -1} />
            </StakingPhaseStatus>
            <MainPhaseStatus>
              <ProgressBar variant="determinate" value={mainPhase > 0 ? mainPhase : -1} />
            </MainPhaseStatus>
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

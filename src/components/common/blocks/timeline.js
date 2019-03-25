import React from 'react';
import styled from 'styled-components';

import PropTypes from 'prop-types';
import moment from 'moment';

import ProgressBar from '@digix/gov-ui/components/common/blocks/progress-bar';
import { truncateNumber } from '@digix/gov-ui/utils/helpers';
import { DEFAULT_LOCKED_DGD } from '@digix/gov-ui/constants';

const TimelineWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-bottom: 5em;
`;
const Quarter = styled.div`
  color: ${props => props.theme.textPrimary.default.toString()};
  font-family: 'Futura PT Heavy', sans-serif;
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
  font-family: 'Futura PT Heavy', sans-serif;
  display: flex;
  height: 4.5rem;

  & > div {
    color: ${props => props.theme.textPrimary.default.toString()};
  }
`;

const StakingPhase = styled.div`
  width: 11.1111111%;
  border-right: 1px dashed ${props => props.theme.borderColor.lighter.toString()};
`;

const MainPhase = styled.div`
  color: ${props => props.theme.textPrimary.default.toString()};
  width: 88.8888889%;
  display: flex;
  justify-content: space-between;
  padding-left: 1em;

  & > div:last-child {
    color: ${props => props.theme.textDefault.default.toString()};
    letter-spacing: 0.15rem;
    span {
      margin: 0 1.5em;
    }
  }
`;

const MainPhaseValue = styled.div``;

const TimelineDay = styled.div`
  display: flex;
  flex-direction: row;
  position: relative;
`;

const StakingPhaseStatus = styled.div`
  width: 11.1111111%;
  position: relative;
  & > div {
    height: 10px;
    border-top-left-radius: 0.2rem;
    border-bottom-left-radius: 0.2rem;
  }
`;

const MainPhaseStatus = styled.div`
  width: 88.8888889%;
  position: relative;

  & > div {
    height: 10px;
    border-top-right-radius: 0.2rem;
    border-bottom-right-radius: 0.2rem;
  }
`;

class Timeline extends React.Component {
  render() {
    const { stats } = this.props;
    if (stats.fetching || stats.fetching === null) return null;
    const now = moment(Date.now());
    const start = moment(new Date(stats.data.startOfQuarter * 1000));
    const main = moment(new Date(stats.data.startOfMainphase * 1000));

    const stakeDuration = main.diff(start, 'days');

    const ellapsed = now.diff(start, 'days');
    const mainPhase = 100 * (ellapsed / 90);

    const stakingPhase = stakeDuration > 0 && Date.now() < start ? stakeDuration : 100;

    let lockedDgd = stats.data ? stats.data.totalLockedDgds : DEFAULT_LOCKED_DGD;
    lockedDgd = truncateNumber(lockedDgd);

    return (
      <TimelineWrapper>
        <Quarter>Q{stats.data.currentQuarter}</Quarter>
        <TimelineBar>
          <TimelineLabel>
            <StakingPhase>STAKING PHASE</StakingPhase>

            <MainPhase>
              <div>MAIN PHASE</div>
              <MainPhaseValue>
                DAY {ellapsed} / 90 <span>|</span>
                {lockedDgd} STAKE
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

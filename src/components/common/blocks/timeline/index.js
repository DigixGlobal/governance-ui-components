import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import ProgressBar from '@digix/gov-ui/components/common/blocks/progress-bar';
import { truncateNumber } from '@digix/gov-ui/utils/helpers';
import { DEFAULT_LOCKED_DGD } from '@digix/gov-ui/constants';
import {
  MainPhase,
  MainPhaseInfoDivider,
  MainPhaseStatus,
  MainPhaseValue,
  Quarter,
  LockingPhase,
  LockingPhaseStatus,
  TimelineBar,
  TimelineDay,
  TimelineLabel,
  TimelineWrapper,
} from '@digix/gov-ui/components/common/blocks/timeline/style';

class Timeline extends React.Component {
  constructor(props) {
    super(props);
    this.QUARTER_DURATION = 90;
  }

  getDaysEllapsed() {
    let { startOfMainphase } = this.props.stats.data;
    let now = Date.now();
    startOfMainphase *= 1000;

    if (now < startOfMainphase) {
      return 0;
    }

    now = moment(now);
    startOfMainphase = moment(new Date(startOfMainphase));
    return now.diff(startOfMainphase, 'days') + 1;
  }

  getLockingProgress() {
    let { startOfQuarter, startOfMainphase } = this.props.stats.data;
    const now = Date.now();
    startOfQuarter *= 1000;
    startOfMainphase *= 1000;

    if (now >= startOfMainphase) {
      return 100;
    }

    const duration = startOfMainphase - startOfQuarter;
    const timeEllapsed = now - startOfQuarter;
    return 100 * (timeEllapsed / duration);
  }

  render() {
    const { stats } = this.props;
    if (stats.fetching || stats.fetching === null) {
      return null;
    }

    const { currentQuarter, totalLockedDgds } = stats.data;
    const daysEllapsed = this.getDaysEllapsed();
    const lockingPhaseProgress = this.getLockingProgress();
    const mainPhaseProgress = 100 * (daysEllapsed / this.QUARTER_DURATION);

    let lockedDgd = totalLockedDgds || DEFAULT_LOCKED_DGD;
    lockedDgd = truncateNumber(lockedDgd);

    return (
      <TimelineWrapper>
        <Quarter>Q{currentQuarter}</Quarter>
        <TimelineBar>
          <TimelineLabel>
            <LockingPhase>LOCKING PHASE</LockingPhase>
            <MainPhase>
              <div>MAIN PHASE</div>
              <MainPhaseValue>
                <span data-digix="Dashboard-Timeline-DaysEllpased">DAY {daysEllapsed}</span>
                <span>&nbsp;/ {this.QUARTER_DURATION}</span>
                <MainPhaseInfoDivider>|</MainPhaseInfoDivider>
                <span data-digix="Dashboard-Timeline-TotalStake">{lockedDgd} STAKE</span>
              </MainPhaseValue>
            </MainPhase>
          </TimelineLabel>

          <TimelineDay>
            <LockingPhaseStatus>
              <ProgressBar variant="determinate" value={lockingPhaseProgress || -1} />
            </LockingPhaseStatus>
            <MainPhaseStatus>
              <ProgressBar variant="determinate" value={mainPhaseProgress || -1} />
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

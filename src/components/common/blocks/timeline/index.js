import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { connect } from 'react-redux';

import ProgressBar from '@digix/gov-ui/components/common/blocks/progress-bar';
import { DEFAULT_LOCKED_DGD } from '@digix/gov-ui/constants';
import { getDaoConfig } from '@digix/gov-ui/reducers/info-server/actions';
import { truncateNumber } from '@digix/gov-ui/utils/helpers';
import { withFetchDaoInfo } from '@digix/gov-ui/api/graphql-queries/dao';

import { ToolTip, Icon } from '@digix/gov-ui/components/common/index';
import {
  MainPhase,
  Divider,
  Qtr,
  LockPhase,
  TimelineBar,
  Wrapper,
  Label,
  Phase,
  Progress,
} from '@digix/gov-ui/components/common/blocks/timeline/style';

class Timeline extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quarterDurationInDays: 90,
    };

    this.hasSubscribed = false;
  }

  componentDidMount() {
    const { subscribeToDao } = this.props;
    if (subscribeToDao) {
      subscribeToDao();
      this.hasSubscribed = true;
    }

    this.props.getDaoConfig().then(() => {
      let quarterDuration = Number(this.props.DaoConfig.CONFIG_QUARTER_DURATION);
      quarterDuration = moment.duration(quarterDuration, 'seconds');

      const quarterDurationInDays = Math.round(quarterDuration.asDays());
      this.setState({ quarterDurationInDays });
    });
  }

  shouldComponentUpdate(nextProps) {
    if (!this.hasSubscribed && nextProps.subscribeToDao) {
      nextProps.subscribeToDao();
      this.hasSubscribed = true;
    }

    return true;
  }

  getDaysEllapsed() {
    let { startOfQuarter } = this.props.stats.data;
    startOfQuarter *= 1000;

    let now = Date.now();
    now = moment(now);

    startOfQuarter = moment(new Date(startOfQuarter));
    return now.diff(startOfQuarter, 'days') + 1;
  }

  getLockedDgd() {
    const { daoInfo, stats } = this.props;
    let lockedDgd = DEFAULT_LOCKED_DGD;

    if (daoInfo) {
      lockedDgd = daoInfo.totalLockedDgds;
    } else if (stats.data) {
      lockedDgd = stats.data.totalLockedDgds;
    }

    return truncateNumber(lockedDgd);
  }

  getProgress = (startTime, endTime) => {
    const now = Date.now();
    if (now >= endTime) {
      return 100;
    }

    const duration = endTime - startTime;
    const timeEllapsed = now - startTime;
    return 100 * (timeEllapsed / duration);
  };

  render() {
    const { stats, translations } = this.props;
    if (!translations.data) return null;
    const { dashboard } = translations.data;
    const { Timeline: timeline } = dashboard;
    if (stats.fetching || stats.fetching === null) {
      return null;
    }

    const { quarterDurationInDays } = this.state;
    const { currentQuarter } = stats.data;
    let { startOfMainphase, startOfNextQuarter, startOfQuarter } = stats.data;

    // convert to ms
    startOfMainphase *= 1000;
    startOfNextQuarter *= 1000;
    startOfQuarter *= 1000;

    const daysEllapsed = this.getDaysEllapsed();
    const lockingPhaseProgress = this.getProgress(startOfQuarter, startOfMainphase);
    const mainPhaseProgress = this.getProgress(startOfMainphase, startOfNextQuarter);
    const lockedDgd = this.getLockedDgd();

    return (
      <Wrapper>
        <Qtr>Q{currentQuarter}</Qtr>
        <TimelineBar>
          <LockPhase>
            <Label locking>
              <div>
                <Phase>{dashboard.Timeline.lockingPhase}</Phase>
                <ToolTip
                  title={timeline.stakinPhase || 'Staking Phase'}
                  content={`${timeline.startsOn || `Starts on`} ${' '} ${moment(
                    startOfQuarter
                  ).format('dddd MMMM DD YYYY, h:mm:ss a')} ${timeline.endsOn ||
                    'and ends on'} ${' '} ${moment(startOfMainphase).format(
                    'dddd MMMM DD YYYY, h:mm:ss a'
                  )}.`}
                >
                  <Icon kind="info" />
                </ToolTip>
              </div>
            </Label>
            <Progress locking>
              <ProgressBar variant="determinate" value={lockingPhaseProgress || -1} />
            </Progress>
          </LockPhase>
          <MainPhase>
            <Label>
              <div>
                <Phase>{dashboard.Timeline.mainPhase}</Phase>
                <ToolTip
                  title={timeline.mainPhase || 'Main Phase'}
                  content={`${timeline.startsOn || `Starts on`} ${' '} ${moment(
                    startOfMainphase
                  ).format('dddd MMMM DD YYYY, h:mm:ss a')} ${timeline.endsOn ||
                    'and ends on'} ${' '} ${moment(startOfNextQuarter).format(
                    'dddd MMMM DD YYYY, h:mm:ss a'
                  )}`}
                >
                  <Icon kind="info" />
                </ToolTip>
              </div>

              <div>
                <span data-digix="Dashboard-Timeline-DaysEllpased">
                  {dashboard.Timeline.day} {daysEllapsed}
                </span>
                <span>&nbsp;/ {quarterDurationInDays}</span>
                <Divider>|</Divider>
                <span data-digix="Dashboard-Timeline-TotalStake">
                  {lockedDgd} {dashboard.Timeline.stake}
                </span>
              </div>
            </Label>
            <Progress main>
              <ProgressBar variant="determinate" value={mainPhaseProgress || -1} />
            </Progress>
          </MainPhase>
        </TimelineBar>
      </Wrapper>
    );
  }
}

const { func, object } = PropTypes;

Timeline.propTypes = {
  DaoConfig: object.isRequired,
  getDaoConfig: func.isRequired,
  daoInfo: object,
  stats: object.isRequired,
  translations: object.isRequired,
  subscribeToDao: func,
};

Timeline.defaultProps = {
  daoInfo: undefined,
  subscribeToDao: undefined,
};

const mapStateToProps = ({ infoServer }) => ({
  DaoConfig: infoServer.DaoConfig.data,
  DaoDetails: infoServer.DaoDetails.data,
});

const TimelineComponent = connect(
  mapStateToProps,
  {
    getDaoConfig,
  }
)(Timeline);

export default withFetchDaoInfo(TimelineComponent);

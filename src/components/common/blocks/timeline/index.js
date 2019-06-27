import React, { Fragment } from 'react';
import PropTypes, { bool } from 'prop-types';
import moment from 'moment';
import { connect } from 'react-redux';

import ProgressBar from '@digix/gov-ui/components/common/blocks/progress-bar';
import { DEFAULT_LOCKED_DGD } from '@digix/gov-ui/constants';
import { getDaoConfig, getPriceInfo } from '@digix/gov-ui/reducers/info-server/actions';
import { truncateNumber } from '@digix/gov-ui/utils/helpers';
import { withFetchDaoInfo } from '@digix/gov-ui/api/graphql-queries/dao';
import UserAddressStats from '@digix/gov-ui/components/common/blocks/user-address-stats/index';

import { ToolTip, Icon } from '@digix/gov-ui/components/common/index';
import {
  MainPhase,
  Qtr,
  Toggle,
  Stats,
  Item,
  Data,
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
      isQuarterOverview: true,
    };

    this.hasSubscribed = false;
  }

  componentDidMount() {
    const { subscribeToDao } = this.props;
    if (subscribeToDao) {
      subscribeToDao();
      this.hasSubscribed = true;
    }
    this.props.getPriceInfo();
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

  getRemainingPrice() {
    const { remainingFunds } = this.props.stats.data;
    const { ethusd } = this.props.PriceInfo;
    const fund = Number(remainingFunds);
    const price = fund * ethusd;
    return this.priceFormatter(price);
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

  toggleTimeline = () => {
    this.setState({
      isQuarterOverview: !this.state.isQuarterOverview,
    });
  };

  priceFormatter = num => {
    if (Math.abs(num) > 999 && Math.abs(num) < 999999) {
      return `${Math.sign(num) * (Math.abs(num) / 1000).toFixed(2)}K`;
    } else if (Math.abs(num) > 999999) {
      return `${Math.sign(num) * (Math.abs(num) / 1000000).toFixed(2)}M`;
    }

    return Math.sign(num) * Math.abs(num);
  };

  render() {
    const { stats, translations, isWalletLoaded } = this.props;
    if (!translations.data) return null;
    const { dashboard } = translations.data;
    const { Timeline: timeline } = dashboard;
    if (stats.fetching || stats.fetching === null) {
      return null;
    }

    const { toggleTimeline } = this;
    const { quarterDurationInDays, isQuarterOverview } = this.state;
    const { currentQuarter } = stats.data;
    let { startOfMainphase, startOfNextQuarter, startOfQuarter, remainingFunds } = stats.data;

    // convert to ms
    startOfMainphase *= 1000;
    startOfNextQuarter *= 1000;
    startOfQuarter *= 1000;

    const daysEllapsed = this.getDaysEllapsed();
    const remainingPrice = this.getRemainingPrice();
    const lockingPhaseProgress = this.getProgress(startOfQuarter, startOfMainphase);
    const mainPhaseProgress = this.getProgress(startOfMainphase, startOfNextQuarter);
    const lockedDgd = this.getLockedDgd();

    return (
      <Wrapper>
        <Qtr>
          {isQuarterOverview
            ? `Q${currentQuarter} ${dashboard.Timeline.overview}`
            : `${dashboard.Timeline.yourStakesAndReward}`}
        </Qtr>
        {isWalletLoaded && (
          <Toggle onClick={toggleTimeline}>
            {isQuarterOverview
              ? `${dashboard.Timeline.yourStakesAndReward}`
              : `${dashboard.Timeline.quarter} ${dashboard.Timeline.overview}`}
            <Icon kind="arrow" />
          </Toggle>
        )}
        <TimelineBar>
          {isQuarterOverview ? (
            <Stats>
              <Item>
                <Data data-digix="Dashboard-Timeline-DaysEllpased">
                  {dashboard.Timeline.day} {daysEllapsed} of {quarterDurationInDays}
                </Data>
                <span className="equiv">
                  <span>{dashboard.Timeline.remainingDays}</span>
                </span>
              </Item>
              <Item>
                <Data data-digix="Dashboard-Timeline-TotalStake">
                  {lockedDgd} {dashboard.Timeline.stake}
                </Data>
                <span className="equiv">
                  <span>{dashboard.Timeline.totalLockedStakes}</span>
                </span>
              </Item>
              <Item>
                <Data data-digix="Dashboard-Timeline-RemainingFunds">
                  {remainingFunds} ETH (US${remainingPrice})
                </Data>
                <span className="equiv">
                  <span>{dashboard.Timeline.currentDigixDAOFunding}</span>
                </span>
              </Item>
            </Stats>
          ) : (
            <UserAddressStats translations={translations} />
          )}
          {isQuarterOverview && (
            <Fragment>
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
                </Label>
                <Progress main>
                  <ProgressBar variant="determinate" value={mainPhaseProgress || -1} />
                </Progress>
              </MainPhase>
            </Fragment>
          )}
        </TimelineBar>
      </Wrapper>
    );
  }
}

const { func, object } = PropTypes;

Timeline.propTypes = {
  DaoConfig: object.isRequired,
  PriceInfo: object.isRequired,
  getDaoConfig: func.isRequired,
  getPriceInfo: func.isRequired,
  daoInfo: object,
  stats: object.isRequired,
  translations: object.isRequired,
  subscribeToDao: func,
  isWalletLoaded: bool.isRequired,
};

Timeline.defaultProps = {
  daoInfo: undefined,
  subscribeToDao: undefined,
};

const mapStateToProps = ({ infoServer }) => ({
  DaoConfig: infoServer.DaoConfig.data,
  DaoDetails: infoServer.DaoDetails.data,
  PriceInfo: infoServer.PriceInfo.data,
});

const TimelineComponent = connect(
  mapStateToProps,
  {
    getDaoConfig,
    getPriceInfo,
  }
)(Timeline);

export default withFetchDaoInfo(TimelineComponent);

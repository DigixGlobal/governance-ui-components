import React from 'react';
import styled from 'styled-components';

import PropTypes from 'prop-types';

const TimelineWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  margin-bottom: 5em;
`;
const Quarter = styled.div`
  color: ${props => props.theme.primary.default.toString()};
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
    color: ${props => props.theme.primary.default.toString()};
    &:first-child {
      width: 15%;
      border-right: 1px dashed ${props => props.theme.borderColor.lighter.toString()};
      font-weight: 600 !important;
    }
    &:last-child {
      color: ${props => props.theme.primary.default.toString()};
      width: 100%;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      padding-left: 1em;

      & > div:last-child {
        color: ${props => props.theme.defaultTextColor.lighter.toString()};
      }
    }
  }
`;

const TimelineDay = styled.div`
  background: ${props => props.theme.timelineBgColor.lightest.toString()};
`;

const Status = styled.div`
  background: ${props => props.theme.timelineCurrentBgColor.default.toString()};
  width: 33%;
  height: 8px;
`;

class Timeline extends React.Component {
  render() {
    const { stats } = this.props;
    return (
      <TimelineWrapper>
        <Quarter>Q2</Quarter>
        <TimelineBar>
          <TimelineLabel>
            <div>STAKING PHASE</div>
            <div>
              <div>MAIN PHASE</div>
              <div>
                DAY 56 / 90 | {stats.data ? stats.data.totalDgdsLocked / 1e9 : 83423.45} STAKE
              </div>
            </div>
          </TimelineLabel>

          <TimelineDay>
            <Status />
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

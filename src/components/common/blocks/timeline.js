import React from 'react';
import styled from 'styled-components';

const TimelineWrapper = styled.div`
  margin: 2em auto;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
`;
const Quarter = styled.div`
  font-size: 6em;
  margin-right: 20px;
  line-height: 0.8em;
`;
const TimelineBar = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const TimelineLabel = styled.div`
  display: flex;
  flex-direction: row;
  height: 38px;

  & > div {
    &:first-child {
      width: 11.1111%;
      border-right: 1px dashed #c3c6cb;
      font-weight: 600 !important;
      font-size: 1.5em;
    }
    &:last-child {
      width: 100%;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      font-size: 1.5em;
      padding-left: 1em;
      color: #666;
    }
  }
`;

const TimelineDay = styled.div`
  background: #c3c6cb;
`;

const Status = styled.div`
  background: #131f35;
  width: 33%;
  height: 8px;
`;

class Timeline extends React.Component {
  render() {
    return (
      <TimelineWrapper>
        <Quarter>Q2</Quarter>
        <TimelineBar>
          <TimelineLabel>
            <div>STAKING PHASE</div>
            <div>
              <div>MAIN PHASE</div>
              <div>DAY 56 / 90 | 83423.45 STAKED</div>
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

export default Timeline;

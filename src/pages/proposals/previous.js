import React from 'react';
import { PreviousWrapper } from './style';

export default class PreviousVersion extends React.Component {
  render() {
    return (
      <div>
        <PreviousWrapper>
          <i />
          <span>See Previous Version</span>
        </PreviousWrapper>
      </div>
    );
  }
}

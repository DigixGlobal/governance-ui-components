import React from 'react';
import { Button } from '../../components/common/elements/index';
import { PreviousWrapper } from './style';

export default class PreviousVersion extends React.Component {
  render() {
    return (
      <div>
        <PreviousWrapper>
          <i />
          <Button kind="iconLabeled" {...this.props}>
            See Previous Version
          </Button>
        </PreviousWrapper>
      </div>
    );
  }
}

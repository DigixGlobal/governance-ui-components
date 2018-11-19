import React from 'react';
import { Button } from '../../components/common/elements/index';
import { PreviousWrapper } from './style';

export default class PreviousVersion extends React.Component {
  render() {
    const { disabled } = this.props;
    return (
      <div>
        <PreviousWrapper disabled={disabled}>
          <i />
          <Button kind="iconLabeled" {...this.props}>
            See Previous Version
          </Button>
        </PreviousWrapper>
      </div>
    );
  }
}

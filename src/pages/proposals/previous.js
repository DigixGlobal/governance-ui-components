import React from 'react';

import { Button, Icon } from '../../components/common/elements/index';
import { PreviousWrapper } from './style';

export default class PreviousVersion extends React.Component {
  render() {
    const { disabled } = this.props;
    return (
      <PreviousWrapper>
        <Button kind="text" small disabled={disabled} {...this.props}>
          <Icon kind="arrow" style={{ marginRight: 0 }} />
          See Previous Version
        </Button>
      </PreviousWrapper>
    );
  }
}

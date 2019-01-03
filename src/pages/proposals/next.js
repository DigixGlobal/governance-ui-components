import React from 'react';

import { Button, Icon } from '../../components/common/elements/index';
import { NextWrapper } from './style';

export default class NextVersion extends React.Component {
  render() {
    const { disabled } = this.props;
    return (
      <NextWrapper disabled={disabled}>
        <Button kind="text" small {...this.props}>
          See Next Version
          <Icon kind="arrow" style={{ marginRight: 0 }} />
        </Button>
      </NextWrapper>
    );
  }
}

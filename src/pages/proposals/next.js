import React from 'react';
import { Button } from '../../components/common/elements/index';
import { NextWrapper } from './style';

export default class NextVersion extends React.Component {
  render() {
    const { disabled } = this.props;
    return (
      <NextWrapper disabled={disabled}>
        <Button kind="iconLabeled" {...this.props}>
          See Next Version
        </Button>
        <i disabled={disabled} />
      </NextWrapper>
    );
  }
}

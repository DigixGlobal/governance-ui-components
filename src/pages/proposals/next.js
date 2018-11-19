import React from 'react';
import { Button } from '../../components/common/elements/index';
import { NextWrapper } from './style';

export default class NextVersion extends React.Component {
  render() {
    return (
      <NextWrapper>
        <Button kind="iconLabeled" {...this.props}>
          See Next Version
        </Button>
        <i />
      </NextWrapper>
    );
  }
}

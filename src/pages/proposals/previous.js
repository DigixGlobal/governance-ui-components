import React from 'react';
import PropTypes from 'prop-types';

import { Button, Icon } from '../../components/common/elements/index';
import { PreviousWrapper } from './style';

export default class PreviousVersion extends React.Component {
  render() {
    const { disabled } = this.props;
    return (
      <PreviousWrapper>
        <Button kind="text" small disabled={disabled} {...this.props}>
          <Icon kind="arrow" />
          See Previous Version
        </Button>
      </PreviousWrapper>
    );
  }
}

const { bool } = PropTypes;

PreviousVersion.propTypes = {
  disabled: bool,
};

PreviousVersion.defaultProps = {
  disabled: false,
};

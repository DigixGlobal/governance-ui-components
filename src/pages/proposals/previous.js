import React from 'react';
import PropTypes from 'prop-types';

import { Button, Icon } from '../../components/common/elements/index';
import { PreviousWrapper } from './style';

export default class PreviousVersion extends React.Component {
  render() {
    const { disabled, translations } = this.props;
    return (
      <PreviousWrapper>
        <Button kind="text" small disabled={disabled} {...this.props}>
          <Icon kind="arrow" />
          {translations.seePreviousVersion || 'See Previous Version'}
        </Button>
      </PreviousWrapper>
    );
  }
}

const { bool, object } = PropTypes;

PreviousVersion.propTypes = {
  disabled: bool,
  translations: object.isRequired,
};

PreviousVersion.defaultProps = {
  disabled: false,
};

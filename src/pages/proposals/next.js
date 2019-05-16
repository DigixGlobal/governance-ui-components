import React from 'react';
import PropTypes from 'prop-types';

import { Button, Icon } from '../../components/common/elements/index';
import { NextWrapper } from './style';

export default class NextVersion extends React.Component {
  render() {
    const { disabled, translations } = this.props;
    return (
      <NextWrapper disabled={disabled}>
        <Button kind="text" small {...this.props}>
          {translations.seeNextVersion || 'See Next Version'}
          <Icon kind="arrow" style={{ marginRight: 0, marginLeft: '1rem' }} />
        </Button>
      </NextWrapper>
    );
  }
}

const { bool, object } = PropTypes;

NextVersion.propTypes = {
  disabled: bool,
  translations: object.isRequired,
};

NextVersion.defaultProps = {
  disabled: false,
};

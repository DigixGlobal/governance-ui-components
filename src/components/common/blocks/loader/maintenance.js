import React from 'react';
import PropTypes from 'prop-types';

import ScreenLoader from '@digix/gov-ui/components/common/blocks/loader/screen';
import { Icon } from '@digix/gov-ui/components/common/index';
import {
  Preloaders,
  Maintenance,
  Content,
} from '@digix/gov-ui/components/common/blocks/loader/style';

class Maint extends React.Component {
  render() {
    const {
      translations: {
        data: {
          common: { maintenance },
        },
      },
      height,
    } = this.props;
    return (
      <Preloaders height={height}>
        <Maintenance>
          <Content>
            <Icon kind="repair" large style={{ marginBottom: '2rem' }} />
            <h1>{maintenance.title}</h1>
            <p>{maintenance.description}</p>
          </Content>
        </Maintenance>

        <ScreenLoader />
      </Preloaders>
    );
  }
}

const { object, string } = PropTypes;
Maint.propTypes = {
  translations: object.isRequired,
  height: string,
};

Maint.defaultProps = {
  height: undefined,
};

export default Maint;

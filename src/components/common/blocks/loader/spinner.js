import React from 'react';
import PropTypes from 'prop-types';

import ScreenLoader from '@digix/gov-ui/components/common/blocks/loader/screen';
import {
  Preloaders,
  SpinnerWrapper,
  Loader,
  Content,
} from '@digix/gov-ui/components/common/blocks/loader/style';

class Spinner extends React.Component {
  render() {
    const {
      translations: {
        project: { spinner },
      },
    } = this.props;
    return (
      <Preloaders>
        <SpinnerWrapper>
          <Content>
            <Loader />
            <h1>{spinner.pleaseWait}</h1>
            <p>{spinner.hold}</p>
          </Content>
        </SpinnerWrapper>
        <ScreenLoader />
      </Preloaders>
    );
  }
}

Spinner.propTypes = {
  translations: PropTypes.object.isRequired,
};

export default Spinner;

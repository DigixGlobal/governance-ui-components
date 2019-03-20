import React from 'react';

import ScreenLoader from '@digix/gov-ui/components/common/blocks/loader/screen';
import {
  Preloaders,
  SpinnerWrapper,
  Loader,
  Content,
} from '@digix/gov-ui/components/common/blocks/loader/style';

class Spinner extends React.Component {
  render() {
    return (
      <Preloaders>
        <SpinnerWrapper>
          <Content>
            <Loader />
            <h1>Please wait.</h1>
            <p>Hold tight while your proposal is being uploaded to IPFS.</p>
          </Content>
        </SpinnerWrapper>
        <ScreenLoader />
      </Preloaders>
    );
  }
}

export default Spinner;

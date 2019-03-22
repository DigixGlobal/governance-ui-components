import React from 'react';

import ScreenLoader from '@digix/gov-ui/components/common/blocks/loader/screen';
import {
  Preloaders,
  SpinnerWrapper,
  Content,
} from '@digix/gov-ui/components/common/blocks/loader/style';

import { Button, Icon } from '@digix/gov-ui/components/common/elements/index';

class Restriction extends React.Component {
  render() {
    return (
      <Preloaders>
        <SpinnerWrapper>
          <Content>
            <Icon primary kind="padlock" width="12rem" height="12rem" />
            <p>&nbsp;</p>
            <h1>You don't have permission to view this page.</h1>

            <h2>
              DigixDAO is not available in your current location. Please contact us for any
              enquiries.
            </h2>
            <p>&nbsp;</p>
            <Button primary large>
              Contact Us
            </Button>
          </Content>
        </SpinnerWrapper>
        <ScreenLoader />
      </Preloaders>
    );
  }
}

export default Restriction;

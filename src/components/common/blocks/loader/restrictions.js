import React from 'react';

import { Link } from 'react-router-dom';

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
            <h1>DigixDAO isn't available in your country yet.</h1>

            <h2>
              You don't have permission to view this page. Please contact us via the Help button
              below for any enquiries.
            </h2>
            <p>&nbsp;</p>
          </Content>
        </SpinnerWrapper>
        <ScreenLoader />
      </Preloaders>
    );
  }
}

export default Restriction;

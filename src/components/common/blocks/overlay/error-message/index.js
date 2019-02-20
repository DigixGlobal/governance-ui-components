import React from 'react';

import { Button } from '@digix/gov-ui/components/common/elements/index';

import {
  IntroContainer,
  OverlayHeader as Header,
  Notifications,
} from '@digix/gov-ui/components/common/common-styles';

class ErrorMessageOverlay extends React.Component {
  render() {
    return (
      <IntroContainer>
        <Header uppercase>&nbsp;</Header>
        <Notifications error>
          <h3>Not Enough Collateral!</h3>
          <p>
            It looks like there is insufficient ETH in your wallet. You will need 2 ETH for your
            project as collateral.
          </p>
          <p>Let's try again when you have enough ETH.</p>
        </Notifications>

        <Button secondary fluid large onClick={this.handleButtonClick}>
          Return to Dashboard
        </Button>
      </IntroContainer>
    );
  }
}

ErrorMessageOverlay.propTypes = {};

export default ErrorMessageOverlay;

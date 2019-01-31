import React from 'react';
import PropTypes from 'prop-types';

import web3Connect from 'spectrum-lightsuite/src/helpers/web3/connect';

import Button from '@digix/gov-ui/components/common/elements/buttons/index'; // '../../elements/buttons';

import {
  IntroContainer,
  OverlayHeader as Header,
} from '@digix/gov-ui/components/common/common-styles';

class Intro extends React.Component {
  handleButtonClick = () => {};
  render() {
    return (
      <IntroContainer>
        <Header uppercase>Enabling Your DGD BADGE For Use</Header>
        <p>
          In order to redeem a DGD Badge, we need your approval in order for our contracts to
          interact with your DGD Badge.
        </p>

        <Button kind="round" secondary fluid large onClick={this.handleButtonClick}>
          APPROVE THE INTERACTION
        </Button>
      </IntroContainer>
    );
  }
}

export default Intro;

import React from 'react';

import { Button } from '@digix/gov-ui/components/common/elements/index';
import { Content, Title, Intro } from '@digix/gov-ui/pages/style';

class ConfirmParticipation extends React.Component {
  render() {
    return (
      <Content>
        <Title>Confirming Participation For New Quarter</Title>
        <Intro>
          In order to continue participating in the new quarter, we need you to sign a transaction
          confirming the amount of stake you have on the platform. There are 3 options of
          transaction you can make:
        </Intro>

        <Button
          fluid
          large
          reverse
          data-digix="Confirm-Participation-Lock-More-Dgd"
          onClick={this.handleTosClose}
          style={{ marginLeft: '0' }}
        >
          I want to lock more DGD
        </Button>
        <Button
          fluid
          large
          reverse
          data-digix="Confirm-Participation-Continue-Lock-Up"
          onClick={this.handleTosClose}
          style={{ marginLeft: '0' }}
        >
          I want to continue with my current lock-up of DGD
        </Button>
        <Button
          fluid
          large
          reverse
          data-digix="Confirm-Participation-Unlock-Dgd"
          onClick={this.handleTosClose}
          style={{ marginLeft: '0' }}
        >
          I want to unlock some DGD
        </Button>
      </Content>
    );
  }
}

export default ConfirmParticipation;

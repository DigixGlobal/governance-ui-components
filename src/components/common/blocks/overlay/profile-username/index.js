import React from 'react';
import { connect } from 'react-redux';

import web3Connect from 'spectrum-lightsuite/src/helpers/web3/connect';
import { Button, Input } from '@digix/gov-ui/components/common/elements/index';
import {
  IntroContainer,
  OverlayHeader as Header,
  Notifications,
  Label,
  Hint,
} from '@digix/gov-ui/components/common/common-styles';

import { CallToAction } from '@digix/gov-ui/components/common/blocks/overlay/profile-username/style';

class UsernameOverlay extends React.Component {
  render() {
    return (
      <IntroContainer>
        <Header uppercase>Set Username</Header>
        <Notifications info>
          You can only assign a username to yourself <span>ONCE</span>.
        </Notifications>
        <Label>Please enter your desired user name</Label>
        <Input type="text" data-digix="SetUsername-TexBox" />
        <Hint>
          This email is already used with a DigixDAO account. Please try another email address.
        </Hint>
        <CallToAction>
          <Button primary fluid large data-digix="SetUsername-Cta">
            Set Username
          </Button>
        </CallToAction>
      </IntroContainer>
    );
  }
}

UsernameOverlay.propTypes = {};
const mapStateToProps = () => ({});
export default web3Connect(
  connect(
    mapStateToProps,
    {}
  )(UsernameOverlay)
);

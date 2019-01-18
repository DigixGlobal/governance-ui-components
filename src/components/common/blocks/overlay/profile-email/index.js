import React from 'react';
import { connect } from 'react-redux';

import web3Connect from 'spectrum-lightsuite/src/helpers/web3/connect';
import { Button, Input } from '@digix/gov-ui/components/common/elements/index';
import {
  IntroContainer,
  OverlayHeader as Header,
  Label,
  Hint,
} from '@digix/gov-ui/components/common/common-styles';

import { CallToAction } from '@digix/gov-ui/components/common/blocks/overlay/profile-email/style';

class EmailOverlay extends React.Component {
  render() {
    return (
      <IntroContainer>
        <Header uppercase>Set Email</Header>
        <Label>Please enter the email you want to link to your address</Label>
        <Input type="text" data-digix="SetEmail-Textbox" />
        <Hint>
          This email is already used with a DigixDAO account. Please try another email address.
        </Hint>
        <CallToAction>
          <Button primary fluid large data-digix="SetEmail-Cta">
            Set Email
          </Button>
        </CallToAction>
      </IntroContainer>
    );
  }
}

EmailOverlay.propTypes = {};
const mapStateToProps = () => ({});
export default web3Connect(
  connect(
    mapStateToProps,
    {}
  )(EmailOverlay)
);

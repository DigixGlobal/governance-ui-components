import React from 'react';
import { connect } from 'react-redux';

import web3Connect from 'spectrum-lightsuite/src/helpers/web3/connect';
import { Button } from '@digix/gov-ui/components/common/elements/index';
import {
  IntroContainer,
  OverlayHeader as Header,
  Notifications,
  Label,
  Hint,
} from '@digix/gov-ui/components/common/common-styles';

import { UnlockDGDContainer, TextBox, MaxAmount, Currency, CallToAction } from './style';

class UnlockDgdOverlay extends React.Component {
  render() {
    return (
      <IntroContainer>
        <Header uppercase>Unlock DGD</Header>
        <Notifications info>
          Amount of DGD locked in: <span data-digix="UnlockDgd-Amount">125</span> DGD
        </Notifications>

        <Label>Please enter the amount of DGD you wish to unlock:</Label>
        <UnlockDGDContainer>
          <TextBox type="number" data-digix="UnlockDgd-TexBox" />
          <MaxAmount to="./" data-digix="UnlockDgd-FillAmount">
            Fill maximum
          </MaxAmount>
          <Currency>DGD</Currency>
        </UnlockDGDContainer>
        <Hint>This will leave you with 95 STAKE in DigixDAO.</Hint>
        <CallToAction>
          <Button primary fluid data-digix="UnlockDgd-Cta">
            Unlock DGD
          </Button>
        </CallToAction>
      </IntroContainer>
    );
  }
}

UnlockDgdOverlay.propTypes = {};
const mapStateToProps = () => ({});
export default web3Connect(
  connect(
    mapStateToProps,
    {}
  )(UnlockDgdOverlay)
);

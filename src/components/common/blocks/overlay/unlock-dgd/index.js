import React from 'react';
import { connect } from 'react-redux';

import web3Connect from 'spectrum-lightsuite/src/helpers/web3/connect';
import {
  IntroContainer,
  OverlayHeader as Header,
} from '@digix/gov-ui/components/common/common-styles';

class UnlockDgdOverlay extends React.Component {
  render() {
    return (
      <IntroContainer>
        <Header uppercase>Unlock DGD</Header>
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

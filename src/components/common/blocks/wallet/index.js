import React from 'react';
import PropTypes from 'prop-types';

import web3Connect from 'spectrum-lightsuite/src/helpers/web3/connect';
import { getDefaultAddress } from 'spectrum-lightsuite/src/selectors';

import { connect } from 'react-redux';

import {
  createKeystore,
  updateKeystore,
  deleteKeystore,
} from 'spectrum-lightsuite/src/actions/keystore';

import { Container, TransparentOverlay, WalletContainer } from './style';
import Intro from './intro';
import LoadWallet from './load-wallet';
import ConnectedWallet from './connected-wallet';

import { Stage } from './constants';

export class Wallet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stage: Stage.Intro,
    };
  }

  updateStage = stage => {
    this.setState({ stage });
  };
  render() {
    const { stage } = this.state;
    const { show, onClose, defaultAddress, ...rest } = this.props;

    if (!show) return null;
    return (
      <Container>
        <TransparentOverlay>overlay</TransparentOverlay>
        <WalletContainer>
          {stage === Stage.Intro && <Intro onClose={onClose} onChangeStage={this.updateStage} />}
          {stage === Stage.LoadingWallet &&
            !defaultAddress && <LoadWallet {...rest} onChangeStage={this.updateStage} />}
          {defaultAddress && (
            <ConnectedWallet {...rest} onClose={onClose} address={defaultAddress} />
          )}
        </WalletContainer>
      </Container>
    );
  }
}

const { func, bool } = PropTypes;
Wallet.propTypes = {
  show: bool,
  onClose: func.isRequired,
};

Wallet.defaultProps = {
  show: false,
};

const actions = {
  createKeystore,
  updateKeystore,
  deleteKeystore,
};

const mapStateToProps = state => ({
  // networks: getNetworks(state),
  defaultAddress: getDefaultAddress(state),
});

export default web3Connect(
  connect(
    mapStateToProps,
    actions
  )(Wallet)
);

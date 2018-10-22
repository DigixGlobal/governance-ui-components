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

import { getAddressDetails } from '../../../../actions';

export class Wallet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stage: Stage.Intro,
    };
  }

  componentWillReceiveProps(nextProps) {
    const {
      defaultAddress,
      AddressDetails: { error, fetching },
      getAddressDetailsAction,
    } = nextProps;

    if ((fetching === null && defaultAddress) || (error && defaultAddress)) {
      getAddressDetailsAction(defaultAddress.address);
    }
  }
  shouldComponentUpdate(nextProps, nextState) {
    return this.props !== nextProps || this.state !== nextState;
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
  getAddressDetailsAction: func.isRequired,
};

Wallet.defaultProps = {
  show: false,
};

const actions = {
  createKeystore,
  updateKeystore,
  deleteKeystore,
  getAddressDetailsAction: getAddressDetails,
};

const mapStateToProps = state => ({
  // networks: getNetworks(state),
  defaultAddress: getDefaultAddress(state),
  AddressDetails: state.governance.AddressDetails,
});

export default web3Connect(
  connect(
    mapStateToProps,
    actions
  )(Wallet)
);

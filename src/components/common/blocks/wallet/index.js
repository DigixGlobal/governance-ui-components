import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import web3Connect from 'spectrum-lightsuite/src/helpers/web3/connect';
import { getDefaultNetworks } from 'spectrum-lightsuite/src/selectors';
import { showMsgSigningModal } from 'spectrum-lightsuite/src/actions/session';
import { connect } from 'react-redux';

import {
  createKeystore,
  updateKeystore,
  deleteKeystore,
} from 'spectrum-lightsuite/src/actions/keystore';

import {
  setAuthentationStatus,
  showHideAlert,
  showHideWalletOverlay,
} from '@digix/gov-ui/reducers/gov-ui/actions';

import { Container } from './style';
import { TransparentOverlay, DrawerContainer } from '../../common-styles';
import Intro from './intro';
import LoadWallet from './load-wallet';
import ConnectedWallet from './connected-wallet';

import { Stage } from './constants';

export class Wallet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stage: Stage.Intro,
      signed: false,
      proving: false,
    };
  }

  componentDidMount() {
    this._isMounted = true;
  }

  shouldComponentUpdate = (nextProps, nextState) =>
    !_.isEqual(nextProps, this.props) || !_.isEqual(nextState, this.state);

  componentWillUnmount() {
    this._isMounted = false;
  }

  _isMounted = false;
  updateStage = stage => {
    if (this._isMounted) {
      this.setState({ stage });
    }
  };

  render() {
    const { stage } = this.state;
    const { showWallet, isAuthenticated, addressDetails, ...rest } = this.props;

    const details = addressDetails.data;
    const hasParticipated = details
      ? details.isParticipant || details.lastParticipatedQuarter > 0
      : false;

    if (!showWallet || !showWallet.show || hasParticipated) return null;
    return (
      <Container>
        <TransparentOverlay />
        <DrawerContainer>
          {stage === Stage.Intro && !isAuthenticated && (
            <Intro
              onClose={() => this.props.showHideWalletOverlay(!showWallet)}
              onChangeStage={this.updateStage}
            />
          )}
          {stage === Stage.LoadingWallet && !isAuthenticated && (
            <LoadWallet {...rest} onChangeStage={this.updateStage} />
          )}
          {!hasParticipated && (stage === Stage.WalletLoaded || isAuthenticated) && (
            <ConnectedWallet
              {...rest}
              onClose={() => this.props.showHideWalletOverlay(!showWallet)}
            />
          )}
        </DrawerContainer>
      </Container>
    );
  }
}

const { func, object, bool, array } = PropTypes;
Wallet.propTypes = {
  addressDetails: object,
  showWallet: object,
  isAuthenticated: bool,
  defaultNetworks: array.isRequired,
  showHideAlert: func.isRequired,
  showHideWalletOverlay: func.isRequired,
};

Wallet.defaultProps = {
  showWallet: undefined,
  addressDetails: undefined,
  isAuthenticated: false,
};

const actions = {
  createKeystore,
  updateKeystore,
  deleteKeystore,
  showHideAlert,
  setAuthentationStatus,
  showHideWalletOverlay,
};

const mapStateToProps = state => ({
  defaultNetworks: getDefaultNetworks(state),
  showWallet: state.govUI.ShowWallet,
  isAuthenticated: state.govUI.isAuthenticated,
  addressDetails: state.infoServer.AddressDetails,
});

export default web3Connect(
  connect(
    mapStateToProps,
    actions
  )(Wallet)
);

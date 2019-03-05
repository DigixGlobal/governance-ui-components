import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import web3Connect from 'spectrum-lightsuite/src/helpers/web3/connect';
import { getDefaultNetworks } from 'spectrum-lightsuite/src/selectors';

import {
  createKeystore,
  updateKeystore,
  deleteKeystore,
} from 'spectrum-lightsuite/src/actions/keystore';

import {
  getTokenUsdValue,
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

export class Wallet extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      stage: Stage.Intro,
      lockingDgd: false,
    };
  }

  componentDidMount() {
    this._isMounted = true;
    this.props.getTokenUsdValue();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  _isMounted = false;
  updateStage = stage => {
    if (this._isMounted) {
      this.setState({ stage });
    }
  };

  handleCloseConnectedWallet = () => {
    this.setState({ lockingDgd: true }, () =>
      this.props.showHideWalletOverlay(!this.props.showWallet)
    );
  };

  handleCloseWallet = () => {
    this.props.showHideWalletOverlay(!this.props.showWallet);
    document.body.classList.remove('modal-is-open');
  };

  render() {
    const { stage, lockingDgd } = this.state;
    const { showWallet, isAuthenticated, addressDetails, ...rest } = this.props;

    const details = addressDetails.data;
    const hasParticipated = details
      ? details.isParticipant || details.lastParticipatedQuarter > 0
      : false;
    const showConnectedWallet =
      !hasParticipated && stage === Stage.WalletLoaded && !isAuthenticated && !lockingDgd;

    if ((!showWallet || !showWallet.show || lockingDgd) && !showConnectedWallet) return null;

    return (
      <Container>
        <TransparentOverlay />
        <DrawerContainer>
          {stage === Stage.Intro && !isAuthenticated && (
            <Intro onClose={() => this.handleCloseWallet()} onChangeStage={this.updateStage} />
          )}
          {stage === Stage.LoadingWallet && !isAuthenticated && (
            <LoadWallet
              {...rest}
              onChangeStage={this.updateStage}
              onClose={() => this.handleCloseWallet()}
            />
          )}
          {showConnectedWallet && (
            <ConnectedWallet {...rest} onClose={() => this.handleCloseConnectedWallet()} />
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
  signingModal: object,
  isAuthenticated: bool,
  defaultNetworks: array.isRequired,
  showHideAlert: func.isRequired,
  showHideWalletOverlay: func.isRequired,
  getTokenUsdValue: func.isRequired,
};

Wallet.defaultProps = {
  showWallet: undefined,
  addressDetails: undefined,
  isAuthenticated: false,
  signingModal: undefined,
};

const actions = {
  createKeystore,
  updateKeystore,
  deleteKeystore,
  showHideAlert,
  setAuthentationStatus,
  showHideWalletOverlay,
  getTokenUsdValue,
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

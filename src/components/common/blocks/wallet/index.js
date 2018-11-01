import React from 'react';
import PropTypes from 'prop-types';

import web3Connect from 'spectrum-lightsuite/src/helpers/web3/connect';
import { getDefaultAddress, getDefaultNetworks } from 'spectrum-lightsuite/src/selectors';
import { showMsgSigningModal } from 'spectrum-lightsuite/src/actions/session';
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

import { getAddressDetails } from '../../../../reducers/info-server/actions';
import { getChallenge, proveChallenge } from '../../../../reducers/dao-server/actions';

export class Wallet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stage: Stage.Intro,
      showSigning: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    const {
      defaultAddress,
      AddressDetails: { error, fetching, data },
      Challenge,
      getAddressDetailsAction,
      getChallengeAction,
      ChallengeProof,
    } = nextProps;

    if ((fetching === null && defaultAddress) || (error && defaultAddress)) {
      getAddressDetailsAction(defaultAddress.address);
    } else if (data && data.isParticipant) {
      if (Challenge.fetching === null || Challenge.error) {
        getChallengeAction(data.address);
      }
    }

    if ((Challenge.data.challenge && ChallengeProof.fetching === null) || ChallengeProof.error) {
      this.setState({ showSigning: true });
    } else {
      this.setState({ showSigning: false });
    }
  }

  updateStage = stage => {
    this.setState({ stage });
  };

  renderChallenge = () => {
    const {
      showSigningModal,
      Challenge,
      defaultNetworks,
      proveChallengeAction,
      AddressDetails,
    } = this.props;
    const network = defaultNetworks[0];

    const message = Challenge.data.challenge.challenge;
    const signMessage = new Promise(resolve =>
      resolve(showSigningModal({ txData: { txData: message }, network }))
    );

    return signMessage.then(signature => {
      const {
        data: { address },
      } = AddressDetails;
      return proveChallengeAction({
        address,
        challenge: Challenge.data.challenge.id,
        message,
        signature: signature.signedTx,
      });
    });
  };

  render() {
    const { stage, showSigning } = this.state;
    const { show, onClose, defaultAddress, ...rest } = this.props;
    if (!show) return null;
    if (showSigning) this.renderChallenge();
    return (
      <Container>
        <TransparentOverlay />
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
  showSigningModal: PropTypes.func.isRequired,
};

Wallet.defaultProps = {
  show: false,
};

const actions = {
  createKeystore,
  updateKeystore,
  deleteKeystore,
  getAddressDetailsAction: getAddressDetails,
  getChallengeAction: getChallenge,
  proveChallengeAction: proveChallenge,
  showSigningModal: showMsgSigningModal,
};

const mapStateToProps = state => ({
  // networks: getNetworks(state),
  defaultAddress: getDefaultAddress(state),
  defaultNetworks: getDefaultNetworks(state),
  AddressDetails: state.infoServer.AddressDetails,
  Challenge: state.daoServer.Challenge,
  ChallengeProof: state.daoServer.ChallengeProof,
});

export default web3Connect(
  connect(
    mapStateToProps,
    actions
  )(Wallet)
);

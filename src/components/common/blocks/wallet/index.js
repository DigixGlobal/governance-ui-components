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

import { getAddressDetails } from '@digix/gov-ui/reducers/info-server/actions';
import {
  setUserAddress,
  showHideAlert,
  showSignChallenge,
  showHideWalletOverlay,
} from '@digix/gov-ui/reducers/gov-ui/actions';
import { getChallenge, proveChallenge } from '@digix/gov-ui/reducers/dao-server/actions';

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

  componentWillReceiveProps(nextProps) {
    if (!_.isEqual(nextProps, this.props)) {
      const { AddressDetails, Challenge, getChallengeAction, ChallengeProof } = nextProps;
      if (!AddressDetails.data.address) return;
      const hasChallenge = Challenge.data;
      const hasProof = (ChallengeProof.data && ChallengeProof.data.client) || this.state.signed;

      if (AddressDetails && AddressDetails.data) {
        if (Challenge.fetching === null || Challenge.error) {
          getChallengeAction(AddressDetails.data.address);
        }
      }

      if (hasChallenge && !hasProof) {
        // this.props.showSignChallenge(true);
        const message = Challenge.data.challenge;
        const network = this.props.defaultNetworks[0];
        const caption =
          'By signing this message, I am proving that I control the selected account for use on DigixDAO.';
        const signMessage = new Promise(resolve =>
          resolve(
            this.props.showSigningModal({
              txData: { message, caption },
              network,
            })
          )
        );
        signMessage.then(signature => {
          const {
            data: { address },
          } = AddressDetails;

          this.setState({ signed: true });
          if (this.state.proving) return;
          return this.props
            .proveChallengeAction({
              address,
              challengeId: Challenge.data.id,
              message,
              signature: signature.signedTx,
            })
            .then(this.setState({ proving: true }));
        });
      } else {
        this.props.showSignChallenge(false);
      }
    }
  }

  shouldComponentUpdate = (nextProps, nextState) =>
    !_.isEqual(nextProps, this.props) || !_.isEqual(nextState, this.state);

  updateStage = stage => {
    this.setState({ stage });
  };

  render() {
    const { stage } = this.state;
    const { showWallet, ...rest } = this.props;
    if (!showWallet || !showWallet.show) return null;

    return (
      <Container>
        <TransparentOverlay />
        <DrawerContainer>
          {stage === Stage.Intro && (
            <Intro
              onClose={() => this.props.showHideWalletOverlay(!showWallet)}
              onChangeStage={this.updateStage}
            />
          )}
          {stage === Stage.LoadingWallet && (
            <LoadWallet {...rest} onChangeStage={this.updateStage} />
          )}
          {stage === Stage.WalletLoaded && (
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

const { func, object } = PropTypes;
Wallet.propTypes = {
  signChallenge: object,
  getAddressDetailsAction: func.isRequired,
  showSigningModal: func.isRequired,
  showHideAlert: func.isRequired,
  showSignChallenge: func.isRequired,
};

Wallet.defaultProps = {
  signChallenge: undefined,
};

const actions = {
  createKeystore,
  updateKeystore,
  deleteKeystore,
  getAddressDetailsAction: getAddressDetails,
  getChallengeAction: getChallenge,
  proveChallengeAction: proveChallenge,
  showSigningModal: showMsgSigningModal,
  showHideAlert,
  setUserAddress,
  showSignChallenge,
  showHideWalletOverlay,
};

const mapStateToProps = state => ({
  defaultNetworks: getDefaultNetworks(state),
  AddressDetails: state.infoServer.AddressDetails,
  signChallenge: state.govUI.SignChallenge,
  Challenge: state.daoServer.Challenge,
  ChallengeProof: state.daoServer.ChallengeProof,
  showWallet: state.govUI.ShowWallet,
});

export default web3Connect(
  connect(
    mapStateToProps,
    actions
  )(Wallet)
);

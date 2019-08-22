import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import { getDefaultAddress, getDefaultNetworks } from 'spectrum-lightsuite/src/selectors';
import { showMsgSigningModal } from 'spectrum-lightsuite/src/actions/session';

import { setDaoAuthorization, setInfoAuthorization } from '@digix/gov-ui/api/graphql';
import {
  getAddressDetailsVanilla,
  getTxConfig,
  setAddressDetails,
} from '@digix/gov-ui/reducers/info-server/actions';

import {
  getTokenUsdValue,
  setAuthentationStatus,
  showHideAlert,
  showHideWalletOverlay,
  setUserAddress,
} from '@digix/gov-ui/reducers/gov-ui/actions';

import { fetchAddressQuery } from '@digix/gov-ui/api/graphql-queries/address';
import { fetchDisplayName, fetchUserQuery } from '@digix/gov-ui/api/graphql-queries/users';
import { getChallengeVanilla, proveChallenge } from '@digix/gov-ui/reducers/dao-server/actions';
import { LogSignMessage } from '@digix/gov-ui/analytics/loadWallet';
import { withApollo } from 'react-apollo';

class AddressWatcher extends React.PureComponent {
  state = {
    verifyingUser: false,
  };

  componentDidMount = () => {
    const { defaultAddress } = this.props;
    if (defaultAddress && defaultAddress.address) {
      this.props.getTokenUsdValue();
    }
  };

  componentWillReceiveProps = nextProps => {
    const { defaultAddress, challengeProof, signChallenge } = nextProps;
    const { verifyingUser } = this.state;
    const { address } = defaultAddress;
    const hasProof = challengeProof.data && challengeProof.data.client;
    if (
      (address && !verifyingUser && !hasProof) ||
      (address && !verifyingUser && !hasProof && signChallenge)
    ) {
      this.setState({ verifyingUser: true });

      getAddressDetailsVanilla(address)
        .then(({ json: { result } }) => result)
        .then(details => {
          const hasDgdLocked = Number(details.lockedDgd) > 0;
          const isValidUser =
            details.isParticipant ||
            details.isKycOfficer ||
            details.isForumAdmin ||
            details.isPrl ||
            hasDgdLocked;

          if (!isValidUser) {
            this.props.setUserAddress(address);
            this.setState({ verifyingUser: false });
            return undefined;
          }

          return this.getChallengeAndProof({ nextProps, details });
        });
    }
  };

  getChallengeAndProof = ({ nextProps, details }) => {
    const { defaultAddress } = nextProps;
    const { address } = defaultAddress;

    return getChallengeVanilla(address).then(({ json: { result } }) => {
      const message = result.challenge;
      const network = this.props.defaultNetworks[0];

      const translations = this.props.translations.loadWallet;
      const caption = translations.Json.proofOfControl.description;

      const signMessage = new Promise(resolve =>
        resolve(
          this.props.showMsgSigningModal({
            txData: {
              message,
              caption,
              translations,
              logSignMessage: LogSignMessage,
            },
            network,
          })
        )
      );

      return signMessage.then(signature => {
        const requestPayload = {
          address,
          challengeId: result.id,
          message,
          signature: signature.signedTx,
        };

        return this.props
          .proveChallenge({
            address,
            challengeId: result.id,
            message,
            signature: signature.signedTx,
          })
          .then(response => {
            const { payload } = response;

            if (payload.data) {
              setDaoAuthorization(payload.data);
              setInfoAuthorization(requestPayload);

              Promise.all([
                this.props.setAuthentationStatus(true),
                this.props.setAddressDetails(details),
                this.props.showHideWalletOverlay(false),
                this.props.getTxConfig(),
                this.props.client.query({ query: fetchAddressQuery, fetchPolicy: 'network-only' }),
                this.props.client.query({ query: fetchDisplayName, fetchPolicy: 'network-only' }),
                this.props.client.query({ query: fetchUserQuery, fetchPolicy: 'network-only' }),
              ]);
            } else {
              this.props.showHideAlert({ message: payload.error.message });
            }
          })
          .catch(() => {
            this.props.showHideAlert({ message: 'Unable to sign. Please try again.' });
          });
      });
    });
  };

  render() {
    return <Fragment />;
  }
}

const { object, func, array } = PropTypes;
AddressWatcher.propTypes = {
  client: object.isRequired,
  defaultAddress: object,
  defaultNetworks: array.isRequired,
  setAuthentationStatus: func.isRequired,
  setAddressDetails: func.isRequired,
  getTokenUsdValue: func.isRequired,
  getTxConfig: func.isRequired,
  showHideAlert: func.isRequired,
  showHideWalletOverlay: func.isRequired,
  showMsgSigningModal: func.isRequired,
  proveChallenge: func.isRequired,
  setUserAddress: func.isRequired,
  translations: object,
};

AddressWatcher.defaultProps = {
  defaultAddress: {
    address: undefined,
  },
  translations: undefined,
};

const mapStateToProps = state => ({
  defaultNetworks: getDefaultNetworks(state),
  defaultAddress: getDefaultAddress(state),
  addressDetails: state.infoServer.AddressDetails,
  challenge: state.daoServer.Challenge,
  challengeProof: state.daoServer.ChallengeProof,
  signChallenge: state.govUI.SignChallenge,
  translations: state.daoServer.Translations.data,
});

export default withApollo(
  connect(
    mapStateToProps,
    {
      setAddressDetails,
      getTokenUsdValue,
      getTxConfig,
      showHideAlert,
      showHideWalletOverlay,
      setAuthentationStatus,
      showMsgSigningModal,
      proveChallenge,
      setUserAddress,
    }
  )(AddressWatcher)
);

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import { getDefaultAddress, getDefaultNetworks } from 'spectrum-lightsuite/src/selectors';
import { showMsgSigningModal } from 'spectrum-lightsuite/src/actions/session';

import {
  getAddressDetailsVanilla,
  setAddressDetails,
} from '@digix/gov-ui/reducers/info-server/actions';

import {
  getTokenUsdValue,
  setAuthentationStatus,
  showHideAlert,
  showHideWalletOverlay,
  setUserAddress,
} from '@digix/gov-ui/reducers/gov-ui/actions';

import { fetchDisplayName, fetchUserQuery } from '@digix/gov-ui/api/graphql-queries/users';
import { getChallengeVanilla, proveChallenge } from '@digix/gov-ui/reducers/dao-server/actions';
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
          if (!details.isParticipant && !details.isKycOfficer && !details.isForumAdmin) {
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
      const caption =
        'This signing is to prove to our server that you are in control of the Ethereum account that was loaded. By signing this message, you are proving that you control the selected account for use on DigixDAO.';
      const signMessage = new Promise(resolve =>
        resolve(
          this.props.showMsgSigningModal({
            txData: { message, caption },
            network,
          })
        )
      );

      return signMessage.then(signature =>
        this.props
          .proveChallenge({
            address,
            challengeId: result.id,
            message,
            signature: signature.signedTx,
          })
          .then(response => {
            const { payload } = response;

            if (payload.data) {
              Promise.all([
                this.props.setAuthentationStatus(true),
                this.props.setAddressDetails(details),
                this.props.showHideWalletOverlay(false),
                this.props.client.query({ query: fetchDisplayName, fetchPolicy: 'network-only' }),
                this.props.client.query({ query: fetchUserQuery, fetchPolicy: 'network-only' }),
              ]);
            } else {
              this.props.showHideAlert({ message: payload.error.message });
            }
          })
          .catch(() => {
            this.props.showHideAlert({ message: 'Unable to sign. Please try again.' });
          })
      );
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
  showHideAlert: func.isRequired,
  showHideWalletOverlay: func.isRequired,
  showMsgSigningModal: func.isRequired,
  proveChallenge: func.isRequired,
  setUserAddress: func.isRequired,
};

AddressWatcher.defaultProps = {
  defaultAddress: undefined,
};

const mapStateToProps = state => ({
  defaultNetworks: getDefaultNetworks(state),
  defaultAddress: getDefaultAddress(state),
  addressDetails: state.infoServer.AddressDetails,
  challenge: state.daoServer.Challenge,
  challengeProof: state.daoServer.ChallengeProof,
  signChallenge: state.govUI.SignChallenge,
});

export default withApollo(
  connect(
    mapStateToProps,
    {
      setAddressDetails,
      getTokenUsdValue,
      showHideAlert,
      showHideWalletOverlay,
      setAuthentationStatus,
      showMsgSigningModal,
      proveChallenge,
      setUserAddress,
    }
  )(AddressWatcher)
);

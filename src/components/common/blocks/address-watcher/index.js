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
  showHideWalletOverlay,
  setUserAddress,
} from '@digix/gov-ui/reducers/gov-ui/actions';

import { getChallengeVanilla, proveChallenge } from '@digix/gov-ui/reducers/dao-server/actions';

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
          if (!details.isParticipant && !details.isKycOfficer) {
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
        'By signing this message, I am proving that I control the selected account for use on DigixDAO.';
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
          .then(({ payload: { data: { client } } }) => {
            if (!client) return undefined;
            Promise.all([
              this.props.setAuthentationStatus(true),
              this.props.setAddressDetails(details),
              this.props.showHideWalletOverlay(false),
            ]);
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
  defaultAddress: object,
  defaultNetworks: array.isRequired,
  setAuthentationStatus: func.isRequired,
  setAddressDetails: func.isRequired,
  getTokenUsdValue: func.isRequired,
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

export default connect(
  mapStateToProps,
  {
    setAddressDetails,
    getTokenUsdValue,
    showHideWalletOverlay,
    setAuthentationStatus,
    showMsgSigningModal,
    proveChallenge,
    setUserAddress,
  }
)(AddressWatcher);

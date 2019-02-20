import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import { getDefaultAddress, getDefaultNetworks } from 'spectrum-lightsuite/src/selectors';
import { showMsgSigningModal } from 'spectrum-lightsuite/src/actions/session';

import {
  getAddressDetailsVanilla,
  setAddressDetails,
} from '@digix/gov-ui/reducers/info-server/actions';
import { getTokenUsdValue, setAuthentationStatus } from '@digix/gov-ui/reducers/gov-ui/actions';

import { getChallenge, proveChallenge } from '@digix/gov-ui/reducers/dao-server/actions';

class AddressWatcher extends React.PureComponent {
  state = {
    addressDetails: undefined,
    addressDetailsFetched: false,
    isParticipant: false,
    challengeFetched: false,
    proofFetched: false,
  };
  componentDidMount = () => {
    const { defaultAddress } = this.props;
    if (defaultAddress && defaultAddress.address) {
      this.props.getTokenUsdValue();
    }
  };

  componentWillReceiveProps = nextProps => {
    const { defaultAddress, challengeProof } = nextProps;
    const { address } = defaultAddress;
    const hasProof = challengeProof.data && challengeProof.data.client;
    if (address && !this.state.addressDetailsFetched && !hasProof) {
      console.log('proof', hasProof);
      this.setState({ addressDetailsFetched: true });
      getAddressDetailsVanilla(address)
        .then(({ json: { result } }) => result)
        .then(details => {
          if (!details.isParticipant) return undefined;
          return getChallenge(address).then(({ json: { result } }) => {
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
                  ]);
                })
            );
          });
        });
    }

    // const hasChallenge = challenge.data;
    // const hasProof = challengeProof.data;

    // if (addressDetails.data.address && !this.state.challengeFetched) {
    //   if (!hasChallenge) {
    //     this.setState({ challengeFetched: true }, () => this.props.getChallenge(address));
    //   }
    // }

    // if (hasProof) this.props.setAuthentationStatus(true);

    // if (hasChallenge && !hasProof && !this.state.proofFetched) {
    //   this.setState({ proofFetched: true }, () => {
    //     const message = challenge.data.challenge;
    //     const network = this.props.defaultNetworks[0];
    //     const caption =
    //       'By signing this message, I am proving that I control the selected account for use on DigixDAO.';
    //     const signMessage = new Promise(resolve =>
    //       resolve(
    //         this.props.showMsgSigningModal({
    //           txData: { message, caption },
    //           network,
    //         })
    //       )
    //     );
    //     signMessage.then(signature =>
    //       this.props.proveChallenge({
    //         address,
    //         challengeId: challenge.data.id,
    //         message,
    //         signature: signature.signedTx,
    //       })
    //     );
    //   });
    // }
  };

  render() {
    return <div />;
  }
}

const { object, func, array } = PropTypes;
AddressWatcher.propTypes = {
  defaultAddress: object,
  defaultNetworks: array.isRequired,
  setAuthentationStatus: func.isRequired,
  setAddressDetails: func.isRequired,
  getTokenUsdValue: func.isRequired,
  // getChallenge: func.isRequired,
  showMsgSigningModal: func.isRequired,
  proveChallenge: func.isRequired,
};

AddressWatcher.defaultProps = {
  defaultAddress: undefined,
};
const mapStateToProps = state => ({
  defaultNetworks: getDefaultNetworks(state),
  addressDetails: state.infoServer.AddressDetails,
  challenge: state.daoServer.Challenge,
  challengeProof: state.daoServer.ChallengeProof,
  defaultAddress: getDefaultAddress(state),
});

export default connect(
  mapStateToProps,
  {
    setAddressDetails,
    getTokenUsdValue,
    // getChallenge,
    setAuthentationStatus,
    showMsgSigningModal,
    proveChallenge,
  }
)(AddressWatcher);

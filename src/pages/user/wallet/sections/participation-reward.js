import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import DaoRewardsManager from '@digix/dao-contracts/build/contracts/DaoRewardsManager.json';
import getContract from '@digix/gov-ui/utils/contracts';
import SpectrumConfig from 'spectrum-lightsuite/spectrum.config';
import TxVisualization from '@digix/gov-ui/components/common/blocks/tx-visualization';
import web3Connect from 'spectrum-lightsuite/src/helpers/web3/connect';

import { Button } from '@digix/gov-ui/components/common/elements/index';
import { DEFAULT_GAS, DEFAULT_GAS_PRICE } from '@digix/gov-ui/constants';
import { executeContractFunction } from '@digix/gov-ui/utils/web3Helper';
import { getAddresses } from 'spectrum-lightsuite/src/selectors';
import { getAddressDetails, getDaoDetails } from '@digix/gov-ui/reducers/info-server/actions';
import { registerUIs } from 'spectrum-lightsuite/src/helpers/uiRegistry';
import { sendTransactionToDaoServer } from '@digix/gov-ui/reducers/dao-server/actions';
import { showHideAlert } from '@digix/gov-ui/reducers/gov-ui/actions';
import { showTxSigningModal } from 'spectrum-lightsuite/src/actions/session';
import { truncateNumber } from '@digix/gov-ui/utils/helpers';
import { withFetchAddress } from '@digix/gov-ui/api/graphql-queries/address';

import {
  QtrParticipation,
  Title,
  Detail,
  Label,
  Data,
  Desc,
  Actions,
} from '@digix/gov-ui/pages/user/wallet/style';

registerUIs({ txVisualization: { component: TxVisualization } });
const network = SpectrumConfig.defaultNetworks[0];

class ParticipationReward extends React.Component {
  constructor(props) {
    super(props);
    this.MIN_CLAIMABLE_DGX = 0.001;
  }

  componentDidMount() {
    this.props.subscribeToAddress();
  }

  setError = error => {
    this.props.showHideAlert({
      message: JSON.stringify(error && error.message) || error,
    });
  };

  claimReward = () => {
    const tClaim = this.props.translations.ClaimReward;
    const { addresses, ChallengeProof, web3Redux } = this.props;
    const { abi, address } = getContract(DaoRewardsManager, network);

    const sourceAddress = addresses.find(({ isDefault }) => isDefault);
    const contract = web3Redux
      .web3(network)
      .eth.contract(abi)
      .at(address);

    const ui = {
      caption: tClaim.txnCaption,
      header: 'User',
      type: 'txVisualization',
    };

    const web3Params = {
      gasPrice: DEFAULT_GAS_PRICE,
      gas: DEFAULT_GAS,
      ui,
    };

    const onTransactionAttempt = txHash => {
      if (ChallengeProof.data) {
        this.props.sendTransactionToDaoServer({
          txHash,
          title: tClaim.txnCaption,
          token: ChallengeProof.data['access-token'],
          client: ChallengeProof.data.client,
          uid: ChallengeProof.data.uid,
        });
      }
    };

    const onTransactionSuccess = txHash => {
      this.props.showHideAlert({
        message: tClaim.txnSuccess,
        txHash,
      });
    };

    const payload = {
      address: sourceAddress,
      contract,
      func: contract.claimRewards,
      network,
      onFailure: this.setError,
      onFinally: txHash => onTransactionAttempt(txHash),
      onSuccess: txHash => onTransactionSuccess(txHash),
      params: [],
      showTxSigningModal: this.props.showTxSigningModal,
      ui,
      web3Params,
    };

    return executeContractFunction(payload);
  };

  render() {
    const t = this.props.translations;
    const { DaoDetails } = this.props;
    let { claimableDgx } = this.props.AddressDetails;

    const isGlobalRewardsSet = DaoDetails ? DaoDetails.data.isGlobalRewardsSet : false;
    const canClaimDgx = claimableDgx > this.MIN_CLAIMABLE_DGX && isGlobalRewardsSet;

    claimableDgx = truncateNumber(claimableDgx);

    return (
      <QtrParticipation>
        <Title>{t.title}</Title>
        <Detail>
          <Label>{t.unclaimedReward}</Label>
          <Data>
            <span data-digix="Wallet-DGXReward">{claimableDgx}</span>
            <span>&nbsp;DGX</span>
          </Data>
          <Desc>{t.instructions}</Desc>
          <Actions>
            <Button
              primary
              disabled={!canClaimDgx}
              data-digix="Wallet-ClaimReward"
              onClick={() => this.claimReward()}
            >
              {t.ClaimReward.txnButton}
            </Button>
          </Actions>
        </Detail>
      </QtrParticipation>
    );
  }
}

const { array, func, object } = PropTypes;

ParticipationReward.propTypes = {
  AddressDetails: object.isRequired,
  addresses: array.isRequired,
  ChallengeProof: object.isRequired,
  DaoDetails: object.isRequired,
  sendTransactionToDaoServer: func.isRequired,
  showHideAlert: func.isRequired,
  showTxSigningModal: func.isRequired,
  subscribeToAddress: func.isRequired,
  translations: object.isRequired,
  web3Redux: object.isRequired,
};

const mapStateToProps = state => ({
  addresses: getAddresses(state),
  CanLockDgd: state.govUI.CanLockDgd,
  ChallengeProof: state.daoServer.ChallengeProof,
  DaoDetails: state.infoServer.DaoDetails,
});

const ParticipationRewardComponent = web3Connect(
  connect(
    mapStateToProps,
    {
      getAddressDetails,
      getDaoDetails,
      showHideAlert,
      sendTransactionToDaoServer,
      showTxSigningModal,
    }
  )(ParticipationReward)
);

export default withFetchAddress(ParticipationRewardComponent);

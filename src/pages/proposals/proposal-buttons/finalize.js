import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Dao from '@digix/dao-contracts/build/contracts/Dao.json';

import web3Connect from 'spectrum-lightsuite/src/helpers/web3/connect';
import SpectrumConfig from 'spectrum-lightsuite/spectrum.config';
import { registerUIs } from 'spectrum-lightsuite/src/helpers/uiRegistry';
import { getAddresses } from 'spectrum-lightsuite/src/selectors';
import { showTxSigningModal } from 'spectrum-lightsuite/src/actions/session';

import getContract from '@digix/gov-ui/utils/contracts';
import { executeContractFunction } from '@digix/gov-ui/utils/web3Helper';
import { DEFAULT_GAS_PRICE, EMPTY_HASH, ProposalStages } from '@digix/gov-ui/constants';
import TxVisualization from '@digix/gov-ui/components/common/blocks/tx-visualization';
import { showHideAlert } from '@digix/gov-ui/reducers/gov-ui/actions';
import { sendTransactionToDaoServer } from '@digix/gov-ui/reducers/dao-server/actions';
import Button from '@digix/gov-ui/components/common/elements/buttons/index';

import { getDaoConfig } from '@digix/gov-ui/reducers/info-server/actions';

registerUIs({ txVisualization: { component: TxVisualization } });

const network = SpectrumConfig.defaultNetworks[0];

class FinalizeProjectButton extends React.PureComponent {
  componentWillMount = () => {
    const { stage, endorser, isProposer, finalVersionIpfsDoc } = this.props;
    if (
      stage !== ProposalStages.draft ||
      !isProposer ||
      endorser === EMPTY_HASH ||
      (finalVersionIpfsDoc && !finalVersionIpfsDoc.includes(EMPTY_HASH))
    ) {
      return;
    }
    this.props.getDaoConfig();
  };

  setError = error =>
    this.props.showHideAlert({
      message: JSON.stringify(error && error.message) || error,
    });

  handleSubmit = () => {
    const {
      addresses,
      challengeProof,
      gasLimitConfig,
      proposalId,
      translations,
      web3Redux,
    } = this.props;

    const { abi, address } = getContract(Dao, network);
    const contract = web3Redux
      .web3(network)
      .eth.contract(abi)
      .at(address);

    const ui = {
      caption: translations.snackbars.finalize.title,
      header: translations.snackbars.finalize.txUiHeader,
      type: 'txVisualization',
    };
    const web3Params = {
      gasPrice: DEFAULT_GAS_PRICE,
      gas: gasLimitConfig.FINALIZE_PROPOSAL || gasLimitConfig.DEFAULT,
      ui,
    };

    const sourceAddress = addresses.find(({ isDefault }) => isDefault);

    const onTransactionAttempt = txHash => {
      if (challengeProof.data) {
        this.props.sendTransactionToDaoServer({
          txHash,
          title: translations.snackbars.finalize.title,
          token: challengeProof.data['access-token'],
          client: challengeProof.data.client,
          uid: challengeProof.data.uid,
        });
      }
    };

    const onTransactionSuccess = txHash => {
      this.props.showHideAlert({
        message: translations.snackbars.finalize.message,
        txHash,
      });

      this.props.history.push('/');
    };

    const payload = {
      address: sourceAddress,
      contract,
      func: contract.finalizeProposal,
      params: [proposalId],
      onFailure: this.setError,
      onFinally: txHash => onTransactionAttempt(txHash),
      onSuccess: txHash => onTransactionSuccess(txHash),
      network,
      web3Params,
      ui,
      showTxSigningModal: this.props.showTxSigningModal,
      translations: this.props.txnTranslations,
    };

    return executeContractFunction(payload);
  };

  finalizeProposal() {
    this.props.checkProposalRequirements(this.handleSubmit);
  }

  render() {
    const {
      stage,
      endorser,
      isProposer,
      timeCreated,
      finalVersionIpfsDoc,
      daoConfig,
      translations: { buttons },
    } = this.props;

    const configDeadDuration = daoConfig.data.CONFIG_PROPOSAL_DEAD_DURATION;

    // time is sent in seconds, not milliseconds
    const finalizeDeadline = new Date((timeCreated + Number(configDeadDuration)) * 1000);
    const canFinalize = finalizeDeadline > Date.now();

    if (
      stage !== ProposalStages.draft ||
      !isProposer ||
      !canFinalize ||
      endorser === EMPTY_HASH ||
      (finalVersionIpfsDoc && !finalVersionIpfsDoc.includes(EMPTY_HASH))
    ) {
      return null;
    }

    return (
      <Button
        kind="round"
        large
        data-digix="ProposalAction-Finalize"
        onClick={() => this.finalizeProposal()}
      >
        {buttons.finalize}
      </Button>
    );
  }
}

const { string, bool, object, func, array, number } = PropTypes;

FinalizeProjectButton.propTypes = {
  stage: string.isRequired,
  endorser: string,
  proposalId: string.isRequired,
  finalVersionIpfsDoc: string,
  isProposer: bool,
  web3Redux: object.isRequired,
  daoConfig: object.isRequired,
  challengeProof: object.isRequired,
  checkProposalRequirements: func.isRequired,
  showHideAlert: func.isRequired,
  sendTransactionToDaoServer: func.isRequired,
  getDaoConfig: func.isRequired,
  gasLimitConfig: object.isRequired,
  showTxSigningModal: func.isRequired,
  addresses: array.isRequired,
  history: object.isRequired,
  timeCreated: number.isRequired,
  translations: object.isRequired,
  txnTranslations: object.isRequired,
};

FinalizeProjectButton.defaultProps = {
  endorser: EMPTY_HASH,
  finalVersionIpfsDoc: null,
  isProposer: false,
};

const mapStateToProps = state => ({
  addresses: getAddresses(state),
  challengeProof: state.daoServer.ChallengeProof,
  daoConfig: state.infoServer.DaoConfig,
  gasLimitConfig: state.infoServer.TxConfig.data.gas,
});

export default web3Connect(
  connect(
    mapStateToProps,
    { showHideAlert, sendTransactionToDaoServer, showTxSigningModal, getDaoConfig }
  )(FinalizeProjectButton)
);

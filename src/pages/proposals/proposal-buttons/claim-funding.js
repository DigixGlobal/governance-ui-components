import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import DaoFundingManager from '@digix/dao-contracts/build/contracts/DaoFundingManager.json';

import web3Connect from 'spectrum-lightsuite/src/helpers/web3/connect';
import SpectrumConfig from 'spectrum-lightsuite/spectrum.config';
import { registerUIs } from 'spectrum-lightsuite/src/helpers/uiRegistry';
import { getAddresses } from 'spectrum-lightsuite/src/selectors';
import { showTxSigningModal } from 'spectrum-lightsuite/src/actions/session';

import getContract from '@digix/gov-ui/utils/contracts';
import { executeContractFunction } from '@digix/gov-ui/utils/web3Helper';
import TxVisualization from '@digix/gov-ui/components/common/blocks/tx-visualization';
import { showHideAlert } from '@digix/gov-ui/reducers/gov-ui/actions';
import { sendTransactionToDaoServer } from '@digix/gov-ui/reducers/dao-server/actions';
import Button from '@digix/gov-ui/components/common/elements/buttons/index';
import {
  DEFAULT_GAS,
  DEFAULT_GAS_PRICE,
  ProposalErrors,
  ProposalStages,
} from '@digix/gov-ui/constants';

registerUIs({ txVisualization: { component: TxVisualization } });

const network = SpectrumConfig.defaultNetworks[0];

class ClaimFundingButton extends React.PureComponent {
  setError = error =>
    this.props.showHideAlert({
      message: JSON.stringify(error && error.message) || error,
    });

  handleSubmit = () => {
    const {
      web3Redux,
      ChallengeProof,
      addresses,
      proposal,
      proposal: { proposalId },
    } = this.props;

    const { abi, address } = getContract(DaoFundingManager, network);
    const contract = web3Redux
      .web3(network)
      .eth.contract(abi)
      .at(address);

    const ui = {
      caption: 'Claim Funding',
      header: 'Project',
      type: 'txVisualization',
    };
    const web3Params = {
      gasPrice: DEFAULT_GAS_PRICE,
      gas: DEFAULT_GAS,
      ui,
    };

    const sourceAddress = addresses.find(({ isDefault }) => isDefault);

    const onTransactionAttempt = txHash => {
      if (ChallengeProof.data) {
        this.props.sendTransactionToDaoServer({
          txHash,
          title: 'Claim Funding',
          token: ChallengeProof.data['access-token'],
          client: ChallengeProof.data.client,
          uid: ChallengeProof.data.uid,
        });
      }
    };

    const onTransactionSuccess = txHash => {
      this.props.showHideAlert({
        message: 'Your Claim Funding Transaction is pending confirmation. See More',
        txHash,
      });

      this.props.history.push('/');
    };

    const payload = {
      address: sourceAddress,
      contract,
      func: contract.claimFunding,
      params: [proposalId, proposal.currentMilestone - 1],
      onFailure: this.setError,
      onFinally: txHash => onTransactionAttempt(txHash),
      onSuccess: txHash => onTransactionSuccess(txHash),
      network,
      web3Params,
      ui,
      showTxSigningModal: this.props.showTxSigningModal,
    };
    return executeContractFunction(payload);
  };

  claimFunding() {
    const errors = [];
    const { proposal } = this.props;
    if (proposal.prl) {
      errors.push(ProposalErrors.blockedByPRL);
    }

    this.props.checkProposalRequirements(this.handleSubmit, errors);
  }

  render() {
    const { isProposer, proposal } = this.props;
    if (
      !isProposer ||
      !proposal ||
      ((proposal && proposal.stage !== ProposalStages.ongoing) || proposal.claimableFunding <= 0)
    )
      return null;

    return (
      <Button
        kind="round"
        large
        data-digix="ProposalAction-ClaimFunding"
        onClick={() => this.claimFunding()}
      >
        Claim Funding
      </Button>
    );
  }
}

const { bool, object, func, array } = PropTypes;

ClaimFundingButton.propTypes = {
  proposal: object.isRequired,
  isProposer: bool,
  web3Redux: object.isRequired,
  ChallengeProof: object.isRequired,
  checkProposalRequirements: func.isRequired,
  showHideAlert: func.isRequired,
  sendTransactionToDaoServer: func.isRequired,
  showTxSigningModal: func.isRequired,
  addresses: array.isRequired,
  history: object.isRequired,
};

ClaimFundingButton.defaultProps = {
  isProposer: false,
};

const mapStateToProps = state => ({
  ChallengeProof: state.daoServer.ChallengeProof,
  addresses: getAddresses(state),
});

export default web3Connect(
  connect(
    mapStateToProps,
    { showHideAlert, sendTransactionToDaoServer, showTxSigningModal }
  )(ClaimFundingButton)
);

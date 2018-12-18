import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Dao from '@digix/dao-contracts/build/contracts/Dao.json';
import DaoConfigStorage from '@digix/dao-contracts/build/contracts/MockDaoConfigsStorage.json';

import web3Connect from 'spectrum-lightsuite/src/helpers/web3/connect';
import SpectrumConfig from 'spectrum-lightsuite/spectrum.config';
import { registerUIs } from 'spectrum-lightsuite/src/helpers/uiRegistry';
import { getAddresses } from 'spectrum-lightsuite/src/selectors';
import { showTxSigningModal } from 'spectrum-lightsuite/src/actions/session';
import { parseBigNumber } from 'spectrum-lightsuite/src/helpers/stringUtils';

import getContract from '@digix/gov-ui/utils/contracts';
import { executeContractFunction } from '@digix/gov-ui/utils/web3Helper';
import {
  ProposalStages,
  DEFAULT_GAS,
  DEFAULT_GAS_PRICE,
  EMPTY_HASH,
} from '@digix/gov-ui/constants';
import TxVisualization from '@digix/gov-ui/components/common/blocks/tx-visualization';
import { showHideAlert } from '@digix/gov-ui/reducers/gov-ui/actions';
import { sendTransactionToDaoServer } from '@digix/gov-ui/reducers/dao-server/actions';
import Button from '@digix/gov-ui/components/common/elements/buttons/index';

registerUIs({ txVisualization: { component: TxVisualization } });

const network = SpectrumConfig.defaultNetworks[0];

class FinalizeProjectButton extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      configDeadDuration: undefined,
    };
  }
  componentWillMount = () => {
    const { web3Redux, stage, endorser, isProposer, finalVersionIpfsDoc } = this.props;
    if (
      stage !== ProposalStages.draft ||
      !isProposer ||
      endorser === EMPTY_HASH ||
      (finalVersionIpfsDoc && !finalVersionIpfsDoc.includes(EMPTY_HASH))
    ) {
      return;
    }
    const { abi, address } = getContract(DaoConfigStorage, network);
    const contract = web3Redux
      .web3(network)
      .eth.contract(abi)
      .at(address);

    contract.uintConfigs
      .call('config_dead_duration')
      .then(result => this.setState({ configDeadDuration: parseBigNumber(result, 0, false) }));
  };

  setError = error =>
    this.props.showHideAlert({ message: JSON.stringify((error && error.message) || error) });

  handleSubmit = () => {
    const { web3Redux, challengeProof, addresses, proposalId } = this.props;

    const { abi, address } = getContract(Dao, network);
    const contract = web3Redux
      .web3(network)
      .eth.contract(abi)
      .at(address);

    const ui = {
      caption: 'Finalize Proposal',
      header: 'Proposal',
      type: 'txVisualization',
    };
    const web3Params = {
      gasPrice: DEFAULT_GAS_PRICE,
      gas: DEFAULT_GAS,
      ui,
    };

    const sourceAddress = addresses.find(({ isDefault }) => isDefault);

    const onSuccess = txHash => {
      if (challengeProof.data) {
        this.props.sendTransactionToDaoServer({
          txHash,
          title: 'Finalize Proposal',
          token: challengeProof.data['access-token'],
          client: challengeProof.data.client,
          uid: challengeProof.data.uid,
        });
      }
      this.props.showHideAlert({ message: 'Proposal Finalized' });
      if (this.props.history) this.props.history.push('/');
    };

    const payload = {
      address: sourceAddress,
      contract,
      func: contract.finalizeProposal,
      params: [proposalId],
      onSuccess: txHash => {
        onSuccess(txHash);
      },
      onFailure: this.setError,
      network,
      web3Params,
      ui,
      showTxSigningModal: this.props.showTxSigningModal,
    };
    return executeContractFunction(payload);
  };
  render() {
    const { stage, endorser, isProposer, timeCreated, finalVersionIpfsDoc } = this.props;
    const { configDeadDuration } = this.state;

    // time is sent in seconds, not milliseconds
    const finalizeDeadline = new Date((timeCreated + configDeadDuration) * 1000);
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
      <Button kind="round" ghost primary onClick={this.handleSubmit}>
        Finalize
      </Button>
    );
  }
}

const { string, bool, object, func, array, number } = PropTypes;

FinalizeProjectButton.propTypes = {
  stage: string.isRequired,
  endorser: string,
  proposalId: string.isRequired,
  finalVersionIpfsDoc: string.isRequired,
  isProposer: bool,
  web3Redux: object.isRequired,
  challengeProof: object.isRequired,
  showHideAlert: func.isRequired,
  sendTransactionToDaoServer: func.isRequired,
  showTxSigningModal: func.isRequired,
  addresses: array.isRequired,
  history: object.isRequired,
  timeCreated: number.isRequired,
};

FinalizeProjectButton.defaultProps = {
  isProposer: false,
  endorser: EMPTY_HASH,
};

const mapStateToProps = state => ({
  challengeProof: state.daoServer.ChallengeProof,
  addresses: getAddresses(state),
});

export default web3Connect(
  connect(
    mapStateToProps,
    { showHideAlert, sendTransactionToDaoServer, showTxSigningModal }
  )(FinalizeProjectButton)
);

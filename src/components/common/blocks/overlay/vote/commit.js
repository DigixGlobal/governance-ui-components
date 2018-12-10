import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import web3Utils from 'web3-utils';
import secureRandom from 'secure-random';

import Button from '@digix/gov-ui/components/common/elements/buttons/index';
import {
  IntroContainer,
  OverlayHeader as Header,
} from '@digix/gov-ui/components/common/common-styles';

import { buffer2Hex } from '@digix/gov-ui/utils/helpers';

import Dao from '@digix/dao-contracts/build/contracts/DaoVoting.json';
import getContract from '@digix/gov-ui/utils/contracts';
import SpectrumConfig from 'spectrum-lightsuite/spectrum.config';
import web3Connect from 'spectrum-lightsuite/src/helpers/web3/connect';

import { DEFAULT_GAS, DEFAULT_GAS_PRICE } from '@digix/gov-ui/constants';
import { executeContractFunction } from '@digix/gov-ui/utils/web3Helper';
import { getAddresses } from 'spectrum-lightsuite/src/selectors';
import { sendTransactionToDaoServer } from '@digix/gov-ui/reducers/dao-server/actions';
import { showHideAlert, showRightPanel } from '@digix/gov-ui/reducers/gov-ui/actions';

const network = SpectrumConfig.defaultNetworks[0];

class CommitVote extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      vote: false,
      hasVoted: false,
      downloaded: false,
      voteObject: {},
    };
  }

  onSuccessfulTransaction = txHash => {
    const { ChallengeProof, history, showHideAlertAction, showRightPanelAction } = this.props;

    if (ChallengeProof.data) {
      this.props.sendTransactionToDaoServer({
        client: ChallengeProof.data.client,
        title: 'Approve Proposal',
        token: ChallengeProof.data['access-token'],
        txHash,
        uid: ChallengeProof.data.uid,
      });
    }

    showRightPanelAction({ show: false });
    showHideAlertAction({
      message: 'Proposal Approved',
    });

    history.push('/');
  };

  setError = error => {
    const message = JSON.stringify((error && error.message) || error);
    return this.props.showHideAlertAction({ message });
  };

  setVote = vote => {
    const random = secureRandom(32, { type: 'Uint8Array' });

    this.setState({
      hasVoted: true,
      vote,
      voteObject: { vote, salt: buffer2Hex(random) },
    });
  };

  handleDownload = () => {
    this.setState({ downloaded: true });
  };

  handleSubmit = () => {
    const { voteObject } = this.state;
    const {
      web3Redux,
      addresses,
      proposalId,
      proposal: { currentVotingRound },
    } = this.props;
    const { abi, address } = getContract(Dao, network);
    const sourceAddress = addresses.find(({ isDefault }) => isDefault);
    const hash = web3Utils.soliditySha3(
      { t: 'address', v: sourceAddress.address },
      { t: 'bool', v: voteObject.vote },
      { t: 'bytes32', v: voteObject.salt }
    );

    const contract = web3Redux
      .web3(network)
      .eth.contract(abi)
      .at(address);

    const ui = {
      caption: 'Commit vote',
      header: 'Proposal',
      type: 'txVisualization',
    };

    const web3Params = {
      gasPrice: DEFAULT_GAS_PRICE,
      gas: DEFAULT_GAS,
      ui,
    };

    const payload = {
      address: sourceAddress,
      contract,
      func: contract.commitVoteOnProposal,
      params: [proposalId, currentVotingRound, hash],
      onSuccess: txHash => {
        this.onSuccessfulTransaction(txHash);
      },
      onFailure: this.setError,
      network,
      web3Params,
      ui,
    };

    return executeContractFunction(payload);
  };

  render() {
    const { hasVoted, vote, downloaded } = this.state;
    const { proposalId, proposal } = this.props;
    const { currentVotingRound } = proposal;
    const votedYes = hasVoted && vote;
    const votedNo = hasVoted && !vote;

    const ResponseButton = props => (
      <Button
        {...props}
        kind="round"
        fluid
        ghost
        primary
        xlarge
        yes={props.voteValue}
        no={!props.voteValue}
        confirmedYes={votedYes && props.voteValue}
        confirmedNo={votedNo && !props.voteValue}
        onClick={() => this.setVote(props.voteValue)}
      />
    );

    return (
      <IntroContainer>
        <Header uppercase>Vote on Proposal (Commit)</Header>
        <p>
          In the DigixDAO, we employ the Commit and Reveal scheme to keep your votes as unbiased as
          possible. You will need to download a JSON file when deciding your choice in the vote.
          Your choice will then be verified in the Reveal phase when you upload the same JSON file.
        </p>
        <p>Please keep the file in a safe place as you will not be able to download it again.</p>
        <ResponseButton voteValue>Yes</ResponseButton>
        <ResponseButton voteValue={false}>No</ResponseButton>
        {hasVoted && (
          <Button
            kind="link"
            primary
            fill
            fluid
            onClick={this.handleDownload}
            download={`${proposalId}-${currentVotingRound}.json`}
            href={`data:text/json;charset=utf-8,${JSON.stringify(this.state.voteObject)}`}
          >
            Download JSON File
          </Button>
        )}
        {downloaded && (
          <Button kind="round" primary fill fluid onClick={this.handleSubmit}>
            Confirm Commit
          </Button>
        )}
      </IntroContainer>
    );
  }
}

const { array, func, object, string } = PropTypes;

CommitVote.propTypes = {
  addresses: array.isRequired,
  ChallengeProof: object.isRequired,
  history: object.isRequired,
  proposalId: string.isRequired,
  sendTransactionToDaoServer: func.isRequired,
  showHideAlertAction: func.isRequired,
  showRightPanelAction: func.isRequired,
  web3Redux: object.isRequired,
};

const mapStateToProps = state => ({
  ChallengeProof: state.daoServer.ChallengeProof,
  addresses: getAddresses(state),
});

export default web3Connect(
  connect(
    mapStateToProps,
    {
      sendTransactionToDaoServer,
      showHideAlertAction: showHideAlert,
      showRightPanelAction: showRightPanel,
    }
  )(CommitVote)
);

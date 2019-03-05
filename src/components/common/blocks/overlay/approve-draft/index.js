import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { showTxSigningModal } from 'spectrum-lightsuite/src/actions/session';

import { Button } from '@digix/gov-ui/components/common/elements/index';

import { VoteButton } from '@digix/gov-ui/components/common/blocks/overlay/vote/style';
import {
  IntroContainer,
  OverlayHeader as Header,
} from '@digix/gov-ui/components/common/common-styles';

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

class ApproveProposalOverlay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      vote: false,
      hasVoted: false,
    };
  }

  onTransactionAttempt = txHash => {
    const { ChallengeProof, showRightPanelAction } = this.props;

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
  };

  onTransactionSuccess = txHash => {
    const { history, showHideAlertAction } = this.props;
    showHideAlertAction({
      message: 'Proposal Approved',
      txHash,
    });

    history.push('/');
  };

  setError = error => {
    this.props.showHideAlertAction({
      message: JSON.stringify(error && error.message) || error,
    });
  };

  setVote(vote) {
    this.setState({
      hasVoted: true,
      vote,
    });
  }

  handleSubmit = () => {
    const { web3Redux, addresses, proposalId } = this.props;
    const { abi, address } = getContract(Dao, network);
    const sourceAddress = addresses.find(({ isDefault }) => isDefault);

    const contract = web3Redux
      .web3(network)
      .eth.contract(abi)
      .at(address);

    const ui = {
      caption: 'Approve Proposal',
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
      func: contract.voteOnDraft,
      params: [proposalId, this.state.vote],
      onFailure: this.setError,
      onFinally: txHash => this.onTransactionAttempt(txHash),
      onSuccess: txHash => this.onTransactionSuccess(txHash),
      network,
      web3Params,
      ui,
      showTxSigningModal: this.props.showTxSigningModal,
    };

    return executeContractFunction(payload);
  };

  render() {
    const { hasVoted, vote } = this.state;
    const votedYes = hasVoted && vote;
    const votedNo = hasVoted && !vote;

    const ResponseButton = props => (
      <VoteButton
        {...props}
        primary
        fluid
        yes={props.voteValue}
        no={!props.voteValue}
        confirmedYes={votedYes && props.voteValue}
        confirmedNo={votedNo && !props.voteValue}
        onClick={() => this.setVote(props.voteValue)}
      />
    );

    return (
      <IntroContainer>
        <Header uppercase>Approving Draft</Header>
        <p>
          Approval from moderators is needed in order to move a draft to the proposal stage. Please
          make your vote here if you’re in approval for the draft.
        </p>
        <ResponseButton voteValue style={{ marginBottom: '0' }}>
          Yes
        </ResponseButton>
        <ResponseButton voteValue={false}>No</ResponseButton>
        {hasVoted && (
          <Button secondary large fluid onClick={this.handleSubmit}>
            Confirm My Vote
          </Button>
        )}
      </IntroContainer>
    );
  }
}

const { array, func, object, string } = PropTypes;

ApproveProposalOverlay.propTypes = {
  addresses: array.isRequired,
  ChallengeProof: object.isRequired,
  history: object.isRequired,
  proposalId: string.isRequired,
  sendTransactionToDaoServer: func.isRequired,
  showHideAlertAction: func.isRequired,
  showRightPanelAction: func.isRequired,
  showTxSigningModal: func.isRequired,
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
      showTxSigningModal,
    }
  )(ApproveProposalOverlay)
);

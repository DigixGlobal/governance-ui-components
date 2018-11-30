import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Button from '@digix/gov-ui/components/common/elements/buttons/index';
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

  onSuccessfulTransaction = txHash => {
    const { ChallengeProof, history, showHideAlertAction, showRightPanelAction } = this.props;

    if (ChallengeProof.data) {
      sendTransactionToDaoServer({
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

  setVote(vote) {
    this.setState({
      hasVoted: true,
      vote,
    });
  }

  handleSubmit = vote => {
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
    const { hasVoted, vote } = this.state;
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
        <Header uppercase>Approving Draft</Header>
        <p>
          Approval from moderators is needed in order to move a draft to the proposal stage. Please
          make your vote here if you’re in approval for the draft.
        </p>
        <ResponseButton voteValue>Yes</ResponseButton>
        <ResponseButton voteValue={false}>No</ResponseButton>
        {hasVoted && (
          <Button kind="round" primary fill fluid onClick={this.handleSubmit}>
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
      showHideAlertAction: showHideAlert,
      showRightPanelAction: showRightPanel,
    }
  )(ApproveProposalOverlay)
);

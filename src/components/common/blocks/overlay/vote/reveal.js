import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Button from '@digix/gov-ui/components/common/elements/buttons/index';
import {
  IntroContainer,
  OverlayHeader as Header,
  NoteContainer,
  StatusNote,
  ErrorCaption,
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

class RevealVote extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      uploaded: false,
      voteObject: {},
      error: undefined,
    };
  }

  onSuccessfulTransaction = txHash => {
    const { ChallengeProof, history, showHideAlertAction, showRightPanelAction } = this.props;

    if (ChallengeProof.data) {
      this.props.sendTransactionToDaoServer({
        client: ChallengeProof.data.client,
        title: 'Reveal Vote',
        token: ChallengeProof.data['access-token'],
        txHash,
        uid: ChallengeProof.data.uid,
      });
    }

    showRightPanelAction({ show: false });
    showHideAlertAction({
      message: 'Vote Revealed',
    });

    history.push('/');
  };

  setError = error => {
    const message = JSON.stringify((error && error.message) || error);
    console.log(message);
    return this.props.showHideAlertAction({ message });
  };

  handleSubmit = () => {
    const { voteObject } = this.state;
    const {
      web3Redux,
      addresses,
      proposal: { currentVotingRound, proposalId },
    } = this.props;
    const { abi, address } = getContract(Dao, network);
    const sourceAddress = addresses.find(({ isDefault }) => isDefault);

    const contract = web3Redux
      .web3(network)
      .eth.contract(abi)
      .at(address);

    const ui = {
      caption: 'Reveal Vote',
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
      func: contract.revealVoteOnProposal,
      params: [proposalId, currentVotingRound, voteObject.vote, voteObject.salt],
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

  handleUpload = e => {
    let error;

    if (e.target.files.length > 0) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        const { result } = reader;
        if (file.type !== 'application/json') {
          error = `Unsupported ${file.type} file type`;
        }
        if (!error) {
          const json = atob(result.replace('data:application/json;base64,', ''));
          const voteObject = JSON.parse(json);
          if (voteObject.vote && voteObject.salt) {
            this.setState({ voteObject, uploaded: true, error: false });
          } else {
            this.setState({
              voteObject: undefined,
              uploaded: false,
              error: 'Invalid File Content, Please make sure you uploaded the correct file.',
            });
          }
        } else {
          this.setState({ error, uploaded: false });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  render() {
    const { uploaded, voteObject, error } = this.state;
    return (
      <IntroContainer>
        <Header uppercase>Vote on Proposal (Reveal)</Header>
        <p>
          The Reveal phase is to verify the choice you made in the Commit phsae. Please upload the
          JSON file that you received in the Commit phase. Your choice will then be verified and
          counted in as a vote.
        </p>
        <p>
          Please note that if this step is not carried out, your vote will be voided and will not be
          counted.
        </p>
        {error && <ErrorCaption>{error}</ErrorCaption>}
        {uploaded && !error && (
          <NoteContainer>
            <StatusNote>
              Your vote is <span>{voteObject.vote ? 'YES' : 'NO'}</span>
            </StatusNote>
            <p>
              Your vote is only valid and counted as activity on the DigixDAO after your
              confirmation.
            </p>
          </NoteContainer>
        )}
        {!uploaded && (
          <Button
            kind="upload"
            accept=".json"
            primary
            fill
            fluid
            fullWidth
            id="json-upload"
            onChange={this.handleUpload}
            type="file"
            caption=" Upload JSON File"
          />
        )}
        {uploaded && (
          <Button kind="round" primary filled fluid onClick={this.handleSubmit}>
            Confirm My Vote
          </Button>
        )}
      </IntroContainer>
    );
  }
}

const { array, func, object } = PropTypes;

RevealVote.propTypes = {
  addresses: array.isRequired,
  ChallengeProof: object.isRequired,
  history: object.isRequired,
  proposal: object.isRequired,
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
  )(RevealVote)
);

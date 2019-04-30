import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { showTxSigningModal } from 'spectrum-lightsuite/src/actions/session';

import Button from '@digix/gov-ui/components/common/elements/buttons/index';
import {
  IntroContainer,
  OverlayHeader as Header,
  Notifications,
  Message,
  ErrorCaption,
} from '@digix/gov-ui/components/common/common-styles';

import Dao from '@digix/dao-contracts/build/contracts/DaoVoting.json';
import getContract from '@digix/gov-ui/utils/contracts';
import SpectrumConfig from 'spectrum-lightsuite/spectrum.config';
import web3Connect from 'spectrum-lightsuite/src/helpers/web3/connect';

import { DEFAULT_GAS_PRICE } from '@digix/gov-ui/constants';
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

  onTransactionAttempt = txHash => {
    const {
      ChallengeProof,
      showRightPanelAction,
      translations: { snackbars },
    } = this.props;

    if (ChallengeProof.data) {
      this.props.sendTransactionToDaoServer({
        client: ChallengeProof.data.client,
        title: snackbars.reveal.title,
        token: ChallengeProof.data['access-token'],
        txHash,
        uid: ChallengeProof.data.uid,
      });
    }

    showRightPanelAction({ show: false });
  };

  onTransactionSuccess = txHash => {
    const {
      history,
      showHideAlertAction,
      translations: { snackbars },
    } = this.props;
    showHideAlertAction({
      message: snackbars.reveal.message,
      txHash,
    });

    history.push('/');
  };

  setError = error => {
    const message = JSON.stringify((error && error.message) || error);
    return this.props.showHideAlertAction({ message });
  };

  handleSubmit = () => {
    const { voteObject } = this.state;
    const {
      gasLimitConfig,
      web3Redux,
      addresses,
      proposal: { currentVotingRound, proposalId, isSpecial },
      translations: { snackbars },
    } = this.props;
    const { abi, address } = getContract(Dao, network);
    const sourceAddress = addresses.find(({ isDefault }) => isDefault);

    const contract = web3Redux
      .web3(network)
      .eth.contract(abi)
      .at(address);

    const ui = {
      caption: snackbars.reveal.title,
      header: snackbars.reveal.txUiHeader,
      type: 'txVisualization',
    };

    const gasLimit = isSpecial ? gasLimitConfig.REVEAL_VOTE_SPECIAL : gasLimitConfig.REVEAL_VOTE;
    const web3Params = {
      gasPrice: DEFAULT_GAS_PRICE,
      gas: gasLimit || gasLimitConfig.DEFAULT,
      ui,
    };

    const payload = {
      address: sourceAddress,
      contract,
      func: isSpecial ? contract.revealVoteOnSpecialProposal : contract.revealVoteOnProposal,
      params: isSpecial
        ? [proposalId, voteObject.vote, voteObject.salt]
        : [proposalId, currentVotingRound, voteObject.vote, voteObject.salt],
      onFailure: this.setError,
      onFinally: txHash => this.onTransactionAttempt(txHash),
      onSuccess: txHash => this.onTransactionSuccess(txHash),
      network,
      web3Params,
      ui,
      showTxSigningModal: this.props.showTxSigningModal,
      translations: this.props.txnTranslations,
    };

    return executeContractFunction(payload);
  };

  handleUpload = e => {
    let error;
    const {
      translations: {
        project: { overlays },
      },
    } = this.props;
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

          if ((voteObject.vote || !voteObject.vote) && voteObject.salt) {
            this.setState({ voteObject, uploaded: true, error: false });
          } else {
            this.setState({
              voteObject: undefined,
              uploaded: false,
              error: overlays.invalidFile,
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
    const {
      translations: {
        project: { overlays },
        buttons,
      },
    } = this.props;
    return (
      <IntroContainer>
        <Header uppercase>{overlays.revealVoteHeader}</Header>
        {overlays.revealVoteDescription}

        {error && <ErrorCaption>{error}</ErrorCaption>}
        {uploaded && !error && (
          <Notifications column info centered>
            <Message uppercase>
              {overlays.yourVoteIs}
              <br />
              <span style={{ fontSize: '3.8rem' }}>
                {voteObject.vote ? buttons.yes : buttons.no}
              </span>
            </Message>
            <br />
            <p>{overlays.yourVoteIsOnlyValid}</p>
          </Notifications>
        )}
        {!uploaded && (
          <Button
            kind="upload"
            accept=".json"
            secondary
            fluid
            large
            id="json-upload"
            onChange={this.handleUpload}
            type="file"
            caption={buttons.uploadJsonFile}
          />
        )}
        {uploaded && (
          <Button kind="round" secondary large fluid onClick={this.handleSubmit}>
            {buttons.confimVote}
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
  gasLimitConfig: object,
  history: object.isRequired,
  proposal: object.isRequired,
  sendTransactionToDaoServer: func.isRequired,
  showHideAlertAction: func.isRequired,
  showRightPanelAction: func.isRequired,
  showTxSigningModal: func.isRequired,
  web3Redux: object.isRequired,
  translations: object.isRequired,
  txnTranslations: object.isRequired,
};

RevealVote.defaultProps = {
  gasLimitConfig: undefined,
};

const mapStateToProps = state => ({
  addresses: getAddresses(state),
  ChallengeProof: state.daoServer.ChallengeProof,
  gasLimitConfig: state.infoServer.TxConfig.data.gas,
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
  )(RevealVote)
);

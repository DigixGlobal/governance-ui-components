import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import web3Utils from 'web3-utils';
import secureRandom from 'secure-random';
import moment from 'moment';

import { showTxSigningModal } from 'spectrum-lightsuite/src/actions/session';

import { Button, Icon } from '@digix/gov-ui/components/common/elements/index';
import {
  IntroContainer,
  OverlayHeader as Header,
  Note,
  Notifications,
  Message,
} from '@digix/gov-ui/components/common/common-styles';

import {
  DownloadButton,
  VoteButton,
  DownloadJson,
} from '@digix/gov-ui/components/common/blocks/overlay/vote/style';

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
      hasDownloaded: false,
      changeVote: false,
      voteObject: {},
    };
  }

  onTransactionAttempt = txHash => {
    const { ChallengeProof, showRightPanelAction } = this.props;

    if (ChallengeProof.data) {
      this.props.sendTransactionToDaoServer({
        client: ChallengeProof.data.client,
        title: 'Vote on Proposal',
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
      message: 'Your Vote Transaction is pending confirmation. See More',
      txHash,
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
      voteObject: { vote, salt: `0x${buffer2Hex(random)}` },
    });
  };

  handleChangeVote = () => {
    this.setState({ changeVote: true });
  };

  handleDownload = () => {
    this.setState({ hasDownloaded: true });
  };

  handleSubmit = () => {
    const { voteObject } = this.state;
    const {
      web3Redux,
      addresses,
      proposalId,
      proposal: { currentVotingRound = 0, isSpecial },
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
      caption: 'Commit Vote',
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
      func: isSpecial ? contract.commitVoteOnSpecialProposal : contract.commitVoteOnProposal,
      params: isSpecial ? [proposalId, hash] : [proposalId, currentVotingRound, hash],
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
    const { hasVoted, vote, changeVote, hasDownloaded } = this.state;
    const { proposal, revoting } = this.props;
    const { proposalVersions, isSpecial } = proposal;

    const { title } = !isSpecial
      ? proposalVersions[proposalVersions.length - 1].dijixObject
      : proposal;
    const fileName = `${title.replace(/\s+/g, '-').substr(0, 20)}-${moment().format()}`;

    const votedYes = hasVoted && vote;
    const votedNo = hasVoted && !vote;
    const showVoting = !revoting || changeVote;
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
        <Header uppercase>Vote on Proposal (Commit)</Header>
        {revoting && !changeVote && (
          <Fragment>
            <Notifications info centered>
              <Message>
                You have already committed for this proposal. This action will overwrite the
                previous commit.
              </Message>
            </Notifications>
            <Button
              secondary
              large
              fluid
              onClick={this.handleChangeVote}
              data-digix="Commit-Change-Vote"
            >
              Change My Vote
            </Button>
          </Fragment>
        )}
        {showVoting && (
          <Fragment>
            <p>
              In the DigixDAO, we employ the Commit and Reveal scheme to keep your votes as unbiased
              as possible. You will need to download a JSON file when deciding your choice in the
              vote. Your choice will then be verified in the Reveal phase when you upload the same
              JSON file.
            </p>
            <Note>
              <strong>
                Please keep the file in a safe place as you will not be able to download it again.
              </strong>
            </Note>
            <ResponseButton voteValue data-digix="Commit-Vote-Yes" style={{ marginBottom: '0' }}>
              Yes
            </ResponseButton>
            <ResponseButton voteValue={false} data-digix="Commit-Vote-No">
              No
            </ResponseButton>

            {hasVoted && (
              <DownloadJson info centered column>
                <Message uppercase>This Json file is only valid for this commit</Message>
                <p>
                  In the case you change your mind or make another commit, this file is no longer
                  valid.
                </p>

                <DownloadButton
                  kind="link"
                  large
                  fluid
                  download={`${fileName}.json`}
                  onClick={this.handleDownload}
                  href={`data:text/json;charset=utf-8,${JSON.stringify(this.state.voteObject)}`}
                  data-digix="Commit-Download-Json"
                >
                  <Icon kind="file" />
                  Download JSON File
                </DownloadButton>
              </DownloadJson>
            )}

            {hasDownloaded && (
              <Button
                secondary
                large
                fluid
                onClick={this.handleSubmit}
                data-digix="Commit-Confirm-Vote"
              >
                Confirm Commit
              </Button>
            )}
          </Fragment>
        )}
      </IntroContainer>
    );
  }
}

const { array, func, object, string, bool } = PropTypes;

CommitVote.propTypes = {
  addresses: array.isRequired,
  ChallengeProof: object.isRequired,
  history: object.isRequired,
  proposalId: string.isRequired,
  proposal: object.isRequired,
  sendTransactionToDaoServer: func.isRequired,
  showHideAlertAction: func.isRequired,
  showRightPanelAction: func.isRequired,
  showTxSigningModal: func.isRequired,
  web3Redux: object.isRequired,
  revoting: bool,
};

CommitVote.defaultProps = {
  revoting: false,
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
  )(CommitVote)
);

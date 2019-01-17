import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { showTxSigningModal } from 'spectrum-lightsuite/src/actions/session';
import TextField from '@digix/gov-ui/components/common/elements/textfield';
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

class ChangeFundingOverlay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        expectedReward: 0,
        milestoneFundings: [],
      },
    };
  }

  componentWillMount = () => {
    const { proposal } = this.props;
    const { form } = this.state;
    const proposalDetails = proposal.proposalVersions[proposal.proposalVersions.length - 1];
    form.expectedReward = proposalDetails.finalReward;
    form.milestoneFundings = proposalDetails.milestoneFundings;
    this.setState({ form: { ...form } });
  };

  onExpectedRewardChange = e => {
    const { value } = e.target;
    const { form } = this.state;
    form.expectedReward = value;
    this.setState({ form: { ...form } });
  };

  onFundingChange = (e, i) => {
    const { value } = e.target;
    const { form } = this.state;
    form.milestoneFundings[i] = value;
    this.setState({ form: { ...form } });
  };

  onTransactionAttempt = txHash => {
    const { ChallengeProof, showRightPanelAction } = this.props;

    if (ChallengeProof.data) {
      this.props.sendTransactionToDaoServer({
        client: ChallengeProof.data.client,
        title: 'Change Funding',
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
      message: 'Funding Changed',
      txHash,
    });

    history.push('/');
  };

  setError = error => {
    this.props.showHideAlertAction({
      message: JSON.stringify(error && error.message) || error,
    });
  };

  handleSubmit = () => {
    const { web3Redux, addresses } = this.props;
    const { abi, address } = getContract(Dao, network);
    const sourceAddress = addresses.find(({ isDefault }) => isDefault);

    const contract = web3Redux
      .web3(network)
      .eth.contract(abi)
      .at(address);

    const ui = {
      caption: 'Change Funding',
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

  renderMilestoneFields = milestoneFundings => {
    if (!milestoneFundings || milestoneFundings.length <= 0) return null;

    return milestoneFundings.map((milestone, i) => (
      <div key={`ms-${i + 1}`}>
        <div>Milestone {i + 1}</div>
        <div>
          <div>Funds required for This Milestone</div>
          <TextField
            type="number"
            data-digix={`Edit-milestone-funding-${i + 1}`}
            value={milestone[i]}
            onChange={e => this.onFundingChange(e, i)}
          />
        </div>
      </div>
    ));
  };

  render() {
    const { form } = this.state;

    return (
      <IntroContainer>
        <Header uppercase>Edit Funding</Header>
        <div>
          Reward Expected
          <TextField
            type="number"
            data-digix="Edit-funding-reward-expected"
            value={form.expectedReward}
            onChange={this.onExpectedRewardChange}
          />
        </div>
        {this.renderMilestoneFields(form.milestoneFundings)}
        <Button kind="round" secondary large fluid onClick={this.handleSubmit}>
          Edit Funding
        </Button>
      </IntroContainer>
    );
  }
}

const { array, func, object } = PropTypes;

ChangeFundingOverlay.propTypes = {
  addresses: array.isRequired,
  ChallengeProof: object.isRequired,
  history: object.isRequired,
  proposal: object.isRequired,
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
  )(ChangeFundingOverlay)
);

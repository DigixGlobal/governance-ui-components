import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Dao from '@digix/dao-contracts/build/contracts/Dao.json';

import web3Connect from 'spectrum-lightsuite/src/helpers/web3/connect';
import { toBigNumber } from 'spectrum-lightsuite/src/helpers/stringUtils';
import SpectrumConfig from 'spectrum-lightsuite/spectrum.config';
import { registerUIs } from 'spectrum-lightsuite/src/helpers/uiRegistry';
import { getAddresses } from 'spectrum-lightsuite/src/selectors';
import { showTxSigningModal } from 'spectrum-lightsuite/src/actions/session';

import { Button } from '@digix/gov-ui/components/common/elements/index';
import { dijix } from '@digix/gov-ui/utils/dijix';
import { encodeHash } from '@digix/gov-ui/utils/helpers';
import getContract from '@digix/gov-ui/utils/contracts';
import { DEFAULT_GAS, DEFAULT_GAS_PRICE } from '@digix/gov-ui/constants';
import TxVisualization from '@digix/gov-ui/components/common/blocks/tx-visualization';
import { showHideAlert } from '@digix/gov-ui/reducers/gov-ui/actions';
import { getProposalDetails } from '@digix/gov-ui/reducers/info-server/actions';
import { sendTransactionToDaoServer } from '@digix/gov-ui/reducers/dao-server/actions';
import { executeContractFunction } from '@digix/gov-ui/utils/web3Helper';

import Details from '../forms/details';
import Milestones from '../forms/milestones';
import Multimedia from '../forms/multimedia';
import Overview from '../forms/overview';
import Preview from './preview';
import Confirm from '../confirm';

import { CreateWrapper, TabPanel, MenuItem, Header, LeftCol, RightCol, Heading } from './style';

registerUIs({ txVisualization: { component: TxVisualization } });

const network = SpectrumConfig.defaultNetworks[0];

const steps = [Overview, Details, Multimedia, Milestones];

class EditProposal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {},
      currentStep: 0,
      canMoveNext: true,
      canMovePrevious: false,
      showPreview: false,
      showConfirmPage: false,
      validForm: true,
      proposalId: undefined,
      exceedsLimit: false,
    };
  }

  componentWillMount = () => {
    const {
      getProposalDetailsAction,
      ChallengeProof,
      history,
      location,
      proposalDetails,
    } = this.props;
    if (!ChallengeProof.data) history.push('/');
    if (location.pathname) {
      const path = location.pathname.split('/');
      const proposalId = path[path.length - 1];
      if (proposalId) getProposalDetailsAction(proposalId);
    }

    if (proposalDetails.data.proposalId) {
      const currentVersion = proposalDetails.data.proposalVersions
        ? proposalDetails.data.proposalVersions[proposalDetails.data.proposalVersions.length - 1]
        : {};
      const form = { ...currentVersion.dijixObject };
      form.finalReward = Number(currentVersion.finalReward);
      this.setState({
        form: { ...form },
        proposalId: proposalDetails.data.proposalId,
      });
    }
  };

  onNextButtonClick = () => {
    const { currentStep } = this.state;
    const nextStep = currentStep + 1;
    if (nextStep < steps.length - 1) {
      this.setState({ currentStep: nextStep, canMovePrevious: true });
    } else if (nextStep === steps.length - 1) {
      this.setState({ currentStep: nextStep, canMoveNext: false, canMovePrevious: true });
    }
  };

  onPreviousButtonClick = () => {
    const { currentStep } = this.state;
    const prevStep = currentStep - 1;
    if (prevStep > 0) {
      this.setState({ currentStep: prevStep, canMoveNext: true });
    } else {
      this.setState({ currentStep: prevStep, canMoveNext: true, canMovePrevious: false });
    }
  };

  onChangeHandler = (e, value) => {
    const { form } = this.state;
    if (e.target && e.target.id) {
      form[e.target.id] = e.target.value;
    } else if (e && value) {
      form[e] = value;
    }

    this.setState({ form: { ...form } }, () => {
      this.checkFundingLimit();
    });
  };

  setError = error =>
    this.props.showHideAlert({ message: JSON.stringify(error && error.message) || error });

  checkFundingLimit = () => {
    const { daoConfig } = this.props;
    const { form } = this.state;

    const validForm = form.milestones && form.milestones.length > 0;

    const limit = daoConfig.data.CONFIG_MAX_FUNDING_FOR_NON_DIGIX;

    const totalFunds = this.computeTotalFunds();
    const exceedsLimit = totalFunds > Number(limit);
    this.setState({ exceedsLimit, validForm: validForm && !exceedsLimit });
  };

  computeTotalFunds = () => {
    const { form } = this.state;
    if (!form.milestones && form.finalReward) return Number(form.finalReward);
    else if (!form.milestones && !form.finalReward) return 0;

    const milestoneFunds = (acc, currentValue) => acc + Number(currentValue.fund);

    return Number(form.milestones.reduce(milestoneFunds, 0)) + Number(form.finalReward);
  };

  useStep = step => {
    this.setState({
      currentStep: step,
      canMovePrevious: step > 0,
      canMoveNext: step < steps.length - 1,
    });
  };

  createAttestation = () => {
    const { form } = this.state;
    const { title, description, details, milestones, proofs, images } = form;

    return dijix
      .create('attestation', {
        attestation: {
          title,
          description,
          details,
          milestones,
        },
        proofs: images && images[0] !== null ? images.concat(proofs) : proofs,
      })
      .then(({ ipfsHash }) => {
        const encodedHash = encodeHash(ipfsHash);
        return encodedHash;
      });
  };

  handleShowPreview = () => {
    this.setState({ showPreview: !this.state.showPreview });
  };

  handleShowConfirmPage = () => {
    this.setState({ showConfirmPage: !this.state.showConfirmPage });
  };

  handleSubmit = () => {
    const { web3Redux, ChallengeProof, addresses } = this.props;
    const { form, proposalId } = this.state;
    const { milestones } = form;
    const funds = milestones.map(ms => toBigNumber(ms.fund).times(toBigNumber(1e18)));

    const { abi, address } = getContract(Dao, network);
    const contract = web3Redux
      .web3(network)
      .eth.contract(abi)
      .at(address);

    const ui = {
      caption: 'Edit Proposal',
      header: 'Proposal',
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
          title: 'Edit Proposal',
          token: ChallengeProof.data['access-token'],
          client: ChallengeProof.data.client,
          uid: ChallengeProof.data.uid,
        });
      }
    };

    const onTransactionSuccess = txHash => {
      this.props.showHideAlert({
        message: 'Proposal Updated',
        txHash,
      });

      this.props.history.push('/');
    };

    this.createAttestation().then(ipfsHash => {
      const payload = {
        address: sourceAddress,
        contract,
        func: contract.modifyProposal,
        params: [
          proposalId,
          ipfsHash,
          funds,
          toBigNumber(parseFloat(form.finalReward, 0) * 1e18),
          web3Params,
        ],
        onFailure: this.setError,
        onFinally: txHash => onTransactionAttempt(txHash),
        onSuccess: txHash => onTransactionSuccess(txHash),
        network,
        web3Params,
        ui,
        showTxSigningModal: this.props.showTxSigningModal,
      };
      return executeContractFunction(payload);
    });
  };

  renderStep = () => {
    const { currentStep, form, exceedsLimit } = this.state;
    const Step = steps[currentStep];
    return (
      <Step
        onChange={this.onChangeHandler}
        form={form}
        edit
        exceedsLimit={exceedsLimit}
        daoConfig={this.props.daoConfig}
      />
    );
  };

  renderPreview = () => {
    const { addresses } = this.props;
    const sourceAddress = addresses.find(({ isDefault }) => isDefault);
    return (
      <Preview
        form={this.state.form}
        onContinueEditing={this.handleShowPreview}
        proposer={sourceAddress ? sourceAddress.address : ''}
      />
    );
  };

  renderConfirmPage = () => (
    <Confirm
      form={this.state.form}
      onBack={this.handleShowConfirmPage}
      onSubmit={this.handleSubmit}
    />
  );

  renderCreate = () => {
    const { currentStep, canMoveNext, canMovePrevious, validForm } = this.state;
    return (
      <CreateWrapper>
        <TabPanel>
          <MenuItem active={currentStep === 0} onClick={() => this.useStep(0)}>
            Overview
          </MenuItem>
          <MenuItem active={currentStep === 1} onClick={() => this.useStep(1)}>
            Project Detail
          </MenuItem>
          <MenuItem active={currentStep === 2} onClick={() => this.useStep(2)}>
            Multimedia
          </MenuItem>
          <MenuItem active={currentStep === 3} onClick={() => this.useStep(3)}>
            Milestone
          </MenuItem>
        </TabPanel>
        <Header>
          <LeftCol>
            <Heading>Basic Project Information</Heading>
          </LeftCol>
          <RightCol>
            <Button tertiary onClick={this.handleShowPreview}>
              Preview
            </Button>
            <Button disabled={!canMovePrevious} primary ghost onClick={this.onPreviousButtonClick}>
              Previous
            </Button>
            {canMoveNext && (
              <Button disabled={!canMoveNext} primary ghost onClick={this.onNextButtonClick}>
                Next
              </Button>
            )}
            {!canMoveNext && validForm && (
              <Button primary ghost onClick={this.handleShowConfirmPage}>
                Update Now
              </Button>
            )}
          </RightCol>
        </Header>
        {this.renderStep()}
      </CreateWrapper>
    );
  };
  render() {
    const { showPreview, showConfirmPage } = this.state;
    if (!showConfirmPage) {
      if (!showPreview) return this.renderCreate();
      if (showPreview) return this.renderPreview();
    }
    if (showConfirmPage) return this.renderConfirmPage();
  }
}

const { object, func, array } = PropTypes;
EditProposal.propTypes = {
  web3Redux: object.isRequired,
  ChallengeProof: object.isRequired,
  proposalDetails: object.isRequired,
  location: object.isRequired,
  history: object.isRequired,
  daoConfig: object.isRequired,
  addresses: array,
  showHideAlert: func.isRequired,
  sendTransactionToDaoServer: func.isRequired,
  getProposalDetailsAction: func.isRequired,
  showTxSigningModal: func.isRequired,
};

EditProposal.defaultProps = {
  addresses: undefined,
};
const mapStateToProps = state => ({
  ChallengeProof: state.daoServer.ChallengeProof,
  addresses: getAddresses(state),
  proposalDetails: state.infoServer.ProposalDetails,
  daoConfig: state.infoServer.DaoConfig,
});

export default web3Connect(
  connect(
    mapStateToProps,
    {
      showHideAlert,
      sendTransactionToDaoServer,
      getProposalDetailsAction: getProposalDetails,
      showTxSigningModal,
    }
  )(EditProposal)
);

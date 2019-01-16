import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import web3Connect from 'spectrum-lightsuite/src/helpers/web3/connect';
import { toBigNumber, parseBigNumber } from 'spectrum-lightsuite/src/helpers/stringUtils';
import SpectrumConfig from 'spectrum-lightsuite/spectrum.config';
import { registerUIs } from 'spectrum-lightsuite/src/helpers/uiRegistry';
import { getAddresses } from 'spectrum-lightsuite/src/selectors';
import { showTxSigningModal } from 'spectrum-lightsuite/src/actions/session';

import Dao from '@digix/dao-contracts/build/contracts/Dao.json';

import { executeContractFunction } from '@digix/gov-ui/utils/web3Helper';
import { Button } from '@digix/gov-ui/components/common/elements/index';
import { dijix } from '@digix/gov-ui/utils/dijix';
import { encodeHash } from '@digix/gov-ui/utils/helpers';
import getContract from '@digix/gov-ui/utils/contracts';
import { DEFAULT_GAS, DEFAULT_GAS_PRICE } from '@digix/gov-ui/constants';
import TxVisualization from '@digix/gov-ui/components/common/blocks/tx-visualization';
import { showHideAlert } from '@digix/gov-ui/reducers/gov-ui/actions';
import { sendTransactionToDaoServer } from '@digix/gov-ui/reducers/dao-server/actions';
import { getDaoConfig } from '@digix/gov-ui/reducers/info-server/actions';

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

class CreateProposal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {},
      currentStep: 0,
      canMoveNext: true,
      canMovePrevious: false,
      showPreview: false,
      showConfirmPage: false,
      validForm: false,
    };
  }

  componentDidMount() {
    Promise.all([this.props.getDaoConfig()]);
  }

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

    const validForm = form.milestones && form.milestones.length > 0;

    this.setState({ form: { ...form }, validForm });
  };

  setError = error =>
    this.props.showHideAlert({ message: JSON.stringify(error && error.message) || error });

  useStep = step => {
    this.setState({
      currentStep: step,
      canMovePrevious: step > 0,
      canMoveNext: step < steps.length - 1,
    });
  };

  createAttestation = () => {
    const { form } = this.state;
    const { title, description, details, milestones, proofs } = form;

    return dijix
      .create('attestation', {
        attestation: {
          title,
          description,
          details,
          milestones,
        },
        proofs: proofs && proofs.length > 0 ? [...proofs] : undefined,
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
    const { web3Redux, challengeProof, addresses, daoConfig } = this.props;
    const { form } = this.state;
    const { milestones } = form;
    const funds = milestones.map(ms => toBigNumber(ms.fund).times(toBigNumber(1e18)));

    const { abi, address } = getContract(Dao, network);
    const contract = web3Redux
      .web3(network)
      .eth.contract(abi)
      .at(address);

    const ui = {
      caption: `Requires ${parseBigNumber(
        daoConfig.data.CONFIG_PREPROPOSAL_COLLATERAL,
        18
      )} ETH to Submit Proposal`,
      header: 'Proposal',
      type: 'txVisualization',
    };
    const web3Params = {
      gasPrice: DEFAULT_GAS_PRICE,
      gas: DEFAULT_GAS,
      value: toBigNumber(daoConfig.data.CONFIG_PREPROPOSAL_COLLATERAL),
      ui,
    };

    const sourceAddress = addresses.find(({ isDefault }) => isDefault);

    const onTransactionAttempt = txHash => {
      if (challengeProof.data) {
        this.props.sendTransactionToDaoServer({
          txHash,
          title: 'Submit Proposal',
          token: challengeProof.data['access-token'],
          client: challengeProof.data.client,
          uid: challengeProof.data.uid,
        });
      }
    };

    const onTransactionSuccess = txHash => {
      this.props.showHideAlert({
        message: 'Proposal Created',
        txHash,
      });

      this.props.history.push('/');
    };

    this.setError();
    const finalReward = toBigNumber(form.finalReward).times(toBigNumber(1e18));
    this.createAttestation().then(ipfsHash => {
      const payload = {
        address: sourceAddress,
        contract,
        func: contract.submitPreproposal,
        params: [ipfsHash, funds, finalReward, web3Params],
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
    const { currentStep, form } = this.state;
    const Step = steps[currentStep];
    return <Step onChange={this.onChangeHandler} form={form} />;
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
            <Button tertiary onClick={this.handleShowPreview} data-digix="Create-Proposal-Preview">
              Preview
            </Button>
            <Button
              disabled={!canMovePrevious}
              primary
              onClick={this.onPreviousButtonClick}
              data-digix="Create-Proposal-Previous"
            >
              Previous
            </Button>
            {canMoveNext && (
              <Button
                disabled={!canMoveNext}
                primary
                onClick={this.onNextButtonClick}
                data-digix="Create-Proposal-Next"
              >
                Next
              </Button>
            )}
            {!canMoveNext && validForm && (
              <Button
                primary
                ghost
                onClick={this.handleShowConfirmPage}
                data-digix="Create-Proposal-Button"
              >
                Create Now
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
CreateProposal.propTypes = {
  web3Redux: object.isRequired,
  challengeProof: object.isRequired,
  daoConfig: object.isRequired,
  showHideAlert: func.isRequired,
  sendTransactionToDaoServer: func.isRequired,
  showTxSigningModal: func.isRequired,
  getDaoConfig: func.isRequired,
  history: object,
  addresses: array,
};

CreateProposal.defaultProps = {
  addresses: undefined,
  history: undefined,
};

const mapStateToProps = state => ({
  challengeProof: state.daoServer.ChallengeProof,
  daoConfig: state.infoServer.DaoConfig,
  addresses: getAddresses(state),
});

export default web3Connect(
  connect(
    mapStateToProps,
    {
      showHideAlert,
      sendTransactionToDaoServer,
      showTxSigningModal,
      getDaoConfig,
    }
  )(CreateProposal)
);

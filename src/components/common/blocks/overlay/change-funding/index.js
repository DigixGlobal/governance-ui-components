import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { showTxSigningModal } from 'spectrum-lightsuite/src/actions/session';
import { toBigNumber } from 'spectrum-lightsuite/src/helpers/stringUtils';
import { Button, TextField } from '@digix/gov-ui/components/common/elements/index';

import { injectTranslation } from '@digix/gov-ui/utils/helpers';

import {
  IntroContainer,
  OverlayHeader as Header,
  ErrorCaption,
  Label,
} from '@digix/gov-ui/components/common/common-styles';
import {
  FieldItem,
  EditFunding,
} from '@digix/gov-ui/components/common/blocks/overlay/change-funding/style';

import Dao from '@digix/dao-contracts/build/contracts/Dao.json';
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
      exceedsLimit: false,
      fundChanged: false,
      hasNegative: false,
      hasEmpty: false,
    };
  }

  componentWillMount = () => {
    const { proposalDetails } = this.props;
    const { form } = this.state;
    if (proposalDetails) {
      if (!proposalDetails.isFundingChanged) {
        const currentVersion =
          proposalDetails.proposalVersions[proposalDetails.proposalVersions.length - 1];
        form.expectedReward = currentVersion.finalReward;
        form.milestoneFundings = currentVersion.milestoneFundings;
      } else {
        const { changedFundings } = proposalDetails;
        form.expectedReward = changedFundings.finalReward.updated;
        form.milestoneFundings = changedFundings.milestones.map(ms => ms.updated);
      }
      this.setState({ form: { ...form } });
    }
  };

  onExpectedRewardChange = e => {
    const { value } = e.target;
    const { form } = this.state;
    form.expectedReward = value;
    let hasNegative = false;
    if (parseFloat(value) < 0) hasNegative = true;
    this.setState({ form: { ...form }, fundChanged: true, hasNegative }, () => {
      this.checkFundingLimit();
      this.checkEmptyFunds();
    });
  };

  onFundingChange = (e, i) => {
    const { value } = e.target;
    const { form } = this.state;
    form.milestoneFundings[i] = value;
    this.setState(
      {
        form: { ...form },
        fundChanged: true,
        hasNegative: false,
      },
      () => {
        this.checkFundingLimit();
        this.checkEmptyFunds();
      }
    );
  };

  onTransactionAttempt = txHash => {
    const {
      ChallengeProof,
      showRightPanelAction,
      translations: { snackbars },
    } = this.props;

    if (ChallengeProof.data) {
      this.props.sendTransactionToDaoServer({
        client: ChallengeProof.data.client,
        title: snackbars.changeFunding.title,
        token: ChallengeProof.data['access-token'],
        txHash,
        uid: ChallengeProof.data.uid,
      });
    }

    showRightPanelAction({ show: false });
  };

  onTransactionSuccess = txHash => {
    const {
      showHideAlertAction,
      translations: { snackbars },
    } = this.props;

    showHideAlertAction({
      message: snackbars.changeFunding.message,
      txHash,
    });

    if (this.props.onCompleted) {
      this.props.onCompleted();
    }
  };

  setError = error => {
    this.props.showHideAlertAction({
      message: JSON.stringify(error && error.message) || error,
    });
  };

  checkFundingLimit = () => {
    const { proposalDetails, daoConfig } = this.props;
    if (proposalDetails.isDigix) {
      this.setState({ exceedsLimit: false });
    } else {
      const limit = daoConfig.data.CONFIG_MAX_FUNDING_FOR_NON_DIGIX;

      const totalFunds = this.computeTotalFunds();

      const exceedsLimit = totalFunds > Number(limit);
      this.setState({ exceedsLimit });
    }
  };

  computeTotalFunds = () => {
    const { form } = this.state;
    const milestoneFunds = (acc, currentValue) => {
      if (Number(currentValue) < 0) this.setState({ hasNegative: true });
      return Number(acc) + Number(currentValue);
    };
    return Number(form.milestoneFundings.reduce(milestoneFunds)) + Number(form.expectedReward);
  };

  checkEmptyFunds = () => {
    const { form } = this.state;
    let hasEmpty = false;

    if (form.expectedReward === '') {
      this.setState({ hasEmpty: true });
      return;
    }
    // eslint-disable-next-line
    for (const fund of form.milestoneFundings) {
      if (fund === '') {
        hasEmpty = true;
        break;
      }
    }
    this.setState({ hasEmpty });
  };

  handleSubmit = () => {
    const {
      web3Redux,
      addresses,
      proposalDetails,
      translations: { snackbars },
    } = this.props;
    const { form } = this.state;
    const { abi, address } = getContract(Dao, network);
    const sourceAddress = addresses.find(({ isDefault }) => isDefault);

    const funds = form.milestoneFundings.map(fund => toBigNumber(fund).times(toBigNumber(1e18)));
    const contract = web3Redux
      .web3(network)
      .eth.contract(abi)
      .at(address);

    const ui = {
      caption: snackbars.changeFunding.title,
      header: snackbars.changeFunding.TxUiHeader,
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
      func: contract.changeFundings,
      params: [
        proposalDetails.proposalId,
        funds,
        toBigNumber(form.expectedReward).times(toBigNumber(1e18)),
        proposalDetails.currentMilestoneIndex,
      ],
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

  renderMilestoneFields = milestoneFundings => {
    if (!milestoneFundings || milestoneFundings.length <= 0) return null;
    const {
      proposalDetails,
      translations: { project },
    } = this.props;
    return milestoneFundings.map((milestone, i) => {
      const previousMilestone = i + 1 <= Number(proposalDetails.currentMilestone);
      return (
        <div key={`ms-${i + 1}`}>
          <Label>{`${project.milestone} ${i + 1}`}</Label>
          <EditFunding>
            <Label>{project.fundsRequiredForMilestone}</Label>
            <TextField
              type="number"
              disabled={previousMilestone}
              name="test"
              data-digix={`Edit-milestone-funding-${i + 1}`}
              value={milestone}
              onChange={e => this.onFundingChange(e, i)}
            />
          </EditFunding>
        </div>
      );
    });
  };

  render() {
    const { form, exceedsLimit, fundChanged, hasNegative, hasEmpty } = this.state;
    const {
      translations: { buttons, project },
    } = this.props;

    const { daoConfig } = this.props;
    const injectedMessage = injectTranslation(project.overlays.milestoneFundExceeds, {
      limit: daoConfig.data.CONFIG_MAX_FUNDING_FOR_NON_DIGIX,
    });

    return (
      <IntroContainer>
        <Header uppercase>{project.overlays.editFundingHeader}</Header>
        <FieldItem>
          <Label>{project.overlays.rewardExpected}</Label>
          <TextField
            type="number"
            data-digix="Edit-funding-reward-expected"
            value={form.expectedReward}
            onChange={this.onExpectedRewardChange}
          />
        </FieldItem>
        {this.renderMilestoneFields(form.milestoneFundings)}
        {exceedsLimit && (
          <FieldItem>
            <ErrorCaption>{injectedMessage}</ErrorCaption>
          </FieldItem>
        )}
        {hasNegative && (
          <FieldItem>
            <ErrorCaption>{project.overlays.milestoneFundNegative}</ErrorCaption>
          </FieldItem>
        )}
        <Button
          kind="round"
          disabled={exceedsLimit || !fundChanged || hasNegative || hasEmpty}
          secondary
          large
          fluid
          data-digix="Edit-Funding"
          onClick={this.handleSubmit}
        >
          {buttons.editFunding}
        </Button>
      </IntroContainer>
    );
  }
}

const { array, func, object } = PropTypes;

ChangeFundingOverlay.propTypes = {
  addresses: array.isRequired,
  daoConfig: object.isRequired,
  ChallengeProof: object.isRequired,
  proposalDetails: object.isRequired,
  sendTransactionToDaoServer: func.isRequired,
  showHideAlertAction: func.isRequired,
  showRightPanelAction: func.isRequired,
  showTxSigningModal: func.isRequired,
  onCompleted: func.isRequired,
  web3Redux: object.isRequired,
  translations: object.isRequired,
  txnTranslations: object.isRequired,
};

const mapStateToProps = state => ({
  ChallengeProof: state.daoServer.ChallengeProof,
  daoConfig: state.infoServer.DaoConfig,
  addresses: getAddresses(state),
  txnTranslations: state.daoServer.Translations.data.signTransaction,
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

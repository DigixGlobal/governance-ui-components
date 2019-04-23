import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import web3Connect from 'spectrum-lightsuite/src/helpers/web3/connect';
import { showTxSigningModal } from 'spectrum-lightsuite/src/actions/session';
import { getAddresses } from 'spectrum-lightsuite/src/selectors';
import SpectrumConfig from 'spectrum-lightsuite/spectrum.config';
import { toBigNumber } from 'spectrum-lightsuite/src/helpers/stringUtils';

import DaoStakeLocking from '@digix/dao-contracts/build/contracts/DaoStakeLocking.json';

import Button from '@digix/gov-ui/components/common/elements/buttons/index'; // '../../elements/buttons';
import { DEFAULT_GAS, DEFAULT_GAS_PRICE } from '@digix/gov-ui/constants';
import { executeContractFunction } from '@digix/gov-ui/utils/web3Helper';
import { sendTransactionToDaoServer } from '@digix/gov-ui/reducers/dao-server/actions';
import { showHideAlert, showRightPanel } from '@digix/gov-ui/reducers/gov-ui/actions';
import getContract, { getDGDBadgeBalanceContract } from '@digix/gov-ui/utils/contracts';

import {
  IntroContainer,
  OverlayHeader as Header,
} from '@digix/gov-ui/components/common/common-styles';

const network = SpectrumConfig.defaultNetworks[0];

class BadgeRedemptionApproval extends React.Component {
  onTransactionAttempt = txHash => {
    const { ChallengeProof, showRightPanelAction } = this.props;

    if (ChallengeProof.data) {
      this.props.sendTransactionToDaoServer({
        client: ChallengeProof.data.client,
        title: 'Badge Redemption Approval',
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
      message: 'Your Redeem Badge Transaction is pending confirmation. See More',
      txHash,
    });

    history.push('/');
  };

  setError = error => {
    const message = JSON.stringify((error && error.message) || error);
    return this.props.showHideAlertAction({ message });
  };

  handleSubmit = () => {
    const { web3Redux, addresses } = this.props;
    const { address: daoStakeLockingAddress } = getContract(DaoStakeLocking, network);
    const { abi, address } = getDGDBadgeBalanceContract(network);
    const sourceAddress = addresses.find(({ isDefault }) => isDefault);

    const contract = web3Redux
      .web3(network)
      .eth.contract(abi)
      .at(address);

    const ui = {
      caption: 'Approve Badge Redemption',
      header: 'Badge',
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
      func: contract.approve,
      params: [daoStakeLockingAddress, toBigNumber(2 ** 255)],
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

  render() {
    const t = this.props.translations;

    return (
      <IntroContainer>
        <Header uppercase>{t.title}</Header>
        <p>{t.instructions}</p>
        <Button
          kind="round"
          secondary
          fluid
          large
          onClick={this.handleSubmit}
          data-digix="Approve-Interaction"
        >
          {t.button}
        </Button>
      </IntroContainer>
    );
  }
}

const { array, func, object } = PropTypes;

BadgeRedemptionApproval.propTypes = {
  addresses: array.isRequired,
  ChallengeProof: object.isRequired,
  history: object.isRequired,
  sendTransactionToDaoServer: func.isRequired,
  showHideAlertAction: func.isRequired,
  showRightPanelAction: func.isRequired,
  showTxSigningModal: func.isRequired,
  translations: object.isRequired,
  txnTranslations: object.isRequired,
  web3Redux: object.isRequired,
};

const mapStateToProps = state => ({
  ChallengeProof: state.daoServer.ChallengeProof,
  addresses: getAddresses(state),
  translations: state.daoServer.Translations.data.approveInteraction,
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
  )(BadgeRedemptionApproval)
);

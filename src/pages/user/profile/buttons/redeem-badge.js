import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import web3Connect from 'spectrum-lightsuite/src/helpers/web3/connect';
import SpectrumConfig from 'spectrum-lightsuite/spectrum.config';
import { registerUIs } from 'spectrum-lightsuite/src/helpers/uiRegistry';
import { getAddresses } from 'spectrum-lightsuite/src/selectors';
import { showTxSigningModal } from 'spectrum-lightsuite/src/actions/session';
import { parseBigNumber } from 'spectrum-lightsuite/src/helpers/stringUtils';

import RedeeemBadgeOverlay from '@digix/gov-ui/components/common/blocks/overlay/approve-badge-redemption';

import DaoStakeLocking from '@digix/dao-contracts/build/contracts/DaoStakeLocking.json';
import getContract, { getDGDBadgeBalanceContract } from '@digix/gov-ui/utils/contracts';

import { getAddressDetails } from '@digix/gov-ui/reducers/info-server/actions';

import { executeContractFunction } from '@digix/gov-ui/utils/web3Helper';
import { DEFAULT_GAS_PRICE } from '@digix/gov-ui/constants';
import TxVisualization from '@digix/gov-ui/components/common/blocks/tx-visualization';
import { showHideAlert, showRightPanel } from '@digix/gov-ui/reducers/gov-ui/actions';
import { sendTransactionToDaoServer } from '@digix/gov-ui/reducers/dao-server/actions';
import Button from '@digix/gov-ui/components/common/elements/buttons/index';

registerUIs({ txVisualization: { component: TxVisualization } });

const network = SpectrumConfig.defaultNetworks[0];

class RedeemBadgeButton extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      badgeBalance: 0,
      allowance: 0,
      redeemed: false,
    };
  }

  componentWillMount = () => {
    const { addressDetails } = this.props;
    this.getDgdBalance();
    this.getDgdBadgeAllowance();
    this.props.getAddressDetails(addressDetails.address);
  };

  getDgdBalance() {
    const { addressDetails, web3Redux } = this.props;
    const { address: contractAddress, abi } = getDGDBadgeBalanceContract(network);
    const { web3 } = web3Redux.networks[network];
    const contract = web3.eth.contract(abi).at(contractAddress);

    return contract.balanceOf
      .call(addressDetails.address)
      .then(balance => this.setState({ badgeBalance: parseBigNumber(balance) }));
  }

  getDgdBadgeAllowance() {
    const { addressDetails, web3Redux } = this.props;
    const { address: contractAddress, abi } = getDGDBadgeBalanceContract(network);
    const { address: daoStakeLockingAddress } = getContract(DaoStakeLocking, network);
    const { web3 } = web3Redux.networks[network];
    const contract = web3.eth.contract(abi).at(contractAddress);

    return contract.allowance
      .call(addressDetails.address, daoStakeLockingAddress)
      .then(allowance => this.setState({ allowance: parseBigNumber(allowance) }));
  }

  setError = error =>
    this.props.showHideAlert({
      message: JSON.stringify(error && error.message) || error,
    });

  handleShowOverlay = () => {
    const { history } = this.props;
    this.props.showRightPanel({
      component: <RedeeemBadgeOverlay history={history} onCompleted={this.onPanelClose} />,
      show: true,
    });
  };

  handleSubmit = () => {
    const t = this.props.translations;
    const { web3Redux, challengeProof, addresses, gasLimitConfig } = this.props;

    const { abi, address } = getContract(DaoStakeLocking, network);
    const contract = web3Redux
      .web3(network)
      .eth.contract(abi)
      .at(address);

    const ui = {
      caption: t.redeemBadge,
      header: 'Badge',
      type: 'txVisualization',
    };
    const web3Params = {
      gasPrice: DEFAULT_GAS_PRICE,
      gas: gasLimitConfig.DEFAULT,
      ui,
    };

    const sourceAddress = addresses.find(({ isDefault }) => isDefault);

    const onTransactionAttempt = txHash => {
      if (challengeProof.data) {
        this.props.sendTransactionToDaoServer({
          txHash,
          title: t.redeemBadge,
          token: challengeProof.data['access-token'],
          client: challengeProof.data.client,
          uid: challengeProof.data.uid,
        });
      }
    };

    const onTransactionSuccess = txHash => {
      this.props.showHideAlert({
        message: t.redeemBadge,
        txHash,
      });
      this.setState({ redeemed: true }, () => {
        this.getDgdBalance();
        this.props.getAddressDetails(sourceAddress.address);
      });
    };

    const payload = {
      address: sourceAddress,
      contract,
      func: contract.redeemBadge,
      params: undefined,
      onFailure: this.setError,
      onFinally: txHash => onTransactionAttempt(txHash),
      onSuccess: txHash => onTransactionSuccess(txHash),
      network,
      web3Params,
      ui,
      showTxSigningModal: this.props.showTxSigningModal,
      translations: this.props.txnTranslations,
    };
    return executeContractFunction(payload);
  };

  render() {
    const { badgeBalance, redeemed, allowance } = this.state;
    const { addressDetails, daoInfo } = this.props;
    const t = this.props.translations;

    const showOverlay = Number(allowance) < 1;
    const canRedeemBadge =
      addressDetails.redeemedBadge === false &&
      !redeemed &&
      Number(badgeBalance) > 0 &&
      Number(addressDetails.lastQuarterThatReputationWasUpdated) === daoInfo.currentQuarter - 1;

    return (
      <Button
        data-digix="redeemBadgeButton"
        primary
        onClick={showOverlay ? this.handleShowOverlay : this.handleSubmit}
        disabled={!canRedeemBadge}
      >
        {t.redeemBadge}
      </Button>
    );
  }
}

const { object, func, array } = PropTypes;

RedeemBadgeButton.propTypes = {
  web3Redux: object.isRequired,
  challengeProof: object.isRequired,
  showHideAlert: func.isRequired,
  sendTransactionToDaoServer: func.isRequired,
  showTxSigningModal: func.isRequired,
  addresses: array.isRequired,
  daoInfo: object.isRequired,
  addressDetails: object.isRequired,
  gasLimitConfig: object.isRequired,
  history: object.isRequired,
  getAddressDetails: func.isRequired,
  showRightPanel: func.isRequired,
  translations: object.isRequired,
  txnTranslations: object.isRequired,
};

const mapStateToProps = state => ({
  challengeProof: state.daoServer.ChallengeProof,
  addressDetails: state.infoServer.AddressDetails.data,
  daoInfo: state.infoServer.DaoDetails.data,
  addresses: getAddresses(state),
  gasLimitConfig: state.infoServer.TxConfig.data.gas,
  translations: state.daoServer.Translations.data.profile.ModeratorRequirements,
  txnTranslations: state.daoServer.Translations.data.signTransaction,
});

export default web3Connect(
  connect(
    mapStateToProps,
    {
      showHideAlert,
      showRightPanel,
      sendTransactionToDaoServer,
      showTxSigningModal,
      getAddressDetails,
    }
  )(RedeemBadgeButton)
);

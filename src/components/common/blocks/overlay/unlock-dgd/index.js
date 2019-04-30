import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import DaoStakeLocking from '@digix/dao-contracts/build/contracts/DaoStakeLocking.json';
import getContract from '@digix/gov-ui/utils/contracts';
import SpectrumConfig from 'spectrum-lightsuite/spectrum.config';
import TxVisualization from '@digix/gov-ui/components/common/blocks/tx-visualization';
import web3Connect from 'spectrum-lightsuite/src/helpers/web3/connect';
import { Button } from '@digix/gov-ui/components/common/elements/index';
import { DEFAULT_GAS_PRICE } from '@digix/gov-ui/constants';
import { getAddresses } from 'spectrum-lightsuite/src/selectors';
import { getDaoConfig } from '@digix/gov-ui/reducers/info-server/actions';
import { executeContractFunction } from '@digix/gov-ui/utils/web3Helper';
import { registerUIs } from 'spectrum-lightsuite/src/helpers/uiRegistry';
import { sendTransactionToDaoServer } from '@digix/gov-ui/reducers/dao-server/actions';
import { showHideAlert, showRightPanel } from '@digix/gov-ui/reducers/gov-ui/actions';
import { showTxSigningModal } from 'spectrum-lightsuite/src/actions/session';
import { injectTranslation, truncateNumber } from '@digix/gov-ui/utils/helpers';

import {
  IntroContainer,
  OverlayHeader as Header,
  Label,
  Hint,
} from '@digix/gov-ui/components/common/common-styles';

import {
  UnlockDGDContainer,
  TextBox,
  MaxAmount,
  Currency,
  CallToAction,
  Notification,
} from '@digix/gov-ui/components/common/blocks/overlay/unlock-dgd/style';

registerUIs({ txVisualization: { component: TxVisualization } });
const network = SpectrumConfig.defaultNetworks[0];

class UnlockDgdOverlay extends React.Component {
  constructor(props) {
    super(props);

    this.MAX_AMOUNT = Number(props.maxAmount);
    this.state = {
      unlockAmount: 0,
    };
  }

  componentDidMount() {
    this.props.getDaoConfig();
  }

  onDgdInputChange = e => {
    e.preventDefault();
    this.setState({
      unlockAmount: Number(e.target.value),
    });
  };

  setError = error => {
    this.props.showHideAlert({
      message: JSON.stringify(error && error.message) || error,
    });
  };

  fillMaximum = e => {
    e.preventDefault();
    this.setState({
      unlockAmount: this.MAX_AMOUNT,
    });
  };

  unlockDgd = unlockAmount => {
    const t = this.props.translations;
    const { addresses, ChallengeProof, gasLimitConfig, web3Redux } = this.props;
    const { abi, address } = getContract(DaoStakeLocking, network);

    const sourceAddress = addresses.find(({ isDefault }) => isDefault);
    const contract = web3Redux
      .web3(network)
      .eth.contract(abi)
      .at(address);

    const ui = {
      caption: t.title,
      header: 'User',
      type: 'txVisualization',
    };

    const web3Params = {
      gasPrice: DEFAULT_GAS_PRICE,
      gas: gasLimitConfig.UNLOCK_DGD || gasLimitConfig.DEFAULT,
      ui,
    };

    const onTransactionAttempt = txHash => {
      if (ChallengeProof) {
        this.props.sendTransactionToDaoServer({
          txHash,
          title: t.title,
          token: ChallengeProof['access-token'],
          client: ChallengeProof.client,
          uid: ChallengeProof.uid,
        });
      }
    };

    const onTransactionSuccess = txHash => {
      this.props.showHideAlert({
        message: t.txnSuccess,
        txHash,
      });

      if (this.props.onSuccess) {
        this.props.onSuccess();
      }

      this.props.showRightPanel({ show: false });
    };

    const payload = {
      address: sourceAddress,
      contract,
      func: contract.withdrawDGD,
      network,
      onFailure: this.setError,
      onFinally: txHash => onTransactionAttempt(txHash),
      onSuccess: txHash => onTransactionSuccess(txHash),
      params: [unlockAmount * 1e9],
      showTxSigningModal: this.props.showTxSigningModal,
      translations: this.props.txnTranslations,
      ui,
      web3Params,
    };

    return executeContractFunction(payload);
  };

  renderHint() {
    const { DaoConfig } = this.props;
    const { unlockAmount } = this.state;
    const tHint = this.props.translations.Hints;

    if (unlockAmount <= 0) {
      return null;
    }

    if (unlockAmount > this.MAX_AMOUNT) {
      const overfilledHint = injectTranslation(
        tHint.overfilled,
        { maxAmount: this.MAX_AMOUNT },
        true,
        'UnlockDgd-Error'
      );

      return <Hint error>{overfilledHint}</Hint>;
    }

    const minimumRequiredDgd = Number(DaoConfig.CONFIG_MINIMUM_LOCKED_DGD);
    const remainingDgd = this.MAX_AMOUNT - unlockAmount;
    const continueAsParticipant = remainingDgd >= minimumRequiredDgd;
    const remainingDgdHint = injectTranslation(
      tHint.normal,
      { stake: truncateNumber(remainingDgd) },
      true,
      'UnlockDgd-RemainingDgd'
    );

    return (
      <Hint error={!continueAsParticipant}>
        {remainingDgdHint}
        {!continueAsParticipant && <span>{tHint.fillMax}</span>}
      </Hint>
    );
  }

  render() {
    const t = this.props.translations;
    const { unlockAmount } = this.state;
    const disableUnlockDgdButton =
      !unlockAmount || unlockAmount <= 0 || unlockAmount > this.MAX_AMOUNT;

    return (
      <IntroContainer>
        <Header uppercase>{t.title}</Header>
        <Notification info>
          <span>{t.warning}&nbsp;</span>
          <span data-digix="UnlockDgd-MaxAmount">{this.MAX_AMOUNT}</span>
          <span>&nbsp;DGD</span>
        </Notification>

        <Label>{t.instructions}</Label>
        <UnlockDGDContainer>
          <TextBox
            type="number"
            autoFocus
            data-digix="UnlockDgd-Amount"
            onChange={this.onDgdInputChange}
            value={unlockAmount}
          />
          <MaxAmount to="#" data-digix="UnlockDgd-FillAmount" onClick={e => this.fillMaximum(e)}>
            {t.fillMax}
          </MaxAmount>
          <Currency>DGD</Currency>
        </UnlockDGDContainer>
        {this.renderHint()}
        <CallToAction>
          <Button
            primary
            fluid
            data-digix="UnlockDgd-Cta"
            disabled={disableUnlockDgdButton}
            onClick={() => this.unlockDgd(unlockAmount)}
          >
            {t.submit}
          </Button>
        </CallToAction>
      </IntroContainer>
    );
  }
}

const { array, func, number, object } = PropTypes;

UnlockDgdOverlay.propTypes = {
  addresses: array.isRequired,
  ChallengeProof: object.isRequired,
  DaoConfig: object.isRequired,
  gasLimitConfig: object.isRequired,
  getDaoConfig: func.isRequired,
  maxAmount: number.isRequired,
  onSuccess: func,
  showRightPanel: func.isRequired,
  sendTransactionToDaoServer: func.isRequired,
  showHideAlert: func.isRequired,
  showTxSigningModal: func.isRequired,
  translations: object.isRequired,
  txnTranslations: object.isRequired,
  web3Redux: object.isRequired,
};

UnlockDgdOverlay.defaultProps = {
  onSuccess: undefined,
};

const mapStateToProps = state => ({
  addresses: getAddresses(state),
  ChallengeProof: state.daoServer.ChallengeProof.data,
  DaoConfig: state.infoServer.DaoConfig.data,
  gasLimitConfig: state.infoServer.TxConfig.data.gas,
  txnTranslations: state.daoServer.Translations.data.signTransaction,
});

export default web3Connect(
  connect(
    mapStateToProps,
    {
      getDaoConfig,
      showHideAlert,
      showRightPanel,
      sendTransactionToDaoServer,
      showTxSigningModal,
    }
  )(UnlockDgdOverlay)
);

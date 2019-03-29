import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import DaoStakeLocking from '@digix/dao-contracts/build/contracts/DaoStakeLocking.json';
import getContract from '@digix/gov-ui/utils/contracts';
import SpectrumConfig from 'spectrum-lightsuite/spectrum.config';
import TxVisualization from '@digix/gov-ui/components/common/blocks/tx-visualization';
import web3Connect from 'spectrum-lightsuite/src/helpers/web3/connect';
import { Button } from '@digix/gov-ui/components/common/elements/index';
import { DEFAULT_GAS, DEFAULT_GAS_PRICE } from '@digix/gov-ui/constants';
import { getAddresses } from 'spectrum-lightsuite/src/selectors';
import { getDaoConfig } from '@digix/gov-ui/reducers/info-server/actions';
import { executeContractFunction } from '@digix/gov-ui/utils/web3Helper';
import { registerUIs } from 'spectrum-lightsuite/src/helpers/uiRegistry';
import { sendTransactionToDaoServer } from '@digix/gov-ui/reducers/dao-server/actions';
import { showHideAlert, showRightPanel } from '@digix/gov-ui/reducers/gov-ui/actions';
import { showTxSigningModal } from 'spectrum-lightsuite/src/actions/session';
import { truncateNumber } from '@digix/gov-ui/utils/helpers';

import {
  IntroContainer,
  OverlayHeader as Header,
  Notifications,
  Label,
  Hint,
} from '@digix/gov-ui/components/common/common-styles';

import {
  UnlockDGDContainer,
  TextBox,
  MaxAmount,
  Currency,
  CallToAction,
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
    const { addresses, ChallengeProof, web3Redux } = this.props;
    const { abi, address } = getContract(DaoStakeLocking, network);

    const sourceAddress = addresses.find(({ isDefault }) => isDefault);
    const contract = web3Redux
      .web3(network)
      .eth.contract(abi)
      .at(address);

    const ui = {
      caption: 'Unlock DGD',
      header: 'User',
      type: 'txVisualization',
    };

    const web3Params = {
      gasPrice: DEFAULT_GAS_PRICE,
      gas: DEFAULT_GAS,
      ui,
    };

    const onTransactionAttempt = txHash => {
      if (ChallengeProof) {
        this.props.sendTransactionToDaoServer({
          txHash,
          title: 'Unlock DGD',
          token: ChallengeProof['access-token'],
          client: ChallengeProof.client,
          uid: ChallengeProof.uid,
        });
      }
    };

    const onTransactionSuccess = txHash => {
      this.props.showHideAlert({
        message: 'Your Unlock DGD Transaction is pending confirmation. See More',
        txHash,
      });

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
      ui,
      web3Params,
    };

    return executeContractFunction(payload);
  };

  renderHint() {
    const { DaoConfig } = this.props;
    const { unlockAmount } = this.state;

    if (unlockAmount <= 0) {
      return null;
    }

    if (unlockAmount > this.MAX_AMOUNT) {
      return (
        <Hint error>
          <span>You can only unlock up to&nbsp;</span>
          <b data-digix="UnlockDgd-Error-MaxAmount">{this.MAX_AMOUNT}</b>
          <b>&nbsp;DGD.</b>
        </Hint>
      );
    }

    const minimumRequiredDgd = Number(DaoConfig.CONFIG_MINIMUM_LOCKED_DGD);
    const remainingDgd = this.MAX_AMOUNT - unlockAmount;
    const continueAsParticipant = remainingDgd >= minimumRequiredDgd;

    if (continueAsParticipant) {
      return (
        <Hint>
          <span>This will leave you with&nbsp;</span>
          <b>
            <span data-digix="UnlockDgd-RemainingDgd">{truncateNumber(remainingDgd)}</span>
            <span>&nbsp;STAKE</span>
          </b>
          <span>&nbsp;in DigixDAO.</span>
        </Hint>
      );
    }

    return (
      <Hint error>
        <span>This will leave you with&nbsp;</span>
        <b>
          <span data-digix="UnlockDgd-RemainingDgd">{truncateNumber(remainingDgd)}</span>
          <span>&nbsp;STAKE.&nbsp;</span>
        </b>
        <span>You will no longer continue to be a participant.</span>
      </Hint>
    );
  }

  render() {
    const { unlockAmount } = this.state;
    const disableUnlockDgdButton =
      !unlockAmount || unlockAmount <= 0 || unlockAmount > this.MAX_AMOUNT;

    return (
      <IntroContainer>
        <Header uppercase>Unlock DGD</Header>
        <Notifications info>
          <span>Amount of DGD locked in:&nbsp;</span>
          <span data-digix="UnlockDgd-MaxAmount">{this.MAX_AMOUNT}</span>
          <span>&nbsp;DGD</span>
        </Notifications>

        <Label>Please enter the amount of DGD you wish to unlock:</Label>
        <UnlockDGDContainer>
          <TextBox
            type="number"
            autoFocus
            data-digix="UnlockDgd-Amount"
            onChange={this.onDgdInputChange}
            value={unlockAmount}
          />
          <MaxAmount to="#" data-digix="UnlockDgd-FillAmount" onClick={e => this.fillMaximum(e)}>
            Fill Max
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
            Unlock DGD
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
  getDaoConfig: func.isRequired,
  maxAmount: number.isRequired,
  showRightPanel: func.isRequired,
  sendTransactionToDaoServer: func.isRequired,
  showHideAlert: func.isRequired,
  showTxSigningModal: func.isRequired,
  web3Redux: object.isRequired,
};

UnlockDgdOverlay.defaultProps = {};

const mapStateToProps = state => ({
  addresses: getAddresses(state),
  ChallengeProof: state.daoServer.ChallengeProof.data,
  DaoConfig: state.infoServer.DaoConfig.data,
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

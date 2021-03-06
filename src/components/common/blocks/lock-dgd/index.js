import React from 'react';
import Markdown from 'react-markdown';
import _ from 'lodash';
import { connect } from 'react-redux';
import web3Connect from 'spectrum-lightsuite/src/helpers/web3/connect';
import PropTypes, { array } from 'prop-types';
import { inLockingPhase, truncateNumber, injectTranslation } from '@digix/gov-ui/utils/helpers';
import DaoStakeLocking from '@digix/dao-contracts/build/contracts/DaoStakeLocking.json';
import { executeContractFunction } from '@digix/gov-ui/utils/web3Helper';
import { parseBigNumber } from 'spectrum-lightsuite/src/helpers/stringUtils';
import { showTxSigningModal } from 'spectrum-lightsuite/src/actions/session';
import {
  getDefaultAddress,
  getAddresses,
  getDefaultNetworks,
} from 'spectrum-lightsuite/src/selectors';
import { registerUIs } from 'spectrum-lightsuite/src/helpers/uiRegistry';
import SpectrumConfig from 'spectrum-lightsuite/spectrum.config';
import {
  fetchMaxAllowance,
  showHideAlert,
  showHideLockDgdOverlay,
} from '@digix/gov-ui/reducers/gov-ui/actions';
import { sendTransactionToDaoServer } from '@digix/gov-ui/reducers/dao-server/actions';
import TextField from '@digix/gov-ui/components/common/elements/textfield';
import Button from '@digix/gov-ui/components/common/elements/buttons';
import getContract, { getDGDBalanceContract } from '@digix/gov-ui/utils/contracts';
import { DEFAULT_GAS_PRICE } from '@digix/gov-ui/constants';
import { getAddressDetails } from '@digix/gov-ui/reducers/info-server/actions';
import LogLockDgd from '@digix/gov-ui/analytics/lockDgd';

import {
  Container,
  CloseButton,
  Header,
  LockDGD,
  Label,
  FormNote,
  WarningTitle,
} from '@digix/gov-ui/components/common/blocks/lock-dgd/style';
import {
  TransparentOverlay,
  DrawerContainer,
  Notifications,
  Message,
} from '@digix/gov-ui/components/common/common-styles';
import Icon from '@digix/gov-ui/components/common/elements/icons';
import LockDgdTx from '@digix/gov-ui/components/common/blocks/lock-dgd/tx-ui';

const network = SpectrumConfig.defaultNetworks[0];

registerUIs({ lockDgd: { component: LockDgdTx } });

class LockDgd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dgd: 0,
      dgdBalance: 0,
      error: '',
      disableLockDgdButton: true,
      openError: false,
    };
  }

  componentWillReceiveProps = nextProps => {
    const { defaultAddress, lockDgdOverlay } = nextProps;
    if (
      !_.isEqual(this.props.defaultAddress, nextProps.defaultAddress) ||
      !_.isEqual(this.props.lockDgdOverlay, nextProps.lockDgdOverlay)
    )
      if (defaultAddress && lockDgdOverlay.show) {
        this.getMaxAllowance();
        this.getDgdBalance().then(dgdBalance => {
          this.setState({ dgdBalance });
        });
      }
  };

  shouldComponentUpdate = (nextProps, nextState) =>
    !_.isEqual(nextProps, this.props) || !_.isEqual(nextState, this.state);

  onDgdInputChange = e => {
    const { value } = e.target;
    const { dgdBalance } = this.state;
    const {
      addressMaxAllowance,
      translations: { wallet },
    } = this.props;
    let disableLockDgdButton = true;
    let error;

    const exceedsDgdBalance = injectTranslation(wallet.lockDgd.Hints.overfilled, {
      balance: dgdBalance,
    });

    const maxStake = injectTranslation(wallet.lockDgd.Hints.maxStake, {
      maxAllowance: addressMaxAllowance,
    });

    if (!value || Number(value) <= 0) {
      disableLockDgdButton = true;
    } else if (Number(value) > dgdBalance) {
      disableLockDgdButton = true;
      error = exceedsDgdBalance;
    } else if (Number(`${value}e9`) > Number(addressMaxAllowance)) {
      disableLockDgdButton = true;
      error = maxStake;
    } else {
      disableLockDgdButton = false;
    }

    this.setError(error);
    this.setState({
      dgd: value,
      disableLockDgdButton,
    });
  };

  getMaxAllowance = () => {
    const { defaultAddress, web3Redux } = this.props;

    const { abi, address } = getDGDBalanceContract(network);
    const { address: DaoStakingContract } = getContract(DaoStakeLocking, network);
    const contract = web3Redux
      .web3(network)
      .eth.contract(abi)
      .at(address);
    this.props.fetchMaxAllowance(contract, defaultAddress.address, DaoStakingContract);
  };

  getStake = dgd => {
    const { daoDetails } = this.props;
    let { startOfMainphase, startOfNextQuarter, startOfQuarter } = daoDetails;
    const currentTime = Date.now() / 1000;

    startOfMainphase = Number(startOfMainphase);
    startOfNextQuarter = Number(startOfNextQuarter);
    startOfQuarter = Number(startOfQuarter);

    let stake = Number(dgd);
    if (currentTime >= startOfMainphase) {
      stake =
        (dgd * (startOfNextQuarter - startOfQuarter - (currentTime - startOfQuarter))) /
        (startOfNextQuarter - startOfMainphase);
    }

    return stake;
  };

  getDgdBalance() {
    const { defaultAddress, web3Redux } = this.props;
    const { abi, address: contractAddress } = getDGDBalanceContract(network);
    const { web3 } = web3Redux.networks[network];
    const contract = web3.eth.contract(abi).at(contractAddress);

    return contract.balanceOf
      .call(defaultAddress.address)
      .then(balance => parseBigNumber(balance, 9, false));
  }

  setError = error =>
    this.setState({
      error: (error && error.message) || error,
      openError: !!error,
    });

  toggleBodyOverflow = lockDgdOverlay => {
    if (lockDgdOverlay && lockDgdOverlay.show) {
      document.body.classList.add('modal-is-open');
    } else {
      document.body.classList.remove('modal-is-open');
    }
  };

  handleCloseLockDgd = () => {
    this.setState({ error: undefined, openError: false, dgd: undefined }, () => {
      document.body.classList.remove('modal-is-open');
      this.props.showHideLockDgdOverlay(false);
    });
  };

  handleButtonClick = () => {
    const t = this.props.translations.lockDgd;
    const { dgd } = this.state;
    const addedStake = this.getStake(dgd);
    const addedDgd = Number(dgd);
    LogLockDgd.submit(addedDgd);

    const {
      gasLimitConfig,
      web3Redux,
      sendTransactionToDaoServer: sendTransactionToDaoServerAction,
      challengeProof,
      addresses,
    } = this.props;

    const { abi, address } = getContract(DaoStakeLocking, network);
    const contract = web3Redux
      .web3(network)
      .eth.contract(abi)
      .at(address);

    const web3Params = {
      gasPrice: DEFAULT_GAS_PRICE,
      gas: gasLimitConfig.LOCK_DGD || gasLimitConfig.DEFAULT,
    };

    const ui = {
      dgd,
      type: 'lockDgd',
    };

    const sourceAddress = addresses.find(({ isDefault }) => isDefault);

    const onTransactionAttempt = txHash => {
      if (challengeProof.data) {
        sendTransactionToDaoServerAction({
          txHash,
          title: t.title,
          token: challengeProof.data['access-token'],
          client: challengeProof.data.client,
          uid: challengeProof.data.uid,
        });
      }
    };

    const onTransactionSuccess = txHash => {
      const hasChallenge = challengeProof.data && challengeProof.data.uid;
      const message = hasChallenge ? t.txnSuccess : t.dgdApprovalSuccess;
      this.props.showHideAlert({ message, txHash });

      const { onSuccess } = this.props.lockDgdOverlay;
      if (onSuccess) {
        onSuccess({ addedStake, addedDgd });
      }

      this.props.getAddressDetails(sourceAddress.address);
      this.handleCloseLockDgd();
    };

    this.setError();

    const payload = {
      address: sourceAddress,
      contract,
      func: contract.lockDGD,
      params: [dgd * 1e9],
      onFailure: this.setError,
      onFinally: txHash => onTransactionAttempt(txHash),
      onSuccess: txHash => onTransactionSuccess(txHash),
      network,
      web3Params,
      ui,
      showTxSigningModal: this.props.showTxSigningModal,
      logTxn: LogLockDgd.txn,
      translations: this.props.translations.signTransaction,
    };

    return executeContractFunction(payload);
  };

  renderLockDgd = () => {
    const { dgd, disableLockDgdButton, openError, error } = this.state;
    const { daoDetails, gasLimitConfig } = this.props;
    const stake = truncateNumber(this.getStake(dgd));
    const t = this.props.translations.lockDgd;
    const tWarning = t.warning;
    const phase = inLockingPhase(daoDetails)
      ? tWarning.currentPhaseLocking
      : tWarning.currentPhaseMain;

    const stakeMessage = injectTranslation(t.stake, {
      stake,
    });

    return (
      <DrawerContainer>
        <CloseButton onClick={this.handleCloseLockDgd}>
          <Header uppercase>{t.title}</Header>
          <Icon kind="close" />
        </CloseButton>
        {openError && (
          <Notifications error data-digix="LockDgdOverlay-Error">
            <Message note>{error}</Message>
          </Notifications>
        )}
        <Notifications info>
          <WarningTitle>
            <Markdown source={phase} escapeHtml={false} />
          </WarningTitle>
          <br />
          <Markdown source={tWarning.unlock} />
        </Notifications>
        <Label>{t.instructions}</Label>
        <LockDGD>
          <TextField
            type="number"
            autoFocus
            data-digix="LockDgdOverlay-DgdAmount"
            onChange={this.onDgdInputChange}
          />
          <span>DGD</span>
        </LockDGD>
        {dgd > 0 && <FormNote>{stakeMessage}</FormNote>}
        <Button
          secondary
          large
          fluid
          onClick={this.handleButtonClick}
          disabled={disableLockDgdButton}
          data-digix="LockDgdOverlay-LockDgd"
          style={{ marginTop: '4rem' }}
        >
          {t.submit}
        </Button>
      </DrawerContainer>
    );
  };

  render() {
    const { lockDgdOverlay } = this.props;
    if (!lockDgdOverlay || !lockDgdOverlay.show) {
      return null;
    }

    this.toggleBodyOverflow(lockDgdOverlay);
    if (!lockDgdOverlay || !lockDgdOverlay.show) {
      return null;
    }

    return (
      <Container>
        <TransparentOverlay />
        {this.renderLockDgd()}
      </Container>
    );
  }
}

const { object, func, number, oneOfType } = PropTypes;

LockDgd.propTypes = {
  getAddressDetails: func.isRequired,
  lockDgdOverlay: object.isRequired,
  showTxSigningModal: func.isRequired,
  showHideLockDgdOverlay: func.isRequired,
  sendTransactionToDaoServer: func.isRequired,
  fetchMaxAllowance: func.isRequired,
  web3Redux: object.isRequired,
  addressMaxAllowance: oneOfType([number, object]),
  challengeProof: object.isRequired,
  daoDetails: object.isRequired,
  defaultAddress: object,
  addresses: array,
  showHideAlert: func.isRequired,
  translations: object,
  gasLimitConfig: object,
};

LockDgd.defaultProps = {
  defaultAddress: undefined,
  addresses: undefined,
  addressMaxAllowance: undefined,
  gasLimitConfig: undefined,
  translations: {
    lockDgd: {},
    wallet: {},
  },
};
const mapStateToProps = state => ({
  daoDetails: state.infoServer.DaoDetails.data,
  defaultAddress: getDefaultAddress(state),
  addresses: getAddresses(state),
  networks: getDefaultNetworks(state),
  challenge: state.daoServer.Challenge,
  challengeProof: state.daoServer.ChallengeProof,
  lockDgdOverlay: state.govUI.lockDgdOverlay,
  addressMaxAllowance: state.govUI.addressMaxAllowance,
  translations: state.daoServer.Translations.data,
  gasLimitConfig: state.infoServer.TxConfig.data.gas,
});

export default web3Connect(
  connect(
    mapStateToProps,
    {
      getAddressDetails,
      showTxSigningModal,
      showHideAlert,
      showHideLockDgdOverlay,
      sendTransactionToDaoServer,
      fetchMaxAllowance,
    }
  )(LockDgd)
);

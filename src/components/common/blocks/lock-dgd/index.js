import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import web3Connect from 'spectrum-lightsuite/src/helpers/web3/connect';

import PropTypes, { array } from 'prop-types';
import { truncateNumber } from '@digix/gov-ui/utils/helpers';

import DaoStakeLocking from '@digix/dao-contracts/build/contracts/DaoStakeLocking.json';
import DgdToken from '@digix/dao-contracts/build/contracts/MockDgd.json';

import { executeContractFunction } from '@digix/gov-ui/utils/web3Helper';

import { showTxSigningModal } from 'spectrum-lightsuite/src/actions/session';
import {
  getDefaultAddress,
  getAddresses,
  getDefaultNetworks,
} from 'spectrum-lightsuite/src/selectors';
import { registerUIs } from 'spectrum-lightsuite/src/helpers/uiRegistry';

import SpectrumConfig from 'spectrum-lightsuite/spectrum.config';

import { showHideLockDgdOverlay, fetchMaxAllowance } from '@digix/gov-ui/reducers/gov-ui/actions';
import { sendTransactionToDaoServer } from '@digix/gov-ui/reducers/dao-server/actions';

import TextField from '@digix/gov-ui/components/common/elements/textfield';

import Button from '@digix/gov-ui/components/common/elements/buttons';

import getContract from '@digix/gov-ui/utils/contracts';

import { DEFAULT_GAS, DEFAULT_GAS_PRICE, ETHERSCAN_URL } from '@digix/gov-ui/constants';

import {
  Container,
  CloseButton,
  Header,
  LockDgdBox,
  InputDgxBox,
  TextCaption,
  StakeCaption,
  ErrorCaption,
  ConfirmationBox,
  Note,
} from './style';
import { TransparentOverlay, DrawerContainer } from '../../common-styles';
import Icon from '../../../common/elements/icons';

import LockDgdTx from './tx-ui';

const network = SpectrumConfig.defaultNetworks[0];

registerUIs({ lockDgd: { component: LockDgdTx } });

class LockDgd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dgd: 0,
      error: '',
      openError: false,
      txHash: undefined,
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
      }
  };

  shouldComponentUpdate = (nextProps, nextState) =>
    !_.isEqual(nextProps, this.props) || !_.isEqual(nextState, this.state);

  onDgdInputChange = e => {
    const { value } = e.target;
    const { addressMaxAllowance } = this.props;

    if (Number(`${value}e9`) > Number(addressMaxAllowance)) {
      this.setError(`You can only stake up to ${addressMaxAllowance} DGDs`);
    } else this.setState({ dgd: value, error: undefined, openError: false });
  };

  getMaxAllowance = () => {
    const { defaultAddress, web3Redux } = this.props;

    const { abi, address } = getContract(DgdToken, network);
    const { address: DaoStakingContract } = getContract(DaoStakeLocking, network);
    const contract = web3Redux
      .web3(network)
      .eth.contract(abi)
      .at(address);
    this.props.fetchMaxAllowance(contract, defaultAddress.address, DaoStakingContract);
  };

  getStake = dgd => {
    const { daoDetails } = this.props;
    const { startOfMainphase, startOfNextQuarter, startOfQuarter } = daoDetails;
    const currentTime = Date.now() / 1000; // daoDetails have time set to seconds instead of milliseconds

    let stake = dgd;
    if (currentTime >= startOfMainphase) {
      stake =
        (dgd * (startOfNextQuarter - startOfQuarter - (currentTime - startOfQuarter))) /
        (startOfNextQuarter - startOfMainphase);
    }

    return truncateNumber(stake);
  };

  setError = error =>
    this.setState({
      error: JSON.stringify((error && error.message) || error),
      openError: !!error,
    });

  toggleBodyOverflow = () => {
    const { lockDgdOverlay } = this.props;
    if (!lockDgdOverlay || !lockDgdOverlay.show) {
      document.body.classList.remove('modal-is-open');
    } else {
      document.body.classList.toggle('modal-is-open');
    }
  };

  handleCloseLockDgd = () => {
    this.setState({ txHash: undefined, error: undefined, openError: false, dgd: undefined }, () => {
      this.props.showHideLockDgdOverlay(false);
    });
  };

  handleButtonClick = () => {
    const {
      web3Redux,
      sendTransactionToDaoServer: sendTransactionToDaoServerAction,
      challengeProof,
      addresses,
    } = this.props;
    const { dgd } = this.state;
    const { abi, address } = getContract(DaoStakeLocking, network);
    const contract = web3Redux
      .web3(network)
      .eth.contract(abi)
      .at(address);

    const web3Params = { gasPrice: DEFAULT_GAS_PRICE, gas: DEFAULT_GAS };

    const ui = {
      dgd,
      type: 'lockDgd',
    };

    const sourceAddress = addresses.find(({ isDefault }) => isDefault);

    const onTransactionAttempt = txHash => {
      if (challengeProof.data) {
        this.setState({ txHash, dgd: undefined }, () => {
          sendTransactionToDaoServerAction({
            txHash,
            title: 'Lock DGD',
            token: challengeProof.data['access-token'],
            client: challengeProof.data.client,
            uid: challengeProof.data.uid,
          });
        });
      }
    };

    this.setError();

    const payload = {
      address: sourceAddress,
      contract,
      func: contract.lockDGD,
      params: [dgd * 1e9],
      onFailure: this.setError,
      onFinally: txHash => onTransactionAttempt(txHash),
      network,
      web3Params,
      ui,
      showTxSigningModal: this.props.showTxSigningModal,
    };

    return executeContractFunction(payload);
  };

  renderConfirmation = () => {
    const { txHash } = this.state;
    return (
      <DrawerContainer>
        <CloseButton>
          <Header>CONFIRMATION</Header>
          <Icon kind="close" onClick={this.handleCloseLockDgd} />
        </CloseButton>
        <ConfirmationBox>
          <h2>Congratulations!</h2>
          <div>
            You now have voting power in DigixDAO. With great power comes great responsibility.
          </div>
          <div>
            Want to check transaction? Click{' '}
            <a href={`${ETHERSCAN_URL}${txHash}`} target="_blank" rel="noopener noreferrer">
              here
            </a>
            .
          </div>
        </ConfirmationBox>

        <Button
          kind="round"
          primary
          fill
          fluid
          onClick={this.handleCloseLockDgd}
          style={{ marginTop: '4rem' }}
        >
          Get Started
        </Button>
      </DrawerContainer>
    );
  };

  renderLockDgd = () => {
    const { dgd, openError, error } = this.state;
    const invalidDgd = !dgd || Number(dgd) <= 0;
    const stake = this.getStake(dgd);

    return (
      <DrawerContainer>
        <CloseButton onClick={this.handleCloseLockDgd}>
          <Header>LOCK DGD</Header>
          <Icon kind="close" />
        </CloseButton>
        <LockDgdBox>You are now locking DGD in the staking Phase</LockDgdBox>
        <TextCaption>
          <strong>Please enter the amount of DGD you wish to lock in:</strong>
        </TextCaption>
        <InputDgxBox>
          <TextField type="number" autoFocus onChange={this.onDgdInputChange} />
          DGD
        </InputDgxBox>
        <Note>
          {dgd > 0 && (
            <StakeCaption>
              This will give you <strong>{stake} STAKE</strong> in DigixDAO
            </StakeCaption>
          )}
        </Note>
        <Button
          kind="round"
          secondary
          large
          fluid
          onClick={this.handleButtonClick}
          disabled={invalidDgd}
          style={{ marginTop: '4rem' }}
        >
          Lock DGD
        </Button>
        {openError && <ErrorCaption>{error}</ErrorCaption>}
      </DrawerContainer>
    );
  };

  render() {
    const { txHash } = this.state;
    const { lockDgdOverlay } = this.props;

    if (!lockDgdOverlay || !lockDgdOverlay.show) return null;
    this.toggleBodyOverflow();

    return (
      <Container>
        <TransparentOverlay />
        {!txHash && this.renderLockDgd()}
        {txHash && this.renderConfirmation()}
      </Container>
    );
  }
}

const { object, func, number, oneOfType } = PropTypes;

LockDgd.propTypes = {
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
};

LockDgd.defaultProps = {
  defaultAddress: undefined,
  addresses: undefined,
  addressMaxAllowance: undefined,
};
const mapStateToProps = state => ({
  daoDetails: state.infoServer.DaoDetails.data,
  defaultAddress: getDefaultAddress(state),
  addresses: getAddresses(state),
  networks: getDefaultNetworks(state),
  addressDetails: state.infoServer.AddressDetails,
  challenge: state.daoServer.Challenge,
  challengeProof: state.daoServer.ChallengeProof,
  lockDgdOverlay: state.govUI.lockDgdOverlay,
  addressMaxAllowance: state.govUI.addressMaxAllowance,
});

export default web3Connect(
  connect(
    mapStateToProps,
    {
      showTxSigningModal,
      showHideLockDgdOverlay,
      sendTransactionToDaoServer,
      fetchMaxAllowance,
    }
  )(LockDgd)
);

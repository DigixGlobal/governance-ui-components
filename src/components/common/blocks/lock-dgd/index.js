import React from 'react';
import { connect } from 'react-redux';
import web3Connect from 'spectrum-lightsuite/src/helpers/web3/connect';

import PropTypes, { array } from 'prop-types';
import { parseBigNumber } from 'spectrum-lightsuite/src/helpers/stringUtils';
import sanitizeData from 'spectrum-lightsuite/src/helpers/txUtils';

import DaoStakeLocking from '@digix/dao-contracts/build/contracts/DaoStakeLocking.json';
import DgdToken from '@digix/dao-contracts/build/contracts/MockDgd.json';

import { showTxSigningModal } from 'spectrum-lightsuite/src/actions/session';
import {
  getDefaultAddress,
  getAddresses,
  getDefaultNetworks,
} from 'spectrum-lightsuite/src/selectors';
import { registerUIs } from 'spectrum-lightsuite/src/helpers/uiRegistry';

import SpectrumConfig from 'spectrum-lightsuite/spectrum.config';
// import sanitizeData from 'spectrum-lightsuite/src/helpers/txUtils';

import { showHideLockDgdOverlay, showHideAlert } from '../../../../reducers/gov-ui/actions';
import { sendTransactionToDaoServer } from '../../../../reducers/dao-server/actions';

import TextField from '../../elements/textfield';

import Button from '../../../common/elements/buttons';

import getContract from '../../../../utils/contracts';

import { DEFAULT_GAS, DEFAULT_GAS_PRICE } from '../../../../constants';

import {
  Container,
  TransparentOverlay,
  WalletContainer,
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
import Icon from '../../../common/elements/icons';

import LockDgdTx from './tx-ui';

const network = SpectrumConfig.defaultNetworks[0];

registerUIs({ lockDgd: { component: LockDgdTx } });

const etherscanUrl =
  network === 'eth-mainnet' ? 'https://etherscan.io/tx/' : 'https://kovan.etherscan.io/tx/';

class LockDgd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dgd: 0,
      error: '',
      openError: false,
      maxAllowance: 0,
      txHash: undefined,
      // txFee: 0,
    };
  }
  componentWillMount = () => {
    const { lockDgdOverlay, defaultAddress } = this.props;
    if (!lockDgdOverlay || !lockDgdOverlay.show) {
      document.body.classList.remove('modal-is-open');
    } else {
      document.body.classList.toggle('modal-is-open');
    }

    if (defaultAddress) {
      this.getMaxAllowance();
    }
  };

  onDgdInputChange = e => {
    const { value } = e.target;
    const { maxAllowance } = this.state;

    if (Number(`${value}e9`) > Number(maxAllowance)) {
      this.setError(`You can only stake up to ${maxAllowance} DGDs`);
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

    contract.allowance.call(defaultAddress.address, DaoStakingContract).then(result => {
      this.setState({ maxAllowance: parseBigNumber(result, 9, false) });
    });
  };

  setError = error =>
    this.setState({
      error: JSON.stringify((error && error.message) || error),
      openError: !!error,
    });

  handleCloseLockDgd = () => {
    this.setState({ txHash: undefined, error: undefined, openError: false, dgd: undefined }, () => {
      this.props.showHideLockDgdOverlay(false);
    });
  };

  handleButtonClick = () => {
    const {
      web3Redux,
      defaultAddress,
      sendTransactionToDaoServer: sendTransactionToDaoServerAction,
      ChallengeProof,
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

    const {
      keystore: {
        type: { id: keystoreType },
      },
    } = sourceAddress;
    this.setError();

    if (keystoreType === 'metamask' || keystoreType === 'imtoken') {
      const data = contract.lockDGD.getData(dgd * 1e9);
      return this.props
        .showTxSigningModal({
          address: sourceAddress,
          network,
          txData: sanitizeData(
            {
              ...web3Params,
              from: defaultAddress.address,
              data,
              to: contract.address,
            },
            network
          ),
          ui,
        })
        .then(txHash => {
          console.log(txHash);
          // this.setState({ txHash, openTracker: true, broadcast: new Date() });
        })
        .catch(this.setError);
    }

    return contract.lockDGD
      .sendTransaction(dgd * 1e9, {
        from: defaultAddress.address,
        ui,
        ...web3Params,
      })
      .then(txHash => {
        if (ChallengeProof.data) {
          this.setState({ txHash, dgd: undefined }, () => {
            sendTransactionToDaoServerAction({
              txHash,
              title: 'Lock DGD',
              token: ChallengeProof.data['access-token'],
              client: ChallengeProof.data.client,
              uid: ChallengeProof.data.uid,
            });
          });
        } else {
          this.setState({ txHash }, () => {
            this.props.showHideAlert({ message: txHash, dgd: undefined });
          });
        }
      })
      .catch(this.setError);
  };

  renderConfirmation = () => {
    const { txHash } = this.state;
    return (
      <WalletContainer>
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
            <a href={`${etherscanUrl}${txHash}`} target="_blank" rel="noopener noreferrer">
              here
            </a>
            .
          </div>
        </ConfirmationBox>

        <Button
          kind="round"
          primary
          ghost
          fluid
          onClick={this.handleCloseLockDgd}
          style={{ marginTop: '4rem' }}
        >
          Get Started
        </Button>
      </WalletContainer>
    );
  };

  renderLockDgd = () => {
    const { dgd, openError, error } = this.state;
    const invalidDgd = !dgd || Number(dgd) <= 0;
    return (
      <WalletContainer>
        <CloseButton>
          <Header>LOCK DGD</Header>
          <Icon kind="close" onClick={this.handleCloseLockDgd} />
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
              This will give you <strong>{dgd} STAKE</strong> in DigixDAO
            </StakeCaption>
          )}
        </Note>
        <Button
          kind="round"
          primary
          ghost
          fluid
          onClick={this.handleButtonClick}
          disabled={invalidDgd}
          style={{ marginTop: '4rem' }}
        >
          Lock DGD
        </Button>
        {openError && <ErrorCaption>{error}</ErrorCaption>}
      </WalletContainer>
    );
  };

  render() {
    const { txHash } = this.state;
    const { lockDgdOverlay } = this.props;
    if (!lockDgdOverlay || !lockDgdOverlay.show) return null;
    return (
      <Container>
        <TransparentOverlay />
        {!txHash && this.renderLockDgd()}
        {txHash && this.renderConfirmation()}
      </Container>
    );
  }
}

const { object, func } = PropTypes;

LockDgd.propTypes = {
  lockDgdOverlay: object.isRequired,
  showTxSigningModal: func.isRequired,
  showHideLockDgdOverlay: func.isRequired,
  sendTransactionToDaoServer: func.isRequired,
  web3Redux: object.isRequired,
  ChallengeProof: object.isRequired,
  defaultAddress: object,
  showHideAlert: func.isRequired,
  addresses: array,
};

LockDgd.defaultProps = {
  defaultAddress: undefined,
  addresses: undefined,
};
const mapStateToProps = state => ({
  // networks: getNetworks(state),
  defaultAddress: getDefaultAddress(state),
  addresses: getAddresses(state),
  networks: getDefaultNetworks(state),
  AddressDetails: state.infoServer.AddressDetails,
  Challenge: state.daoServer.Challenge,
  ChallengeProof: state.daoServer.ChallengeProof,
  lockDgdOverlay: state.govUI.LockDgdOverlay,
});

export default web3Connect(
  connect(
    mapStateToProps,
    {
      showTxSigningModal,
      showHideLockDgdOverlay,
      sendTransactionToDaoServer,
      showHideAlert,
    }
  )(LockDgd)
);
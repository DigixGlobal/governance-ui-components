import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';

import { parseBigNumber, toBigNumber } from 'spectrum-lightsuite/src/helpers/stringUtils';
import SpectrumConfig from 'spectrum-lightsuite/spectrum.config';
import { getDefaultAddress, getAddresses } from 'spectrum-lightsuite/src/selectors';
import { showTxSigningModal } from 'spectrum-lightsuite/src/actions/session';

import DGDAddress from '@digix/dao-contracts/build/contracts/MockDgd.json';
import DaoStakeLocking from '@digix/dao-contracts/build/contracts/DaoStakeLocking.json';

import { DEFAULT_GAS, DEFAULT_GAS_PRICE } from '@digix/gov-ui/constants';

import {
  showHideLockDgdOverlay,
  canLockDgd,
  fetchMaxAllowance,
  showHideAlert,
} from '@digix/gov-ui/reducers/gov-ui/actions';

import { getAddressDetails } from '@digix/gov-ui/reducers/info-server/actions';
import { sendTransactionToDaoServer } from '@digix/gov-ui/reducers/dao-server/actions';

import Button from '@digix/gov-ui/components/common/elements/buttons/index';
import Icon from '@digix/gov-ui/components/common/elements/icons';
import { HR } from '@digix/gov-ui/components/common/common-styles';

import getContract from '@digix/gov-ui/utils/contracts';
import { executeContractFunction } from '@digix/gov-ui/utils/web3Helper';

import { InnerContainer, Header, CloseButtonWithHeader } from '../style';
import {
  Container,
  AddressInfo,
  TokenInfo,
  TokenIcon,
  TokenDetails,
  TokenValue,
  UsdEquivalent,
  DevNote,
  Notes,
} from './style';

const network = SpectrumConfig.defaultNetworks[0];
class ConnectedWallet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dgdBalance: 0,
      ethBalance: 0,
      showLockDgd: false,
    };
  }

  componentWillMount() {
    const { defaultAddress } = this.props;
    if (defaultAddress && defaultAddress.address) {
      Promise.all([
        this.getEthBalance(),
        this.getDgdBalance(),
        this.props.getAddressDetails(defaultAddress.address),
      ]).then(([eth, dgd]) => this.setState({ dgdBalance: dgd, ethBalance: eth }));
    }
    this.getMaxAllowance();
  }

  shouldComponentUpdate = (nextProps, nextState) =>
    !_.isEqual(nextProps, this.props) || !_.isEqual(nextState, this.state);

  getMaxAllowance = () => {
    const { defaultAddress, web3Redux } = this.props;

    const { abi, address } = getContract(DGDAddress, network);
    const { address: DaoStakingContract } = getContract(DaoStakeLocking, network);
    const contract = web3Redux
      .web3(network)
      .eth.contract(abi)
      .at(address);
    this.props.fetchMaxAllowance(contract, defaultAddress.address, DaoStakingContract);
  };

  getDgdBalance() {
    const { defaultAddress, web3Redux } = this.props;
    const { address: contractAddress, abi } = getContract(DGDAddress);
    const { web3 } = web3Redux.networks[network];
    const contract = web3.eth.contract(abi).at(contractAddress);
    return contract.balanceOf.call(defaultAddress.address).then(balance => {
      this.props.canLockDgd(parseInt(parseBigNumber(balance, 9), 0) > 0);
      return parseBigNumber(balance, 9);
    });
  }

  getEthBalance() {
    const { defaultAddress, web3Redux } = this.props;
    const { web3 } = web3Redux.networks[network];
    if (defaultAddress) {
      return web3.eth
        .getBalance(defaultAddress.address)
        .then(balance => parseBigNumber(balance, 18));
    }
  }

  handleApprove = () => {
    const { web3Redux, challengeProof, addresses } = this.props;

    const { abi, address } = getContract(DGDAddress, network);
    const contract = web3Redux
      .web3(network)
      .eth.contract(abi)
      .at(address);

    const ui = {
      caption: 'Approve Interaction',
      header: 'DGD Approval',
      type: 'txVisualization',
    };
    const web3Params = {
      gasPrice: DEFAULT_GAS_PRICE,
      gas: DEFAULT_GAS,
      ui,
    };

    const sourceAddress = addresses.find(({ isDefault }) => isDefault);

    const onTransactionAttempt = txHash => {
      if (challengeProof.data) {
        this.props.sendTransactionToDaoServer({
          txHash,
          title: 'DGD Approval',
          token: challengeProof.data['access-token'],
          client: challengeProof.data.client,
          uid: challengeProof.data.uid,
        });
      }
    };

    const onTransactionSuccess = txHash => {
      this.setState({ showLockDgd: true }, () => {
        this.props.showHideAlert({
          message: 'DGD Approved',
          txHash,
        });
      });
    };

    const { address: daoStakeLockingAddress } = getContract(DaoStakeLocking, network);
    const payload = {
      address: sourceAddress,
      contract,
      func: contract.approve,
      params: [daoStakeLockingAddress, toBigNumber(2 ** 255)],
      onFailure: this.setError,
      onFinally: txHash => onTransactionAttempt(txHash),
      onSuccess: txHash => onTransactionSuccess(txHash),
      network,
      web3Params,
      ui,
      showTxSigningModal: this.props.showTxSigningModal,
    };
    return executeContractFunction(payload);
  };

  showLockDgdOverlay = () => {
    const { onClose, showHideLockDgdOverlayAction } = this.props;
    onClose();
    showHideLockDgdOverlayAction(true);
  };

  renderApproval = () => (
    <Fragment>
      <CloseButtonWithHeader>
        <Header uppercase>Enabling your DGD for use </Header>
        <Icon kind="close" onClick={() => this.props.onClose()} />
      </CloseButtonWithHeader>
      <p>
        In order to participate in DigixDAO, we need your approval in order for our contracts to
        interact with your DGD.
      </p>
      <Button kind="round" primary fluid filled onClick={this.handleApprove}>
        Approve the interaction
      </Button>
    </Fragment>
  );

  renderDefault = () => {
    const { defaultAddress } = this.props;
    const { dgdBalance, ethBalance } = this.state;
    return (
      <Fragment>
        <CloseButtonWithHeader>
          <Header uppercase>connected wallet </Header>
          <Icon kind="close" onClick={() => this.props.onClose()} />
        </CloseButtonWithHeader>
        <Container>
          <AddressInfo>
            Selected Address
            <span>{defaultAddress.address}</span>
          </AddressInfo>
          <TokenInfo>
            <TokenIcon>
              <Icon kind="ethereum" />
            </TokenIcon>
            <TokenDetails>
              <TokenValue>
                {ethBalance || 0}
                <span>ETH</span>
              </TokenValue>
              <UsdEquivalent>
                0.0
                <span>USD</span>
              </UsdEquivalent>
            </TokenDetails>
          </TokenInfo>
          <TokenInfo>
            <TokenIcon>
              <Icon kind="dgd" style={{ position: 'relative', top: '1px' }} />
            </TokenIcon>
            <TokenDetails>
              <TokenValue>
                {dgdBalance || 0}
                <span>DGD</span>
              </TokenValue>
              <UsdEquivalent>0.0 USD</UsdEquivalent>
            </TokenDetails>
          </TokenInfo>
          <Button kind="round" primary fluid>
            Buy DGD
          </Button>
          <HR />
          <Header uppercase>lock dgd</Header>
          <p>
            Locking your DGD in DigixDAO helps us know you are committed to the growth of the
            community and of course gives you voting power on the proposals you love to support
          </p>
          <Button
            kind="round"
            secondary
            fluid
            disabled={!dgdBalance || dgdBalance <= 0}
            onClick={this.showLockDgdOverlay}
          >
            lock DGD
          </Button>
          <Notes>
            <p>NOTE:</p>
            <ul>
              <li>DO NOT use a wallet for which you do not have access to the private key</li>
              <li>
                Please note that your wallet needs to hold ETH to pay for gas transaction costs.
              </li>
              <li>
                Your locked DGD cannot be traded. You will not be able to see the balance of your
                locked DGD in your wallet. Locked DGD are only visible on this interface as long as
                your wallet is connected
              </li>
              <li>You can lock more (other) DGD anytime</li>
            </ul>
          </Notes>
        </Container>
      </Fragment>
    );
  };

  render() {
    const { addressMaxAllowance } = this.props;
    const { dgdBalance, showLockDgd } = this.state;
    const showApproval =
      parseFloat(dgdBalance) > 0 && Number(addressMaxAllowance) === 0 && !showLockDgd;
    return (
      <InnerContainer>{showApproval ? this.renderApproval() : this.renderDefault()}</InnerContainer>
    );
  }
}

const { object, func, number, oneOfType, array } = PropTypes;

ConnectedWallet.propTypes = {
  onClose: func.isRequired,
  getAddressDetails: func.isRequired,
  canLockDgd: func.isRequired,
  fetchMaxAllowance: func.isRequired,
  showHideAlert: func.isRequired,
  showHideLockDgdOverlayAction: func.isRequired,
  showTxSigningModal: func.isRequired,
  sendTransactionToDaoServer: func.isRequired,
  defaultAddress: object.isRequired,
  web3Redux: object.isRequired,
  addressMaxAllowance: oneOfType([number, object]),
  challengeProof: object.isRequired,
  addresses: array.isRequired,
};

ConnectedWallet.defaultProps = {
  addressMaxAllowance: undefined,
};

const mapStateToProps = state => ({
  defaultAddress: getDefaultAddress(state),
  lockDgdOverlay: state.govUI.lockDgdOverlay,
  addressMaxAllowance: state.govUI.addressMaxAllowance,
  challengeProof: state.daoServer.ChallengeProof,
  addresses: getAddresses(state),
});

export default connect(
  mapStateToProps,
  {
    showHideAlert,
    showHideLockDgdOverlayAction: showHideLockDgdOverlay,
    canLockDgd,
    getAddressDetails,
    fetchMaxAllowance,
    showTxSigningModal,
    sendTransactionToDaoServer,
  }
)(ConnectedWallet);

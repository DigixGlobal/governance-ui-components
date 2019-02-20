import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';

import { parseBigNumber, toBigNumber } from 'spectrum-lightsuite/src/helpers/stringUtils';
import SpectrumConfig from 'spectrum-lightsuite/spectrum.config';
import { getDefaultAddress, getAddresses } from 'spectrum-lightsuite/src/selectors';
import { showTxSigningModal } from 'spectrum-lightsuite/src/actions/session';

import DaoStakeLocking from '@digix/dao-contracts/build/contracts/DaoStakeLocking.json';

import { DEFAULT_GAS, DEFAULT_GAS_PRICE } from '@digix/gov-ui/constants';

import {
  showHideLockDgdOverlay,
  canLockDgd,
  fetchMaxAllowance,
  showHideAlert,
  showHideWalletOverlay,
} from '@digix/gov-ui/reducers/gov-ui/actions';

import { getAddressDetails, getDaoDetails } from '@digix/gov-ui/reducers/info-server/actions';
import { sendTransactionToDaoServer } from '@digix/gov-ui/reducers/dao-server/actions';

import Button from '@digix/gov-ui/components/common/elements/buttons/index';
import Icon from '@digix/gov-ui/components/common/elements/icons';
import { HR } from '@digix/gov-ui/components/common/common-styles';

import getContract, { getDGDBalanceContract } from '@digix/gov-ui/utils/contracts';
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

  componentDidMount() {
    const { defaultAddress } = this.props;
    this._isMounted = true;
    if (defaultAddress && defaultAddress.address) {
      Promise.all([
        this.getEthBalance(),
        this.getDgdBalance(),
        this.props.getAddressDetails(defaultAddress.address),
      ]).then(([eth, dgd]) => {
        const { AddressDetails } = this.props;
        const address = AddressDetails.data;
        const hasParticipated = address.isParticipant || address.lastParticipatedQuarter > 0;

        if (hasParticipated && !this.showRenderApproval()) {
          this.props.showHideWalletOverlay(false);
        }
        if (this._isMounted) {
          this.setState({ dgdBalance: dgd, ethBalance: eth });
        }
      });
    }

    this.getMaxAllowance();
  }

  shouldComponentUpdate = (nextProps, nextState) =>
    !_.isEqual(nextProps, this.props) || !_.isEqual(nextState, this.state);

  componentWillUnmount() {
    this._isMounted = false;
  }

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

  getDgdBalance() {
    const { defaultAddress, web3Redux } = this.props;
    const { address: contractAddress, abi } = getDGDBalanceContract(network);
    const { web3 } = web3Redux.networks[network];
    const contract = web3.eth.contract(abi).at(contractAddress);

    return this.props.getDaoDetails().then(() =>
      contract.balanceOf.call(defaultAddress.address).then(balance => {
        const { isGlobalRewardsSet } = this.props.DaoDetails.data;
        const parsedBalance = parseBigNumber(balance, 9);
        const hasBalance = parseInt(parsedBalance, 0) > 0;

        this.props.canLockDgd(hasBalance && isGlobalRewardsSet);
        return parsedBalance;
      })
    );
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

  _isMounted = false;

  handleApprove = () => {
    const { web3Redux, challengeProof, addresses } = this.props;

    const { abi, address } = getDGDBalanceContract(network);
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
    showHideLockDgdOverlayAction(true, null, 'Load Wallet Overlay');
  };

  showRenderApproval = () => {
    const { addressMaxAllowance } = this.props;
    const { dgdBalance, showLockDgd } = this.state;
    const showApproval =
      parseFloat(dgdBalance) > 0 && Number(addressMaxAllowance) <= 2 ** 100 && !showLockDgd;

    return showApproval;
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
    const { defaultAddress, enableLockDgd } = this.props;
    const { dgdBalance, ethBalance } = this.state;
    return (
      <Fragment>
        <CloseButtonWithHeader>
          <Header uppercase>connected wallet </Header>
          <Icon kind="close" onClick={() => this.props.onClose()} />
        </CloseButtonWithHeader>
        <Container>
          <AddressInfo>
            Your Address
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
            disabled={!enableLockDgd.show}
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
    const showApproval = this.showRenderApproval();

    return (
      <InnerContainer data-digix="ConnectedWalletComponent">
        {showApproval ? this.renderApproval() : this.renderDefault()}
      </InnerContainer>
    );
  }
}

const { object, func, number, oneOfType, array } = PropTypes;

ConnectedWallet.propTypes = {
  AddressDetails: object,
  onClose: func.isRequired,
  getAddressDetails: func.isRequired,
  getDaoDetails: func.isRequired,
  canLockDgd: func.isRequired,
  DaoDetails: object,
  fetchMaxAllowance: func.isRequired,
  showHideAlert: func.isRequired,
  showHideWalletOverlay: func.isRequired,
  showHideLockDgdOverlayAction: func.isRequired,
  showTxSigningModal: func.isRequired,
  sendTransactionToDaoServer: func.isRequired,
  defaultAddress: object.isRequired,
  web3Redux: object.isRequired,
  addressMaxAllowance: oneOfType([number, object]),
  challengeProof: object.isRequired,
  addresses: array.isRequired,
  enableLockDgd: object,
};

ConnectedWallet.defaultProps = {
  AddressDetails: undefined,
  addressMaxAllowance: undefined,
  DaoDetails: {
    data: {
      isGlobalRewardsSet: false,
    },
  },
  enableLockDgd: {
    show: false,
  },
};

const mapStateToProps = state => ({
  AddressDetails: state.infoServer.AddressDetails,
  defaultAddress: getDefaultAddress(state),
  lockDgdOverlay: state.govUI.lockDgdOverlay,
  addressMaxAllowance: state.govUI.addressMaxAllowance,
  challengeProof: state.daoServer.ChallengeProof,
  DaoDetails: state.infoServer.DaoDetails,
  addresses: getAddresses(state),
  enableLockDgd: state.govUI.CanLockDgd,
});

export default connect(
  mapStateToProps,
  {
    showHideAlert,
    showHideWalletOverlay,
    showHideLockDgdOverlayAction: showHideLockDgdOverlay,
    canLockDgd,
    getAddressDetails,
    getDaoDetails,
    fetchMaxAllowance,
    showTxSigningModal,
    sendTransactionToDaoServer,
  }
)(ConnectedWallet);

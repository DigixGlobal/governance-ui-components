import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';

import { parseBigNumber, toBigNumber } from 'spectrum-lightsuite/src/helpers/stringUtils';
import SpectrumConfig from 'spectrum-lightsuite/spectrum.config';
import { getDefaultAddress, getAddresses } from 'spectrum-lightsuite/src/selectors';
import { showTxSigningModal } from 'spectrum-lightsuite/src/actions/session';

import DaoStakeLocking from '@digix/dao-contracts/build/contracts/DaoStakeLocking.json';

import { DEFAULT_GAS_PRICE } from '@digix/gov-ui/constants';

import {
  showHideLockDgdOverlay,
  canLockDgd,
  fetchMaxAllowance,
  showHideAlert,
  showHideWalletOverlay,
} from '@digix/gov-ui/reducers/gov-ui/actions';

import { getDaoDetails, getTxConfig } from '@digix/gov-ui/reducers/info-server/actions';
import { sendTransactionToDaoServer } from '@digix/gov-ui/reducers/dao-server/actions';

import { Button, Icon } from '@digix/gov-ui/components/common/elements/index';
import { HR } from '@digix/gov-ui/components/common/common-styles';

import getContract, { getDGDBalanceContract } from '@digix/gov-ui/utils/contracts';
import { executeContractFunction } from '@digix/gov-ui/utils/web3Helper';

import {
  InnerContainer,
  Header,
  CloseButtonWithHeader,
} from '@digix/gov-ui/components/common/blocks/wallet/style';
import {
  WalletDetails,
  Address,
  Token,
  Amount,
  Notes,
  NotesTitle,
} from '@digix/gov-ui/components/common/blocks/wallet/connected-wallet/style';

const network = SpectrumConfig.defaultNetworks[0];
class ConnectedWallet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dgdBalance: 0,
      ethBalance: 0,
      showLockDgd: false,
    };

    this._isMounted = false;
  }

  componentDidMount() {
    const { defaultAddress, AddressDetails } = this.props;
    this.props.getTxConfig();
    this._isMounted = true;

    if (defaultAddress.address && AddressDetails.data) {
      const address = AddressDetails.data;
      const hasParticipated = address.isParticipant || address.lastParticipatedQuarter > 0;

      if (hasParticipated && !this.showRenderApproval()) {
        this.props.showHideWalletOverlay(false);
      } else {
        Promise.all([this.getEthBalance(), this.getDgdBalance(), this.getMaxAllowance()]).then(
          ([eth, dgd]) => {
            if (this._isMounted) {
              this.setState({ dgdBalance: dgd, ethBalance: eth });
            }
          }
        );
      }
    }
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
    return this.props.fetchMaxAllowance(contract, defaultAddress.address, DaoStakingContract);
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
        const hasBalance = parsedBalance.replace(',', '.') > 0;
        this.props.canLockDgd(hasBalance && isGlobalRewardsSet);
        return parsedBalance;
      })
    );
  }

  getEthBalance() {
    const { defaultAddress, web3Redux } = this.props;
    const { web3 } = web3Redux.networks[network];
    if (defaultAddress && defaultAddress.address) {
      return web3.eth
        .getBalance(defaultAddress.address)
        .then(balance => parseBigNumber(balance, 18));
    }
  }

  setError = error => {
    this.props.showHideAlert({
      message: JSON.stringify(error && error.message) || error,
    });
  };

  handleApprove = () => {
    const { web3Redux, challengeProof, addresses, gasLimitConfig } = this.props;

    const { transaction: t } = this.props.walletTranslations.approveInteraction;

    const { abi, address } = getDGDBalanceContract(network);
    const contract = web3Redux
      .web3(network)
      .eth.contract(abi)
      .at(address);

    const ui = {
      caption: t.title || 'Approve Interaction',
      header: t.action || 'DGD Approval',
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
          title: t.action || 'DGD Approval',
          token: challengeProof.data['access-token'],
          client: challengeProof.data.client,
          uid: challengeProof.data.uid,
        });
      }
    };

    const onTransactionSuccess = txHash => {
      this.setState({ showLockDgd: true }, () => {
        this.props.showHideAlert({
          message:
            t.txnSuccess || 'Your DGD Approval Transaction is pending confirmation. See More',
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
      translations: this.props.txnTranslations,
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

  renderApproval() {
    const t = this.props.approvalTranslations;

    return (
      <Fragment>
        <CloseButtonWithHeader>
          <Header uppercase>{t.title}</Header>
          <Icon kind="close" onClick={() => this.props.onClose()} />
        </CloseButtonWithHeader>
        <p>{t.instructions}</p>
        <Button data-digix="Approve-Interaction" primary fluid large onClick={this.handleApprove}>
          {t.button}
        </Button>
      </Fragment>
    );
  }

  renderDefault = () => {
    const { defaultAddress, enableLockDgd, tokenUsdValues } = this.props;
    const { dgdBalance, ethBalance } = this.state;

    const tokensInUsd = tokenUsdValues && tokenUsdValues.data ? tokenUsdValues.data : undefined;

    let dgdInUsd = dgdBalance !== 0 ? dgdBalance.replace(',', '') : dgdBalance;
    let ethInUsd = ethBalance !== 0 ? ethBalance.replace(',', '').replace('...', '') : ethBalance;
    if (dgdInUsd > 0 && tokensInUsd && tokensInUsd.DGD)
      dgdInUsd = Number(dgdInUsd) * Number(tokensInUsd.DGD.USD);

    if (ethInUsd > 0 && tokensInUsd && tokensInUsd.ETH)
      ethInUsd = Number(ethInUsd) * Number(tokensInUsd.ETH.USD);

    const t = this.props.translations;
    const tLockDgd = t.lockDgd;
    const tNotes = t.notes;

    return (
      <Fragment>
        <CloseButtonWithHeader>
          <Header uppercase>{t.title}</Header>
          <Icon kind="close" onClick={() => this.props.onClose()} />
        </CloseButtonWithHeader>
        <WalletDetails>
          <Address>
            {t.address}
            <span data-digix="User-Address">{defaultAddress.address}</span>
          </Address>
          <Token>
            <Icon kind="ethereum" width="48px" height="48px" />
            <Amount>
              <div>
                <span data-digix="Wallet-ETH-Balance">{ethBalance || 0}</span>
                ETH
              </div>
              <div data-digix="Wallet-EthUsd-Balance">
                {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(
                  ethInUsd
                )}{' '}
                USD
              </div>
            </Amount>
          </Token>
          <Token>
            <Icon kind="dgd" width="48px" height="48px" />
            <Amount>
              <div>
                <span data-digix="Wallet-DGD-Balance">{dgdBalance || 0}</span> DGD
              </div>
              <div data-digix="Wallet-DgdUsd-Balance">
                {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(
                  dgdInUsd
                )}{' '}
                USD
              </div>
            </Amount>
          </Token>
          <HR style={{ marginBottom: '4rem' }} />
          <Header uppercase>{tLockDgd.title}</Header>
          <p>{tLockDgd.description}</p>
          <Button
            secondary
            fluid
            large
            disabled={!enableLockDgd.show}
            onClick={this.showLockDgdOverlay}
            data-digx="Connect-Wallet-Locked-DGD"
          >
            {tLockDgd.button}
          </Button>
          <Notes>
            <NotesTitle>{tNotes.title}</NotesTitle>
            <ul>
              <li>{tNotes.note1}</li>
              <li>{tNotes.note2}</li>
              <li>{tNotes.note3}</li>
              <li>{tNotes.note4}</li>
            </ul>
          </Notes>
        </WalletDetails>
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
  tokenUsdValues: object,
  web3Redux: object.isRequired,
  addressMaxAllowance: oneOfType([number, object]),
  challengeProof: object.isRequired,
  addresses: array.isRequired,
  enableLockDgd: object,
  translations: object.isRequired,
  approvalTranslations: object.isRequired,
  walletTranslations: object.isRequired,
  txnTranslations: object.isRequired,
  gasLimitConfig: object,
  getTxConfig: func.isRequired,
};

ConnectedWallet.defaultProps = {
  AddressDetails: undefined,
  addressMaxAllowance: undefined,
  tokenUsdValues: undefined,
  gasLimitConfig: undefined,
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
  tokenUsdValues: state.govUI.tokenUsdValues,
  DaoDetails: state.infoServer.DaoDetails,
  addresses: getAddresses(state),
  enableLockDgd: state.govUI.CanLockDgd,
  translations: state.daoServer.Translations.data.loadWallet.connectedWallet,
  approvalTranslations: state.daoServer.Translations.data.approveInteraction,
  walletTranslations: state.daoServer.Translations.data.wallet,
  txnTranslations: state.daoServer.Translations.data.signTransaction,
  gasLimitConfig: state.infoServer.TxConfig.data.gas,
});

export default connect(
  mapStateToProps,
  {
    showHideAlert,
    showHideWalletOverlay,
    showHideLockDgdOverlayAction: showHideLockDgdOverlay,
    canLockDgd,
    getDaoDetails,
    getTxConfig,
    fetchMaxAllowance,
    showTxSigningModal,
    sendTransactionToDaoServer,
  }
)(ConnectedWallet);

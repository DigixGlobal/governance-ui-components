import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import SpectrumConfig from 'spectrum-lightsuite/spectrum.config';
import web3Connect from 'spectrum-lightsuite/src/helpers/web3/connect';
import { getDaoDetails } from '@digix/gov-ui/reducers/info-server/actions';
import { getDGDBalanceContract, getDGXBalanceContract } from '@digix/gov-ui/utils/contracts';
import { parseBigNumber } from 'spectrum-lightsuite/src/helpers/stringUtils';
import { withFetchAddress } from '@digix/gov-ui/api/graphql-queries/address';

import {
  Amount,
  Item,
  WalletDetails,
  WalletCurrencyIcon,
} from '@digix/gov-ui/pages/user/wallet/style';

import {
  showHideAlert,
  showRightPanel,
  showHideLockDgdOverlay,
} from '@digix/gov-ui/reducers/gov-ui/actions';

const network = SpectrumConfig.defaultNetworks[0];

class WalletCurrencies extends React.Component {
  state = {
    dgdBalance: 0,
    dgxBalance: 0,
    ethBalance: 0,
  };

  componentDidMount() {
    const { address } = this.props.AddressDetails;
    if (!address) {
      return;
    }

    Promise.all([
      this.props.getDaoDetails(),
      this.getEthBalance(),
      this.getDgdBalance(),
      this.getDgxBalance(),
    ]).then(result => {
      const ethBalance = result[1];
      const dgdBalance = result[2];
      const dgxBalance = result[3];
      this.setState({ ethBalance, dgdBalance, dgxBalance });
    });
  }

  getDgdBalance() {
    const { address } = this.props.AddressDetails;
    const { address: contractAddress, abi } = getDGDBalanceContract(network);
    const { web3 } = this.props.web3Redux.networks[network];
    const contract = web3.eth.contract(abi).at(contractAddress);

    return contract.balanceOf.call(address).then(balance => parseBigNumber(balance, 9));
  }

  getDgxBalance() {
    const { address } = this.props.AddressDetails;
    const { address: contractAddress, abi } = getDGXBalanceContract(network);
    const { web3 } = this.props.web3Redux.networks[network];
    const contract = web3.eth.contract(abi).at(contractAddress);

    return contract.balanceOf.call(address).then(balance => parseBigNumber(balance, 9));
  }

  getEthBalance() {
    const { address } = this.props.AddressDetails;
    const { web3 } = this.props.web3Redux.networks[network];

    return web3.eth.getBalance(address).then(balance => parseBigNumber(balance, 18));
  }

  getBalanceInUsd(balance, currency) {
    const {
      tokenUsdValues: { data: tokensInUsd },
    } = this.props;

    let usdValue = balance;
    if (balance !== 0) {
      if (currency === 'ETH') {
        usdValue = balance.replace(',', '').replace('...', '');
      } else {
        usdValue = balance.replace(',', '');
      }
    }

    if (usdValue > 0 && tokensInUsd && tokensInUsd[currency]) {
      usdValue = Number(usdValue) * Number(tokensInUsd[currency].USD);
    }

    const currencyFormat = new Intl.NumberFormat('en-US', {
      currency: 'USD',
      style: 'currency',
    });

    return currencyFormat.format(usdValue);
  }

  render() {
    const { ethBalance, dgdBalance, dgxBalance } = this.state;
    const dgdInUsd = this.getBalanceInUsd(dgdBalance, 'DGD');
    const dgxInUsd = this.getBalanceInUsd(dgxBalance, 'DGX');
    const ethInUsd = this.getBalanceInUsd(ethBalance, 'ETH');

    return (
      <WalletDetails>
        <Item>
          <WalletCurrencyIcon kind="dgd" />
          <Amount>
            <div>
              <span data-digix="Wallet-DGD-Balance">{dgdBalance}</span>
              &nbsp;DGD
            </div>
            <div data-digix="Wallet-DgdUsd-Balance">
              {dgdInUsd}
              &nbsp;USD
            </div>
          </Amount>
        </Item>
        <Item>
          <WalletCurrencyIcon kind="dgx" />
          <Amount>
            <div>
              <span data-digix="Wallet-DGX-Balance">{dgxBalance}</span>
              &nbsp;DGX
            </div>
            <div data-digix="Wallet-DgxUsd-Balance">
              {dgxInUsd}
              &nbsp;USD
            </div>
          </Amount>
        </Item>
        <Item>
          <WalletCurrencyIcon kind="ethereum" />
          <Amount>
            <div>
              <span data-digix="Wallet-ETH-Balance">{ethBalance}</span>
              &nbsp;ETH
            </div>
            <div data-digix="Wallet-EthUsd-Balance">
              {ethInUsd}
              &nbsp;USD
            </div>
          </Amount>
        </Item>
      </WalletDetails>
    );
  }
}

const { func, object } = PropTypes;

WalletCurrencies.propTypes = {
  AddressDetails: object.isRequired,
  getDaoDetails: func.isRequired,
  tokenUsdValues: object.isRequired,
  web3Redux: object.isRequired,
};

const mapStateToProps = ({ daoServer, govUI, infoServer }) => ({
  CanLockDgd: govUI.CanLockDgd,
  ChallengeProof: daoServer.ChallengeProof,
  DaoDetails: infoServer.DaoDetails,
  tokenUsdValues: govUI.tokenUsdValues,
});

const WalletCurrenciesComponent = web3Connect(
  connect(
    mapStateToProps,
    {
      getDaoDetails,
      showHideAlert,
      showHideLockDgdOverlay,
      showRightPanel,
    }
  )(WalletCurrencies)
);

export default withFetchAddress(WalletCurrenciesComponent);

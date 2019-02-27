import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { parseBigNumber } from 'spectrum-lightsuite/src/helpers/stringUtils';
import SpectrumConfig from 'spectrum-lightsuite/spectrum.config';

import ParticipationReward from '@digix/gov-ui/pages/user/wallet/sections/participation-reward';
import VotingStake from '@digix/gov-ui/pages/user/wallet/sections/voting-stake';
import web3Connect from 'spectrum-lightsuite/src/helpers/web3/connect';
import { Button } from '@digix/gov-ui/components/common/elements/index';
import { getAddresses } from 'spectrum-lightsuite/src/selectors';
import { getAddressDetails, getDaoDetails } from '@digix/gov-ui/reducers/info-server/actions';

import { getDGDBalanceContract, getDGXBalanceContract } from '@digix/gov-ui/utils/contracts';

import {
  showHideAlert,
  showRightPanel,
  showHideLockDgdOverlay,
} from '@digix/gov-ui/reducers/gov-ui/actions';

import {
  WalletWrapper,
  Heading,
  WalletAddress,
  WalletDetails,
  WalletItem,
  DigixDAO,
  StakeRewards,
  Title,
  Content,
  Label,
  Data,
  Desc,
  Actions,
} from '@digix/gov-ui/pages/user/wallet/style';

const network = SpectrumConfig.defaultNetworks[0];

class Wallet extends React.Component {
  state = {
    ethBalance: 0,
    dgdBalance: 0,
    dgxBalance: 0,
  };

  componentDidMount() {
    const { AddressDetails } = this.props;
    if (AddressDetails.data && AddressDetails.data.address) {
      Promise.all([
        this.props.getDaoDetails(),
        this.props.getAddressDetails(AddressDetails.data.address),
        this.getEthBalance(),
        this.getDgdBalance(),
        this.getDgxBalance(),
      ]).then(result => {
        const ethBalance = result[2]; // Refers to the call to get eth balance
        const dgdBalance = result[3]; // Refers to the call to get the dgd balance
        const dgxBalance = result[4]; // Refers to the call to get the dgx balance
        this.setState({ ethBalance, dgdBalance, dgxBalance });
      });
    }
  }

  getDgdBalance() {
    const { AddressDetails, web3Redux } = this.props;
    const { address: contractAddress, abi } = getDGDBalanceContract(network);
    const { web3 } = web3Redux.networks[network];
    const contract = web3.eth.contract(abi).at(contractAddress);

    return contract.balanceOf.call(AddressDetails.data.address).then(balance => {
      const parsedBalance = parseBigNumber(balance, 9);
      return parsedBalance;
    });
  }

  getDgxBalance() {
    const { AddressDetails, web3Redux } = this.props;
    const { address: contractAddress, abi } = getDGXBalanceContract(network);
    const { web3 } = web3Redux.networks[network];
    const contract = web3.eth.contract(abi).at(contractAddress);

    return contract.balanceOf.call(AddressDetails.data.address).then(balance => {
      const parsedBalance = parseBigNumber(balance, 9);
      return parsedBalance;
    });
  }

  getEthBalance() {
    const { AddressDetails, web3Redux } = this.props;
    const { web3 } = web3Redux.networks[network];
    if (AddressDetails && AddressDetails.data.address) {
      return web3.eth
        .getBalance(AddressDetails.data.address)
        .then(balance => parseBigNumber(balance, 18));
    }
  }

  render() {
    const {
      AddressDetails,
      tokenUsdValues: { data: tokensInUsd },
    } = this.props;

    const { ethBalance, dgdBalance, dgxBalance } = this.state;
    const address = AddressDetails.data;
    let dgdInUsd = dgdBalance !== 0 ? dgdBalance.replace(',', '') : dgdBalance;
    let dgxInUsd = dgxBalance !== 0 ? dgxBalance.replace(',', '') : dgxBalance;
    let ethInUsd = ethBalance !== 0 ? ethBalance.replace(',', '').replace('...', '') : ethBalance;
    if (dgdInUsd > 0 && tokensInUsd && tokensInUsd.DGD)
      dgdInUsd = Number(dgdInUsd) * Number(tokensInUsd.DGD.USD);

    if (dgxInUsd > 0 && tokensInUsd && tokensInUsd.DGX)
      dgxInUsd = Number(dgxInUsd) * Number(tokensInUsd.DGX.USD);

    if (ethInUsd > 0 && tokensInUsd && tokensInUsd.ETH)
      ethInUsd = Number(ethInUsd) * Number(tokensInUsd.ETH.USD);

    const eth = 0;
    const claimableDgx = Number(address.claimableDgx);
    const lockedDgd = Number(address.lockedDgd);
    const stake = Number(address.lockedDgdStake);

    return (
      <WalletWrapper>
        <Heading>Wallet</Heading>
        <WalletAddress>
          <span>Address:</span>
          <span data-digix="Wallet-Address">{address.address}</span>
        </WalletAddress>
        <WalletDetails>
          <WalletItem data-digix="Wallet-DGD-Balance">
            <div>{dgdBalance} DGD</div>
            <br />
            <div>
              {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(
                dgdInUsd
              )}{' '}
              USD
            </div>
          </WalletItem>
          <WalletItem data-digix="Wallet-DGX-Balance">
            <div>{dgxBalance} DGX</div>
            <br />
            <div>
              {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(
                dgxInUsd
              )}{' '}
              USD
            </div>
          </WalletItem>
          <WalletItem data-digix="Wallet-ETH-Balance">
            <div>{ethBalance} ETH</div>
            <br />
            <div>
              {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(
                ethInUsd
              )}{' '}
              USD
            </div>
          </WalletItem>
        </WalletDetails>
        <DigixDAO>
          <VotingStake lockedDgd={lockedDgd} stake={stake} />
          <ParticipationReward claimableDgx={claimableDgx} />
          <StakeRewards>
            <Title>DigixDAO Project Funding</Title>
            <Content>
              <Label>Your Funding Amount</Label>
              <Data>
                <span data-digix="Wallet-EthFund">{eth}</span>
                <span>&nbsp;ETH</span>
              </Data>
              <Desc>
                You can claim funding from DigixDAO after your project successfully passes a vote.
              </Desc>
              <Actions>
                <Button primary disabled={!eth} data-digix="Wallet-ClaimFunding">
                  Claim Funding
                </Button>
              </Actions>
            </Content>
          </StakeRewards>
        </DigixDAO>
      </WalletWrapper>
    );
  }
}

const { func, object } = PropTypes;

Wallet.propTypes = {
  AddressDetails: object.isRequired,
  getAddressDetails: func.isRequired,
  getDaoDetails: func.isRequired,
  tokenUsdValues: object.isRequired,
  web3Redux: object.isRequired,
};

const mapStateToProps = state => ({
  addresses: getAddresses(state),
  AddressDetails: state.infoServer.AddressDetails,
  tokenUsdValues: state.govUI.tokenUsdValues,
  CanLockDgd: state.govUI.CanLockDgd,
  ChallengeProof: state.daoServer.ChallengeProof,
  DaoDetails: state.infoServer.DaoDetails,
});

export default web3Connect(
  connect(
    mapStateToProps,
    {
      getAddressDetails,
      getDaoDetails,
      showHideAlert,
      showRightPanel,
      showHideLockDgdOverlay,
    }
  )(Wallet)
);

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import DaoRewardsManager from '@digix/dao-contracts/build/contracts/DaoRewardsManager.json';
import getContract from '@digix/gov-ui/utils/contracts';
import SpectrumConfig from 'spectrum-lightsuite/spectrum.config';
import TxVisualization from '@digix/gov-ui/components/common/blocks/tx-visualization';
import UnlockDgdOverlay from '@digix/gov-ui/components/common/blocks/overlay/unlock-dgd/index';
import web3Connect from 'spectrum-lightsuite/src/helpers/web3/connect';
import { DEFAULT_GAS, DEFAULT_GAS_PRICE } from '@digix/gov-ui/constants';
import { executeContractFunction } from '@digix/gov-ui/utils/web3Helper';
import { getAddresses } from 'spectrum-lightsuite/src/selectors';
import { getDaoDetails } from '@digix/gov-ui/reducers/info-server/actions';
import { registerUIs } from 'spectrum-lightsuite/src/helpers/uiRegistry';
import { sendTransactionToDaoServer } from '@digix/gov-ui/reducers/dao-server/actions';
import { showHideAlert, showRightPanel } from '@digix/gov-ui/reducers/gov-ui/actions';
import { showTxSigningModal } from 'spectrum-lightsuite/src/actions/session';
import { Button } from '@digix/gov-ui/components/common/elements/index';
import { truncateNumber } from '@digix/gov-ui/utils/helpers';

import {
  WalletWrapper,
  Heading,
  WalletAddress,
  // TODO: for showing tokens
  // WalletDetails,
  // WalletItem,
  DigixDAO,
  StakeRewards,
  Title,
  Content,
  Label,
  Data,
  Desc,
  Actions,
} from '@digix/gov-ui/pages/user/wallet/style';

registerUIs({ txVisualization: { component: TxVisualization } });
const network = SpectrumConfig.defaultNetworks[0];

class Wallet extends React.Component {
  constructor(props) {
    super(props);
    this.MIN_CLAIMABLE_DGX = 0.001;

    let { claimableDgx } = props.AddressDetails.data;
    claimableDgx = claimableDgx >= this.MIN_CLAIMABLE_DGX ? truncateNumber(claimableDgx) : 0;

    this.state = {
      claimableDgx,
    };
  }

  componentDidMount() {
    this.props.getDaoDetails();
  }

  setError = error => {
    this.props.showHideAlert({
      message: JSON.stringify(error && error.message) || error,
    });
  };

  claimReward = () => {
    const { addresses, ChallengeProof, web3Redux } = this.props;
    const { abi, address } = getContract(DaoRewardsManager, network);

    const sourceAddress = addresses.find(({ isDefault }) => isDefault);
    const contract = web3Redux
      .web3(network)
      .eth.contract(abi)
      .at(address);

    const ui = {
      caption: 'Claim DGX',
      header: 'User',
      type: 'txVisualization',
    };

    const web3Params = {
      gasPrice: DEFAULT_GAS_PRICE,
      gas: DEFAULT_GAS,
      ui,
    };

    const onTransactionAttempt = txHash => {
      if (ChallengeProof.data) {
        this.props.sendTransactionToDaoServer({
          txHash,
          title: 'Claim DGX',
          token: ChallengeProof.data['access-token'],
          client: ChallengeProof.data.client,
          uid: ChallengeProof.data.uid,
        });
      }
    };

    const onTransactionSuccess = txHash => {
      this.props.showHideAlert({
        message: 'DGX Claimed',
        txHash,
      });

      this.setState({ claimableDgx: 0 });
    };

    const payload = {
      address: sourceAddress,
      contract,
      func: contract.claimRewards,
      network,
      onFailure: this.setError,
      onFinally: txHash => onTransactionAttempt(txHash),
      onSuccess: txHash => onTransactionSuccess(txHash),
      params: [],
      showTxSigningModal: this.props.showTxSigningModal,
      ui,
      web3Params,
    };

    return executeContractFunction(payload);
  };

  showUnlockDgdOverlay() {
    this.props.showRightPanel({
      component: <UnlockDgdOverlay />,
      show: true,
    });
  }

  render() {
    const { AddressDetails, DaoDetails } = this.props;
    const { claimableDgx } = this.state;
    const address = AddressDetails.data;
    const stake = truncateNumber(address.lockedDgdStake);

    const isGlobalRewardsSet = DaoDetails ? DaoDetails.data.isGlobalRewardsSet : false;
    const canClaimDgx = claimableDgx > this.MIN_CLAIMABLE_DGX && isGlobalRewardsSet;
    const eth = 0;

    return (
      <WalletWrapper>
        <Heading>Wallet</Heading>
        <WalletAddress>
          <span>Address:</span>
          <span data-digix="Wallet-Address">{address.address}</span>
        </WalletAddress>
        {/* TODO: show tokens */}
        {/* <WalletDetails>
          <WalletItem>&nbsp;</WalletItem>
          <WalletItem>&nbsp;</WalletItem>
          <WalletItem>&nbsp;</WalletItem>
        </WalletDetails> */}
        <DigixDAO>
          <StakeRewards>
            <Title>DigixDAO Voting Stake</Title>
            <Content>
              <Label>Your Current Stake</Label>
              <Data>
                <span data-digix="Wallet-Stake">{stake}</span>
                <span>&nbsp;Stake</span>
              </Data>
              <Desc>
                You can lock more DGD to increase your voting power or unlock after a quarter to
                move your DGD back into your wallet.
              </Desc>
              <Actions>
                <Button primary data-digix="Wallet-LockDgd">
                  Lock DGD
                </Button>
                <Button
                  primary
                  data-digix="Wallet-UnlockDgd"
                  onClick={() => this.showUnlockDgdOverlay()}
                >
                  Unlock DGD
                </Button>
              </Actions>
            </Content>
          </StakeRewards>
          <StakeRewards>
            <Title>DigixDAO Participation Reward</Title>
            <Content>
              <Label>Your Unclaimed Reward</Label>
              <Data>
                <span data-digix="Wallet-DGXReward">{claimableDgx}</span>
                <span>&nbsp;DGX</span>
              </Data>
              <Desc>
                You can claim rewards from actively participating in the DigixDAO during a quarter.
              </Desc>
              <Actions>
                <Button
                  primary
                  disabled={!canClaimDgx}
                  data-digix="Wallet-ClaimReward"
                  onClick={() => this.claimReward()}
                >
                  Claim Reward
                </Button>
              </Actions>
            </Content>
          </StakeRewards>
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

const { array, func, object } = PropTypes;

Wallet.propTypes = {
  addresses: array.isRequired,
  AddressDetails: object.isRequired,
  ChallengeProof: object.isRequired,
  DaoDetails: object,
  getDaoDetails: func.isRequired,
  showRightPanel: func.isRequired,
  sendTransactionToDaoServer: func.isRequired,
  showHideAlert: func.isRequired,
  showTxSigningModal: func.isRequired,
  web3Redux: object.isRequired,
};

Wallet.defaultProps = {
  DaoDetails: undefined,
};

const mapStateToProps = state => ({
  addresses: getAddresses(state),
  AddressDetails: state.infoServer.AddressDetails,
  ChallengeProof: state.daoServer.ChallengeProof,
  DaoDetails: state.infoServer.DaoDetails,
});

export default web3Connect(
  connect(
    mapStateToProps,
    {
      getDaoDetails,
      showHideAlert,
      showRightPanel,
      sendTransactionToDaoServer,
      showTxSigningModal,
    }
  )(Wallet)
);

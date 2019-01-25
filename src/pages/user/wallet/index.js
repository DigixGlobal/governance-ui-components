import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import ParticipationReward from '@digix/gov-ui/pages/user/wallet/sections/participation-reward';
import VotingStake from '@digix/gov-ui/pages/user/wallet/sections/voting-stake';
import web3Connect from 'spectrum-lightsuite/src/helpers/web3/connect';
import { Button } from '@digix/gov-ui/components/common/elements/index';
import { getAddresses } from 'spectrum-lightsuite/src/selectors';
import { getAddressDetails, getDaoDetails } from '@digix/gov-ui/reducers/info-server/actions';
import {
  showHideAlert,
  showRightPanel,
  showHideLockDgdOverlay,
} from '@digix/gov-ui/reducers/gov-ui/actions';

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

class Wallet extends React.Component {
  componentDidMount() {
    const { AddressDetails } = this.props;

    this.props.getDaoDetails();
    this.props.getAddressDetails(AddressDetails.data.address);
  }

  render() {
    const { AddressDetails } = this.props;
    const address = AddressDetails.data;

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
        {/* TODO: show tokens */}
        {/* <WalletDetails>
          <WalletItem>&nbsp;</WalletItem>
          <WalletItem>&nbsp;</WalletItem>
          <WalletItem>&nbsp;</WalletItem>
        </WalletDetails> */}
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
};

const mapStateToProps = state => ({
  addresses: getAddresses(state),
  AddressDetails: state.infoServer.AddressDetails,
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

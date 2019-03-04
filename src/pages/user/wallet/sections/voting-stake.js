import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import UnlockDgdOverlay from '@digix/gov-ui/components/common/blocks/overlay/unlock-dgd/index';
import web3Connect from 'spectrum-lightsuite/src/helpers/web3/connect';
import { Button } from '@digix/gov-ui/components/common/elements/index';
import { getAddresses } from 'spectrum-lightsuite/src/selectors';
import {
  showHideAlert,
  showRightPanel,
  showHideLockDgdOverlay,
} from '@digix/gov-ui/reducers/gov-ui/actions';
import { truncateNumber } from '@digix/gov-ui/utils/helpers';

import {
  QtrParticipation,
  Title,
  Detail,
  Label,
  Data,
  Desc,
  Actions,
} from '@digix/gov-ui/pages/user/wallet/style';

class Wallet extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hasPendingLockTransaction: false,
      hasPendingUnlockTransaction: false,
    };
  }

  onLockDgd = () => {
    this.setState({ hasPendingLockTransaction: true });
  };

  onUnlockDgd = () => {
    this.setState({ hasPendingUnlockTransaction: true });
  };

  setError = error => {
    this.props.showHideAlert({
      message: JSON.stringify(error && error.message) || error,
    });
  };

  showLockDgdOverlay() {
    this.props.showHideLockDgdOverlay(true, this.onLockDgd, 'Wallet Page');
  }

  showUnlockDgdOverlay() {
    const { lockedDgd } = this.props;
    this.props.showRightPanel({
      component: <UnlockDgdOverlay maxAmount={lockedDgd} onSuccess={this.onUnlockDgd} />,
      show: true,
    });
  }

  render() {
    const { hasPendingLockTransaction, hasPendingUnlockTransaction } = this.state;
    const stake = truncateNumber(this.props.stake);
    const DaoDetails = this.props.DaoDetails.data;
    const lockedDgd = truncateNumber(this.props.lockedDgd);
    const canLockDgd = this.props.CanLockDgd.show && !hasPendingLockTransaction;

    const currentTime = Date.now() / 1000;
    const isGlobalRewardsSet = DaoDetails ? DaoDetails.isGlobalRewardsSet : false;
    const inLockingPhase = currentTime < DaoDetails.startOfMainphase;
    const canUnlockDgd =
      inLockingPhase && stake > 0 && isGlobalRewardsSet && !hasPendingUnlockTransaction;

    return (
      <QtrParticipation>
        <Title>Your Locked DGD</Title>
        <Detail>
          <Label>Your Current Lock-up</Label>
          <Data>
            <span data-digix="Wallet-Locked-DGD">{lockedDgd}</span>
            <span>&nbsp;DGD</span>
          </Data>
          <Desc>
            You can lock more DGD to increase your voting power or unlock after a quarter to move
            your DGD back into your wallet.
          </Desc>
          <Actions>
            <Button
              primary
              data-digix="Wallet-LockDgd"
              disabled={!canLockDgd}
              onClick={() => this.showLockDgdOverlay()}
            >
              Lock DGD
            </Button>
            <Button
              primary
              disabled={!canUnlockDgd}
              data-digix="Wallet-UnlockDgd"
              onClick={() => this.showUnlockDgdOverlay()}
            >
              Unlock DGD
            </Button>
          </Actions>
        </Detail>
      </QtrParticipation>
    );
  }
}

const { func, number, object } = PropTypes;

Wallet.propTypes = {
  CanLockDgd: object,
  DaoDetails: object,
  lockedDgd: number.isRequired,
  showRightPanel: func.isRequired,
  showHideAlert: func.isRequired,
  showHideLockDgdOverlay: func.isRequired,
  stake: number.isRequired,
};

Wallet.defaultProps = {
  CanLockDgd: {
    show: false,
  },
  DaoDetails: undefined,
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
      showHideAlert,
      showRightPanel,
      showHideLockDgdOverlay,
    }
  )(Wallet)
);

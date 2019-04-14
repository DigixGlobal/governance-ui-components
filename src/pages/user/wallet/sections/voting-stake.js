import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import UnlockDgdOverlay from '@digix/gov-ui/components/common/blocks/overlay/unlock-dgd/index';
import web3Connect from 'spectrum-lightsuite/src/helpers/web3/connect';
import { Button } from '@digix/gov-ui/components/common/elements/index';
import { inLockingPhase, truncateNumber } from '@digix/gov-ui/utils/helpers';
import { withFetchAddress } from '@digix/gov-ui/api/graphql-queries/address';

import {
  showHideAlert,
  showRightPanel,
  showHideLockDgdOverlay,
} from '@digix/gov-ui/reducers/gov-ui/actions';

import {
  Actions,
  Data,
  Desc,
  Detail,
  Label,
  QtrParticipation,
  Title,
} from '@digix/gov-ui/pages/user/wallet/style';

class VotingStake extends React.Component {
  componentDidMount() {
    this.props.subscribeToAddress();
  }

  setError = error => {
    this.props.showHideAlert({
      message: JSON.stringify(error && error.message) || error,
    });
  };

  showLockDgdOverlay() {
    this.props.showHideLockDgdOverlay(true, undefined, 'Wallet Page');
  }

  showUnlockDgdOverlay() {
    const { txnTranslations } = this.props;
    const { lockedDgd } = this.props.AddressDetails;
    const tUnlock = this.props.translations.UnlockDgd;

    this.props.showRightPanel({
      component: (
        <UnlockDgdOverlay
          maxAmount={Number(lockedDgd)}
          translations={tUnlock}
          txnTranslations={txnTranslations}
        />
      ),
      show: true,
    });
  }

  render() {
    const { lockedDgd, lockedDgdStake } = this.props.AddressDetails;
    const DaoDetails = this.props.DaoDetails.data;

    const stake = truncateNumber(lockedDgdStake);
    const dgd = truncateNumber(lockedDgd);
    const canLockDgd = this.props.CanLockDgd.show;
    const isGlobalRewardsSet = DaoDetails ? DaoDetails.isGlobalRewardsSet : false;
    const canUnlockDgd = inLockingPhase(DaoDetails) && stake > 0 && isGlobalRewardsSet;

    const t = this.props.translations;
    const tUnlock = t.UnlockDgd;

    return (
      <QtrParticipation>
        <Title>{t.title}</Title>
        <Detail>
          <Label>{t.currentLockup}</Label>
          <Data>
            <span data-digix="Wallet-Locked-DGD">{dgd}</span>
            <span>&nbsp;DGD</span>
          </Data>
          <Desc>{t.instructions}</Desc>
          <Actions>
            <Button
              primary
              data-digix="Wallet-LockDgd"
              disabled={!canLockDgd}
              onClick={() => this.showLockDgdOverlay()}
            >
              {t.lockDgd}
            </Button>
            <Button
              primary
              disabled={!canUnlockDgd}
              data-digix="Wallet-UnlockDgd"
              onClick={() => this.showUnlockDgdOverlay()}
            >
              {tUnlock.overlayButton}
            </Button>
          </Actions>
        </Detail>
      </QtrParticipation>
    );
  }
}

const { func, object } = PropTypes;

VotingStake.propTypes = {
  AddressDetails: object.isRequired,
  CanLockDgd: object,
  DaoDetails: object,
  showHideAlert: func.isRequired,
  showHideLockDgdOverlay: func.isRequired,
  showRightPanel: func.isRequired,
  subscribeToAddress: func.isRequired,
  translations: object.isRequired,
  txnTranslations: object.isRequired,
};

VotingStake.defaultProps = {
  CanLockDgd: {
    show: false,
  },
  DaoDetails: undefined,
};

const mapStateToProps = state => ({
  CanLockDgd: state.govUI.CanLockDgd,
  ChallengeProof: state.daoServer.ChallengeProof,
  DaoDetails: state.infoServer.DaoDetails,
});

const VotingStakeComponent = web3Connect(
  connect(
    mapStateToProps,
    {
      showHideAlert,
      showRightPanel,
      showHideLockDgdOverlay,
    }
  )(VotingStake)
);

export default withFetchAddress(VotingStakeComponent);

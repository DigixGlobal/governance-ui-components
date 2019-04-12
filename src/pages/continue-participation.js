import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import DaoStakeLocking from '@digix/dao-contracts/build/contracts/DaoStakeLocking.json';
import getContract from '@digix/gov-ui/utils/contracts';
import SpectrumConfig from 'spectrum-lightsuite/spectrum.config';
import TxVisualization from '@digix/gov-ui/components/common/blocks/tx-visualization';
import UnlockDgdOverlay from '@digix/gov-ui/components/common/blocks/overlay/unlock-dgd/index';
import web3Connect from 'spectrum-lightsuite/src/helpers/web3/connect';
import { Button } from '@digix/gov-ui/components/common/elements/index';
import { Content, Title, Intro } from '@digix/gov-ui/pages/style';
import { CONFIRM_PARTICIPATION_CACHE, DEFAULT_GAS_PRICE } from '@digix/gov-ui/constants';
import { executeContractFunction } from '@digix/gov-ui/utils/web3Helper';
import { getAddresses } from 'spectrum-lightsuite/src/selectors';
import { getHash } from '@digix/gov-ui/utils/helpers';
import { registerUIs } from 'spectrum-lightsuite/src/helpers/uiRegistry';
import { sendTransactionToDaoServer } from '@digix/gov-ui/reducers/dao-server/actions';
import {
  showHideAlert,
  showHideLockDgdOverlay,
  showRightPanel,
} from '@digix/gov-ui/reducers/gov-ui/actions';
import { showTxSigningModal } from 'spectrum-lightsuite/src/actions/session';
import { withFetchAddress } from '@digix/gov-ui/api/graphql-queries/address';

registerUIs({ txVisualization: { component: TxVisualization } });
const network = SpectrumConfig.defaultNetworks[0];

class ConfirmParticipation extends React.Component {
  setError = error => {
    this.props.showHideAlert({
      message: JSON.stringify(error && error.message) || error,
    });
  };

  setHash = () => {
    const { address } = this.props.AddressDetails;
    const { currentQuarter } = this.props.DaoInfo;
    const { key, value } = CONFIRM_PARTICIPATION_CACHE;

    const hash = getHash(`${value}_${currentQuarter}_${address}`);
    localStorage.setItem(key, hash);
  };

  continueParticipation = () => {
    this.props.closeModal();

    const t = this.props.tSnackbar;
    const { addresses, ChallengeProof, gasLimitConfig, web3Redux } = this.props;
    const { abi, address } = getContract(DaoStakeLocking, network);

    const sourceAddress = addresses.find(({ isDefault }) => isDefault);
    const contract = web3Redux
      .web3(network)
      .eth.contract(abi)
      .at(address);

    const ui = {
      caption: t.title,
      header: t.txUiHeader,
      type: 'txVisualization',
    };

    const web3Params = {
      gasPrice: DEFAULT_GAS_PRICE,
      gas: gasLimitConfig.CONFIRM_CONTINUE_PARTICIPATION || gasLimitConfig.DEFAULT,
      ui,
    };

    const onTransactionAttempt = txHash => {
      if (ChallengeProof) {
        this.props.sendTransactionToDaoServer({
          txHash,
          title: t.title,
          token: ChallengeProof['access-token'],
          client: ChallengeProof.client,
          uid: ChallengeProof.uid,
        });
      }
    };

    const onTransactionSuccess = txHash => {
      this.props.showHideAlert({
        message: t.message,
        txHash,
      });

      this.setHash();
      this.props.showRightPanel({ show: false });
    };

    const payload = {
      address: sourceAddress,
      contract,
      func: contract.confirmContinuedParticipation,
      network,
      onFailure: this.setError,
      onFinally: txHash => onTransactionAttempt(txHash),
      onSuccess: txHash => onTransactionSuccess(txHash),
      params: undefined,
      showTxSigningModal: this.props.showTxSigningModal,
      translations: this.props.txnTranslations,
      ui,
      web3Params,
    };

    return executeContractFunction(payload);
  };

  showLockDgdOverlay() {
    this.props.closeModal();
    this.props.showHideLockDgdOverlay(true, this.setHash, 'Continue Participation Modal');
  }

  showUnlockDgdOverlay() {
    const { lockedDgd } = this.props.AddressDetails;
    const { tUnlock } = this.props;

    this.props.closeModal();
    this.props.showRightPanel({
      component: (
        <UnlockDgdOverlay
          maxAmount={Number(lockedDgd)}
          onSuccess={this.setHash}
          translations={tUnlock}
        />
      ),
      show: true,
    });
  }

  render() {
    const t = this.props.translations;
    const tOptions = this.props.translations.options;

    return (
      <Content>
        <Title>{t.title}</Title>
        <Intro>{t.instructions}</Intro>

        <Button
          fluid
          large
          reverse
          data-digix="Confirm-Participation-Lock-More-Dgd"
          style={{ marginLeft: '0' }}
          onClick={() => this.showLockDgdOverlay()}
        >
          {tOptions.lockDgd}
        </Button>
        <Button
          fluid
          large
          reverse
          data-digix="Confirm-Participation-Continue-Lock-Up"
          style={{ marginLeft: '0' }}
          onClick={() => this.continueParticipation()}
        >
          {tOptions.continueCurrentLockup}
        </Button>
        <Button
          fluid
          large
          reverse
          data-digix="Confirm-Participation-Unlock-Dgd"
          style={{ marginLeft: '0' }}
          onClick={() => this.showUnlockDgdOverlay()}
        >
          {tOptions.unlockDgd}
        </Button>
      </Content>
    );
  }
}

const { array, func, object } = PropTypes;

ConfirmParticipation.propTypes = {
  addresses: array.isRequired,
  AddressDetails: object.isRequired,
  ChallengeProof: object.isRequired,
  closeModal: func.isRequired,
  DaoInfo: object.isRequired,
  gasLimitConfig: object.isRequired,
  sendTransactionToDaoServer: func.isRequired,
  showHideAlert: func.isRequired,
  showHideLockDgdOverlay: func.isRequired,
  showRightPanel: func.isRequired,
  showTxSigningModal: func.isRequired,
  translations: object.isRequired,
  tSnackbar: object.isRequired,
  txnTranslations: object.isRequired,
  tUnlock: object.isRequired,
  web3Redux: object.isRequired,
};

const mapStateToProps = state => ({
  addresses: getAddresses(state),
  AddressDetails: state.infoServer.AddressDetails.data,
  ChallengeProof: state.daoServer.ChallengeProof.data,
  DaoInfo: state.infoServer.DaoDetails.data,
  gasLimitConfig: state.infoServer.TxConfig.data.gas,
  translations: state.daoServer.Translations.data.confirmParticipation,
  tSnackbar: state.daoServer.Translations.data.snackbar.snackbars.continueParticipation,
  tUnlock: state.daoServer.Translations.data.wallet.LockedDgd.UnlockDgd,
  txnTranslations: state.daoServer.Translations.data.signTransaction,
});

export default withFetchAddress(
  web3Connect(
    connect(
      mapStateToProps,
      {
        showHideAlert,
        showHideLockDgdOverlay,
        showRightPanel,
        sendTransactionToDaoServer,
        showTxSigningModal,
      }
    )(ConfirmParticipation)
  )
);

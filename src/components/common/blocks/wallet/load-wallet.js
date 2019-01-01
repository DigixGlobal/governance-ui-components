import React from 'react';
import PropTypes from 'prop-types';

import Icon from '@digix/gov-ui/components/common/elements/icons';
import {
  CloseButton,
  IntroContainer,
  OverlayHeader as Header,
} from '@digix/gov-ui/components/common/common-styles';
import { ActionContainer } from '@digix/gov-ui/components/common/blocks/wallet/style.js';
import { WalletStages } from '@digix/gov-ui/constants';

import V3 from './json';
import Metamask from './metamask';
import Ledger from './ledger';
import Trezor from './trezor';
import ImToken from './imtoken';

export default class LoadWallet extends React.Component {
  handleCloseButtonClick = () => {
    const { onChangeStage } = this.props;
    if (onChangeStage) {
      onChangeStage(WalletStages.Intro);
    }
  };

  handleWalletClose = () => {
    const { onChangeStage } = this.props;
    if (onChangeStage) {
      onChangeStage(WalletStages.WalletLoaded);
    }
  };

  render() {
    const { createKeystore } = this.props;

    return (
      <IntroContainer>
        <CloseButton>
          <Icon kind="close" onClick={this.handleCloseButtonClick} />
        </CloseButton>
        <Header uppercase>load wallet </Header>
        <ActionContainer>
          <Metamask createKeystore={createKeystore} onClose={this.handleWalletClose} />
          <Ledger createKeystore={createKeystore} onClose={this.handleWalletClose} />
          <Trezor createKeystore={createKeystore} onClose={this.handleWalletClose} />
          <ImToken createKeystore={createKeystore} onClose={this.handleWalletClose} />
          <V3 createKeystore={createKeystore} onClose={this.handleWalletClose} />
        </ActionContainer>
      </IntroContainer>
    );
  }
}

LoadWallet.propTypes = {
  onChangeStage: PropTypes.func.isRequired,
  createKeystore: PropTypes.func.isRequired,
};

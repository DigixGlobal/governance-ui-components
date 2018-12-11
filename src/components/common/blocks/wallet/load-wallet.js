import React from 'react';
import PropTypes from 'prop-types';

import Icon from '../../../common/elements/icons';

import { IntroContainer, CloseButton, OverlayHeader as Header } from '../../common-styles';
import { Wallets } from './style';
import { Stage } from './constants';

import V3 from './json';
import Metamask from './metamask';
import Ledger from './ledger';
import Trezor from './trezor';
import ImToken from './imtoken';

export default class LoadWallet extends React.Component {
  handleCloseButtonClick = () => {
    const { onChangeStage } = this.props;
    if (onChangeStage) {
      onChangeStage(Stage.Intro);
    }
  };

  handleWalletClose = () => {
    const { onChangeStage } = this.props;
    if (onChangeStage) {
      onChangeStage(Stage.LoadingWallet);
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
        <Wallets>
          <Metamask createKeystore={createKeystore} onClose={this.handleWalletClose} />
          <Ledger createKeystore={createKeystore} onClose={this.handleWalletClose} />
          <Trezor createKeystore={createKeystore} onClose={this.handleWalletClose} />
          <ImToken createKeystore={createKeystore} onClose={this.handleWalletClose} />
          <V3 createKeystore={createKeystore} onClose={this.handleWalletClose} />
        </Wallets>
      </IntroContainer>
    );
  }
}

LoadWallet.propTypes = {
  onChangeStage: PropTypes.func.isRequired,
  createKeystore: PropTypes.func.isRequired,
};

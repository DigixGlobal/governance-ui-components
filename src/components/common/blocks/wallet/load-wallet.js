import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

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

class LoadWallet extends React.Component {
  handleCloseButtonClick = () => {
    const { onChangeStage } = this.props;
    if (onChangeStage) {
      onChangeStage(WalletStages.Intro);
    }
  };

  handleKeystoreLoad = () => {
    this.props.onChangeStage(WalletStages.WalletLoaded);
  };

  render() {
    const { createKeystore } = this.props;
    const t = this.props.translations.loadWallet.selectWalletType;

    return (
      <IntroContainer>
        <CloseButton>
          <Icon kind="close" onClick={this.handleCloseButtonClick} />
        </CloseButton>
        <Header uppercase>{t.title} </Header>
        <ActionContainer>
          <Metamask createKeystore={createKeystore} onSuccess={this.handleKeystoreLoad} />
          <Ledger createKeystore={createKeystore} onSuccess={this.handleKeystoreLoad} />
          <Trezor createKeystore={createKeystore} onSuccess={this.handleKeystoreLoad} />
          {/* <ImToken createKeystore={createKeystore} onSuccess={this.handleKeystoreLoad} /> */}
          <V3 createKeystore={createKeystore} onSuccess={this.handleKeystoreLoad} />
        </ActionContainer>
      </IntroContainer>
    );
  }
}

const { func, object } = PropTypes;

LoadWallet.propTypes = {
  onChangeStage: func.isRequired,
  createKeystore: func.isRequired,
  translations: object,
};

LoadWallet.defaultProps = {
  translations: {
    loadWallet: {
      selectWalletType: {
        title: 'Load Wallet',
      },
    },
  },
};

const mapStateToProps = state => ({
  translations: state.daoServer.Translations.data,
});

export default connect(mapStateToProps)(LoadWallet);

import Icon from '@digix/gov-ui/components/common/elements/icons';
import Ledger from '@digix/gov-ui/components/common/blocks/wallet/ledger';
import Metamask from '@digix/gov-ui/components/common/blocks/wallet/metamask';
import PropTypes from 'prop-types';
import React from 'react';
import Trezor from '@digix/gov-ui/components/common/blocks/wallet/trezor';
import V3 from '@digix/gov-ui/components/common/blocks/wallet/json';
import { ActionContainer } from '@digix/gov-ui/components/common/blocks/wallet/style';
import { WalletStages } from '@digix/gov-ui/constants';
import { browserDetection } from '@digix/gov-ui/components/common/blocks/wallet/browser-detect';
import { withTranslation } from 'react-i18next';
import {
  CloseButton,
  IntroContainer,
  OverlayHeader as Header,
} from '@digix/gov-ui/components/common/common-styles';

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
    const { createKeystore, t } = this.props;
    const blockList = browserDetection();

    return (
      <IntroContainer>
        <CloseButton>
          <Icon kind="close" onClick={this.handleCloseButtonClick} />
        </CloseButton>
        <Header uppercase>{t('selectWalletType.title')} </Header>
        <ActionContainer>
          <Metamask
            createKeystore={createKeystore}
            onSuccess={this.handleKeystoreLoad}
            blockList={blockList}
          />
          <Ledger
            createKeystore={createKeystore}
            onSuccess={this.handleKeystoreLoad}
            blockList={blockList}
          />
          <Trezor
            createKeystore={createKeystore}
            onSuccess={this.handleKeystoreLoad}
            blockList={blockList}
          />
          <V3
            createKeystore={createKeystore}
            onSuccess={this.handleKeystoreLoad}
            blockList={blockList}
          />
        </ActionContainer>
      </IntroContainer>
    );
  }
}

const { func } = PropTypes;

LoadWallet.propTypes = {
  onChangeStage: func.isRequired,
  createKeystore: func.isRequired,
  t: func.isRequired,
};

export default withTranslation('LoadWallet')(LoadWallet);

import React from 'react';
import PropTypes from 'prop-types';

import Button from '../../buttons';
import Icon from '../../../common/elements/Icons';

import { InnerContainer, Header, CloseButtonWithHeader, Wallets, WalletItem } from './style';
import { Stage } from './constants';

export default class LoadWallet extends React.Component {
  handleCloseButtonClick = () => {
    const { onChangeStage } = this.props;
    if (onChangeStage) {
      onChangeStage(Stage.Intro);
    }
  };

  render() {
    return (
      <InnerContainer>
        <CloseButtonWithHeader>
          <Header uppercase>load wallet </Header>
          <Icon kind="close" onClick={this.handleCloseButtonClick} />
        </CloseButtonWithHeader>
        <Wallets>
          <WalletItem>
            <Button fullWidth>
              <Icon kind="close" />
              Metamask
            </Button>
          </WalletItem>
          <WalletItem>
            <Button fullWidth>
              <Icon kind="close" />
              Ledger
            </Button>
          </WalletItem>
          <WalletItem>
            <Button fullWidth>
              <Icon kind="close" />
              Trezor
            </Button>
          </WalletItem>
          <WalletItem>
            <Button fullWidth>
              <Icon kind="close" />
              IMTOKEN
            </Button>
          </WalletItem>
          <WalletItem>
            <Button fullWidth>
              <Icon kind="close" />
              JSON FILE
            </Button>
          </WalletItem>
        </Wallets>
      </InnerContainer>
    );
  }
}

LoadWallet.propTypes = {
  onChangeStage: PropTypes.func.isRequired,
};

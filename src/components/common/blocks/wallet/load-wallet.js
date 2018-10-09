import React from 'react';
import PropTypes from 'prop-types';

import Button from '../../../common/elements/buttons/index'; //
import Icon from '../../../common/elements/icons';

import { InnerContainer, Header, CloseButtonWithHeader, Wallets, WalletItem } from './style';
import { Stage } from './constants';

const wallets = [
  {
    icon: 'metamask',
    caption: 'Metamask',
  },
  {
    icon: 'ledger',
    caption: 'Ledger',
  },
  {
    icon: 'trezor',
    caption: 'Trezor',
  },
  {
    icon: 'imtoken',
    caption: 'ImToken',
  },
  {
    icon: 'json',
    caption: 'Json File',
  },
];
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
          {wallets.map(item => (
            <WalletItem key={item.icon}>
              <Button fullWidth>
                <Icon kind={item.icon} />
                {item.caption}
              </Button>
            </WalletItem>
          ))}
        </Wallets>
      </InnerContainer>
    );
  }
}

LoadWallet.propTypes = {
  onChangeStage: PropTypes.func.isRequired,
};

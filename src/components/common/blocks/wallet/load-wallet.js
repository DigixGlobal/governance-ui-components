import React from 'react';
import PropTypes from 'prop-types';

import Icon from '../../../common/elements/icons';

import { InnerContainer, Header, CloseButtonWithHeader, Wallets } from './style';
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

  render() {
    const { createKeystore } = this.props;

    return (
      <InnerContainer>
        <CloseButtonWithHeader>
          <Header uppercase>load wallet </Header>
          <Icon kind="close" onClick={this.handleCloseButtonClick} />
        </CloseButtonWithHeader>
        <Wallets>
          <Metamask createKeystore={createKeystore} />
          <Ledger createKeystore={createKeystore} />
          <Trezor createKeystore={createKeystore} />
          <ImToken createKeystore={createKeystore} />
          <V3 createKeystore={createKeystore} />
        </Wallets>
      </InnerContainer>
    );
  }
}

LoadWallet.propTypes = {
  onChangeStage: PropTypes.func.isRequired,
  createKeystore: PropTypes.func.isRequired,
};

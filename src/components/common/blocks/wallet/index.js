import React from 'react';
// import PropTypes from 'prop-types';

import { Container, TransparentOverlay, WalletContainer } from './style';
import Intro from './intro';
import LoadWallet from './load-wallet';

import { Stage } from './constants';

export default class Wallet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stage: Stage.Intro,
    };
  }

  updateStage = stage => {
    this.setState({ stage });
  };
  render() {
    const { stage } = this.state;
    return (
      <Container>
        <TransparentOverlay>overlay</TransparentOverlay>
        <WalletContainer>
          {stage === Stage.Intro && <Intro onChangeStage={this.updateStage} />}
          {stage === Stage.LoadingWallet && <LoadWallet onChangeStage={this.updateStage} />}
        </WalletContainer>
      </Container>
    );
  }
}

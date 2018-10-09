import React, { Component, Fragment } from 'react';
import { ThemeProvider } from 'styled-components';

import NavBar from '../components/common/blocks/navbar';
import WalletContainer from '../components/common/blocks/wallet';

import LeftMenu from '../components/common/blocks/collapsible-menu';

import lightTheme from '../theme/light';

import { ContentWrapper } from '../components/common/common-styles';
import { Container } from './style';

import ProposalCard from '../components/proposal-card';
import Timeline from '../components/common/blocks/timeline';
import DashboardStats from '../components/common/blocks/user-DAO-stats/index';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showWallet: false,
    };
  }

  handleWalletClick = () => {
    this.setState({ showWallet: !this.state.showWallet });
  };

  render() {
    const { showWallet } = this.state;
    return (
      <ThemeProvider theme={lightTheme}>
        <Fragment>
          <WalletContainer show={showWallet} onClose={this.handleWalletClick} />
          <NavBar onWalletClick={this.handleWalletClick} />
          <Container>
            <LeftMenu />
            <ContentWrapper>
              <Timeline />
              <DashboardStats />
              <ProposalCard />
            </ContentWrapper>
          </Container>
        </Fragment>
      </ThemeProvider>
    );
  }
}

export default App;

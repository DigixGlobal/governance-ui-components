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
  render() {
    return (
      <ThemeProvider theme={lightTheme}>
        <Fragment>
          <WalletContainer />
          <NavBar />
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

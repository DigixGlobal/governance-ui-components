import React, { Component, Fragment } from 'react';
import { ThemeProvider } from 'styled-components';

import NavBar from '../components/common/blocks/navbar';
import WalletContainer from '../components/common/blocks/wallet';

import LeftMenu from '../components/common/blocks/collapsible-menu';

import lightTheme from '../theme/light';

class App extends Component {
  render() {
    return (
      <ThemeProvider theme={lightTheme}>
        <Fragment>
          <NavBar />
          <LeftMenu />
          <WalletContainer />
        </Fragment>
      </ThemeProvider>
    );
  }
}

export default App;

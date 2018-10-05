import React, { Component, Fragment } from 'react';
import { ThemeProvider } from 'styled-components';

import NavBar from '../components/common/blocks/NavBar';
import LeftMenu from '../components/common/collapsible-menu';
// import Button from '../components/common/buttons';

import lightTheme from '../theme/light';

class App extends Component {
  render() {
    return (
      <ThemeProvider theme={lightTheme}>
        <Fragment>
          <NavBar />
          <LeftMenu />
        </Fragment>
      </ThemeProvider>
    );
  }
}

export default App;

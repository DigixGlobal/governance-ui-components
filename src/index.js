import React from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import registerReducers from 'spectrum-lightsuite/src/helpers/registerReducers';

import './global-styles';
import reducer from './reducer';

import LandingPage from './pages';
import Proposals from './pages/proposals';

import lightTheme from './theme/light';

registerReducers({
  governance: { src: reducer },
});

export default class Governance extends React.Component {
  render() {
    return (
      <HashRouter>
        <ThemeProvider theme={lightTheme}>
          <Switch>
            <Route path="/proposals" component={Proposals} />
            <Route path="/" component={LandingPage} />
          </Switch>
        </ThemeProvider>
      </HashRouter>
    );
  }
}

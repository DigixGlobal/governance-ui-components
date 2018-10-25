import React from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import registerReducers from 'spectrum-lightsuite/src/helpers/registerReducers';

import './global-styles';
import infoServerReducer from './reducers/info-server';

import LandingPage from './pages';
import Proposals from './pages/proposal';

import lightTheme from './theme/light';

registerReducers({
  infoServer: { src: infoServerReducer },
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

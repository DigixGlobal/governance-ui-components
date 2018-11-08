import React from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import registerReducers from 'spectrum-lightsuite/src/helpers/registerReducers';

import './global-styles';
import infoServerReducer from './reducers/info-server';
import daoServerReducer from './reducers/dao-server';
import govUiReducer from './reducers/gov-ui';

import LandingPage from './pages';
import Proposals from './pages/proposals';
import CreateProposals from './pages/proposals/create';

import lightTheme from './theme/light';

import withHeaderAndPanel from './hocs/withHeaderAndPanel';

registerReducers({
  infoServer: { src: infoServerReducer },
  daoServer: { src: daoServerReducer },
  govUI: { src: govUiReducer },
});

export default class Governance extends React.Component {
  render() {
    return (
      <HashRouter>
        <ThemeProvider theme={lightTheme}>
          <Switch>
            <Route path="/proposals/create" component={withHeaderAndPanel(CreateProposals)} />
            <Route path="/proposals" component={withHeaderAndPanel(Proposals)} />
            <Route path="/" component={withHeaderAndPanel(LandingPage)} />
          </Switch>
        </ThemeProvider>
      </HashRouter>
    );
  }
}

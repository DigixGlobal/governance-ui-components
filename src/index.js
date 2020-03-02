import 'babel-polyfill';
import '@digix/gov-ui/global-styles';
import Analytics from '@digix/gov-ui/analytics';
import Dissolution from '@digix/gov-ui/pages/dissolution';
import React from 'react';
import ReactGA from 'react-ga';
import daoServerReducer from '@digix/gov-ui/reducers/dao-server';
import govUiReducer from '@digix/gov-ui/reducers/gov-ui';
import infoServerReducer from '@digix/gov-ui/reducers/info-server';
import lightTheme from '@digix/gov-ui/theme/light';
import registerReducers from 'spectrum-lightsuite/src/helpers/registerReducers';
import withHeaderAndPanel from '@digix/gov-ui/hocs/withHeaderAndPanel';
import { Provider as GraphqlProvider } from '@digix/gov-ui/api/graphql';
import { ThemeProvider } from 'styled-components';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Switch, Route } from 'react-router-dom';

registerReducers({
  infoServer: { src: infoServerReducer },
  daoServer: { src: daoServerReducer },
  govUI: { src: govUiReducer },
});

export class Governance extends React.Component {
  componentDidMount() {
    Analytics.init();
    ReactGA.pageview(window.location.pathname);
  }

  render() {
    return (
      <GraphqlProvider>
        <ThemeProvider theme={lightTheme}>
          <Switch>
            <Route path="/" component={withHeaderAndPanel(Dissolution)} />
          </Switch>
        </ThemeProvider>
      </GraphqlProvider>
    );
  }
}

export default withRouter(
  connect(
    ({ govUI: { isAuthenticated } }) => ({
      isAuthenticated,
    }),
    {}
  )(Governance)
);

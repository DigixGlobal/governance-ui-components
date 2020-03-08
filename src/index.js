import 'babel-polyfill';
import '@digix/gov-ui/global-styles';
import Analytics from '@digix/gov-ui/analytics';
import Dissolution from '@digix/gov-ui/pages/dissolution';
import DissolutionApi from '@digix/gov-ui/pages/dissolution/api';
import React from 'react';
import ReactGA from 'react-ga';
import daoServerReducer from '@digix/gov-ui/reducers/dao-server';
import i18n from '@digix/gov-ui/translations/i18n';
import govUiReducer from '@digix/gov-ui/reducers/gov-ui';
import infoServerReducer from '@digix/gov-ui/reducers/info-server';
import lightTheme from '@digix/gov-ui/theme/light';
import registerReducers from 'spectrum-lightsuite/src/helpers/registerReducers';
import withHeaderAndPanel from '@digix/gov-ui/hocs/withHeaderAndPanel';
import { ApolloProvider } from 'react-apollo';
import { I18nextProvider } from 'react-i18next';
import { ThemeProvider } from 'styled-components';
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
      <ApolloProvider client={DissolutionApi.dissolutionClient}>
        <ThemeProvider theme={lightTheme}>
          <I18nextProvider i18n={i18n}>
            <Switch>
              <Route path="/" component={withHeaderAndPanel(Dissolution)} />
            </Switch>
          </I18nextProvider>
        </ThemeProvider>
      </ApolloProvider>
    );
  }
}

export default Governance;

import React from 'react';
import PropTypes from 'prop-types';
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom';

import { connect } from 'react-redux';
import { ThemeProvider } from 'styled-components';

import registerReducers from 'spectrum-lightsuite/src/helpers/registerReducers';

import './global-styles';
import infoServerReducer from './reducers/info-server';
import daoServerReducer from './reducers/dao-server';
import govUiReducer from './reducers/gov-ui';

import LandingPage from './pages';
import Proposals from './pages/proposals';
import CreateProposals from './pages/proposals/create';
import EditProposal from './pages/proposals/edit';

import lightTheme from './theme/light';

import withHeaderAndPanel from './hocs/withHeaderAndPanel';

registerReducers({
  infoServer: { src: infoServerReducer },
  daoServer: { src: daoServerReducer },
  govUI: { src: govUiReducer },
});

const ParticipantsRoute = ({ component: Component, isParticipant, ...rest }) => (
    <Route
      {...rest}
      render={props => (isParticipant ? <Component {...props} /> : <Redirect to="/" />)}
    />
  );

const Governance = ({ addressDetails }) => (
  <HashRouter>
    <ThemeProvider theme={lightTheme}>
      <Switch>
        <ParticipantsRoute
          path="/proposals/create"
          component={withHeaderAndPanel(CreateProposals)}
          isParticipant={addressDetails ? addressDetails.data.isParticipant : false}
        />
        <ParticipantsRoute
          path="/proposals/edit"
          component={withHeaderAndPanel(EditProposal)}
          isParticipant={addressDetails ? addressDetails.data.isParticipant : false}
        />
        <Route path="/proposals" component={withHeaderAndPanel(Proposals)} />
        <Route path="/" component={withHeaderAndPanel(LandingPage)} />
      </Switch>
    </ThemeProvider>
  </HashRouter>
);

Governance.propTypes = {
  addressDetails: PropTypes.object,
};

Governance.defaultProps = {
  addressDetails: undefined,
};

const mapStateToProps = state => ({
  addressDetails: state.infoServer.AddressDetails,
});

export default connect(mapStateToProps)(Governance);

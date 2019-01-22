import React from 'react';
import PropTypes from 'prop-types';
// import { withRouter } from 'react-router';
// import { connect } from 'react-redux';

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
import EditProposal from './pages/proposals/edit';
import TransactionHistory from './pages/user/history';
import Profile from './pages/user/profile';
import Help from './pages/help';
import Wallet from './pages/user/wallet';
import KycOfficerDashboard from './pages/kyc/officer';

import lightTheme from './theme/light';

import withHeaderAndPanel from './hocs/withHeaderAndPanel';

registerReducers({
  infoServer: { src: infoServerReducer },
  daoServer: { src: daoServerReducer },
  govUI: { src: govUiReducer },
});

// eslint-disable-next-line
// const ParticipantsRoute = ({ component: Component, isParticipant, ...rest }) => (
//   <Route
//     {...rest}
//     render={props => (isParticipant ? <Component {...props} /> : <Redirect to="/" />)}
//   />
// );
export class Governance extends React.Component {
  render() {
    const { addressDetails } = this.props;
    return (
      <HashRouter>
        <ThemeProvider theme={lightTheme}>
          <Switch>
            <Route
              path="/proposals/create"
              component={withHeaderAndPanel(CreateProposals)}
              isParticipant={addressDetails ? addressDetails.data.isParticipant : false}
            />
            <Route
              path="/proposals/edit"
              component={withHeaderAndPanel(EditProposal)}
              isParticipant={addressDetails ? addressDetails.data.isParticipant : false}
            />
            <Route
              path="/proposals"
              component={withHeaderAndPanel(Proposals)}
              isParticipant={addressDetails ? addressDetails.data.isParticipant : false}
            />
            <Route path="/kyc/admin" component={withHeaderAndPanel(KycOfficerDashboard)} />
            <Route path="/history" component={withHeaderAndPanel(TransactionHistory)} />
            <Route path="/profile" component={withHeaderAndPanel(Profile)} />
            <Route path="/help" component={withHeaderAndPanel(Help)} />
            <Route path="/wallet" component={withHeaderAndPanel(Wallet)} />
            <Route path="/" component={withHeaderAndPanel(LandingPage)} />
          </Switch>
        </ThemeProvider>
      </HashRouter>
    );
  }
}

Governance.propTypes = {
  addressDetails: PropTypes.object,
};

Governance.defaultProps = {
  addressDetails: undefined,
};

// export default withRouter(
//   connect(
//     ({ infoServer: { AddressDetails } }) => ({ addressDetails: AddressDetails }),
//     {}
//   )(Governance)
// );

export default Governance;

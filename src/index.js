import React from 'react';
import PropTypes from 'prop-types';
// import { withRouter } from 'react-router';
// import { connect } from 'react-redux';

import { HashRouter, Switch, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import registerReducers from 'spectrum-lightsuite/src/helpers/registerReducers';

import '@digix/gov-ui/global-styles';
import infoServerReducer from '@digix/gov-ui/reducers/info-server';
import daoServerReducer from '@digix/gov-ui/reducers/dao-server';
import govUiReducer from '@digix/gov-ui/reducers/gov-ui';

import { Provider as GraphqlProvider } from '@digix/gov-ui/api/graphql';

import LandingPage from '@digix/gov-ui/pages';
import Proposals from '@digix/gov-ui/pages/proposals';
import CreateProposals from '@digix/gov-ui/pages/proposals/create';
import EditProposal from '@digix/gov-ui/pages/proposals/edit';
import TransactionHistory from '@digix/gov-ui/pages/user/history';
import Profile from '@digix/gov-ui/pages/user/profile';
import Help from '@digix/gov-ui/pages/help';
import Wallet from '@digix/gov-ui/pages/user/wallet';

import lightTheme from '@digix/gov-ui/theme/light';

import withHeaderAndPanel from '@digix/gov-ui/hocs/withHeaderAndPanel';

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
      <GraphqlProvider>
        <HashRouter>
          <ThemeProvider theme={lightTheme}>
            <Switch>
              {/* {addressDetails.data && [ */}
              <Route
                path="/proposals/create"
                key="r-1"
                component={withHeaderAndPanel(CreateProposals)}
                isParticipant={addressDetails ? addressDetails.data.isParticipant : false}
              />
              <Route
                path="/proposals/edit"
                key="r-2"
                component={withHeaderAndPanel(EditProposal)}
                isParticipant={addressDetails ? addressDetails.data.isParticipant : false}
              />
              {/* , // ]} */}
              <Route path="/proposals" component={withHeaderAndPanel(Proposals)} />
              <Route path="/history" component={withHeaderAndPanel(TransactionHistory)} />
              <Route path="/profile" component={withHeaderAndPanel(Profile)} />
              <Route path="/help" component={withHeaderAndPanel(Help)} />
              <Route path="/wallet" component={withHeaderAndPanel(Wallet)} />
              <Route path="/" component={withHeaderAndPanel(LandingPage)} />
            </Switch>
          </ThemeProvider>
        </HashRouter>
      </GraphqlProvider>
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

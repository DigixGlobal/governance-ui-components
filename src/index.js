import React from 'react';
import PropTypes from 'prop-types';
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

import lightTheme from './theme/light';

import withHeaderAndPanel from './hocs/withHeaderAndPanel';

registerReducers({
  infoServer: { src: infoServerReducer },
  daoServer: { src: daoServerReducer },
  govUI: { src: govUiReducer },
});

// const ParticipantsRoute = ({ component: Component, isParticipant, ...rest }) => (
//   <Route
//     {...rest}
//     render={props => (isParticipant ? <Component {...props} /> : <Redirect to="/login" />)}
//   />
// );
export class Governance extends React.Component {
  render() {
    const { addressDetails } = this.props;
    return (
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
            ,
            <Route
              path="/proposals/edit"
              key="r-2"
              component={withHeaderAndPanel(EditProposal)}
              isParticipant={addressDetails ? addressDetails.data.isParticipant : false}
            />
            {/* , // ]} */}
            <Route path="/proposals" component={withHeaderAndPanel(Proposals)} />
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

// export default connect(
//   ({ infoServer: { AddressDetails } }) => ({ addressDetails: AddressDetails }),
//   {}
// )(Governance);

export default Governance;

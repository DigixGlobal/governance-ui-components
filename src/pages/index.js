import React, { Component, Fragment } from 'react';
import { ThemeProvider } from 'styled-components';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import registerReducers from 'spectrum-lightsuite/src/helpers/registerReducers';

import NavBar from '../components/common/blocks/navbar';
import WalletContainer from '../components/common/blocks/wallet';

import LeftMenu from '../components/common/blocks/collapsible-menu';

import lightTheme from '../theme/light';

import { ContentWrapper } from '../components/common/common-styles';
import { Container } from './style';

import ProposalCard from '../components/proposal-card';
import Timeline from '../components/common/blocks/timeline';
import DashboardStats from '../components/common/blocks/user-DAO-stats/index';
import ProposalFilter from '../components/common/blocks/filter/index';

import { getDaoDetails, getProposals } from '../actions';

import reducer from '../reducer';

registerReducers({
  governance: { src: reducer },
});
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showWallet: false,
    };
  }

  componentWillMount = () => {
    const {
      DaoDetails: { error, fetching },
      getDaoDetailsAction,
      getProposalsAction,
    } = this.props;
    if (fetching === null || error) {
      Promise.all([getDaoDetailsAction(), getProposalsAction()]);
    }
    // this.props.getDaoDetails().then(result => console.log(result));
  };

  handleWalletClick = () => {
    this.setState({ showWallet: !this.state.showWallet });
  };

  render() {
    const { showWallet } = this.state;
    const { DaoDetails, Proposals } = this.props;
    const hasProposals = Proposals.data && Proposals.data.length > 0;
    return (
      <ThemeProvider theme={lightTheme}>
        <Fragment>
          <WalletContainer show={showWallet} onClose={this.handleWalletClick} />
          <NavBar onWalletClick={this.handleWalletClick} />
          <Container>
            <LeftMenu />
            <ContentWrapper>
              <Timeline stats={DaoDetails} />
              <DashboardStats />
              <ProposalFilter />
              {hasProposals &&
                Proposals.data.map(proposal => (
                  <ProposalCard key={proposal._id} proposal={proposal} />
                ))}
            </ContentWrapper>
          </Container>
        </Fragment>
      </ThemeProvider>
    );
  }
}

const { object, func } = PropTypes;
App.propTypes = {
  DaoDetails: object.isRequired,
  Proposals: object.isRequired,
  getDaoDetailsAction: func.isRequired,
  getProposalsAction: func.isRequired,
};

export default connect(
  ({ governance: { DaoDetails, Proposals } }) => ({ DaoDetails, Proposals }),
  {
    getDaoDetailsAction: getDaoDetails,
    getProposalsAction: getProposals,
  }
)(App);

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
      order: 'latest',
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
  };

  onOrderChange = order => {
    this.setState({ order });
  };

  handleWalletClick = () => {
    this.setState({ showWallet: !this.state.showWallet });
  };

  render() {
    const { showWallet, order } = this.state;
    const { DaoDetails, Proposals, AddressDetails } = this.props;
    const hasProposals = Proposals.data && Proposals.data.length > 0;
    let orderedProposals = [];
    if (hasProposals) {
      orderedProposals = Proposals.data.sort(
        (a, b) =>
          order === 'latest' ? b.timeCreated - a.timeCreated : a.timeCreated - b.timeCreated
      );
    }
    return (
      <ThemeProvider theme={lightTheme}>
        <Fragment>
          <WalletContainer show={showWallet} onClose={this.handleWalletClick} />
          <NavBar onWalletClick={this.handleWalletClick} />
          <Container>
            <LeftMenu />
            <ContentWrapper>
              <Timeline stats={DaoDetails} />
              <DashboardStats stats={AddressDetails} />
              <ProposalFilter
                onStageChange={this.props.getProposalsAction}
                onOrderChange={this.onOrderChange}
              />
              {hasProposals &&
                orderedProposals.map(proposal => (
                  <ProposalCard
                    key={proposal._id}
                    proposal={proposal}
                    userDetails={AddressDetails}
                  />
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
  AddressDetails: object.isRequired,
  Proposals: object.isRequired,
  getDaoDetailsAction: func.isRequired,
  getProposalsAction: func.isRequired,
};

export default connect(
  ({ governance: { DaoDetails, Proposals, AddressDetails } }) => ({
    DaoDetails,
    Proposals,
    AddressDetails,
  }),
  {
    getDaoDetailsAction: getDaoDetails,
    getProposalsAction: getProposals,
  }
)(App);

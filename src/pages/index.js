import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import ProposalCard from '../components/proposal-card';
import Timeline from '../components/common/blocks/timeline';
import DashboardStats from '../components/common/blocks/user-DAO-stats/index';
import ProposalFilter from '../components/common/blocks/filter/index';

import { getDaoDetails, getProposals } from '../reducers/info-server/actions';

class LandingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
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

  render() {
    const { order } = this.state;
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
      <Fragment>
        <Timeline stats={DaoDetails} />
        <DashboardStats stats={AddressDetails} />
        <ProposalFilter
          onStageChange={this.props.getProposalsAction}
          onOrderChange={this.onOrderChange}
        />
        {hasProposals &&
          orderedProposals.map(proposal => (
            <ProposalCard key={proposal._id} proposal={proposal} userDetails={AddressDetails} />
          ))}
      </Fragment>
    );
  }
}

const { object, func } = PropTypes;
LandingPage.propTypes = {
  DaoDetails: object.isRequired,
  AddressDetails: object.isRequired,
  Proposals: object.isRequired,
  getDaoDetailsAction: func.isRequired,
  getProposalsAction: func.isRequired,
};

export default connect(
  ({ infoServer: { DaoDetails, Proposals, AddressDetails } }) => ({
    DaoDetails,
    Proposals,
    AddressDetails,
  }),
  {
    getDaoDetailsAction: getDaoDetails,
    getProposalsAction: getProposals,
  }
)(LandingPage);

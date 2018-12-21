import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import ProposalCard from '../components/proposal-card';
import Timeline from '../components/common/blocks/timeline';
import DashboardStats from '../components/common/blocks/user-DAO-stats/index';
import ProposalFilter from '../components/common/blocks/filter/index';

import { getDaoDetails, getProposals } from '../reducers/info-server/actions';
import { getProposalLikes } from '../reducers/dao-server/actions';

import Snackbar from '../components/common/elements/snackbar/index';

class LandingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      order: 'latest',
    };
  }

  componentWillMount = () => {
    const {
      getDaoDetailsAction,
      getProposalsAction,
      getProposalLikesAction,
      ChallengeProof,
    } = this.props;

    Promise.all([getDaoDetailsAction(), getProposalsAction()]).then(result =>
      this.getLikes(result[1], ChallengeProof, getProposalLikesAction)
    );
  };

  onOrderChange = order => {
    this.setState({ order });
  };

  getProposals = param => {
    const { getProposalsAction, getProposalLikesAction, ChallengeProof } = this.props;

    Promise.all([getProposalsAction(param)]).then(result =>
      this.getLikes(result[0], ChallengeProof, getProposalLikesAction)
    );
  };

  getLikes = (result, ChallengeProof, getProposalLikesAction) => {
    if (
      !ChallengeProof ||
      !ChallengeProof.data ||
      (ChallengeProof.data && !ChallengeProof.data.client)
    )
      return undefined;
    const { stage } = result.payload ? result.payload.data[0] : undefined;

    return getProposalLikesAction({
      stage,
      authToken: ChallengeProof.data['access-token'],
      client: ChallengeProof.data.client,
      uid: ChallengeProof.data.uid,
    });
  };

  render() {
    const { order } = this.state;
    const { history, DaoDetails, Proposals, AddressDetails, LikedProposals } = this.props;
    const hasProposals = Proposals.data && Proposals.data.length > 0;
    let orderedProposals = [];
    if (hasProposals) {
      orderedProposals = Proposals.data.sort((a, b) =>
        order === 'latest' ? b.timeCreated - a.timeCreated : a.timeCreated - b.timeCreated
      );
    }
    const checkIfLiked = proposalId => {
      if (!LikedProposals.data) return false;
      const proposal = LikedProposals.data.find(p => p.proposalId === proposalId);
      if (!proposal) return false;
      return proposal.liked;
    };
    return (
      <Fragment>
        <Timeline stats={DaoDetails} />
        <DashboardStats stats={AddressDetails} />
        <ProposalFilter
          onStageChange={this.getProposals}
          onOrderChange={this.onOrderChange}
          addressDetails={AddressDetails}
        />
        {hasProposals &&
          orderedProposals.map(proposal => (
            <ProposalCard
              history={history}
              key={proposal.proposalId}
              liked={checkIfLiked(proposal.proposalId)}
              proposal={proposal}
              userDetails={AddressDetails}
            />
          ))}
        <Snackbar />
      </Fragment>
    );
  }
}

const { object, func } = PropTypes;
LandingPage.propTypes = {
  DaoDetails: object.isRequired,
  AddressDetails: object.isRequired,
  Proposals: object.isRequired,
  ChallengeProof: object,
  LikedProposals: object,
  history: object.isRequired,
  getDaoDetailsAction: func.isRequired,
  getProposalsAction: func.isRequired,
  getProposalLikesAction: func.isRequired,
};

LandingPage.defaultProps = {
  ChallengeProof: undefined,
  LikedProposals: undefined,
};

export default connect(
  ({
    infoServer: { DaoDetails, Proposals, AddressDetails },
    daoServer: { ChallengeProof, LikedProposals },
  }) => ({
    DaoDetails,
    Proposals,
    AddressDetails,
    ChallengeProof,
    LikedProposals,
  }),
  {
    getDaoDetailsAction: getDaoDetails,
    getProposalsAction: getProposals,
    getProposalLikesAction: getProposalLikes,
  }
)(LandingPage);

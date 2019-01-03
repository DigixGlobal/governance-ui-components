import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { connect } from 'react-redux';

import ProposalCard from '../components/proposal-card';
import Timeline from '../components/common/blocks/timeline';
import DashboardStats from '../components/common/blocks/user-DAO-stats/index';
import ProposalFilter from '../components/common/blocks/filter/index';

import { getDaoDetails, getProposals } from '../reducers/info-server/actions';
import { getProposalLikesByUser, getProposalLikesStats } from '../reducers/dao-server/actions';

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
      getProposalLikesByUserAction,
      ChallengeProof,
    } = this.props;

    Promise.all([getDaoDetailsAction(), getProposalsAction()]).then(result => {
      this.getUserLikes('all', ChallengeProof, getProposalLikesByUserAction);
      return this.getProposalLikes();
    });
  };

  componentWillReceiveProps = nextProps => {
    if (!_.isEqual(this.props.ChallengeProof, nextProps.ChallengeProof)) {
      this.getUserLikes('all', nextProps.ChallengeProof, this.props.getProposalLikesByUserAction);
      this.getProposalLikes('all', nextProps.ChallengeProof);
    }
  };

  onOrderChange = order => {
    this.setState({ order });
  };

  getProposals = param => {
    const { getProposalsAction, getProposalLikesByUserAction, ChallengeProof } = this.props;

    Promise.all([
      getProposalsAction(param),
      this.getUserLikes(param, ChallengeProof, getProposalLikesByUserAction),
      this.getProposalLikes(param),
    ]);
  };

  getProposalLikes = (param, ChallengeProof) => {
    const { getProposalLikesStatsAction } = this.props;
    if (
      !ChallengeProof ||
      !ChallengeProof.data ||
      (ChallengeProof.data && !ChallengeProof.data.client)
    )
      return undefined;
    return getProposalLikesStatsAction({
      param,
      authToken: ChallengeProof.data['access-token'],
      client: ChallengeProof.data.client,
      uid: ChallengeProof.data.uid,
    });
  };

  getUserLikes = (stage, ChallengeProof, getProposalLikesByUserAction) => {
    if (
      !ChallengeProof ||
      !ChallengeProof.data ||
      (ChallengeProof.data && !ChallengeProof.data.client)
    )
      return undefined;
    return getProposalLikesByUserAction({
      stage,
      authToken: ChallengeProof.data['access-token'],
      client: ChallengeProof.data.client,
      uid: ChallengeProof.data.uid,
    });
  };

  render() {
    const { order } = this.state;
    const {
      history,
      DaoDetails,
      Proposals,
      AddressDetails,
      UserLikedProposals,
      ProposalLikes,
    } = this.props;
    const hasProposals = Proposals.data && Proposals.data.length > 0;
    let orderedProposals = [];
    if (hasProposals) {
      orderedProposals = Proposals.data.sort((a, b) =>
        order === 'latest' ? b.timeCreated - a.timeCreated : a.timeCreated - b.timeCreated
      );
    }
    const checkIfLiked = proposalId => {
      if (!UserLikedProposals.data) return false;
      const proposal = UserLikedProposals.data.find(p => p.proposalId === proposalId);
      if (!proposal) return false;
      return proposal.liked;
    };

    const getLikesCount = proposalId => {
      if (!ProposalLikes.data) return false;
      const proposal = ProposalLikes.data.find(p => p.proposalId === proposalId);
      if (!proposal) return false;
      return proposal.likes;
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
              likes={getLikesCount(proposal.proposalId)}
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
  UserLikedProposals: object,
  ProposalLikes: object,
  history: object.isRequired,
  getDaoDetailsAction: func.isRequired,
  getProposalsAction: func.isRequired,
  getProposalLikesByUserAction: func.isRequired,
  getProposalLikesStatsAction: func.isRequired,
};

LandingPage.defaultProps = {
  ChallengeProof: undefined,
  UserLikedProposals: undefined,
  ProposalLikes: undefined,
};

export default connect(
  ({
    infoServer: { DaoDetails, Proposals, AddressDetails },
    daoServer: { ChallengeProof, UserLikedProposals, ProposalLikes },
  }) => ({
    DaoDetails,
    Proposals,
    AddressDetails,
    ChallengeProof,
    UserLikedProposals,
    ProposalLikes,
  }),
  {
    getDaoDetailsAction: getDaoDetails,
    getProposalsAction: getProposals,
    getProposalLikesByUserAction: getProposalLikesByUser,
    getProposalLikesStatsAction: getProposalLikesStats,
  }
)(LandingPage);

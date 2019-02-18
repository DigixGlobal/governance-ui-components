import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import ProposalCard from '@digix/gov-ui/components/proposal-card';
import Timeline from '@digix/gov-ui/components/common/blocks/timeline';
import DashboardStats from '@digix/gov-ui/components/common/blocks/user-DAO-stats/index';
import ProposalFilter from '@digix/gov-ui/components/common/blocks/filter/index';

import {
  getAddressDetails,
  getDaoDetails,
  getProposals,
} from '@digix/gov-ui/reducers/info-server/actions';

import {
  getProposalLikesByUser,
  getProposalLikesStats,
} from '@digix/gov-ui/reducers/dao-server/actions';

import Snackbar from '@digix/gov-ui/components/common/elements/snackbar/index';

class LandingPage extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      order: 'latest',
      loadingLikes: false,
    };
  }

  componentWillMount = () => {
    const { AddressDetails, getDaoDetailsAction, getProposalsAction, ChallengeProof } = this.props;

    getDaoDetailsAction();
    getProposalsAction();
    if (AddressDetails.data.address && (ChallengeProof.data && ChallengeProof.data.client)) {
      this.getLikeStatus();
    }
  };

  componentDidMount = () => {
    if (window.Cookiebot) {
      window.Cookiebot.show();
    }
  };

  componentWillReceiveProps = (nextProps, nextState) => {
    const { ChallengeProof } = nextProps;
    if (ChallengeProof.data && ChallengeProof.data.client && !this.state.loadingLikes) {
      this.setState({ loadingLikes: true }, () => {
        this.getLikeStatus();
      });
    }
  };

  onOrderChange = order => {
    this.setState({ order });
  };

  getLikeStatus = () => {
    const {
      AddressDetails,
      getAddressDetailsAction,
      getProposalLikesByUserAction,
      ChallengeProof,
    } = this.props;
    return Promise.all([getAddressDetailsAction(AddressDetails.data.address)]).then(() => {
      this.getUserLikes('all', ChallengeProof, getProposalLikesByUserAction);
      this.getProposalLikes(undefined, ChallengeProof);
    });
  };

  getProposals = param => {
    const { getProposalsAction, getProposalLikesByUserAction, ChallengeProof } = this.props;

    Promise.all([
      getProposalsAction(param),
      this.getUserLikes(param, ChallengeProof, getProposalLikesByUserAction),
      this.getProposalLikes(param, ChallengeProof),
    ]);
  };

  getProposalLikes = (param = undefined, ChallengeProof) => {
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

  fixScrollbar = ShowWallet => {
    if (ShowWallet && ShowWallet.show) {
      document.body.classList.add('modal-is-open');
    } else {
      document.body.classList.remove('modal-is-open');
    }
  };

  render() {
    const { order } = this.state;
    this.fixScrollbar(this.props.ShowWallet);
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
  ShowWallet: object,
  history: object.isRequired,
  getAddressDetailsAction: func.isRequired,
  getDaoDetailsAction: func.isRequired,
  getProposalsAction: func.isRequired,
  getProposalLikesByUserAction: func.isRequired,
  getProposalLikesStatsAction: func.isRequired,
};

LandingPage.defaultProps = {
  ChallengeProof: undefined,
  UserLikedProposals: undefined,
  ProposalLikes: undefined,
  ShowWallet: undefined,
};

export default connect(
  ({
    infoServer: { DaoDetails, Proposals, AddressDetails },
    daoServer: { ChallengeProof, UserLikedProposals, ProposalLikes },
    govUI: { ShowWallet },
  }) => ({
    DaoDetails,
    Proposals,
    AddressDetails,
    ChallengeProof,
    UserLikedProposals,
    ProposalLikes,
    ShowWallet,
  }),
  {
    getAddressDetailsAction: getAddressDetails,
    getDaoDetailsAction: getDaoDetails,
    getProposalsAction: getProposals,
    getProposalLikesByUserAction: getProposalLikesByUser,
    getProposalLikesStatsAction: getProposalLikesStats,
  }
)(LandingPage);

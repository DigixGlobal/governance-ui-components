import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import CountdownPage from '@digix/gov-ui/components/common/blocks/loader/countdown';
import ProposalCard from '@digix/gov-ui/components/proposal-card';
import Timeline from '@digix/gov-ui/components/common/blocks/timeline';
import UserAddressStats from '@digix/gov-ui/components/common/blocks/user-address-stats/index';
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
import { renderDisplayName } from '@digix/gov-ui/api/graphql-queries/users';
import { showCountdownPage } from '@digix/gov-ui/reducers/gov-ui/actions';

class LandingPage extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      order: 'latest',
    };
  }

  componentWillMount = () => {
    const { AddressDetails, getDaoDetailsAction, getProposalsAction, ChallengeProof } = this.props;
    getDaoDetailsAction().then(() => {
      const { currentQuarter } = this.props.DaoDetails.data;
      if (currentQuarter === 0) {
        this.props.showCountdownPage({ show: true });
      }
    });

    getProposalsAction();
    this.getProposalLikes(undefined, ChallengeProof);
    if (AddressDetails.data.address && (ChallengeProof.data && ChallengeProof.data.client)) {
      this.getLikeStatus();
    }
  };

  componentDidMount = () => {
    if (window.Cookiebot) {
      try {
        window.Cookiebot.show();
      } catch (error) {
        console.log('unable to initialize cookiebot');
      }
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
    });
  };

  getProposals = param => {
    const { getProposalsAction, getProposalLikesByUserAction, ChallengeProof } = this.props;

    Promise.all([
      getProposalsAction(param),
      this.getUserLikes(param, ChallengeProof, getProposalLikesByUserAction),
    ]);
  };

  getProposalLikes = (param = undefined) =>
    this.props.getProposalLikesStatsAction({
      param,
    });

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

  renderLandingPage() {
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

    const getProposer = (proposalId, proposer) => {
      if (!ProposalLikes.data) return '';
      const proposal = ProposalLikes.data.find(p => p.proposalId === proposalId);
      if (!proposal && proposer === AddressDetails.data.address)
        return renderDisplayName('Proposer-DisplayName');
      else if (!proposal) return '';
      return proposal.user.displayName;
    };

    const getLikesCount = proposalId => {
      if (!ProposalLikes.data) return 0;
      const proposal = ProposalLikes.data.find(p => p.proposalId === proposalId);

      if (!proposal) return 0;
      return proposal.likes;
    };
    return (
      <Fragment>
        <Timeline stats={DaoDetails} />
        <UserAddressStats />
        <ProposalFilter
          onStageChange={this.getProposals}
          onOrderChange={this.onOrderChange}
          AddressDetails={AddressDetails}
          history={history}
        />
        {!hasProposals && <p>There are no projects to show.</p>}
        {hasProposals &&
          orderedProposals.map(proposal => (
            <ProposalCard
              history={history}
              key={proposal.proposalId}
              liked={checkIfLiked(proposal.proposalId)}
              likes={getLikesCount(proposal.proposalId)}
              proposal={proposal}
              displayName={getProposer(proposal.proposalId, proposal.proposer)}
              userDetails={AddressDetails}
            />
          ))}
        <Snackbar />
      </Fragment>
    );
  }

  render() {
    const { HasCountdown } = this.props;

    if (HasCountdown) {
      return <CountdownPage />;
    }

    return this.renderLandingPage();
  }
}

const { bool, object, func } = PropTypes;

LandingPage.propTypes = {
  DaoDetails: object.isRequired,
  AddressDetails: object.isRequired,
  Proposals: object.isRequired,
  ChallengeProof: object,
  UserLikedProposals: object,
  ProposalLikes: object,
  HasCountdown: bool.isRequired,
  ShowWallet: object,
  history: object.isRequired,
  getAddressDetailsAction: func.isRequired,
  getDaoDetailsAction: func.isRequired,
  getProposalsAction: func.isRequired,
  getProposalLikesByUserAction: func.isRequired,
  getProposalLikesStatsAction: func.isRequired,
  showCountdownPage: func.isRequired,
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
    govUI: { HasCountdown, ShowWallet },
  }) => ({
    DaoDetails,
    Proposals,
    AddressDetails,
    ChallengeProof,
    UserLikedProposals,
    ProposalLikes,
    HasCountdown,
    ShowWallet,
  }),
  {
    getAddressDetailsAction: getAddressDetails,
    getDaoDetailsAction: getDaoDetails,
    getProposalsAction: getProposals,
    getProposalLikesByUserAction: getProposalLikesByUser,
    getProposalLikesStatsAction: getProposalLikesStats,
    showCountdownPage,
  }
)(LandingPage);

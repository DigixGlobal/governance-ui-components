import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Modal from 'react-responsive-modal';
import util from 'ethereumjs-util';

import CountdownPage from '@digix/gov-ui/components/common/blocks/loader/countdown';
import ProposalCard from '@digix/gov-ui/components/proposal-card';
import Timeline from '@digix/gov-ui/components/common/blocks/timeline';
import UserAddressStats from '@digix/gov-ui/components/common/blocks/user-address-stats/index';
import ProposalFilter from '@digix/gov-ui/components/common/blocks/filter/index';
import { Button } from '@digix/gov-ui/components/common/elements/index';

import {
  getAddressDetails,
  getDaoDetails,
  getProposals,
} from '@digix/gov-ui/reducers/info-server/actions';

import {
  getProposalLikesByUser,
  getProposalLikesStats,
  getTranslations,
} from '@digix/gov-ui/reducers/dao-server/actions';

import { renderDisplayName } from '@digix/gov-ui/api/graphql-queries/users';
import { showCountdownPage } from '@digix/gov-ui/reducers/gov-ui/actions';
import ToS from '@digix/gov-ui/tos.md';
import ConfirmParticipation from '@digix/gov-ui/pages/continue-participation';

import { Content, Title, TosOverlay } from '@digix/gov-ui/pages/style';

class LandingPage extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      order: 'latest',
      showTos: true,
      showParticipateModal: false,
      disableButton: true,
    };
  }

  componentWillMount = () => {
    const {
      AddressDetails,
      getDaoDetailsAction,
      getProposalsAction,
      getTranslationsAction,
      ChallengeProof,
      Language,
    } = this.props;

    const storedHash = localStorage.getItem('GOVERNANCE_UI');
    const hash = this.hashTos();
    if (storedHash && storedHash === hash) {
      this.setState({ showTos: false });
    }

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

    getTranslationsAction(Language);
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

  hashTos = () => {
    const hash = util.sha256(ToS.toString()).toString('hex');
    return hash;
  };

  fixScrollbar = ShowWallet => {
    if (ShowWallet && ShowWallet.show) {
      document.body.classList.add('modal-is-open');
    } else {
      document.body.classList.remove('modal-is-open');
    }
  };

  handleTosClose = () => {
    this.setState({ showTos: false }, () => {
      localStorage.setItem('GOVERNANCE_UI', this.hashTos());
    });
  };

  handleModalClose = () => {
    this.setState({
      showParticipateModal: false,
      showTos: false,
    });
  };

  handleScroll = () => {
    const element = document.getElementById('overlayDiv');
    if (element.scrollTop + 1000 >= element.scrollHeight) {
      this.setState({ disableButton: false });
    }
  };

  renderLandingPage() {
    const { order, showTos, disableButton, showParticipateModal } = this.state;
    this.fixScrollbar(this.props.ShowWallet);
    const {
      history,
      DaoDetails,
      Proposals,
      AddressDetails,
      UserLikedProposals,
      ProposalLikes,
      Translations,
    } = this.props;
    const hasProposals = Proposals.data && Proposals.data.length > 0;
    if (!Translations.data) return null;

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

    const isWalletLoaded = Boolean(AddressDetails.data.address);

    const {
      data: { dashboard },
    } = Translations;

    return (
      <Fragment>
        <Timeline stats={DaoDetails} translations={Translations} />
        {isWalletLoaded && <UserAddressStats translations={Translations} />}
        <ProposalFilter
          onStageChange={this.getProposals}
          onOrderChange={this.onOrderChange}
          AddressDetails={AddressDetails}
          history={history}
          translations={Translations}
        />
        {!hasProposals && <p>{dashboard.noProjects}</p>}
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
              translations={Translations}
            />
          ))}
        <Modal
          open={showTos}
          onClose={this.handleModalClose}
          showCloseIcon={false}
          closeOnEsc={false}
          closeOnOverlayClick={false}
        >
          <Content>
            <Title>Terms and Conditions</Title>
            <TosOverlay id="overlayDiv" onScroll={this.handleScroll}>
              <ToS />
            </TosOverlay>
            <Button
              primary
              data-digix="TOC-READ-AGREE"
              disabled={disableButton}
              onClick={this.handleTosClose}
              style={{ marginLeft: '0' }}
            >
              I have read and agreed
            </Button>
          </Content>
        </Modal>
        <Modal open={showParticipateModal} onClose={this.handleModalClose}>
          <ConfirmParticipation />
        </Modal>
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

const { bool, object, func, string } = PropTypes;

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
  getTranslationsAction: func.isRequired,
  Translations: object.isRequired,
  Language: string,
};

LandingPage.defaultProps = {
  ChallengeProof: undefined,
  UserLikedProposals: undefined,
  ProposalLikes: undefined,
  ShowWallet: undefined,
  Language: 'en',
};

export default connect(
  ({
    infoServer: { DaoDetails, Proposals, AddressDetails },
    daoServer: { ChallengeProof, UserLikedProposals, ProposalLikes, Translations },
    govUI: { HasCountdown, ShowWallet, Language },
  }) => ({
    DaoDetails,
    Proposals,
    AddressDetails,
    ChallengeProof,
    UserLikedProposals,
    Translations,
    ProposalLikes,
    HasCountdown,
    ShowWallet,
    Language,
  }),
  {
    getAddressDetailsAction: getAddressDetails,
    getDaoDetailsAction: getDaoDetails,
    getProposalsAction: getProposals,
    getProposalLikesByUserAction: getProposalLikesByUser,
    getProposalLikesStatsAction: getProposalLikesStats,
    getTranslationsAction: getTranslations,
    showCountdownPage,
  }
)(LandingPage);

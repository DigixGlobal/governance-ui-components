import React, { Fragment } from 'react';
import Modal from 'react-responsive-modal';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withApollo } from 'react-apollo';

import ConfirmParticipation from '@digix/gov-ui/pages/continue-participation';
import CountdownPage from '@digix/gov-ui/components/common/blocks/loader/countdown';
import ProposalCard from '@digix/gov-ui/components/proposal-card';
import Timeline from '@digix/gov-ui/components/common/blocks/timeline';
import ToS from '@digix/gov-ui/tos.md';
import UserAddressStats from '@digix/gov-ui/components/common/blocks/user-address-stats/index';
import ProposalFilter from '@digix/gov-ui/components/common/blocks/filter/index';
import { Content, Title, TosOverlay } from '@digix/gov-ui/pages/style';
import { CONFIRM_PARTICIPATION_CACHE } from '@digix/gov-ui/constants';
import { Button } from '@digix/gov-ui/components/common/elements/index';
import { fetchProposalList } from '@digix/gov-ui/api/graphql-queries/proposal';
import { getHash } from '@digix/gov-ui/utils/helpers';
import { getDefaultAddress } from 'spectrum-lightsuite/src/selectors';
import { initializePayload } from '@digix/gov-ui/api';
import { renderDisplayName } from '@digix/gov-ui/api/graphql-queries/users';
import { showCountdownPage } from '@digix/gov-ui/reducers/gov-ui/actions';
import {
  getAddressDetails,
  getDaoConfig,
  getDaoDetails,
} from '@digix/gov-ui/reducers/info-server/actions';
import {
  getProposalLikesByUser,
  getProposalLikesStats,
  getTranslations,
  likeProposal,
  unlikeProposal,
  getUserProposalLikeStatus,
} from '@digix/gov-ui/reducers/dao-server/actions';

class LandingPage extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      displayNames: {},
      disableButton: true,
      order: 'latest',
      proposals: [],
      proposalLikes: {},
      showParticipateModal: false,
      showTos: true,
      userLikes: [],
    };
  }

  componentWillMount = () => {
    const { Language, activeProjectTab } = this.props;
    this.setTosStatus();
    this.setCountdownPageStatus();
    this.getProposalList(activeProjectTab);
    this.props.getTranslations(Language);
  };

  componentDidMount = () => {
    const { address } = this.props.defaultAddress;
    const promises = [this.props.getAddressDetails(address), this.props.getDaoConfig];

    Promise.all(promises).then(() => {
      this.getUserLikes();
      this.getProposalLikes();
      this.showContinueParticipationModal();
    });
  };

  onOrderChange = order => {
    this.setState({ order });
  };

  getProposalLikes = () => {
    this.props.getProposalLikesStats(this.props.activeProjectTab).then(() => {
      const displayNames = {};
      const proposalLikes = {};
      const proposals = this.props.ProposalLikes.data;

      proposals.forEach(p => {
        proposalLikes[p.proposalId] = p.likes;
        displayNames[p.proposalId] = p.user ? p.user.displayName : '';
      });

      this.setState({ displayNames, proposalLikes });
    });
  };

  getProposalList = stage => {
    const apollo = this.props.client;
    apollo
      .query({
        fetchPolicy: 'network-only',
        query: fetchProposalList,
        variables: { stage },
      })
      .then(result => {
        const proposals = result.data.fetchProposals;
        this.setState({ proposals });
      });
  };

  getUserLikes = () => {
    if (!this.hasChallenge()) {
      return;
    }

    const payload = initializePayload(this.props.ChallengeProof);
    return this.props.getProposalLikesByUser({ ...payload, stage: 'all' }).then(() => {
      const proposals = this.props.UserLikedProposals.data;
      const userLikes = proposals.map(proposal => proposal.proposalId);
      this.setState({ userLikes });
    });
  };

  setCountdownPageStatus = () => {
    this.props.getDaoDetails().then(() => {
      const { currentQuarter } = this.props.DaoDetails.data;
      if (currentQuarter === 0) {
        this.props.showCountdownPage({ show: true });
      }
    });
  };

  setProposalList = proposals => {
    this.setState({ proposals });
  };

  setTosStatus = () => {
    const storedHash = localStorage.getItem('GOVERNANCE_UI');
    const hash = getHash(ToS);
    if (storedHash && storedHash === hash) {
      this.setState({ showTos: false });
    }
  };

  fixScrollbar = ShowWallet => {
    if (ShowWallet && ShowWallet.show) {
      document.body.classList.add('modal-is-open');
    } else {
      document.body.classList.remove('modal-is-open');
    }
  };

  hasChallenge = () => {
    const { ChallengeProof } = this.props;
    return ChallengeProof && ChallengeProof.data && ChallengeProof.data.client;
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

  handleTosClose = () => {
    this.setState({ showTos: false }, () => {
      localStorage.setItem('GOVERNANCE_UI', getHash(ToS));
    });
  };

  likeProposal = proposalId => {
    const { ChallengeProof } = this.props;
    const payload = initializePayload(ChallengeProof);
    const options = {
      ...payload,
      proposalId,
      token: payload.authToken,
    };

    const proposalLikes = { ...this.state.proposalLikes };
    const userLikes = [...this.state.userLikes];
    const liked = userLikes.includes(proposalId);

    if (!liked) {
      this.props.likeProposal(options);
      proposalLikes[proposalId] += 1;
      userLikes.push(proposalId);
    } else {
      this.props.unlikeProposal(options);
      proposalLikes[proposalId] -= 1;
      const index = userLikes.indexOf(proposalId);
      userLikes.splice(index, 1);
    }

    this.props.getUserProposalLikeStatus(options);
    this.setState({
      proposalLikes,
      userLikes,
    });
  };

  showContinueParticipationModal() {
    const { ChallengeProof } = this.props;
    const { CONFIG_MINIMUM_LOCKED_DGD } = this.props.DaoConfig;
    const { currentQuarter, isGlobalRewardsSet } = this.props.DaoDetails.data;
    const AddressDetails = this.props.AddressDetails.data;
    const lastParticipatedQuarter = AddressDetails && AddressDetails.lastParticipatedQuarter;

    const hasLoadedWallet = ChallengeProof.data;
    const isPastParticipant =
      lastParticipatedQuarter > 0 && lastParticipatedQuarter < currentQuarter;

    const lockedDgd = Number(AddressDetails && AddressDetails.lockedDgd);
    const minimumDgd = Number(CONFIG_MINIMUM_LOCKED_DGD);
    const hasEnoughDgd = lockedDgd >= minimumDgd;

    const { key, value } = CONFIRM_PARTICIPATION_CACHE;
    const storedHash = localStorage.getItem(key);

    // always include the currentQuarter so that we have unique hashes per quarter
    const expectedHash = getHash(`${value}_${currentQuarter}_${AddressDetails.address}`);
    const alreadyParticipating = storedHash && storedHash === expectedHash;

    const showModal =
      hasLoadedWallet &&
      isGlobalRewardsSet &&
      isPastParticipant &&
      hasEnoughDgd &&
      !alreadyParticipating;

    if (showModal) {
      localStorage.removeItem(key, expectedHash);
      this.setState({ showParticipateModal: true });
    }
  }

  renderProposalCard(proposal) {
    if (!proposal) {
      return null;
    }

    const { AddressDetails, history, Translations } = this.props;
    const { displayNames } = this.state;
    const { proposalId, proposer } = proposal;

    const isLiked = this.state.userLikes.includes(proposalId);
    const likeCount = this.state.proposalLikes[proposalId];
    const isProposer = proposer === AddressDetails.data.address;
    const displayName = isProposer
      ? renderDisplayName('Proposer-DisplayName')
      : displayNames[proposalId];

    return (
      <ProposalCard
        key={proposalId}
        displayName={displayName}
        history={history}
        isLiked={isLiked}
        likeCount={likeCount}
        proposal={proposal}
        likeProposal={this.likeProposal}
        translations={Translations}
        data-digix="Proposal-Card"
      />
    );
  }

  renderLandingPage() {
    this.fixScrollbar(this.props.ShowWallet);

    const { disableButton, order, proposals, showParticipateModal, showTos } = this.state;
    const { AddressDetails, DaoDetails, history, Translations } = this.props;
    if (!Translations.data) {
      return null;
    }

    let orderedProposals = [];
    const hasProposals = proposals.length > 0;
    if (hasProposals) {
      orderedProposals = proposals.sort((a, b) =>
        order === 'latest' ? b.timeCreated - a.timeCreated : a.timeCreated - b.timeCreated
      );
    }

    const isWalletLoaded = Boolean(AddressDetails.data.address);
    const {
      data: { dashboard },
    } = Translations;

    return (
      <Fragment>
        <Timeline stats={DaoDetails} translations={Translations} />
        {isWalletLoaded && <UserAddressStats translations={Translations} />}
        <ProposalFilter
          setProposalList={this.setProposalList}
          onOrderChange={this.onOrderChange}
          AddressDetails={AddressDetails}
          history={history}
          translations={Translations}
        />
        {!hasProposals && <p>{dashboard.noProjects}</p>}
        {hasProposals && orderedProposals.map(p => this.renderProposalCard(p))}
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
        <Modal open={showParticipateModal} onClose={() => true} showCloseIcon={false}>
          <ConfirmParticipation closeModal={this.handleModalClose} />
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
  activeProjectTab: string.isRequired,
  client: object.isRequired,
  DaoConfig: object.isRequired,
  DaoDetails: object.isRequired,
  defaultAddress: object,
  AddressDetails: object.isRequired,
  ChallengeProof: object,
  UserLikedProposals: object,
  ProposalLikes: object,
  HasCountdown: bool.isRequired,
  ShowWallet: object,
  history: object.isRequired,
  getAddressDetails: func.isRequired,
  getDaoConfig: func.isRequired,
  getDaoDetails: func.isRequired,
  getProposalLikesByUser: func.isRequired,
  getProposalLikesStats: func.isRequired,
  getUserProposalLikeStatus: func.isRequired,
  likeProposal: func.isRequired,
  unlikeProposal: func.isRequired,
  showCountdownPage: func.isRequired,
  getTranslations: func.isRequired,
  Translations: object.isRequired,
  Language: string,
};

LandingPage.defaultProps = {
  ChallengeProof: undefined,
  defaultAddress: {
    address: undefined,
  },
  UserLikedProposals: undefined,
  ProposalLikes: undefined,
  ShowWallet: undefined,
  Language: 'en',
};

const mapStateToProps = state => {
  const {
    infoServer: { DaoDetails, AddressDetails, DaoConfig },
    daoServer: { ChallengeProof, UserLikedProposals, ProposalLikes, Translations },
    govUI: { HasCountdown, ShowWallet, Language, activeProjectTab },
  } = state;

  return {
    DaoConfig: DaoConfig.data,
    DaoDetails,
    AddressDetails,
    ChallengeProof,
    UserLikedProposals,
    Translations,
    ProposalLikes,
    HasCountdown,
    ShowWallet,
    Language,
    activeProjectTab,
    defaultAddress: getDefaultAddress(state),
  };
};

export default withApollo(
  connect(
    mapStateToProps,
    {
      getAddressDetails,
      getDaoConfig,
      getDaoDetails,
      getProposalLikesByUser,
      getProposalLikesStats,
      getTranslations,
      getUserProposalLikeStatus,
      likeProposal,
      unlikeProposal,
      showCountdownPage,
    }
  )(LandingPage)
);

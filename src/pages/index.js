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
} from '@digix/gov-ui/reducers/dao-server/actions';

class LandingPage extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      disableButton: true,
      order: 'latest',
      proposals: [],
      showParticipateModal: false,
      showTos: true,
    };
  }

  componentWillMount = () => {
    const { AddressDetails, ChallengeProof, Language } = this.props;
    const hasAddress = AddressDetails.data.address;
    const hasChallenge = ChallengeProof.data && ChallengeProof.data.client;

    this.setTosStatus();
    this.setCountdownPageStatus();
    this.getProposalList('all');
    this.getProposalLikes(undefined, ChallengeProof);
    this.props.getTranslations(Language);
    if (hasAddress && hasChallenge) {
      this.getLikeStatus();
    }
  };

  componentDidMount = () => {
    const { getAddressDetailsAction } = this.props;
    const { address } = this.props.defaultAddress;

    Promise.all([getAddressDetailsAction(address), this.props.getDaoConfig]).then(() => {
      this.showContinueParticipationModal();
    });

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

  getLikesCount = proposalId => {
    const { ProposalLikes } = this.props;
    if (!ProposalLikes.data) {
      return 0;
    }

    const proposal = ProposalLikes.data.find(p => p.proposalId === proposalId);
    if (!proposal) {
      return 0;
    }

    return proposal.likes;
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

  getProposalLikes = (param = undefined) =>
    this.props.getProposalLikesStatsAction({
      param,
    });

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

  getProposer = (proposalId, proposer) => {
    const { AddressDetails, ProposalLikes } = this.props;
    if (!ProposalLikes.data) {
      return '';
    }

    const proposal = ProposalLikes.data.find(p => p.proposalId === proposalId);
    if (!proposal && proposer === AddressDetails.data.address) {
      return renderDisplayName('Proposer-DisplayName');
    } else if (!proposal) {
      return '';
    }

    return proposal.user.displayName;
  };

  getUserLikes = (stage, ChallengeProof, getProposalLikesByUserAction) => {
    const hasChallenge = ChallengeProof && ChallengeProof.data && ChallengeProof.data.client;
    if (!hasChallenge) {
      return undefined;
    }

    return getProposalLikesByUserAction({
      stage,
      authToken: ChallengeProof.data['access-token'],
      client: ChallengeProof.data.client,
      uid: ChallengeProof.data.uid,
    });
  };

  setCountdownPageStatus = () => {
    this.props.getDaoDetailsAction().then(() => {
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

  checkIfLiked = proposalId => {
    const { UserLikedProposals } = this.props;
    if (!UserLikedProposals.data) {
      return false;
    }

    const proposal = UserLikedProposals.data.find(p => p.proposalId === proposalId);
    if (!proposal) {
      return false;
    }

    return proposal.liked;
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
      localStorage.setItem('GOVERNANCE_UI', getHash(ToS));
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
        {hasProposals &&
          orderedProposals.map(proposal => (
            <ProposalCard
              history={history}
              key={proposal.proposalId}
              liked={this.checkIfLiked(proposal.proposalId)}
              likes={this.getLikesCount(proposal.proposalId)}
              proposal={proposal}
              displayName={this.getProposer(proposal.proposalId, proposal.proposer)}
              userDetails={AddressDetails}
              translations={Translations}
              data-digix="Proposal-Card"
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
  getAddressDetailsAction: func.isRequired,
  getDaoConfig: func.isRequired,
  getDaoDetailsAction: func.isRequired,
  getProposalLikesByUserAction: func.isRequired,
  getProposalLikesStatsAction: func.isRequired,
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
    govUI: { HasCountdown, ShowWallet, Language },
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
    defaultAddress: getDefaultAddress(state),
  };
};

export default withApollo(
  connect(
    mapStateToProps,
    {
      getAddressDetailsAction: getAddressDetails,
      getDaoConfig,
      getDaoDetailsAction: getDaoDetails,
      getProposalLikesByUserAction: getProposalLikesByUser,
      getProposalLikesStatsAction: getProposalLikesStats,
      getTranslations,
      showCountdownPage,
    }
  )(LandingPage)
);

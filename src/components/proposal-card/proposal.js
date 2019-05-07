import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import LikeButton from '@digix/gov-ui/components/common/elements/like';
import LogDashboard from '@digix/gov-ui/analytics/dashboard';
import { Button } from '@digix/gov-ui/components/common/elements/index';
import { initializePayload } from '@digix/gov-ui/api';
import { getUserStatus } from '@digix/gov-ui/utils/helpers';
import { UserStatus } from '@digix/gov-ui/constants';

import {
  likeProposal,
  unlikeProposal,
  getUserProposalLikeStatus,
} from '@digix/gov-ui/reducers/dao-server/actions';

import {
  Details,
  AboutProposal,
  Tags,
  Title,
  Desc,
  Author,
  AuthorName,
  ViewLink,
} from '@digix/gov-ui/components/proposal-card/style';

class Proposal extends React.PureComponent {
  constructor(props) {
    super(props);

    const { details, liked, likes, userProposalLike } = props;
    const proposal = userProposalLike.data;
    const useProposalData = proposal && proposal.proposalId === details.proposalId;
    const likeCount = useProposalData ? proposal.likes : likes;
    const isLiked = useProposalData ? proposal.liked : liked;

    this.state = {
      likeCount: likeCount || 0,
      liked: isLiked,
    };
  }

  toggleLike = () => {
    const { likeCount, liked } = this.state;
    const {
      ChallengeProof,
      details,
      likeProposalAction,
      unlikeProposalAction,
      getUserProposalLikeStatusAction,
    } = this.props;

    const payload = initializePayload(ChallengeProof);
    const options = {
      ...payload,
      proposalId: details.proposalId,
      token: payload.authToken,
    };

    if (!liked) {
      likeProposalAction(options);
      this.setState({
        liked: true,
        likeCount: likeCount + 1,
      });
    } else {
      unlikeProposalAction(options);
      this.setState({
        liked: false,
        likeCount: likeCount - 1,
      });
    }

    getUserProposalLikeStatusAction(options);
  };

  redirectToProposalPage = () => {
    const { AddressDetails, details, history } = this.props;
    const userType = getUserStatus(AddressDetails.data, UserStatus);

    LogDashboard.viewProject(userType);
    history.push(`/proposals/${details.proposalId}`);
  };

  render() {
    const { likeCount, liked } = this.state;
    const { details, displayName, title, translations, userDetails } = this.props;
    const { proposalVersions } = details;

    const proposalVersion =
      proposalVersions && proposalVersions.length
        ? proposalVersions[proposalVersions.length - 1]
        : undefined;

    const canLike = userDetails && userDetails.data.address;
    const {
      data: {
        dashboard: { ProposalCard: cardTranslation },
        project: { status },
      },
    } = translations;

    return (
      <Details first>
        <AboutProposal>
          <Tags>
            <Button kind="tag" showIcon data-digix="Proposal-Status">
              {status[details.stage.toLowerCase()]}
            </Button>
          </Tags>
          <Desc>
            <Title data-digix="Proposal-Title">
              {proposalVersion ? proposalVersion.dijixObject.title : title}
            </Title>
            <p data-digix="Proposal-Short-Desc">
              {proposalVersion ? proposalVersion.dijixObject.description : ''}
            </p>
            <ViewLink role="link" onClick={this.redirectToProposalPage}>
              {cardTranslation.view}
            </ViewLink>
          </Desc>
        </AboutProposal>
        <AboutProposal>
          <Author>
            {cardTranslation.by}{' '}
            <AuthorName style={{ pointerEvents: 'none' }} data-digix="Proposal-Author">
              {displayName}
            </AuthorName>
          </Author>

          <LikeButton
            kind="text"
            xsmall
            disabled={!canLike}
            hasVoted={liked}
            likes={likeCount}
            onClick={() => this.toggleLike()}
            translations={cardTranslation}
          />
        </AboutProposal>
      </Details>
    );
  }
}

const { bool, func, object, number, string } = PropTypes;
Proposal.propTypes = {
  AddressDetails: object,
  ChallengeProof: object,
  details: object.isRequired,
  liked: bool,
  likes: number,
  title: string,
  history: object.isRequired,
  displayName: string.isRequired,
  likeProposalAction: func.isRequired,
  unlikeProposalAction: func.isRequired,
  getUserProposalLikeStatusAction: func.isRequired,
  userDetails: object.isRequired,
  userProposalLike: object.isRequired,
  translations: object.isRequired,
};

const mapStateToProps = state => ({
  AddressDetails: state.infoServer.AddressDetails,
  ChallengeProof: state.daoServer.ChallengeProof,
  userProposalLike: state.daoServer.UserProposalLike,
});

Proposal.defaultProps = {
  AddressDetails: {
    data: undefined,
  },
  ChallengeProof: undefined,
  liked: false,
  likes: undefined,
  title: '',
};

export default connect(
  mapStateToProps,
  {
    likeProposalAction: likeProposal,
    unlikeProposalAction: unlikeProposal,
    getUserProposalLikeStatusAction: getUserProposalLikeStatus,
  }
)(Proposal);

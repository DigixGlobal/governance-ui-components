import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import { Button } from '@digix/gov-ui/components/common/elements/index';

import {
  Details,
  ProposalCard,
  TagsContainer,
  Title,
  Description,
  ProposalFooter,
  PostedBy,
  PostedByLink,
} from '@digix/gov-ui/components/proposal-card/style';

import LikeButton from '@digix/gov-ui/components/common/elements/like';
import { initializePayload } from '@digix/gov-ui/api';
import {
  likeProposal,
  unlikeProposal,
  getUserProposalLikeStatus,
} from '@digix/gov-ui/reducers/dao-server/actions';
import { withFetchUser } from '@digix/gov-ui/api/graphql-queries/users';

class Proposal extends React.PureComponent {
  toggleLike = () => {
    const {
      ChallengeProof,
      details,
      likeProposalAction,
      unlikeProposalAction,
      getUserProposalLikeStatusAction,
      userProposalLike,
      liked,
    } = this.props;

    const isLiked =
      userProposalLike.data && userProposalLike.data.proposalId === details.proposalId
        ? userProposalLike.data.liked
        : liked;

    const payload = initializePayload(ChallengeProof);

    const options = {
      ...payload,
      proposalId: details.proposalId,
      token: payload.authToken,
    };

    if (!isLiked) {
      likeProposalAction(options);
    } else {
      unlikeProposalAction(options);
    }
    getUserProposalLikeStatusAction({
      proposalId: details.proposalId,
      client: ChallengeProof.data.client,
      token: ChallengeProof.data['access-token'],
      uid: ChallengeProof.data.uid,
    });
  };

  render() {
    const {
      details,
      displayName,
      liked,
      likes,
      title,
      userData,
      userDetails,
      userProposalLike,
      translations,
    } = this.props;

    const likeStatus =
      userProposalLike.data && userProposalLike.data.proposalId === details.proposalId
        ? userProposalLike.data
        : { liked, likes };

    const proposalVersion =
      details.proposalVersions && details.proposalVersions.length > 0
        ? details.proposalVersions[details.proposalVersions.length - 1]
        : undefined;

    // const canCreate = userDetails && userDetails.data.isParticipant;
    const canLike = userDetails && userDetails.data.address;
    // const isForumAdmin = userData && userData.isForumAdmin;

    const {
      data: {
        dashboard: { ProposalCard: cardTranslation },
        project: { status },
      },
    } = translations;

    return (
      <Details>
        <ProposalCard>
          <TagsContainer>
            <Button kind="tag" showIcon>
              {status[details.stage.toLowerCase()]}
            </Button>
          </TagsContainer>
          <Description>
            <Title>{proposalVersion ? proposalVersion.dijixObject.title : title}</Title>
            <p>{proposalVersion ? proposalVersion.dijixObject.description : ''}</p>
          </Description>
          <ProposalFooter>
            <PostedBy>
              {cardTranslation.by}{' '}
              <PostedByLink style={{ pointerEvents: 'none' }}>{displayName}</PostedByLink>
            </PostedBy>
            {canLike && (
              <LikeButton
                kind="text"
                xsmall
                hasVoted={likeStatus.liked}
                likes={!likeStatus.likes ? 0 : likeStatus.likes}
                onClick={() => this.toggleLike()}
                translations={cardTranslation}
              />
            )}
          </ProposalFooter>
        </ProposalCard>
      </Details>
    );
  }
}
const { bool, func, object, number, string } = PropTypes;

Proposal.propTypes = {
  ChallengeProof: object,
  details: object.isRequired,
  liked: bool,
  likes: number,
  title: string,
  displayName: string.isRequired,
  likeProposalAction: func.isRequired,
  unlikeProposalAction: func.isRequired,
  getUserProposalLikeStatusAction: func.isRequired,
  userData: object,
  userDetails: object.isRequired,
  userProposalLike: object.isRequired,
  translations: object.isRequired,
};

const mapStateToProps = state => ({
  ChallengeProof: state.daoServer.ChallengeProof,
  userProposalLike: state.daoServer.UserProposalLike,
});

Proposal.defaultProps = {
  ChallengeProof: undefined,
  liked: false,
  likes: undefined,
  title: '',
  userData: undefined,
};

export default withFetchUser(
  connect(
    mapStateToProps,
    {
      likeProposalAction: likeProposal,
      unlikeProposalAction: unlikeProposal,
      getUserProposalLikeStatusAction: getUserProposalLikeStatus,
    }
  )(Proposal)
);

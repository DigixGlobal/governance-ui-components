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

  redirectToProposalPage = () => {
    const { AddressDetails, details, history } = this.props;

    const userType = getUserStatus(AddressDetails.data, UserStatus);
    LogDashboard.viewProject(userType);
    history.push(`/proposals/${details.proposalId}`);
  };

  render() {
    const {
      details,
      displayName,
      liked,
      likes,
      title,
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
            hasVoted={likeStatus.liked}
            likes={!likeStatus.likes ? 0 : likeStatus.likes}
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

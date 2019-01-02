import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { H2 } from '@digix/gov-ui/components/common/common-styles';
import { Button, Icon } from '@digix/gov-ui/components/common/elements/index';

import {
  ProposaDetaillWrapper,
  ProposalCard,
  TagsContainer,
  Description,
  ProposalLink,
  ProposalFooter,
  PostedBy,
  PostedByLink,
} from '@digix/gov-ui/components/proposal-card/style';

import LikeButton from '@digix/gov-ui/components/common/elements/like';
import { initializePayload } from '@digix/gov-ui/api';
import { likeProposal, unlikeProposal } from '@digix/gov-ui/reducers/dao-server/actions';

class Proposal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      liked: this.props.liked,
    };
  }

  toggleLike = () => {
    const { ChallengeProof, details, likeProposalAction, unlikeProposalAction } = this.props;
    let { liked } = this.state;
    const payload = initializePayload(ChallengeProof);

    const options = {
      ...payload,
      proposalId: details.proposalId,
      token: payload.authToken,
    };

    liked = !liked;
    if (liked) {
      likeProposalAction(options);
    } else {
      unlikeProposalAction(options);
    }

    this.setState({ liked });
  };

  render() {
    const { details, userDetails } = this.props;
    const { liked } = this.state;

    const proposalVersion = details.proposalVersions[details.proposalVersions.length - 1];
    const canCreate = userDetails && userDetails.data.isParticipant;
    const canLike = userDetails && userDetails.data.address;

    return (
      <ProposaDetaillWrapper>
        <ProposalCard>
          <TagsContainer>
            <Button kind="flat" style={{ pointerEvents: 'none' }}>
              {details.stage}
            </Button>
          </TagsContainer>
          <Description>
            <H2>{proposalVersion.dijixObject.title}</H2>
            <p>{proposalVersion.dijixObject.description}</p>

            {canCreate ? (
              <ProposalLink
                href={`/proposals/${details.proposalId}`}
                to={`/proposals/${details.proposalId}`}
              >
                View Project
              </ProposalLink>
            ) : (
              <ProposalLink
                disabled
                href={`/proposals/${details.proposalId}`}
                to={`/proposals/${details.proposalId}`}
                style={{ pointerEvents: 'none' }}
              >
                View Project
              </ProposalLink>
            )}
          </Description>
          <ProposalFooter>
            <PostedBy>
              BY <PostedByLink style={{ pointerEvents: 'none' }}>{details.proposer}</PostedByLink>
            </PostedBy>
            {canLike && (
              <LikeButton kind="text" xsmall hasVoted={liked} onClick={() => this.toggleLike()}>
                <Icon kind="like" />
                <span>Like</span>
              </LikeButton>
            )}
          </ProposalFooter>
        </ProposalCard>
      </ProposaDetaillWrapper>
    );
  }
}

const { bool, func, object } = PropTypes;

Proposal.propTypes = {
  ChallengeProof: object,
  details: object.isRequired,
  liked: bool,
  likeProposalAction: func.isRequired,
  unlikeProposalAction: func.isRequired,
  userDetails: object.isRequired,
};

const mapStateToProps = state => ({
  ChallengeProof: state.daoServer.ChallengeProof,
});

Proposal.defaultProps = {
  ChallengeProof: undefined,
  liked: false,
};

export default connect(
  mapStateToProps,
  {
    likeProposalAction: likeProposal,
    unlikeProposalAction: unlikeProposal,
  }
)(Proposal);

import React from 'react';
import PropTypes from 'prop-types';
import { H2 } from '../common/common-styles';
import { Button, Icon } from '../common/elements/index';

import {
  ProposaDetaillWrapper,
  ProposalCard,
  TagsContainer,
  Description,
  ProposalLink,
  ProposalFooter,
  PostedBy,
  PostedByLink,
  LikeButton,
} from './style';

export default class Proposal extends React.Component {
  render() {
    const { details, userDetails, liked } = this.props;

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
              <LikeButton kind="text" xsmall hasVoted={liked}>
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

const { bool, object } = PropTypes;
Proposal.propTypes = {
  details: object.isRequired,
  userDetails: object.isRequired,
  liked: bool,
};

Proposal.defaultProps = {
  liked: false,
};

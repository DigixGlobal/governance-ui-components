import React from 'react';
import PropTypes from 'prop-types';
import { H2 } from '../common/common-styles';
import Button from '../common/elements/buttons/index';
import Vote from '../common/elements/vote/index';

import {
  ProposaDetaillWrapper,
  ProposalCard,
  TagsContainer,
  Description,
  ProposalLink,
  ProposalFooter,
  PostedBy,
  PostedByLink,
} from './style';

export default class Proposal extends React.Component {
  render() {
    const { details } = this.props;
    return (
      <ProposaDetaillWrapper>
        <ProposalCard>
          <TagsContainer>
            <Button kind="flat" style={{ pointerEvents: 'none' }}>
              {details.stage}
            </Button>
          </TagsContainer>
          <Description>
            <H2>{details.proposalVersions[0].title}</H2>
            <p>{details.proposalVersions[0].description}</p>
            <ProposalLink
              href={`/proposals/${details.proposalId}`}
              to={`/proposals/${details.proposalId}`}
            >
              View Project
            </ProposalLink>
          </Description>
          <ProposalFooter>
            <PostedBy>
              BY <PostedByLink style={{ pointerEvents: 'none' }}>{details.proposer}</PostedByLink>
            </PostedBy>
            <Vote hasVoted />
          </ProposalFooter>
        </ProposalCard>
      </ProposaDetaillWrapper>
    );
  }
}

Proposal.propTypes = {
  details: PropTypes.object.isRequired,
};

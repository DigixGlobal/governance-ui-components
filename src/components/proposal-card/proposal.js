import React from 'react';
import PropTypes from 'prop-types';
import H2 from '../common/common-styles';
import Button from '../common/elements/buttons/index';

import {
  ProposaDetaillWrapper,
  ProposalCard,
  TagsContainer,
  Description,
  ProposalFooter,
  PostedBy,
  UpVote,
} from './style';

export default class Proposal extends React.Component {
  render() {
    const { details } = this.props;
    return (
      <ProposaDetaillWrapper>
        <ProposalCard>
          <TagsContainer>
            <Button kind="tag" uppercase href="/#">
              {details.stage}
            </Button>
          </TagsContainer>
          <Description>
            <H2>{details.proposalVersions[0].title}</H2>
            <p>{details.proposalVersions[0].description}</p>
            <a href=".">View Project</a>
          </Description>
          <ProposalFooter>
            <PostedBy>BY {details.proposer}</PostedBy>
            <UpVote>LIKE</UpVote>
          </ProposalFooter>
        </ProposalCard>
      </ProposaDetaillWrapper>
    );
  }
}

ProposalCard.propTypes = {
  details: PropTypes.object.isRequired,
};

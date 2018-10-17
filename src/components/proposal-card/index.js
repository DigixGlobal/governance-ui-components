import React from 'react';
import PropTypes from 'prop-types';
import Proposal from './proposal';
import Milestones from './milestones';
import Stats from './stats';

import { ProposalWrapper, ProposalContainer } from './style';

export default class ProposalCard extends React.Component {
  render() {
    const { proposal } = this.props;
    return (
      <ProposalWrapper>
        <ProposalContainer>
          <Proposal details={proposal} />
          <Stats details={proposal} />
          <Milestones details={proposal} />
        </ProposalContainer>
        {/* <ProgressContainer>
          <Progress />
        </ProgressContainer> */}
      </ProposalWrapper>
    );
  }
}

ProposalCard.propTypes = {
  proposal: PropTypes.object.isRequired,
};

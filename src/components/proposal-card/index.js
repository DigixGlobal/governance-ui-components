import React from 'react';
import PropTypes from 'prop-types';
import Proposal from './proposal';
import Milestones from './milestones';
import Stats from './stats';

import { ProposalWrapper, ProposalContainer } from './style';

export default class ProposalCard extends React.Component {
  render() {
    const { history, proposal, userDetails } = this.props;
    return (
      <ProposalWrapper>
        <ProposalContainer>
          <Proposal details={proposal} userDetails={userDetails} />
          <Stats details={proposal} />
          <Milestones details={proposal} history={history} userDetails={userDetails} />
        </ProposalContainer>
      </ProposalWrapper>
    );
  }
}

const { object } = PropTypes;
ProposalCard.propTypes = {
  history: object.isRequired,
  proposal: object.isRequired,
  userDetails: object.isRequired,
};

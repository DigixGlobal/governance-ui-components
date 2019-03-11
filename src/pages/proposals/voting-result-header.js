import React from 'react';
import PropTypes from 'prop-types';

import { SubTitle } from './style';

const VotingResultHeader = ({ votingRound }) => {
  switch (votingRound) {
    case -1:
      return <SubTitle>Moderator Approval</SubTitle>;
    case 0:
      return <SubTitle>Proposal Vote</SubTitle>;
    case 1:
      return <SubTitle>Review Vote</SubTitle>;
    case 2:
      return <SubTitle>Review Vote 2</SubTitle>;

    default:
      return null;
  }
};

VotingResultHeader.propTypes = {
  votingRound: PropTypes.number,
};

VotingResultHeader.defaultProps = {
  votingRound: undefined,
};

export default VotingResultHeader;

import React from 'react';
import PropTypes from 'prop-types';

import { AccordionHeading } from './style';

const VotingResultHeader = ({ votingRound }) => {
  switch (votingRound) {
    case -1:
      return <AccordionHeading uppercase>Moderator Approval</AccordionHeading>;
    case 0:
      return <AccordionHeading uppercase>Proposal Vote</AccordionHeading>;
    case 1:
      return <AccordionHeading uppercase>Review Vote</AccordionHeading>;
    case 2:
      return <AccordionHeading uppercase>Review Vote 2</AccordionHeading>;

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

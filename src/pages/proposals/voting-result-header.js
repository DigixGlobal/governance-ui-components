import React from 'react';
import PropTypes from 'prop-types';

import { AccordionHeading } from './style';

const VotingResultHeader = ({ votingRound, translations }) => {
  switch (votingRound) {
    case -1:
      return <AccordionHeading uppercase>{translations.moderatorApproval}</AccordionHeading>;
    case 0:
      return <AccordionHeading uppercase>{translations.proposalVote}</AccordionHeading>;
    case 1:
      return <AccordionHeading uppercase>{translations.reviewVote}</AccordionHeading>;
    case 2:
      return <AccordionHeading uppercase>{`${translations.reviewVote} 2`}</AccordionHeading>;

    default:
      return null;
  }
};

VotingResultHeader.propTypes = {
  votingRound: PropTypes.number,
  translations: PropTypes.object.isRequired,
};

VotingResultHeader.defaultProps = {
  votingRound: undefined,
};

export default VotingResultHeader;

import React from 'react';

import ParticipationReward from '@digix/gov-ui/pages/user/wallet/sections/participation-reward';
import VotingStake from '@digix/gov-ui/pages/user/wallet/sections/voting-stake';
import { QtrSummary } from '@digix/gov-ui/pages/user/wallet/style';

class QuarterSummary extends React.Component {
  render() {
    return (
      <QtrSummary>
        <VotingStake />
        <ParticipationReward />
      </QtrSummary>
    );
  }
}

export default QuarterSummary;

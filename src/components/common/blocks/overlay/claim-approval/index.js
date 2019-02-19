import React from 'react';

import ProgressBar from '@digix/gov-ui/components/common/blocks/progress-bar';
import { Button } from '@digix/gov-ui/components/common/elements/index';

import {
  IntroContainer,
  OverlayHeader as Header,
  Notifications,
} from '@digix/gov-ui/components/common/common-styles';

class ClaimApprovalOverlay extends React.Component {
  render() {
    return (
      <IntroContainer>
        <Header uppercase>Claim Approval</Header>

        <Notifications info>
          Please note that there was a high volume of users who participated in this approval. As
          such, we have to split this claim into
          <span className="highlight">3 Transactions</span>
          <ProgressBar variant="determinate" value={33} />
        </Notifications>

        <Button secondary fluid large onClick={this.handleButtonClick}>
          Confirming Claim [1/3]
        </Button>
      </IntroContainer>
    );
  }
}

ClaimApprovalOverlay.propTypes = {};

export default ClaimApprovalOverlay;

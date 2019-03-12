import React from 'react';
import PropTypes from 'prop-types';

import ProgressBar from '@digix/gov-ui/components/common/blocks/progress-bar';
import { Button } from '@digix/gov-ui/components/common/elements/index';

import {
  IntroContainer,
  OverlayHeader as Header,
  Notifications,
} from '@digix/gov-ui/components/common/common-styles';

class ClaimApprovalOverlay extends React.Component {
  render() {
    const { total, current, onClaim } = this.props;
    const enableClaim = current > 0 && current <= total && onClaim;
    return (
      <IntroContainer>
        <Header uppercase>Claim Approval</Header>

        <Notifications info centered style={{ display: 'block' }}>
          Please note that there was a high volume of users who participated in this approval. As
          such, we have to split this claim into
          <span className="highlight">{total} Transactions</span>
          <ProgressBar color="secondary" variant="determinate" value={33} />
        </Notifications>

        <Button
          secondary
          disabled={!enableClaim}
          data-digix="Confirm-Claim-Button"
          fluid
          large
          onClick={onClaim}
        >
          Confirming Claim [{current}/{total}]
        </Button>
      </IntroContainer>
    );
  }
}

const { number, func } = PropTypes;
ClaimApprovalOverlay.propTypes = {
  total: number,
  current: number,
  onClaim: func.isRequired,
};

ClaimApprovalOverlay.defaultProps = {
  total: 0,
  current: 0,
};

export default ClaimApprovalOverlay;

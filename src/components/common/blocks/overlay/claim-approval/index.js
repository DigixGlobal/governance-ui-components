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
    console.log(this.props.translations);
    const {
      total,
      current,
      onClaim,
      translations: {
        project: { overlays },
        project,
        buttons,
      },
    } = this.props;
    const enableClaim = current > 0 && current <= total && onClaim;
    const progresss = (current / total) * 100;
    return (
      <IntroContainer>
        <Header uppercase>{overlays.claimApprovalHeader}</Header>

        <Notifications info centered style={{ display: 'block' }}>
          {overlays.claimApprovalDescription}
          <span className="highlight">
            {total} {project.transactions}
          </span>
          <ProgressBar color="secondary" variant="determinate" value={progresss} />
        </Notifications>

        <Button
          secondary
          disabled={!enableClaim}
          data-digix="Confirm-Claim-Button"
          fluid
          large
          onClick={onClaim}
        >
          {buttons.confirmingClaim} [{current}/{total}]
        </Button>
      </IntroContainer>
    );
  }
}

const { number, func, object } = PropTypes;
ClaimApprovalOverlay.propTypes = {
  total: number,
  current: number,
  onClaim: func.isRequired,
  translations: object.isRequired,
};

ClaimApprovalOverlay.defaultProps = {
  total: 0,
  current: 0,
};

export default ClaimApprovalOverlay;

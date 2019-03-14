import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import RedeemBadge from '@digix/gov-ui/pages/user/profile/buttons/redeem-badge';
import { Button, Icon } from '@digix/gov-ui/components/common/elements';
import { DEFAULT_STAKE_PER_DGD } from '@digix/gov-ui/constants';
import { getDaoConfig, getDaoDetails } from '@digix/gov-ui/reducers/info-server/actions';
import { inLockingPhase, truncateNumber } from '@digix/gov-ui/utils/helpers';
import { showHideLockDgdOverlay } from '@digix/gov-ui/reducers/gov-ui/actions';
import { withFetchAddress } from '@digix/gov-ui/api/graphql-queries/address';

import {
  Actions,
  Criteria,
  Data,
  Label,
  Moderation,
  ModeratorReqs,
  Plus,
  ReqLabel,
} from '@digix/gov-ui/pages/user/profile/style';

class ModeratorRequirements extends React.Component {
  componentDidMount() {
    this.props.getDaoConfig();
    this.props.getDaoDetails();
    this.props.subscribeToAddress();
  }

  getStakePerDgd = () => {
    const DaoDetails = this.props.DaoDetails.data;
    const { startOfMainphase, startOfNextQuarter } = DaoDetails;

    if (inLockingPhase(DaoDetails)) {
      return DEFAULT_STAKE_PER_DGD;
    }

    const currentTime = Date.now() / 1000;
    return (startOfNextQuarter - currentTime) / (startOfNextQuarter - startOfMainphase);
  };

  getModeratorRequirements = () => {
    const { DaoConfig } = this.props;
    const { lockedDgdStake, reputationPoint } = this.props.AddressDetails;
    const config = DaoConfig.data;

    const currentReputation = Number(reputationPoint);
    const minReputation = Number(config.CONFIG_MINIMUM_REPUTATION_FOR_MODERATOR);
    const requiredReputation = Math.max(0, minReputation - currentReputation);

    const currentStake = Number(lockedDgdStake);
    const minStake = Number(config.CONFIG_MINIMUM_DGD_FOR_MODERATOR);
    const stakePerDgd = this.getStakePerDgd();
    const requiredStake = Math.max(0, (minStake - currentStake) / stakePerDgd);

    const requirements = {
      reputation: truncateNumber(requiredReputation),
      stake: truncateNumber(requiredStake),
    };

    return requirements;
  };

  showLockDgdOverlay() {
    this.props.showHideLockDgdOverlay(true, undefined, 'Profile Page');
  }

  render() {
    const { isModerator } = this.props.AddressDetails;
    const { reputation, stake } = this.getModeratorRequirements();

    const hasRequirements = reputation > 0 || stake > 0;
    const hasModeratorRequirements = !isModerator && hasRequirements;

    if (!hasModeratorRequirements) {
      return null;
    }

    return (
      <Moderation data-digix="Profile-ModerationRequirements">
        <Label>TO GAIN MODERATOR STATUS, YOU WILL NEED ANOTHER</Label>
        <Criteria>
          <ModeratorReqs>
            <Data data-digix="Profile-ModerationRequirements-Reputation">{reputation}</Data>
            <ReqLabel>Reputation Points</ReqLabel>
          </ModeratorReqs>
          <Plus>
            <Icon kind="plus" />
          </Plus>
          <ModeratorReqs>
            <Data data-digix="Profile-ModerationRequirements-Stake">{stake}</Data>
            <ReqLabel>Stake</ReqLabel>
          </ModeratorReqs>
        </Criteria>
        <Actions>
          <RedeemBadge history={this.props.history} />
          <Button
            primary
            data-digix="Profile-LockMoreDgd-Cta"
            onClick={() => this.showLockDgdOverlay()}
          >
            Lock More DGD
          </Button>
        </Actions>
      </Moderation>
    );
  }
}

const { func, object } = PropTypes;

ModeratorRequirements.propTypes = {
  AddressDetails: object.isRequired,
  DaoConfig: object,
  DaoDetails: object,
  history: object.isRequired,
  getDaoConfig: func.isRequired,
  getDaoDetails: func.isRequired,
  showHideLockDgdOverlay: func.isRequired,
  subscribeToAddress: func.isRequired,
};

ModeratorRequirements.defaultProps = {
  DaoConfig: undefined,
  DaoDetails: undefined,
};

const mapStateToProps = ({ infoServer }) => ({
  DaoConfig: infoServer.DaoConfig,
  DaoDetails: infoServer.DaoDetails,
});

export default withFetchAddress(
  connect(
    mapStateToProps,
    {
      getDaoConfig,
      getDaoDetails,
      showHideLockDgdOverlay,
    }
  )(ModeratorRequirements)
);

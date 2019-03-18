/* eslint-disable react/no-unused-prop-types */

import React from 'react';
import PropTypes from 'prop-types';
import { truncateNumber } from '@digix/gov-ui/utils/helpers';
import { withFetchProposal } from '@digix/gov-ui/api/graphql-queries/proposal';
import { Data, InfoItem, ItemTitle } from '@digix/gov-ui/pages/proposals/style';

class ProposalFundings extends React.Component {
  getMilestonFundDifference(milestoneFunds) {
    const proposal = this.props.proposalDetails.data;
    const { milestones } = proposal.changedFundings;
    let difference = null;

    const updatedMilestoneFunds = milestones.reduce(
      (acc, milestone) => Number(acc.updated) + Number(milestone.updated)
    );

    difference = updatedMilestoneFunds - milestoneFunds;
    if (difference === 0) {
      return undefined;
    }

    return truncateNumber(difference);
  }

  getRewardDifference() {
    const proposal = this.props.proposalDetails.data;
    const { updated, original } = proposal.changedFundings.finalReward;
    let difference = null;

    difference = Number(updated) - Number(original);
    if (difference === 0) {
      return undefined;
    }

    return truncateNumber(difference);
  }

  getChangedFundings() {
    const proposal = this.props.proposalDetails.data;
    if (!proposal.isFundingChanged) {
      return {
        milestoneFunds: null,
        milestoneFundDifference: null,
        reward: null,
        rewardDifference: null,
      };
    }

    const { finalReward, milestones } = proposal.changedFundings;
    const milestoneFunds = milestones.reduce(
      (acc, milestone) => Number(acc.original) + Number(milestone.original)
    );

    const milestoneFundDifference = this.getMilestonFundDifference(milestoneFunds);
    const reward = truncateNumber(Number(finalReward.original));
    const rewardDifference = this.getRewardDifference();

    return {
      milestoneFunds,
      milestoneFundDifference,
      reward,
      rewardDifference,
    };
  }

  render() {
    const { currentVersion } = this.props;
    const proposal = this.props.proposalDetails.data;
    const proposalVersion = proposal.proposalVersions[currentVersion];
    const { isFundingChanged } = proposal;

    let {
      milestoneFunds,
      milestoneFundDifference,
      reward,
      rewardDifference,
    } = this.getChangedFundings();

    if (!isFundingChanged) {
      const { finalReward, milestoneFundings } = proposalVersion;
      reward = truncateNumber(finalReward);
      milestoneFunds = milestoneFundings.reduce((total, milestone) => total + Number(milestone), 0);
    }

    return (
      <InfoItem outlined>
        <ItemTitle>Funding</ItemTitle>
        <Data>
          <div className="milestones">
            <span data-digix="funding-amount-label">{milestoneFunds}</span>
            {milestoneFundDifference && (
              <span data-digix="edit-funding-amount-label">
                {milestoneFundDifference > 0
                  ? ` + ${milestoneFundDifference}`
                  : ` - ${Math.abs(milestoneFundDifference)}`}
              </span>
            )}
            &nbsp;ETH
            <span className="label">&nbsp;Milestones</span>
          </div>
          <div className="reward">
            <span data-digix="reward-amount-label">{reward} </span>
            {rewardDifference && (
              <span data-digix="edit-reward-amount-label">
                {rewardDifference > 0
                  ? ` + ${rewardDifference} `
                  : ` - ${Math.abs(rewardDifference)} `}
              </span>
            )}
            &nbsp;ETH
            <span className="label">&nbsp;Reward</span>
          </div>
        </Data>
      </InfoItem>
    );
  }
}

const { number, object } = PropTypes;

ProposalFundings.propTypes = {
  currentVersion: number.isRequired,
  match: object.isRequired,
  proposalDetails: object.isRequired,
};

export default withFetchProposal(ProposalFundings);

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
    let milestoneFunds = milestones.reduce(
      (acc, milestone) => Number(acc.original) + Number(milestone.original)
    );

    // NOTE: these are already truncated
    const milestoneFundDifference = this.getMilestonFundDifference(milestoneFunds);
    const rewardDifference = this.getRewardDifference();

    let reward = finalReward.original;
    reward = truncateNumber(reward);
    milestoneFunds = truncateNumber(milestoneFunds);

    return {
      milestoneFunds,
      milestoneFundDifference,
      reward,
      rewardDifference,
    };
  }

  render() {
    const {
      currentVersion,
      translations: { project },
    } = this.props;
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
      milestoneFunds = milestoneFundings.reduce((total, milestone) => total + Number(milestone), 0);
      milestoneFunds = truncateNumber(milestoneFunds);
      reward = truncateNumber(finalReward);
    }

    return (
      <InfoItem outlined>
        <ItemTitle>{project.funding}</ItemTitle>
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
            <span className="label">&nbsp;{project.milestones}</span>
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
            <span className="label">&nbsp;{project.reward}</span>
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
  translations: object.isRequired,
};

export default withFetchProposal(ProposalFundings);

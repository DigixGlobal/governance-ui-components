/* eslint-disable react/display-name, react/prop-types */

import React from 'react';
import gql from 'graphql-tag';

import { Query } from 'react-apollo';

export const fetchProposal = gql`
  query findProposal($proposalId: String!) {
    fetchProposal(proposalId: $proposalId) {
      id
      proposalId
      proposer
      endorser
      stage
      timeCreated
      finalVersionIpfsDoc
      prl
      title
      isDigix
      isActive
      isSpecial
      claimableFunding
      currentMilestone
      currentVotingRound
      isFundingChanged
      uintConfigs {
        CONFIG_LOCKING_PHASE_DURATION
        CONFIG_QUARTER_DURATION
        CONFIG_VOTING_COMMIT_PHASE
        CONFIG_VOTING_PHASE_TOTAL
        CONFIG_INTERIM_COMMIT_PHASE
        CONFIG_INTERIM_PHASE_TOTAL
        CONFIG_DRAFT_QUORUM_FIXED_PORTION_NUMERATOR
        CONFIG_DRAFT_QUORUM_FIXED_PORTION_DENOMINATOR
        CONFIG_DRAFT_QUORUM_SCALING_FACTOR_NUMERATOR
        CONFIG_DRAFT_QUORUM_SCALING_FACTOR_DENOMINATOR
        CONFIG_VOTING_QUORUM_FIXED_PORTION_NUMERATOR
        CONFIG_VOTING_QUORUM_FIXED_PORTION_DENOMINATOR
        CONFIG_VOTING_QUORUM_SCALING_FACTOR_NUMERATOR
        CONFIG_VOTING_QUORUM_SCALING_FACTOR_DENOMINATOR
        CONFIG_DRAFT_QUOTA_NUMERATOR
        CONFIG_DRAFT_QUOTA_DENOMINATOR
        CONFIG_VOTING_QUOTA_NUMERATOR
        CONFIG_VOTING_QUOTA_DENOMINATOR
        CONFIG_QUARTER_POINT_DRAFT_VOTE
        CONFIG_QUARTER_POINT_VOTE
        CONFIG_QUARTER_POINT_INTERIM_VOTE
        CONFIG_MINIMAL_QUARTER_POINT
        CONFIG_QUARTER_POINT_MILESTONE_COMPLETION_PER_10000ETH
        CONFIG_BONUS_REPUTATION_NUMERATOR
        CONFIG_BONUS_REPUTATION_DENOMINATOR
        CONFIG_SPECIAL_PROPOSAL_COMMIT_PHASE
        CONFIG_SPECIAL_PROPOSAL_PHASE_TOTAL
        CONFIG_SPECIAL_QUOTA_NUMERATOR
        CONFIG_SPECIAL_QUOTA_DENOMINATOR
        CONFIG_SPECIAL_PROPOSAL_QUORUM_NUMERATOR
        CONFIG_SPECIAL_PROPOSAL_QUORUM_DENOMINATOR
        CONFIG_MAXIMUM_REPUTATION_DEDUCTION
        CONFIG_PUNISHMENT_FOR_NOT_LOCKING
        CONFIG_REPUTATION_PER_EXTRA_QP_NUM
        CONFIG_REPUTATION_PER_EXTRA_QP_DEN
        CONFIG_QUARTER_POINT_SCALING_FACTOR
        CONFIG_REPUTATION_POINT_SCALING_FACTOR
        CONFIG_MODERATOR_MINIMAL_QUARTER_POINT
        CONFIG_MODERATOR_QUARTER_POINT_SCALING_FACTOR
        CONFIG_MODERATOR_REPUTATION_POINT_SCALING_FACTOR
        CONFIG_PORTION_TO_MODERATORS_NUM
        CONFIG_PORTION_TO_MODERATORS_DEN
        CONFIG_DRAFT_VOTING_PHASE
        CONFIG_REPUTATION_POINT_BOOST_FOR_BADGE
        CONFIG_FINAL_REWARD_SCALING_FACTOR_NUMERATOR
        CONFIG_FINAL_REWARD_SCALING_FACTOR_DENOMINATOR
        CONFIG_MAXIMUM_MODERATOR_REPUTATION_DEDUCTION
        CONFIG_REPUTATION_PER_EXTRA_MODERATOR_QP_NUM
        CONFIG_REPUTATION_PER_EXTRA_MODERATOR_QP_DEN
        CONFIG_VOTE_CLAIMING_DEADLINE
        CONFIG_MINIMUM_LOCKED_DGD
        CONFIG_MINIMUM_DGD_FOR_MODERATOR
        CONFIG_MINIMUM_REPUTATION_FOR_MODERATOR
        CONFIG_PREPROPOSAL_COLLATERAL
        CONFIG_MAX_FUNDING_FOR_NON_DIGIX
        CONFIG_MAX_MILESTONES_FOR_NON_DIGIX
        CONFIG_NON_DIGIX_PROPOSAL_CAP_PER_QUARTER
        CONFIG_PROPOSAL_DEAD_DURATION
        CONFIG_CARBON_VOTE_REPUTATION_BONUS
      }
      changedFundings {
        milestones {
          original
          updated
        }
        finalReward {
          original
          updated
        }
      }
      draftVoting {
        startTime
        votingDeadline
        totalVoterStake
        totalVoterCount
        yes
        no
        quorum
        quota
        passed
        claimed
        funded
        currentClaimStep
      }
      proposalVersions {
        id
        docIpfsHash
        created
        milestoneFundings
        finalReward
        moreDocs
        totalFunding
        dijixObject {
          title
          description
          details
          milestones {
            title
            fund
            description
          }
          finalReward
          images
        }
      }
      votingStage
      votingRounds {
        startTime
        commitDeadline
        revealDeadline
        quorum
        quota
        totalCommitCount
        totalVoterCount
        totalVoterStake
        yes
        no
        claimed
        passed
        funded
        currentClaimStep
      }
      currentMilestoneIndex
      currentMilestoneStart
    }
  }
`;

const proposalSubscription = gql`
  subscription {
    proposalUpdated {
      id
      proposalId
      proposer
      endorser
      stage
      timeCreated
      finalVersionIpfsDoc
      prl
      title
      isDigix
      isActive
      isSpecial
      claimableFunding
      currentMilestone
      currentVotingRound
      isFundingChanged
      uintConfigs {
        CONFIG_LOCKING_PHASE_DURATION
        CONFIG_QUARTER_DURATION
        CONFIG_VOTING_COMMIT_PHASE
        CONFIG_VOTING_PHASE_TOTAL
        CONFIG_INTERIM_COMMIT_PHASE
        CONFIG_INTERIM_PHASE_TOTAL
        CONFIG_DRAFT_QUORUM_FIXED_PORTION_NUMERATOR
        CONFIG_DRAFT_QUORUM_FIXED_PORTION_DENOMINATOR
        CONFIG_DRAFT_QUORUM_SCALING_FACTOR_NUMERATOR
        CONFIG_DRAFT_QUORUM_SCALING_FACTOR_DENOMINATOR
        CONFIG_VOTING_QUORUM_FIXED_PORTION_NUMERATOR
        CONFIG_VOTING_QUORUM_FIXED_PORTION_DENOMINATOR
        CONFIG_VOTING_QUORUM_SCALING_FACTOR_NUMERATOR
        CONFIG_VOTING_QUORUM_SCALING_FACTOR_DENOMINATOR
        CONFIG_DRAFT_QUOTA_NUMERATOR
        CONFIG_DRAFT_QUOTA_DENOMINATOR
        CONFIG_VOTING_QUOTA_NUMERATOR
        CONFIG_VOTING_QUOTA_DENOMINATOR
        CONFIG_QUARTER_POINT_DRAFT_VOTE
        CONFIG_QUARTER_POINT_VOTE
        CONFIG_QUARTER_POINT_INTERIM_VOTE
        CONFIG_MINIMAL_QUARTER_POINT
        CONFIG_QUARTER_POINT_MILESTONE_COMPLETION_PER_10000ETH
        CONFIG_BONUS_REPUTATION_NUMERATOR
        CONFIG_BONUS_REPUTATION_DENOMINATOR
        CONFIG_SPECIAL_PROPOSAL_COMMIT_PHASE
        CONFIG_SPECIAL_PROPOSAL_PHASE_TOTAL
        CONFIG_SPECIAL_QUOTA_NUMERATOR
        CONFIG_SPECIAL_QUOTA_DENOMINATOR
        CONFIG_SPECIAL_PROPOSAL_QUORUM_NUMERATOR
        CONFIG_SPECIAL_PROPOSAL_QUORUM_DENOMINATOR
        CONFIG_MAXIMUM_REPUTATION_DEDUCTION
        CONFIG_PUNISHMENT_FOR_NOT_LOCKING
        CONFIG_REPUTATION_PER_EXTRA_QP_NUM
        CONFIG_REPUTATION_PER_EXTRA_QP_DEN
        CONFIG_QUARTER_POINT_SCALING_FACTOR
        CONFIG_REPUTATION_POINT_SCALING_FACTOR
        CONFIG_MODERATOR_MINIMAL_QUARTER_POINT
        CONFIG_MODERATOR_QUARTER_POINT_SCALING_FACTOR
        CONFIG_MODERATOR_REPUTATION_POINT_SCALING_FACTOR
        CONFIG_PORTION_TO_MODERATORS_NUM
        CONFIG_PORTION_TO_MODERATORS_DEN
        CONFIG_DRAFT_VOTING_PHASE
        CONFIG_REPUTATION_POINT_BOOST_FOR_BADGE
        CONFIG_FINAL_REWARD_SCALING_FACTOR_NUMERATOR
        CONFIG_FINAL_REWARD_SCALING_FACTOR_DENOMINATOR
        CONFIG_MAXIMUM_MODERATOR_REPUTATION_DEDUCTION
        CONFIG_REPUTATION_PER_EXTRA_MODERATOR_QP_NUM
        CONFIG_REPUTATION_PER_EXTRA_MODERATOR_QP_DEN
        CONFIG_VOTE_CLAIMING_DEADLINE
        CONFIG_MINIMUM_LOCKED_DGD
        CONFIG_MINIMUM_DGD_FOR_MODERATOR
        CONFIG_MINIMUM_REPUTATION_FOR_MODERATOR
        CONFIG_PREPROPOSAL_COLLATERAL
        CONFIG_MAX_FUNDING_FOR_NON_DIGIX
        CONFIG_MAX_MILESTONES_FOR_NON_DIGIX
        CONFIG_NON_DIGIX_PROPOSAL_CAP_PER_QUARTER
        CONFIG_PROPOSAL_DEAD_DURATION
        CONFIG_CARBON_VOTE_REPUTATION_BONUS
      }
      changedFundings {
        milestones {
          original
          updated
        }
        finalReward {
          original
          updated
        }
      }
      draftVoting {
        startTime
        votingDeadline
        totalVoterStake
        totalVoterCount
        yes
        no
        quorum
        quota
        passed
        claimed
        funded
        currentClaimStep
      }
      proposalVersions {
        docIpfsHash
        created
        milestoneFundings
        finalReward
        moreDocs
        totalFunding
        dijixObject {
          title
          description
          details
          milestones {
            title
            fund
            description
          }
          finalReward
          images
        }
      }
      votingStage
      votingRounds {
        startTime
        commitDeadline
        revealDeadline
        quorum
        quota
        totalCommitCount
        totalVoterCount
        totalVoterStake
        yes
        no
        claimed
        passed
        funded
        currentClaimStep
      }
      currentMilestoneIndex
      currentMilestoneStart
    }
  }
`;

export const withFetchProposal = Component => props => {
  const {
    match: { params },
  } = props;

  const { id } = params;
  return (
    <Query
      query={fetchProposal}
      fetchPolicy="network-only"
      notifyOnNetworkStatusChange
      variables={{
        proposalId: id,
      }}
    >
      {({ loading, error, data, refetch, subscribeToMore, networkStatus, updateQuery }) => {
        if (networkStatus === 4) return <div>Refetching!</div>;
        if (loading || error) {
          return <div>Fetching Proposal Details</div>;
        }

        const subscribeToProposal = () => {
          subscribeToMore({
            document: proposalSubscription,
            updateQuery: (cache, { subscriptionData }) => {
              const newData = subscriptionData.data;
              if (!newData) {
                return cache;
              }
              cache.fetchProposal = newData.proposalUpdated;
              return { ...cache };
            },
          });
        };

        return (
          <Component
            {...props}
            proposalDetails={{ data: data.fetchProposal }}
            updateQuery={updateQuery}
            refetchProposal={refetch}
            subscribeToProposal={subscribeToProposal}
          />
        );
      }}
    </Query>
  );
};

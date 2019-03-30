import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

export const fetchDaoQuery = gql`
  query fetchDao {
    fetchDao {
      isGlobalRewardsSet
      currentQuarter
      startOfQuarter
      startOfMainphase
      startOfNextQuarter
      totalLockedDgds
      totalModeratorLockedDgds
      nModerators
      nParticipants
    }
  }
`;

export const daoSubscription = gql`
  subscription {
    daoUpdated {
      isGlobalRewardsSet
      currentQuarter
      startOfQuarter
      startOfMainphase
      startOfNextQuarter
      totalLockedDgds
      totalModeratorLockedDgds
      nModerators
      nParticipants
    }
  }
`;

export const withFetchDaoInfo = Component => props => (
  <Query query={fetchDaoQuery}>
    {({ loading, error, data, subscribeToMore }) => {
      if (loading || error) {
        return <Component {...props} />;
      }

      const subscribeToDao = () => {
        subscribeToMore({
          document: daoSubscription,
          updateQuery: (cache, { subscriptionData }) => {
            const newData = subscriptionData.data;
            if (!newData) {
              return;
            }

            cache.fetchDao = { ...newData.daoUpdated };
            return { ...cache };
          },
        });
      };

      return (
        <Component
          {...props}
          daoInfo={data.fetchDao}
          subscribeToDao={subscribeToDao}
        />
      );
    }}
  </Query>
);

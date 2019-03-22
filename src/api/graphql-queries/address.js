import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

export const fetchAddressQuery = gql`
  query fetchAddress {
    fetchCurrentUser {
      address
      claimableDgx
      id
      isModerator
      isParticipant
      lockedDgd
      lockedDgdStake
      reputationPoint
      quarterPoint
      moderatorQuarterPoint
    }
  }
`;

export const addressSubscription = gql`
  subscription {
    userUpdated {
      address
      claimableDgx
      id
      isModerator
      isParticipant
      lockedDgd
      lockedDgdStake
      reputationPoint
      quarterPoint
    }
  }
`;

export const withFetchAddress = Component => props => (
  <Query query={fetchAddressQuery}>
    {({ loading, error, data, subscribeToMore }) => {
      if (loading || error) {
        return null;
      }

      const subscribeToAddress = () => {
        subscribeToMore({
          document: addressSubscription,
          updateQuery: (cache, { subscriptionData }) => {
            const newData = subscriptionData.data;
            if (!newData) {
              return;
            }

            cache.fetchCurrentUser = { ...newData.userUpdated };
            return { ...cache };
          },
        });
      };

      return (
        <Component
          {...props}
          AddressDetails={data.fetchCurrentUser}
          subscribeToAddress={subscribeToAddress}
        />
      );
    }}
  </Query>
);

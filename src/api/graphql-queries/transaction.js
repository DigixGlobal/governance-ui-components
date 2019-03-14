/* eslint-disable react/display-name, react/prop-types */

import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

const searchTransactions = gql`
  query getTransactions($proposalId: String) {
    searchTransactions(proposalId: $proposalId) {
      edges {
        node {
          blockNumber
          id
          txhash
          status
          title
          project
          transactionType
        }
      }
    }
  }
`;

const transactionSubscription = gql`
  subscription getTransactionupdate($proposalId: String!) {
    transactionUpdated(proposalId: $proposalId) {
      blockNumber
      id
      txhash
      status
      title
      project
      transactionType
    }
  }
`;

export const withSearchTransactions = Component => props => {
  const {
    match: { params },
  } = props;
  const { id } = params;

  return (
    <Query query={searchTransactions} variables={{ proposalId: id }} fetchPolicy="network-only">
      {({ loading, error, data, refetch, subscribeToMore }) => {
        if (loading || error) {
          return null;
        }

        const subscribeToTransaction = () => {
          subscribeToMore({
            document: transactionSubscription,
            variables: { proposalId: id },
            updateQuery: (cache, { subscriptionData }) => {
              const newData = subscriptionData.data;
              if (!newData) {
                return cache;
              }
              cache.searchTransactions = newData.transactionUpdated;
              return { ...cache };
            },
          });
        };
        return (
          <Component
            {...props}
            transactions={data.searchTransactions}
            refetchTransactions={refetch}
            subscribeToTransaction={subscribeToTransaction}
          />
        );
      }}
    </Query>
  );
};

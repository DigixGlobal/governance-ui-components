import { ApolloConsumer } from 'react-apollo';
import React from 'react';
import gql from 'graphql-tag';

export const fetchUser = gql`
  query($id: ID!) {
    user(id: $id) {
      id
      address
      dgdBalance
      dgdLocked
    }
  }
`;

export const fetchApproval = gql`
  query($id: ID!) {
    approval(id: $id) {
      id
      from
      to
      dgd
    }
  }
`;

export const fetchUsers = gql`
  query($first: Int!) {
    users(first: $fetch) {
      id
      address
      dgdBalance
      dgdLocked
    }
  }
`;

export const fetchApprovals = gql`
  query($first: Int!) {
    approvals(first: $fetch) {
      id
      from
      to
      dgd
    }
  }
`;

export const withApolloClient = Component => props => (
  <ApolloConsumer>
    {client => (
      <Component
        {...props}
        client={client}
      />
    )}
  </ApolloConsumer>
);


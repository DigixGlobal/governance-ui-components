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
      ethRefund
      dgdToWei
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

export const fetchApproval = gql`
  query($from: String!, $to: String!) {
    approvals(
      first: 1,
      where: {
        from: $from,
        to: $to,
      }
    ) {
      id
      from
      to
      dgd
    }
  }
`;

export const unlockSubscription = gql`
  subscription($address: String!) {
    byAddress: withdraws(
      first: 1
      where: { address: $address }
    ) {
      id
      address
      dgd
      stake
    }
  }
`;

export const approveSubscription = gql`
  subscription($address: String!) {
    byAddress: approvals(
      first: 1
      where: { from: $address }
    ) {
      id
      from
      to
      dgd
    }
  }
`;

export const burnSubscription = gql`
  subscription($address: String!) {
    byAddress: refunds(
      first: 1
      where: { address: $address }
    ) {
      id
      address
      dgd
      eth
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


/* eslint-disable react/display-name, react/prop-types */

import React from 'react';
import gql from 'graphql-tag';
import { Query, Mutation } from 'react-apollo';

const fetchDisplayName = gql`
  query fetchUser {
    currentUser {
      displayName
    }
  }
`;

const fetchUserQuery = gql`
  query fetchUser {
    currentUser {
      id
      address
      email
      username
      displayName
      createdAt
    }
  }
`;

const UserMutations = {
  changeEmail: gql`
    mutation changeEmail($email: String!) {
      changeEmail(input: { email: $email }) {
        user {
          id
          email
        }
        errors {
          field
          message
        }
      }
    }
  `,

  changeUsername: gql`
    mutation changeUsername($username: String!) {
      changeUsername(input: { username: $username }) {
        user {
          id
          displayName
          username
        }
        errors {
          field
          message
        }
      }
    }
  `,
};

export const renderDisplayName = dataDigixAttribute => (
  <Query query={fetchDisplayName}>
    {({ loading, error, data }) => {
      if (loading || error) {
        return null;
      }

      return <span data-digix={dataDigixAttribute}>{data.currentUser.displayName}</span>;
    }}
  </Query>
);

export const withFetchUser = Component => props => (
  <Query query={fetchUserQuery}>
    {({ loading, error, data }) => {
      if (loading) {
        return null;
      }

      if (error) {
        return null;
      }

      return <Component {...props} userData={data.currentUser} />;
    }}
  </Query>
);

export const withChangeEmail = Component => props => (
  <Mutation
    mutation={UserMutations.changeEmail}
    onCompleted={props.onEmailUpdate}
    onError={props.onEmailUpdateError}
  >
    {(mutation, { loading }) => {
      const changeEmail = email => {
        mutation({
          variables: { email },
        });
      };

      if (loading) {
        return <Component {...props} disabled />;
      }

      return <Component {...props} changeEmail={changeEmail} />;
    }}
  </Mutation>
);

export const withChangeUsername = Component => props => (
  <Mutation
    mutation={UserMutations.changeUsername}
    onCompleted={props.onUsernameUpdate}
    onError={props.onUsernameUpdateError}
  >
    {(mutation, { loading }) => {
      const changeUsername = username => {
        mutation({
          variables: { username },
        });
      };

      if (loading) {
        return <Component {...props} disabled />;
      }

      return <Component {...props} changeUsername={changeUsername} />;
    }}
  </Mutation>
);

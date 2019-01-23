/* eslint-disable react/display-name, react/prop-types */

import React from 'react';
import gql from 'graphql-tag';
import { INFO_SERVER } from '@digix/gov-ui/reducers/info-server/constants';
import { requestFromApi } from '@digix/gov-ui/api';
import { Query, Mutation } from 'react-apollo';

export const UsersApi = {
  // users must be an array of addresses
  getPoints: (users, payload) => {
    const getParams = users.join('&address=');
    const requestParams = {
      ...payload,
      method: 'GET',
      url: `${INFO_SERVER}/points?address=${getParams}`,
    };

    return requestFromApi(requestParams);
  },

  /*
   * HELPERS
   */

  ERROR_MESSAGES: {
    getPoints: 'Unable to fetch reputation points for users.',
  },
};

/*
 * GraphQL
 */

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
};

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

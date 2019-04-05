/* eslint-disable react/display-name, react/prop-types */

import React from 'react';
import gql from 'graphql-tag';
import { kycSubscription } from '@digix/gov-ui/api/graphql-queries/kyc';
import { Query, Mutation } from 'react-apollo';
import { injectTranslation } from '@digix/gov-ui/utils/helpers';

export const fetchDisplayName = gql`
  query fetchUser {
    currentUser {
      displayName
    }
  }
`;

export const fetchAppUser = gql`
  query fetchAppUser {
    appUser {
      isUnavailable
    }
  }
`;

export const fetchUserQuery = gql`
  query fetchUser {
    currentUser {
      id
      address
      canComment
      email
      username
      displayName
      createdAt
      isForumAdmin
      isKycOfficer
      kyc {
        id
        status
      }
    }
  }
`;

export const searchUserQuery = gql`
  query searchUsers($query: String!) {
    searchDaoUsers(first: 10, term: $query) {
      nodes {
        id
        displayName
        isBanned
      }
    }
  }
`;

export const UserMutations = {
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

  ban: gql`
    mutation ban($id: String!) {
      banUser(input: { id: $id }) {
        errors {
          field
          message
        }
        user {
          isBanned
        }
      }
    }
  `,

  unban: gql`
    mutation unban($id: String!) {
      unbanUser(input: { id: $id }) {
        errors {
          field
          message
        }
        user {
          isBanned
        }
      }
    }
  `,
};

export const renderDisplayName = (dataDigixAttribute, welcome) => (
  <Query query={fetchDisplayName}>
    {({ loading, error, data }) => {
      if (loading || error || !data.currentUser) {
        return null;
      }

      let { displayName } = data.currentUser;
      if (welcome) {
        displayName = injectTranslation(welcome, { username: displayName });
      }

      return <span data-digix={dataDigixAttribute}>{displayName}</span>;
    }}
  </Query>
);

export const withAppUser = Component => props => (
  <Query query={fetchAppUser}>
    {({ loading, error, data }) => {
      if (loading || error) {
        return null;
      }
      return <Component {...props} appUser={data.appUser} />;
    }}
  </Query>
);

export const withFetchUser = Component => props => (
  <Query query={fetchUserQuery}>
    {({ loading, error, data, refetch, subscribeToMore }) => {
      if (loading || error) {
        return null;
      }

      const subscribeToKyc = () => {
        subscribeToMore({
          document: kycSubscription,
          updateQuery: (cache, { subscriptionData }) => {
            const newData = subscriptionData.data;
            if (!newData) {
              return;
            }

            cache.currentUser.kyc.status = newData.kycUpdated.kyc.status;
            return { ...cache };
          },
        });
      };

      return (
        <Component
          {...props}
          userData={data.currentUser}
          refetchUser={refetch}
          subscribeToKyc={subscribeToKyc}
        />
      );
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

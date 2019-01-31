import _ from 'lodash';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';

import React from 'react';
import { connect } from 'react-redux';
import { ApolloProvider } from 'react-apollo';
import PropTypes from 'prop-types';

import { DAO_SERVER } from '@digix/gov-ui/reducers/dao-server/constants';

const httpLink = createHttpLink({
  uri: `${DAO_SERVER}/api`,
  credentials: 'same-origin',
});

let authorization = null;

// eslint-disable-next-line
const authLink = setContext((_previous, { headers }) => ({
  headers: {
    ...headers,
    ...(authorization || {}),
  },
}));

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

const authenticationSelector = state => _.get(state, 'daoServer.ChallengeProof.data');

const mapStateToProps = state => {
  const authHeaders = authenticationSelector(state);

  if (authHeaders) {
    authorization = _.pick(authHeaders, ['access-token', 'client', 'uid']);
  } else {
    authorization = null;
  }

  return {};
};

const ClientListener = connect(
  mapStateToProps,
  null
)(({ children }) => children);

export const Provider = ({ children }) => (
  <ApolloProvider client={client}>
    <ClientListener>{children}</ClientListener>
  </ApolloProvider>
);
Provider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default client;

import _ from 'lodash';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createHttpLink } from 'apollo-link-http';
import { ApolloLink, split } from 'apollo-link';
import { setContext } from 'apollo-link-context';
import { getMainDefinition } from 'apollo-utilities';

import React from 'react';
import { ApolloProvider } from 'react-apollo';
import PropTypes from 'prop-types';

import ActionCable from 'actioncable';
import ActionCableLink from 'graphql-ruby-client/subscriptions/ActionCableLink';

import SubscriptionClient from '@digix/gov-ui/api/webSocketClient';
import WebSocketLink from '@digix/gov-ui/api/webSocketLink';

import { DAO_SERVER } from '@digix/gov-ui/reducers/dao-server/constants';
import { INFO_SERVER } from '@digix/gov-ui/reducers/info-server/constants';

const httpLink = createHttpLink({
  uri: `${DAO_SERVER}/api`,
  credentials: 'same-origin',
});

let daoAuthorization = null;
let infoAuthorization = null;

export const setDaoAuthorization = authHeaders => {
  daoAuthorization = _.pick(authHeaders, ['access-token', 'client', 'uid']);
};

export const setInfoAuthorization = payload => {
  infoAuthorization = _.pick(payload, ['address', 'message', 'signature']);
};

// eslint-disable-next-line
const authHttp = setContext((_previous, { headers }) => ({
  headers: {
    ...headers,
    ...(daoAuthorization || {}),
  },
}));

let daoCableLink = null;
let daoCable = null;

const daoSocketLink = new ApolloLink((operation, _forward) => {
  if (daoAuthorization) {
    if (!daoCableLink) {
      if (daoCable) {
        daoCable.disconnect();
      }

      const authHeaders = _.chain(daoAuthorization)
        .pick(daoAuthorization, ['access-token', 'client', 'uid'])
        .toPairs()
        .map(pair => _.join(pair, '='))
        .join('&');

      const uri = `${DAO_SERVER.replace('http', 'ws')}/websocket?${authHeaders}`;

      daoCable = ActionCable.createConsumer(uri);

      daoCableLink = new ActionCableLink({ cable: daoCable });
    }

    return daoCableLink.request(operation);
  }
  if (daoCableLink) {
    if (daoCable) {
      daoCable.disconnect();
    }

    daoCable = null;
    daoCableLink = null;
  }

  return null;
});

let infoWebSocketLink = null;

const infoSocketLink = new ApolloLink((operation, forward) => {
  if (infoAuthorization) {
    if (!infoWebSocketLink) {
      const socketClient = new SubscriptionClient(
        `${INFO_SERVER.replace('http', 'ws')}/websocket`,
        {
          reconnect: true,
          connectionParams: {
            ...infoAuthorization,
          },
        }
      );

      infoWebSocketLink = new WebSocketLink(socketClient);
    }

    return infoWebSocketLink.request(operation);
  }
  if (infoWebSocketLink) {
    infoWebSocketLink = null;
  }

  return null;
});

const daoSubscriptions = new RegExp(
  ['commentPosted', 'commentUpdated', 'kycUpdated', 'transactionUpdated'].join('|')
);

const apiLink = authHttp.concat(httpLink);
const socketLink = split(
  ({
    query: {
      loc: {
        source: { body },
      },
    },
  }) => daoSubscriptions.test(body),
  daoSocketLink,
  infoSocketLink
);

const client = new ApolloClient({
  link: split(
    ({ query }) => {
      const { kind, operation } = getMainDefinition(query);

      return kind === 'OperationDefinition' && operation === 'subscription';
    },
    socketLink,
    apiLink
  ),
  cache: new InMemoryCache(),
});

export const Provider = ({ children }) => (
  <ApolloProvider client={client}>{children}</ApolloProvider>
);

Provider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default client;

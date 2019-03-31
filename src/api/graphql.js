import _ from 'lodash';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createHttpLink } from 'apollo-link-http';
import { ApolloLink, split, from } from 'apollo-link';
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

let daoAuthorization = null;
let infoAuthorization = null;

export const setDaoAuthorization = authHeaders => {
  daoAuthorization = _.pick(authHeaders, ['access-token', 'client', 'uid']);
};

export const setInfoAuthorization = payload => {
  infoAuthorization = _.pick(payload, ['address', 'message', 'signature']);
};

const daoHttpLink = createHttpLink({
  uri: `${DAO_SERVER}/api`,
  credentials: 'same-origin',
});

const infoHttpLink = createHttpLink({
  uri: `${INFO_SERVER}/api`,
  credentials: 'same-origin',
});

const httpAuthorizedLink = fetchAuth =>
  new ApolloLink((operation, forward) => {
    const authorization = fetchAuth() || {};

    operation.setContext((_previous, _options) => ({
      headers: authorization,
    }));

    return forward(operation);
  });

const daoAuthHttpLink = from([httpAuthorizedLink(() => daoAuthorization), daoHttpLink]);

const infoAuthHttpLink = from([httpAuthorizedLink(() => infoAuthorization), infoHttpLink]);

let daoCableLink = null;
let daoCable = null;

// eslint-disable-next-line
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

// eslint-disable-next-line
const infoSocketLink = new ApolloLink((operation, _forward) => {
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

const infoSubscriptions = new RegExp(['proposalUpdated', 'userUpdated', 'daoUpdated'].join('|'));

const infoQueries = new RegExp(['fetchProposal', 'fetchCurrentUser', 'fetchDao'].join('|'));

const apiLink = split(
  ({
    query: {
      loc: {
        source: { body },
      },
    },
  }) => infoQueries.test(body),
  infoAuthHttpLink,
  daoAuthHttpLink
);
const socketLink = split(
  ({
    query: {
      loc: {
        source: { body },
      },
    },
  }) => infoSubscriptions.test(body),
  infoSocketLink,
  daoSocketLink
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

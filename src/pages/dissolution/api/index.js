/* eslint-disable no-underscore-dangle */

import ApolloClient from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { getMainDefinition } from 'apollo-utilities';
import { setupDissolutionServer } from '@digix/gov-ui/pages/dissolution/api/server';

const isProduction = process.env.ENVIRONMENT === 'production';
const isStaging = process.env.ENVIRONMENT === 'kovan';

const INFO_SERVER_ENDPOINT = (isProduction && 'https://info.digix.global')
  || (isStaging && 'https://info.digix.global')
  || 'https://info.digix.global';


export const getAddressInfo = (address) => {
  return fetch(`${INFO_SERVER_ENDPOINT}/address/${address}`)
    .then(response => (response.json()))
    .catch((error) => {
      console.log('[ERROR] getAddressInfo', error);
    });
};

// ===========================================================

const _getApi = server => (
  ApolloLink.split(
    ({
      query: {
        loc: {
          source: { body },
        },
      },
    }) => server.queries.test(body),
    server.link,
  )
);

const _getLinkWithSubscription = (socket, link) => (
  ApolloLink.split(
    ({ query }) => {
      const { kind, operation } = getMainDefinition(query);
      return kind === 'OperationDefinition' && operation === 'subscription';
    },
    socket,
    link,
  )
);

const createDefaultClient = ({ ssr, fetch } = {}) => {
  const DissolutionServer = setupDissolutionServer({ fetch });

  const cache = new InMemoryCache();
  if (!ssr) {
    cache.restore(window.__APOLLO_STATE__);
  }

  const dissolutionApi = _getApi(DissolutionServer);
  const dissolutionLink = _getLinkWithSubscription(DissolutionServer.socket, dissolutionApi);

  const client = new ApolloClient({
    cache,
    connectToDevTools: !ssr,
    link: dissolutionLink,
    ssrMode: ssr,
  });

  return client;
};

const dissolutionClient = createDefaultClient();
export default {
  dissolutionClient,
  getAddressInfo,
};

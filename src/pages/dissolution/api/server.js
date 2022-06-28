import { WebSocketLink } from 'apollo-link-ws';
import { createHttpLink } from 'apollo-link-http';
import { onError } from 'apollo-link-error';
import { from } from 'apollo-link';

const isProduction = process.env.ENVIRONMENT === 'production';
const isStaging = process.env.ENVIRONMENT === 'kovan';

export const DISSOLUTION_SERVER = () => {
  const http = (isProduction && 'https://api.thegraph.com/subgraphs/name/francismurillodigix/dissolutionsubgraph')
    || (isStaging && 'https://api.thegraph.com/subgraphs/name/francismurillodigix/dissolutionsubgraph')
    || 'https://localhost:8000/subgraphs/name/DigixGlobal/DissolutionSubgraph';

  const webSocket = (isProduction && 'wss://api.thegraph.com/subgraphs/name/francismurillodigix/dissolutionsubgraph')
    || (isStaging && 'wss://api.thegraph.com/subgraphs/name/francismurillodigix/dissolutionsubgraph')
    || 'wss://localhost:8001/subgraphs/name/DigixGlobal/DissolutionSubgraph';

  return {
    http,
    webSocket,
  };
};

const onErrorLink = onError(({ networkError }) => {
  if (networkError) {
    console.log(`[Network error]: ${networkError}`);
  }
});

const wsLink = new WebSocketLink({
  uri: DISSOLUTION_SERVER().webSocket,
  options: {
    reconnect: true
  },
});

const setupDissolutionServer = () => {
  const httpLink = createHttpLink({
    fetch,
    uri: DISSOLUTION_SERVER().http,
  });

  const link = from([
    onErrorLink,
    httpLink,
  ]);

  const queries = new RegExp([
    'approval',
    'approvals',
    'users',
    'user',
  ].join('|'));

  return {
    link,
    queries,
    socket: wsLink,
  };
};

export default setupDissolutionServer;
export {
  setupDissolutionServer,
};

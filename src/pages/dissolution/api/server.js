import * as AbsintheSocket from '@absinthe/socket';
import { Socket as PhoenixSocket } from 'phoenix';
import { createAbsintheSocketLink } from '@absinthe/socket-apollo-link';
import { createHttpLink } from 'apollo-link-http';
import { hasSubscription } from '@jumpn/utils-graphql';
import { onError } from 'apollo-link-error';
import {
  from,
  split,
} from 'apollo-link';

const isProduction = process.env.ENVIRONMENT === 'production';
const isStaging = process.env.ENVIRONMENT === 'kovan';

export const DISSOLUTION_SERVER = () => {
  const http = (isProduction && 'https://api.thegraph.com/subgraphs/name/francismurillodigix/dissolutionsubgraph')
    || (isStaging && 'https://api.thegraph.com/subgraphs/name/francismurillodigix/dissolutionsubgraph')
    || 'https://localhost:8000/graphql';

  const webSocket = (isProduction && 'wss://api.thegraph.com/subgraphs/name/francismurillodigix/dissolutionsubgraph')
    || (isStaging && 'wss://api.thegraph.com/subgraphs/name/francismurillodigix/dissolutionsubgraph')
    || 'wss://localhost:8000/socket';

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

const phoenixSocket = new PhoenixSocket(DISSOLUTION_SERVER().webSocket, {
  params: () => ({}),
});

const closeDissolutionSocket = () => {
  if (phoenixSocket.conn) {
    phoenixSocket.conn.close();
  }
};

const setupDissolutionServer = () => {
  let dissolutionLink = createHttpLink({
    fetch,
    uri: DISSOLUTION_SERVER().http,
  });

  const dissolutionAuthHttpLink = from([
    onErrorLink,
    dissolutionLink,
  ]);

  const absintheSocket = AbsintheSocket.create(phoenixSocket);
  const dissolutionSocketLink = createAbsintheSocketLink(absintheSocket);
  dissolutionLink = split(
    operation => hasSubscription(operation.query),
    dissolutionSocketLink,
    dissolutionAuthHttpLink,
  );

  return {
    absintheSocket,
    link: dissolutionLink,
    socket: dissolutionSocketLink,
  };
};

export default setupDissolutionServer;
export {
  closeDissolutionSocket,
  setupDissolutionServer,
};

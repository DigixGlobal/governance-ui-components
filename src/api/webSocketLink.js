import { ApolloLink } from 'apollo-link';
import SubscriptionClient from './webSocketClient';

export default class WebSocketLink extends ApolloLink {
  constructor(paramsOrClient) {
    super();

    if (paramsOrClient instanceof SubscriptionClient) {
      this.subscriptionClient = paramsOrClient;
    } else {
      this.subscriptionClient = new SubscriptionClient(
        paramsOrClient.uri,
        paramsOrClient.options,
        paramsOrClient.webSocketImpl
      );
    }
  }

  request(operation) {
    return this.subscriptionClient.request(operation);
  }
}

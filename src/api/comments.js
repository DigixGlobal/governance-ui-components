import { requestFromApi } from '@digix/gov-ui/api';
import { DAO_SERVER } from '@digix/gov-ui/reducers/dao-server/constants';

// NOTE: endpoints that connect to the dao-server use payload = { client, data, authToken, uid }

export const CommentsApi = {
  /*
   * DAO SERVER ENDPOINTS
   */

  create: (commentId, body, payload) => {
    const requestParams = {
      ...payload,
      data: { body },
      method: 'POST',
      url: `${DAO_SERVER}/comments/${commentId}/`,
    };

    return requestFromApi(requestParams);
  },

  delete: (commentId, payload) => {
    const requestParams = {
      ...payload,
      method: 'DELETE',
      url: `${DAO_SERVER}/comments/${commentId}`,
    };

    return requestFromApi(requestParams);
  },

  // getParams = {stage, last_seen_id, sort_by}
  getThread: (commentId, getParams, payload) => {
    const requestParams = {
      ...payload,
      data: getParams,
      method: 'GET',
      url: `${DAO_SERVER}/comments/${commentId}/threads`,
    };

    return requestFromApi(requestParams);
  },

  like: (commentId, payload) => {
    const requestParams = {
      ...payload,
      method: 'POST',
      url: `${DAO_SERVER}/comments/${commentId}/likes`,
    };

    return requestFromApi(requestParams);
  },

  unlike: (commentId, payload) => {
    const requestParams = {
      ...payload,
      method: 'DELETE',
      url: `${DAO_SERVER}/comments/${commentId}/likes`,
    };

    return requestFromApi(requestParams);
  },

  /*
   * HELPERS
   */

  generateNewThread: comment => ({
    edges: [comment],
    endCursor: '',
    hasNextPage: false,
    __typename: 'CommentEdge',
  }),

  generateNewComment: (node, currentUser, parentId) => {
    const { address, displayName, quarterPoint, reputationPoint } = currentUser;

    return {
      node: {
        body: node.body,
        createdAt: node.createdAt,
        id: String(node.id),
        liked: node.liked,
        likes: 0,
        parentId: String(parentId),

        user: {
          address,
          displayName,
          quarterPoint,
          reputationPoint,
          __typename: 'User',
        },
        replies: {
          edges: [],
          endCursor: '',
          hasNextPage: false,
          __typename: 'CommentConnection',
        },
        __typename: 'Comment',
      },
      __typename: 'CommentEdge',
    };
  },

  getUniqueUsers(userAddresses, threads) {
    if (!threads || !threads.edges.length) {
      return userAddresses;
    }

    threads.edges.forEach(thread => {
      const { address } = thread.node.user;
      if (!userAddresses.includes(address)) {
        userAddresses.push(address);
      }

      this.getUniqueUsers(userAddresses, thread.replies);
    });

    return userAddresses;
  },

  ERROR_MESSAGES: {
    bannedUser:
      'You have been banned by the administrators from commenting. Please contact Digix for more information.',
    createComment: 'Unable to create comment.',
    createReply: 'Unable to create reply.',
    fetch: 'Unable to fetch comments.',
    hideComment: 'Unable to remove comment.',
    like: 'Unable to like comment.',
    remove: 'Unable to delete comment.',
    unhideComment: 'Unable to restore comment',
    unlike: 'Unable to unlike comment.',
  },
};

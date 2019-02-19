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
    hasMore: false,
    data: [comment],
  }),

  getUniqueUsers(users, threads) {
    const { data } = threads;
    if (!threads || data.length === 0) {
      return users;
    }

    data.forEach(thread => {
      if (!users.includes(thread.user.address)) {
        users.push(thread.user.address);
      }

      this.getUniqueUsers(users, thread.replies);
    });

    return users;
  },

  ERROR_MESSAGES: {
    fetch: 'Unable to fetch comments.',
    createComment: 'Unable to create comment.',
    createReply: 'Unable to create reply.',
    like: 'Unable to like comment.',
    remove: 'Unable to delete comment.',
    unlike: 'Unable to unlike comment.',
  },
};

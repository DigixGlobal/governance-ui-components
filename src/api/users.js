import { INFO_SERVER } from '@digix/gov-ui/reducers/info-server/constants';
import { requestFromApi } from '@digix/gov-ui/api';

export const UsersApi = {
  // users must be an array of addresses
  getPoints: (users, payload) => {
    const getParams = users.join('&address=');
    const requestParams = {
      ...payload,
      method: 'GET',
      url: `${INFO_SERVER}/points?address=${getParams}`,
    };

    return requestFromApi(requestParams);
  },

  /*
   * HELPERS
   */

  ERROR_MESSAGES: {
    getPoints: 'Unable to fetch reputation points for users.',
  },
};

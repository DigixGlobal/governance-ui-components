import { REDUX_PREFIX, INFO_SERVER } from './constants';

export const actions = {
  GET_DAO_DETAILS: `${REDUX_PREFIX}GET_DAO_DETAILS`,
  GET_ADDRESS_DETAILS: `${REDUX_PREFIX}GET_ADDRESS_DETAILS`,
  GET_PROPOSALS: `${REDUX_PREFIX}GET_PROPOSALS`,
  GET_PROPOSALS_COUNT: `${REDUX_PREFIX}GET_PROPOSALS_COUNT`,
};

function fetchData(url, type) {
  return dispatch => {
    dispatch({ type, payload: { fetching: true } });
    return fetch(url)
      .then(res =>
        res
          .json()
          .then(json => ({ json, res }))
          .catch(() => {
            throw res.statusText;
          })
      )
      .then(({ json, res }) => {
        if (res.status === 200) {
          return dispatch({
            type,
            payload: {
              data: json.result,
              fetching: false,
              error: null,
              updated: new Date(),
            },
          });
        }

        throw json;
      })
      .catch(error => dispatch({ type, payload: { fetching: false, error } }));
  };
}

export function getDaoDetails() {
  console.log('getting dao details');
  return fetchData(`${INFO_SERVER}/daoinfo`, actions.GET_DAO_DETAILS);
}

export function getAddressDetails(address) {
  return fetchData(`${INFO_SERVER}/address/${address}`, actions.GET_ADDRESS_DETAILS);
}

export function getProposals(stage = 'all') {
  return fetchData(`${INFO_SERVER}/proposals/${stage}`, actions.GET_PROPOSALS);
}

export function getProposalsCount() {
  return fetchData(`${INFO_SERVER}/proposals/count`, actions.GET_PROPOSALS_COUNT);
}

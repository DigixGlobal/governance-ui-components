import { REDUX_PREFIX, DAO_SERVER } from './constants';

export const actions = {
  GET_CHALLENGE: `${REDUX_PREFIX}GET_CHALLENGE`,
  PROVE_CHALLENGE: `${REDUX_PREFIX}PROVE_CHALLENGE`,
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
              data: json,
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

export function getChallenge(address) {
  return fetchData(`${DAO_SERVER}/get_challenge?address=${address}`, actions.GET_CHALLENGE);
}

export function proveChallenge(payload) {
  const { address, challenge, message, signature } = payload;
  return fetchData(
    `${DAO_SERVER}/prove?address=${address}&challenge_id=${challenge}&message=${message}&signature=${signature}`,
    actions.PROVE_CHALLENGE
  );
}

import { REDUX_PREFIX, DAO_SERVER } from './constants';

export const actions = {
  GET_CHALLENGE: `${REDUX_PREFIX}GET_CHALLENGE`,
  PROVE_CHALLENGE: `${REDUX_PREFIX}PROVE_CHALLENGE`,
  ADD_TRANSACTION: `${REDUX_PREFIX}ADD_TRANSACTION`,
  GET_TRANSACTIONS: `${REDUX_PREFIX}GET_TRANSACTIONS`,
  GET_TRANSACION_STATUS: `${REDUX_PREFIX}GET_TRANSACION_STATUS`,
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
        if (json.result) {
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

        throw json.error;
      })
      .catch(error => dispatch({ type, payload: { fetching: false, error } }));
  };
}

function postData(url, type, data, authToken, client, uid) {
  return dispatch => {
    dispatch({ type, payload: { fetching: true } });
    return fetch(url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, cors, *same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'access-token': authToken,
        client,
        uid,
      },
      redirect: 'follow', // manual, *follow, error
      referrer: 'no-referrer', // no-referrer, *client
      body: JSON.stringify(data), // body data type must match "Content-Type" header
    })
      .then(res =>
        res
          .json()
          .then(json => ({ json, res }))
          .catch(() => {
            throw res.statusText;
          })
      )
      .then(({ json, res }) => {
        if (json.result) {
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

        throw json.error;
      })
      .catch(error => dispatch({ type, payload: { fetching: false, error } }));
  };
}

export function getChallenge(address) {
  return fetchData(`${DAO_SERVER}/get_challenge?address=${address}`, actions.GET_CHALLENGE);
}

export function proveChallenge(payload) {
  const { address, challenge_id, message, signature } = payload;
  return postData(
    `${DAO_SERVER}/prove`,
    actions.PROVE_CHALLENGE,
    { address, challenge_id, message, signature },
    undefined,
    undefined
  );
}

export function getTransactionStatus(payload) {
  return fetchData(`${DAO_SERVER}/status?txhash=${payload}`, actions.GET_TRANSACION_STATUS);
}

export function getTransactions(payload) {
  const { token, client, uid } = payload;
  return postData(
    `${DAO_SERVER}/transactions/list`,
    actions.GET_TRANSACTIONS,
    undefined,
    token,
    client,
    uid
  );
}

export function sendTransactionToDaoServer(payload) {
  const { txHash, title, token, client, uid } = payload;
  const data = { txhash: txHash, title };
  return postData(
    `${DAO_SERVER}/transactions/new`,
    actions.ADD_TRANSACTION,
    data,
    token,
    client,
    uid
  );
}

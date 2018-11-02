import { REDUX_PREFIX, DAO_SERVER } from './constants';

export const actions = {
  GET_CHALLENGE: `${REDUX_PREFIX}GET_CHALLENGE`,
  PROVE_CHALLENGE: `${REDUX_PREFIX}PROVE_CHALLENGE`,
  ADD_TRANSACTION: `${REDUX_PREFIX}ADD_TRANSACTION`,
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
    // return fetch(url, {
    //   method: 'POST',
    //   mode: '*same-origin',
    //   headers: {
    //     'access-token': authToken,
    //     'Content-Type': 'application/json',
    //     client,
    //     uid,
    //   },
    //   body: JSON.stringify(data),
    // })
    //   .then(res =>
    //     res
    //       .json()
    //       .then(json => ({ json, res }))
    //       .catch(() => {
    //         throw res.statusText;
    //       })
    //   )
    //   .then(({ json, res }) => {
    //     if (res.status === 200) {
    //       return dispatch({
    //         type,
    //         payload: {
    //           data: json,
    //           fetching: false,
    //           error: null,
    //           updated: new Date(),
    //         },
    //       });
    //     }

    //     throw json;
    //   })
    //   .catch(error => dispatch({ type, payload: { fetching: false, error } }));
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

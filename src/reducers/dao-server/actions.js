import { REDUX_PREFIX, DAO_SERVER } from './constants';

export const actions = {
  GET_CHALLENGE: `${REDUX_PREFIX}GET_CHALLENGE`,
  PROVE_CHALLENGE: `${REDUX_PREFIX}PROVE_CHALLENGE`,

  ADD_TRANSACTION: `${REDUX_PREFIX}ADD_TRANSACTION`,
  GET_TRANSACTIONS: `${REDUX_PREFIX}GET_TRANSACTIONS`,
  GET_TRANSACION_STATUS: `${REDUX_PREFIX}GET_TRANSACION_STATUS`,
  GET_USER_PROPOSAL_LIKE_STATUS: `${REDUX_PREFIX}GET_USER_PROPOSAL_LIKE_STATUS`,

  GET_PROPOSAL_LIKES_BY_USER: `${REDUX_PREFIX}GET_PROPOSAL_LIKES_BY_USER`,

  GET_PROPOSAL_LIKES_STATS: `${REDUX_PREFIX}GET_PROPOSAL_LIKES_STATS`,

  GET_PROPOSAL_DETAILS: `${REDUX_PREFIX}GET_PROPOSAL_DETAILS`,
  CLEAR_PROPOSAL_DETAILS: `${REDUX_PREFIX}CLEAR_PROPOSAL_DETAILS`,
};

function fetchData(url, type, authToken, client, uid) {
  return dispatch => {
    dispatch({ type, payload: { fetching: true } });
    return fetch(url, {
      method: 'GET',
      mode: 'cors', // no-cors, cors, *same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'access-token': authToken,
        client,
        uid,
      },
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

function sendData(method, url, type, data, authToken, client, uid) {
  return dispatch => {
    dispatch({ type, payload: { fetching: true } });
    return fetch(url, {
      method,
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

function putData(url, type, data, authToken, client, uid) {
  return sendData('PUT', url, type, data, authToken, client, uid);
}

function postData(url, type, data, authToken, client, uid) {
  return sendData('POST', url, type, data, authToken, client, uid);
}

export function getChallenge(address) {
  return postData(`${DAO_SERVER}/authorization?address=${address}`, actions.GET_CHALLENGE);
}

export function getChallengeVanilla(address) {
  return fetch(`${DAO_SERVER}/authorization?address=${address}`, {
    method: 'POST',
    mode: 'cors', // no-cors, cors, *same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
    redirect: 'follow', // manual, *follow, error
    referrer: 'no-referrer', // no-referrer, *client
  }).then(res =>
    res
      .json()
      .then(json => ({ json, res }))
      .catch(() => {
        throw res.statusText;
      })
  );
  // return postData(`${DAO_SERVER}/authorization?address=${address}`, actions.GET_CHALLENGE);
}

export function setChallenge(challenge) {
  // return postData(`${DAO_SERVER}/authorization?address=${address}`, actions.GET_CHALLENGE);
  return {
    type: actions.GET_CHALLENGE,
    payload: {
      data: challenge,
    },
  };
}

export function proveChallenge(payload) {
  const { challengeId, address, message, signature } = payload;
  return putData(
    `${DAO_SERVER}/authorization?address=${address}&challenge_id=${challengeId}&message=${message}&signature=${signature}`,
    actions.PROVE_CHALLENGE
  );
}

export function getUserProposalLikeStatus(payload) {
  const { proposalId, token, client, uid } = payload;
  return fetchData(
    `${DAO_SERVER}/proposals/${proposalId}`,
    actions.GET_USER_PROPOSAL_LIKE_STATUS,
    token,
    client,
    uid
  );
}

export function likeProposal(payload) {
  const { proposalId, token, client, uid } = payload;
  return postData(
    `${DAO_SERVER}/proposals/${proposalId}/likes`,
    actions.GET_USER_PROPOSAL_LIKE_STATUS,
    undefined,
    token,
    client,
    uid
  );
}

export function unlikeProposal(payload) {
  const { proposalId, token, client, uid } = payload;
  return sendData(
    'DELETE',
    `${DAO_SERVER}/proposals/${proposalId}/likes`,
    actions.GET_USER_PROPOSAL_LIKE_STATUS,
    undefined,
    token,
    client,
    uid
  );
}

export function getTransactions(payload) {
  const { token, client, uid } = payload;
  return sendData(
    'GET',
    `${DAO_SERVER}/transactions`,
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
  return postData(`${DAO_SERVER}/transactions`, actions.ADD_TRANSACTION, data, token, client, uid);
}

/**
 * Proposals
 */

export function clearDaoProposalDetails() {
  return dispatch => {
    dispatch({ type: actions.CLEAR_PROPOSAL_DETAILS, payload: {} });
  };
}

export function getDaoProposalDetails(payload) {
  const { client, proposalId, authToken, uid } = payload;
  return sendData(
    'GET',
    `${DAO_SERVER}/proposals/${proposalId}`,
    actions.GET_PROPOSAL_DETAILS,
    undefined,
    authToken,
    client,
    uid
  );
}

export function getProposalLikesByUser(payload) {
  const { client, stage, authToken, uid } = payload;
  return sendData(
    'GET',
    stage ? `${DAO_SERVER}/proposals?liked=` : `${DAO_SERVER}/proposals?liked=`,
    actions.GET_PROPOSAL_LIKES_BY_USER,
    undefined,
    authToken,
    client,
    uid
  );
}

export function getProposalLikesStats(payload) {
  const { client, stage, authToken, uid } = payload;
  return sendData(
    'GET',
    stage ? `${DAO_SERVER}/proposals?stage=${stage}` : `${DAO_SERVER}/proposals`,
    actions.GET_PROPOSAL_LIKES_STATS,
    undefined,
    authToken,
    client,
    uid
  );
}

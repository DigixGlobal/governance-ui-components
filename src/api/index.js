import _ from 'lodash';

export function requestOptions(options) {
  const { authToken, client, method, uid } = options;
  const payload = {
    method,
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: _.pickBy(
      {
        'Content-Type': 'application/json; charset=utf-8',
        'access-token': authToken,
        client,
        uid,
      },
      Boolean
    ),
    redirect: 'follow',
    referrer: 'no-referrer',
  };

  if (options.data) {
    if (options.method === 'GET') {
      let params = Object.keys(options.data);
      params = params.map(key => `${key}=${options.data[key]}`);
      params = params.join('&');
      payload.url = `${options.url}?${params}`;
    } else {
      // body data type must match "Content-Type" header
      payload.body = JSON.stringify(options.data);
    }
  }

  return payload;
}

export function initializePayload(ChallengeProof, data) {
  return {
    data,
    authToken: ChallengeProof.data['access-token'],
    client: ChallengeProof.data.client,
    uid: ChallengeProof.data.uid,
  };
}

export function requestFromApi(payload) {
  let { url } = payload;
  const { authToken, client, data, method, uid } = payload;

  const options = requestOptions({ method, authToken, client, uid, url, data });
  url = options.url ? options.url : url;

  return fetch(url, options)
    .then(response =>
      response
        .json()
        .then(json => ({ json, response }))
        .catch(() => {
          throw response.statusText;
        })
    )
    .then(({ json, response }) => {
      if (json.result) {
        return json.result;
      }
      throw json.error;
    })
    .catch(error => {
      throw error;
    });
}

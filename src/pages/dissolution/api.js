const isProduction = process.env.ENVIRONMENT === 'production';
const isStaging = process.env.ENVIRONMENT === 'kovan';

const INFO_SERVER_ENDPOINT = (isProduction && 'https://info.digix.global')
  || (isStaging && 'https://info.digix.global')
  || 'https://info.digix.global';

export const getAddressInfo = (address) => {
  return fetch(`${INFO_SERVER_ENDPOINT}/address/${address}`)
    .then(response => (response.json()))
    .catch((error) => {
      console.log('[ERROR] getAddressInfo', error);
    });
};

export default {
  getAddressInfo,
};

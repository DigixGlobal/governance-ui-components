export const REDUX_PREFIX = 'GOV_UI_';

export const DAO_SERVER =
  (process.env.ENVIRONMENT === 'production' && 'https://digix.global/app/#/marketplace') ||
  (process.env.ENVIRONMENT === 'kovan' && 'https://info.digixdev.com') ||
  'http://localhost:3005';

export const CMC_ENDPOINT =
  'https://min-api.cryptocompare.com/data/pricemulti?fsyms=DGD,DGX,ETH&tsyms=USD';

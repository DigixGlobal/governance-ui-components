export const REDUX_PREFIX = 'GOV_UI_';

export const DAO_SERVER =
  (process.env.ENVIRONMENT === 'production' && 'https://digix.global/app/#/marketplace') ||
  (process.env.ENVIRONMENT === 'kovan' && 'https://info.digixdev.com') ||
  'http://localhost:3005';

export const CMC_ENDPOINT =
  'https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?CMC_PRO_API_KEY=df78d6f3-d31d-4fc0-a525-30c967dda14f&symbol=DGD,DGX,ETH';

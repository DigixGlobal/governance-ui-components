export const REDUX_PREFIX = 'GOV_UI_';

export const DAO_SERVER =
  (process.env.ENVIRONMENT === 'production' && 'https://digix.global/app/#/marketplace') ||
  (process.env.ENVIRONMENT === 'kovan' && 'https://info.digixdev.com') ||
  'http://localhost:3005';

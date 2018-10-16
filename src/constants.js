export const INFO_SERVER =
  (process.env.ENVIRONMENT === 'production' && 'https://digix.global/app/#/marketplace') ||
  (process.env.ENVIRONMENT === 'kovan' && 'https://info-kovan.digixdev.com') ||
  'http://localhost:3001';

export const REDUX_PREFIX = 'DIGIX_GOVERNANCE_';

export const ONE_BILLION = 1000000000;

export const CONVERSIONS = {
  XAUUSD: 1 / 31.1035,
};

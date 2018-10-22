export const INFO_SERVER =
  (process.env.ENVIRONMENT === 'production' && 'https://digix.global/app/#/marketplace') ||
  (process.env.ENVIRONMENT === 'kovan' && 'https://info-kovan.digixdev.com') ||
  'http://localhost:3001';

export const DEFAULT_NETWORK =
  (process.env.ENVIRONMENT === 'production' && 'eth-mainnet') ||
  (process.env.ENVIRONMENT === 'kovan' && 'eth-kovan') ||
  'eth-kovan';

export const DGD_ADDRESS =
  (process.env.ENVIRONMENT === 'production' && '0xe0b7927c4af23765cb51314a0e0521a9645f0e2a') ||
  (process.env.ENVIRONMENT === 'kovan' && '0x0825c96db02b08dce25c67037d68b8bf83593e71') ||
  '0x0825c96db02b08dce25c67037d68b8bf83593e71';

export const REDUX_PREFIX = 'DIGIX_GOVERNANCE_';

export const ONE_BILLION = 1000000000;

export const CONVERSIONS = {
  XAUUSD: 1 / 31.1035,
};

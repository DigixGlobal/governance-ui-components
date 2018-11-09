export const DAO_SERVER =
  (process.env.ENVIRONMENT === 'production' && 'https://digix.global/app/#/marketplace') ||
  (process.env.ENVIRONMENT === 'kovan' && 'https://info.digixdev.com') ||
  'http://localhost:3005';

export const DEFAULT_NETWORK =
  (process.env.ENVIRONMENT === 'production' && 'eth-mainnet') ||
  (process.env.ENVIRONMENT === 'kovan' && 'eth-kovan') ||
  'testrpc';

export const DGD_ADDRESS =
  (process.env.ENVIRONMENT === 'production' && '0xe0b7927c4af23765cb51314a0e0521a9645f0e2a') ||
  (process.env.ENVIRONMENT === 'kovan' && '0x55e7ef7edc78421db3221974efbe82238b74a734') ||
  '0x55e7ef7edc78421db3221974efbe82238b74a734';

export const REDUX_PREFIX = 'DIGIX_GOVERNANCE_';

export const DEFAULT_GAS =
  (process.env.ENVIRONMENT === 'production' && 25e4) ||
  (process.env.ENVIRONMENT === 'kovan' && 25e4) ||
  60e4;

export const ONE_BILLION = 1000000000;

export const CONVERSIONS = {
  XAUUSD: 1 / 31.1035,
};

export const ProposalStages = {
  idea: 'idea',
  draft: 'draft',
  proposal: 'proposal',
  ongoing: 'ongoing',
  review: 'review',
  archived: 'archived',
};

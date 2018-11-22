export const REDUX_PREFIX = 'INFO_SERVER_';

export const INFO_SERVER =
  (process.env.ENVIRONMENT === 'production' && 'https://info.digix.global') ||
  (process.env.ENVIRONMENT === 'kovan' && 'https://info.digixdev.com') ||
  'http://localhost:3001';

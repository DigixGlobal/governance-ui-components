export const REDUX_PREFIX = 'DAO_SERVER_';

export const DAO_SERVER =
  (process.env.ENVIRONMENT === 'production' && 'https://dao.digix.global') ||
  (process.env.ENVIRONMENT === 'kovan' && 'https://dao.digixdev.com') ||
  'http://localhost:3005';

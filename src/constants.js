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
  (process.env.ENVIRONMENT === 'production' && 100e4) ||
  (process.env.ENVIRONMENT === 'kovan' && 100e4) ||
  150e4;

export const ETHERSCAN_URL =
  (process.env.ENVIRONMENT === 'production' && 'https://etherscan.io/tx/') ||
  (process.env.ENVIRONMENT === 'kovan' && 'https://kovan.etherscan.io/tx/') ||
  'https://kovan.etherscan.io/tx/';

export const DEFAULT_GAS_PRICE = 10 * 1e9;
export const ONE_BILLION = 1000000000;

export const CONVERSIONS = {
  XAUUSD: 1 / 31.1035,
};

export const DEFAULT_STAKE_PER_DGD = 1;
export const DEFAULT_LOCKED_DGD = 83423.45;
export const EMPTY_HASH = '0x0000000000000000000000000000000000000000';
export const EMPTY_HASH_LONG = '0x0000000000000000000000000000000000000000000000000000000000000000';

export const WalletStages = {
  Intro: 1,
  LoadingWallet: 2,
  WalletLoaded: 3,
};

export const MAX_PEOPLE_PER_CLAIM =
  (process.env.ENVIRONMENT === 'production' && 50) ||
  (process.env.ENVIRONMENT === 'kovan' && 50) ||
  2;

export const ProposalStages = {
  idea: 'idea',
  draft: 'draft',
  proposal: 'proposal',
  ongoing: 'ongoing',
  review: 'review',
  archived: 'archived',
};

export const VotingStages = {
  draft: 'draftVoting',
  commit: 'commit',
  reveal: 'reveal',
};

export const UserStatus = {
  moderator: 'Moderator',
  participant: 'Participant',
  pastParticipant: 'Past Participant',
  guest: 'Have not participated',
};

export const KycStatus = {
  pending: 'PENDING',
  rejected: 'REJECTED',
  expired: 'EXPIRED',
  approving: 'APPROVING',
  approved: 'APPROVED',
};

export const ProposalErrors = {
  blockedByPRL: {
    title: 'Funding Is Stopped by PRL',
    description: 'The project funding has been stopped due to Policy, Regulatory or Legal reasons.',
    details: 'Please contact us if you have any enquiries.',
  },

  invalidKyc: {
    title: 'KYC Is Not Valid',
    description:
      "It looks like you don't have a valid KYC yet. You can check your KYC status in the Profile tab.",
    details: "Let's try again when your KYC has been approved.",
  },

  inLockingPhase: {
    title: 'Not Main Phase Yet!',
    description:
      "Looks like it's still the Locking phase now. You need to wait until the Main phase to do any governance activity.",
    details: "Let's try again when it's the Main phase again.",
  },

  insufficientCollateral: requiredCollateral => ({
    title: 'Not Enough Collateral!',
    description: `It looks like there is insufficient ETH in your wallet. You will need ${requiredCollateral} ETH for your project as collateral.`,
    details: "Let's try again when you have enough ETH.",
  }),
};

export const KycErrors = {
  resubmit: {
    title: 'Re-submit KYC',
    description:
      'Please contact us via our Zendesk widget for enquiries about changing your KYC information.',
    details: null,
  },
};

export const CONFIRM_PARTICIPATION_CACHE = {
  key: 'DAO_PARTICIPATION',
  value: 't7L6CuJ1pDqY0Cu5',
};

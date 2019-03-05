import { actions } from './actions';

const defaultProps = { history: [], data: undefined, error: null, fetching: null };

const defaultState = {
  Challenge: {
    ...defaultProps,
  },
  ChallengeProof: {
    ...defaultProps,
  },
  AddTransaction: {
    ...defaultProps,
  },
  ProposalDaoDetails: {
    ...defaultProps,
  },
  Transactions: {
    ...defaultProps,
  },
  TransactionStatus: {
    ...defaultProps,
  },
  UserProposalLike: {
    ...defaultProps,
  },
  UserLikedProposals: {
    ...defaultProps,
  },
  ProposalLikes: {
    ...defaultProps,
  },
  PendingTransactions: {
    ...defaultProps,
  },
};

export default function(state = defaultState, action) {
  switch (action.type) {
    case actions.GET_CHALLENGE:
      return {
        ...state,
        Challenge: {
          ...state.Challenge,
          ...action.payload,
          history: !action.payload
            ? state.Challenge.history
            : [
                {
                  ...action.payload,
                  updated: action.payload.updated,
                },
              ]
                .concat(state.Challenge.history)
                .slice(0, 100),
        },
      };
    case actions.PROVE_CHALLENGE:
      return {
        ...state,
        ChallengeProof: {
          ...state.ChallengeProof,
          ...action.payload,
          history: !action.payload
            ? state.ChallengeProof.history
            : [
                {
                  ...action.payload,
                  updated: action.payload.updated,
                },
              ]
                .concat(state.ChallengeProof.history)
                .slice(0, 100),
        },
      };
    case actions.ADD_TRANSACTION:
      return {
        ...state,
        AddTransaction: {
          ...state.AddTransaction,
          ...action.payload,
          history: !action.payload
            ? state.AddTransaction.history
            : [
                {
                  ...action.payload,
                  updated: action.payload.updated,
                },
              ]
                .concat(state.AddTransaction.history)
                .slice(0, 100),
        },
      };
    case actions.GET_PROPOSAL_DETAILS:
      return {
        ...state,
        ProposalDaoDetails: {
          ...state.ProposalDaoDetails,
          ...action.payload,
          history: !action.payload.data
            ? state.ProposalDaoDetails.history
            : [
                {
                  ...action.payload.data,
                  updated: action.payload.updated,
                },
              ]
                .concat(state.ProposalDaoDetails.history)
                .slice(0, 100),
        },
      };
    case actions.CLEAR_PROPOSAL_DETAILS:
      return {
        ...state,
        ProposalDaoDetails: defaultState.ProposalDaoDetails,
      };
    case actions.GET_TRANSACION_STATUS:
      return {
        ...state,
        TransactionStatus: {
          ...state.TransactionStatus,
          ...action.payload,
          history: !action.payload
            ? state.TransactionStatus.history
            : [
                {
                  ...action.payload,
                  updated: action.payload.updated,
                },
              ]
                .concat(state.TransactionStatus.history)
                .slice(0, 100),
        },
      };
    case actions.GET_TRANSACTIONS:
      return {
        ...state,
        Transactions: {
          ...state.Transactions,
          ...action.payload,
          history: !action.payload
            ? state.Transactions.history
            : [
                {
                  ...action.payload,
                  updated: action.payload.updated,
                },
              ]
                .concat(state.Transactions.history)
                .slice(0, 100),
        },
      };
    case actions.GET_PENDING_TRANSACTIONS:
      console.log(action.payload);
      return {
        ...state,
        PendingTransactions: {
          ...state.PendingTransactions,
          ...action.payload,
          history: !action.payload
            ? state.PendingTransactions.history
            : [
                {
                  ...action.payload,
                  updated: action.payload.updated,
                },
              ]
                .concat(state.PendingTransactions.history)
                .slice(0, 100),
        },
      };
    case actions.GET_USER_PROPOSAL_LIKE_STATUS:
      return {
        ...state,
        UserProposalLike: {
          ...state.UserProposalLike,
          ...action.payload,
          history: !action.payload
            ? state.UserProposalLike.history
            : [
                {
                  ...action.payload,
                  updated: action.payload.updated,
                },
              ]
                .concat(state.UserProposalLike.history)
                .slice(0, 100),
        },
      };
    case actions.GET_PROPOSAL_LIKES_BY_USER:
      return {
        ...state,
        UserLikedProposals: {
          ...state.UserLikedProposals,
          ...action.payload,
          history: !action.payload
            ? state.UserLikedProposals.history
            : [
                {
                  ...action.payload,
                  updated: action.payload.updated,
                },
              ]
                .concat(state.UserLikedProposals.history)
                .slice(0, 100),
        },
      };
    case actions.GET_PROPOSAL_LIKES_STATS:
      return {
        ...state,
        ProposalLikes: {
          ...state.ProposalLikes,
          ...action.payload,
          history: !action.payload
            ? state.ProposalLikes.history
            : [
                {
                  ...action.payload,
                  updated: action.payload.updated,
                },
              ]
                .concat(state.ProposalLikes.history)
                .slice(0, 100),
        },
      };
    default:
      return state;
  }
}

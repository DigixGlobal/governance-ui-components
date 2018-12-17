import { actions } from './actions';

const defaultState = {
  Challenge: {
    history: [],
    data: undefined,
    error: null,
    fetching: null,
  },
  ChallengeProof: {
    history: [],
    data: undefined,
    error: null,
    fetching: null,
  },
  AddTransaction: {
    history: [],
    data: undefined,
    error: null,
    fetching: null,
  },
  Transactions: {
    history: [],
    data: {},
    error: null,
    fetching: null,
  },
  TransactionStatus: {
    history: [],
    data: undefined,
    error: null,
    fetching: null,
  },
  UserProposalLike: {
    history: [],
    data: undefined,
    error: null,
    fetching: null,
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
    default:
      return state;
  }
}

import { actions } from './actions';

const defaultState = {
  Challenge: {
    history: [],
    data: {},
    error: null,
    fetching: null,
  },
  ChallengeProof: {
    history: [],
    data: {},
    error: null,
    fetching: null,
  },
  AddTransaction: {
    history: [],
    data: {},
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
      console.log('ADD TRANSACTION');
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
    default:
      return state;
  }
}

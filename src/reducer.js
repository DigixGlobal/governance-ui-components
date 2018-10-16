import { actions } from './actions';

const defaultState = {
  DaoDetails: {
    history: [],
    data: {},
    error: null,
    fetching: null,
  },
  AddressDetails: {
    history: [],
    data: {},
    error: null,
    fetching: null,
  },
  Proposals: {
    history: [],
    data: {},
    error: null,
    fetching: null,
  },
};

export default function(state = defaultState, action) {
  switch (action.type) {
    case actions.GET_DAO_DETAILS:
      console.log('payload', action.payload);
      return {
        ...state,
        DaoDetails: {
          ...state.DaoDetails,
          ...action.payload,
          history: !action.payload.data
            ? state.DaoDetails.history
            : [
                {
                  ...action.payload.data,
                  updated: action.payload.updated,
                },
              ]
                .concat(state.DaoDetails.history)
                .slice(0, 100),
        },
      };
    case actions.GET_ADDRESS_DETAILS:
      return {
        ...state,
        AddressDetails: {
          ...state.AddressDetails,
          ...action.payload,
          history: !action.payload.data
            ? state.AddressDetails.history
            : [
                {
                  price: action.payload.data[0].weidgxmg,
                  updated: action.payload.updated,
                },
              ]
                .concat(state.AddressDetails.history)
                .slice(0, 100),
        },
      };
    case actions.GET_PROPOSALS:
      return {
        ...state,
        Proposals: {
          ...state.Proposals,
          ...action.payload,
          history: !action.payload.data
            ? state.Proposals.history
            : [
                {
                  price: action.payload.data[0].weidgxmg,
                  updated: action.payload.updated,
                },
              ]
                .concat(state.Proposals.history)
                .slice(0, 100),
        },
      };

    default:
      return state;
  }
}

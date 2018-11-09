import { actions } from './actions';

const defaultState = {
  LockDgdOverlay: {
    show: false,
  },
  UserAddress: undefined,
  Alert: undefined,
};

export default function(state = defaultState, action) {
  switch (action.type) {
    case actions.SHOW_LOCK_DGD_OVERLAY:
      return {
        ...state,
        LockDgdOverlay: {
          ...state.LockDgdOverlay,
          ...action.payload,
        },
      };
    case actions.SET_USER_ADDRESS:
      return {
        ...state,
        UserAddress: {
          ...state.UserAddress,
          ...action.payload,
        },
      };
    case actions.SHOW_ALERT:
      return {
        ...state,
        Alert: {
          ...state.Alert,
          ...action.payload,
        },
      };
    default:
      return state;
  }
}

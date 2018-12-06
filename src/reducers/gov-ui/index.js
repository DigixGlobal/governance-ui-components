import { actions } from './actions';

const defaultState = {
  LockDgdOverlay: {
    show: false,
  },
  UserAddress: undefined,
  Alert: undefined,
  SignChallenge: undefined,
  ShowWallet: undefined,
  CanLockDgd: undefined,
  ShowRightPanel: {
    show: false,
    component: undefined,
    onClose: undefined,
  },
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
    case actions.CAN_LOCK_DGD:
      return {
        ...state,
        CanLockDgd: {
          ...state.CanLockDgd,
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
    case actions.SHOW_WALLET:
      return {
        ...state,
        ShowWallet: {
          ...state.ShowWallet,
          ...action.payload,
        },
      };
    case actions.SHOW_SIGN_CHALLENGE:
      return {
        ...state,
        SignChallenge: {
          ...state.SignChallenge,
          ...action.payload,
        },
      };
    case actions.SHOW_RIGHT_PANEL:
      return {
        ...state,
        ShowRightPanel: action.payload,
      };
    default:
      return state;
  }
}

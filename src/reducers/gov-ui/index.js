import LogLockDgd from '@digix/gov-ui/analytics/lockDgd';
import { actions } from '@digix/gov-ui/reducers/gov-ui/actions';

const defaultState = {
  lockDgdOverlay: {
    show: false,
  },
  UserAddress: undefined,
  Alert: undefined,
  SignChallenge: undefined,
  ShowWallet: undefined,
  showLeftMenu: undefined,
  CanLockDgd: undefined,
  ShowRightPanel: {
    show: false,
    large: false,
    component: undefined,
    onClose: undefined,
  },
  configPreProposalCollateral: undefined,
  addressMaxAllowance: undefined,
  isAuthenticated: false,
  tokenUsdValues: undefined,
};

export default function(state = defaultState, action) {
  switch (action.type) {
    case actions.SHOW_LOCK_DGD_OVERLAY:
      LogLockDgd.toggleOverlay(action.payload);
      return {
        ...state,
        lockDgdOverlay: {
          ...state.lockDgdOverlay,
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
    case actions.SHOW_LEFT_MENU:
      return {
        ...state,
        showLeftMenu: {
          ...state.showLeftMenu,
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
    case actions.GET_CONFIG_PREPROPOSAL_COLLATERAL:
      return {
        ...state,
        configPreProposalCollateral: action.payload,
      };
    case actions.GET_ADDRESS_MAX_ALLOWANCE:
      return {
        ...state,
        addressMaxAllowance: action.payload,
      };
    case actions.SET_AUTHENTICATION_STATUS:
      return {
        ...state,
        isAuthenticated: action.payload,
      };
    case actions.GET_TOKEN_USD_VALUE:
      return {
        ...state,
        tokenUsdValues: action.payload,
      };

    default:
      return state;
  }
}

import { REDUX_PREFIX } from './constants';

export const actions = {
  SHOW_LOCK_DGD_OVERLAY: `${REDUX_PREFIX}SHOW_LOCK_DGD_OVERLAY`,
  SET_USER_ADDRESS: `${REDUX_PREFIX}SET_USER_ADDRESS`,
  SHOW_ALERT: `${REDUX_PREFIX}SHOW_ALERT`,
  SHOW_SIGN_CHALLENGE: `${REDUX_PREFIX}SHOW_SIGN_CHALLENGE`,
};

export function showHideLockDgdOverlay(show) {
  return dispatch => {
    dispatch({ type: actions.SHOW_LOCK_DGD_OVERLAY, payload: { show } });
  };
}

export function showSignChallenge(show) {
  return dispatch => {
    dispatch({ type: actions.SHOW_SIGN_CHALLENGE, payload: { show } });
  };
}

export function setUserAddress(address) {
  return dispatch => {
    dispatch({ type: actions.SET_USER_ADDRESS, payload: { address } });
  };
}

export function showHideAlert(alert) {
  return dispatch => {
    dispatch({ type: actions.SHOW_ALERT, payload: { ...alert } });
  };
}

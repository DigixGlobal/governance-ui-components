import { parseBigNumber } from 'spectrum-lightsuite/src/helpers/stringUtils';
import { REDUX_PREFIX } from './constants';

export const actions = {
  SHOW_LOCK_DGD_OVERLAY: `${REDUX_PREFIX}SHOW_LOCK_DGD_OVERLAY`,
  SET_USER_ADDRESS: `${REDUX_PREFIX}SET_USER_ADDRESS`,
  SHOW_ALERT: `${REDUX_PREFIX}SHOW_ALERT`,
  SHOW_SIGN_CHALLENGE: `${REDUX_PREFIX}SHOW_SIGN_CHALLENGE`,
  SHOW_WALLET: `${REDUX_PREFIX}SHOW_WALLET`,
  CAN_LOCK_DGD: `${REDUX_PREFIX}CAN_LOCK_DGD`,
  SHOW_RIGHT_PANEL: `${REDUX_PREFIX}SHOW_RIGHT_PANEL`,
  GET_CONFIG_PREPROPOSAL_COLLATERAL: `${REDUX_PREFIX}GET_CONFIG_PREPROPOSAL_COLLATERAL`,
  GET_ADDRESS_MAX_ALLOWANCE: `${REDUX_PREFIX}GET_ADDRESS_MAX_ALLOWANCE`,
};

function fetchConfig(contract, config, type) {
  return dispatch => {
    dispatch({ type, payload: { fetching: true } });
    return contract.uintConfigs
      .call(config)
      .then(result => dispatch({ type, payload: parseBigNumber(result, 0, false) }));
  };
}

export function fetchMaxAllowance(contract, address, contractAddress) {
  return dispatch =>
    contract.allowance.call(address, contractAddress).then(result =>
      dispatch({
        type: actions.GET_ADDRESS_MAX_ALLOWANCE,
        payload: parseBigNumber(result, 9, false),
      })
    );
}

export function fetchConfigPreproposalCollateral(contract, config) {
  return fetchConfig(contract, config, actions.GET_CONFIG_PREPROPOSAL_COLLATERAL);
}

export function showHideLockDgdOverlay(show) {
  return dispatch => {
    dispatch({ type: actions.SHOW_LOCK_DGD_OVERLAY, payload: { show } });
  };
}

export function canLockDgd(show) {
  return dispatch => {
    dispatch({ type: actions.CAN_LOCK_DGD, payload: { show } });
  };
}

export function showHideWalletOverlay(show) {
  return dispatch => {
    dispatch({ type: actions.SHOW_WALLET, payload: { show } });
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

export function showRightPanel(payload) {
  return dispatch => {
    dispatch({ type: actions.SHOW_RIGHT_PANEL, payload: { ...payload } });
  };
}

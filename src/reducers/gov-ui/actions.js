import { REDUX_PREFIX } from './constants';

export const actions = {
  SHOW_LOCK_DGD_OVERLAY: `${REDUX_PREFIX}SHOW_LOCK_DGD_OVERLAY`,
};

export function showHideLockDgdOverlay(show) {
  return dispatch => {
    dispatch({ type: actions.SHOW_LOCK_DGD_OVERLAY, payload: { show } });
  };
}

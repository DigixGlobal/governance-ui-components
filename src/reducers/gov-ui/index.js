import { actions } from './actions';

const defaultState = {
  LockDgdOverlay: {
    show: false,
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
    default:
      return state;
  }
}

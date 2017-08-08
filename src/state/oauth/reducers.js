import PromiseState from '../../infrastructure/PromiseState';
import PromiseReducer from '../../infrastructure/PromiseReducer';

import * as actionTypes from './actionTypes';

export const session = PromiseReducer({
  type: actionTypes.ACQUIRE_SESSION,
  handle: (state, action) => {
    switch (action.type) {
      case actionTypes.INVALIDATE_SESSION:
        return PromiseState.INVALID;
      default:
        return state;
    }
  }
})

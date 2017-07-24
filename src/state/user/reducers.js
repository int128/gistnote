import * as actionTypes from './actionTypes';
import { createReducer } from '../../infrastructure/PromiseHelper';

import PromiseResponse from '../../models/PromiseResponse';

export function authenticated(state = false, action) {
  switch (action.type) {
    case actionTypes.RESOLVE_USER:
      return true;
    case actionTypes.REJECT_USER:
      return false;
    default:
      return state;
  }
}

export const userResponse = createReducer(
  PromiseResponse,
  actionTypes.FETCH_USER,
  actionTypes.RESOLVE_USER,
  actionTypes.REJECT_USER,
)

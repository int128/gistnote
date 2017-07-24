import * as actionTypes from './actionTypes';
import { createPromiseReducer } from '../../infrastructure/PromiseHelper';

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

export const userResponse = createPromiseReducer(
  actionTypes.FETCH_USER,
  actionTypes.RESOLVE_USER,
  actionTypes.REJECT_USER,
)

import * as actionTypes from './actionTypes';

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

export function userResponse(state = PromiseResponse.LOADING, action) {
  switch (action.type) {
    case actionTypes.FETCH_USER:
      return PromiseResponse.LOADING;
    case actionTypes.RESOLVE_USER:
      return PromiseResponse.createResolved(action.data);
    case actionTypes.REJECT_USER:
      return PromiseResponse.createRejected(action.error);
    default:
      return state;
  }
}

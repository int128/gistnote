import PromiseResponse, { RESOLVED, REJECTED } from '../models/PromiseResponse';

export function createPromiseReducer(actionLoading, actionResolved, actionRejected) {
  return function (state = PromiseResponse.LOADING, action) {
    switch (action.type) {
      case actionLoading:
        return PromiseResponse.LOADING;
      case actionResolved:
        return new PromiseResponse({state: RESOLVED, data: action.data});
      case actionRejected:
        return new PromiseResponse({state: REJECTED, error: action.error});
      default:
        return state;
    }
  }
}

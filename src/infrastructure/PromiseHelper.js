import { LOADING, RESOLVED, REJECTED } from '../models/PromiseResponse';

export function createReducer(modelClass, actionLoading, actionResolved, actionRejected) {
  const loadingState = new modelClass({state: LOADING});

  return function (state = loadingState, action) {
    switch (action.type) {
      case actionLoading:
        return loadingState;
      case actionResolved:
        return new modelClass({state: RESOLVED, data: action.data});
      case actionRejected:
        return new modelClass({state: REJECTED, error: action.error});
      default:
        return state;
    }
  }
}

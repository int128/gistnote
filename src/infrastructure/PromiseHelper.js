import PromiseResponse, { RESOLVED, REJECTED } from '../models/PromiseResponse';

export function createPromiseReducer(loading, resolved, rejected, destroy) {
  return function (state = PromiseResponse.LOADING, action) {
    switch (action.type) {
      case loading:
        return PromiseResponse.LOADING;
      case resolved:
        return new PromiseResponse({state: RESOLVED, data: action.data});
      case rejected:
        return new PromiseResponse({state: REJECTED, error: action.error});
      case destroy:
        return PromiseResponse.LOADING;
      default:
        return state;
    }
  }
}

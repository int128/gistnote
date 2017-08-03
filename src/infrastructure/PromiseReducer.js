import PromiseState from './PromiseState';

export default (actionType, mapper = payload => payload, lastResort = state => state) =>
  (state = PromiseState.INVALID, action) => {
    switch (action.type) {
      case actionType:
        return PromiseState.LOADING;
      case `${actionType}_RESOLVED`:
        return PromiseState.resolved(mapper(action.payload));
      case `${actionType}_REJECTED`:
        return PromiseState.rejected(action.payload);
      case `${actionType}_INVALIDATE`:
        return PromiseState.INVALID;
      default:
        return lastResort(state, action);
    }
  }

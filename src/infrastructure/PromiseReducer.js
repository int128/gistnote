import PromiseState from './PromiseState';

export default ({
  type,
  mapResolved = payload => payload,
  handle = state => state,
}) =>
  (state = PromiseState.INVALID, action) => {
    switch (action.type) {
      case type:
        return PromiseState.LOADING;
      case `${type}_RESOLVED`:
        return PromiseState.resolved(mapResolved(action.payload));
      case `${type}_REJECTED`:
        return PromiseState.rejected(action.payload);
      case `${type}_INVALIDATE`:
        return PromiseState.INVALID;
      default:
        return handle(state, action);
    }
  }

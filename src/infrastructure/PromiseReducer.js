import { Seq } from 'immutable';

import PromiseState from './PromiseState';

export default ({
  type,
  types = [type],
  mapResolved = payload => payload,
  handle = state => state,
}) =>
  (state = PromiseState.INVALID, action) => {
    const value = Seq(types)
      .map(type => {
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
            return null;
        }
      })
      .find(value => value !== null);

    if (value === undefined) {
      return handle(state, action);
    } else {
      return value;
    }
  }

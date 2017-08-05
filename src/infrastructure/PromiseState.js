import { Record } from 'immutable';

export default class PromiseState extends Record({
  state: 'INVALID',
  payload: null,
}) {
  static stateTypes = {
    INVALID: 'INVALID',
    LOADING: 'LOADING',
    RESOLVED: 'RESOLVED',
    REJECTED: 'REJECTED',
  }

  static INVALID = new PromiseState();
  static LOADING = new PromiseState({state: PromiseState.stateTypes.LOADING});

  static resolved = payload => new PromiseState({state: PromiseState.stateTypes.RESOLVED, payload});
  static rejected = payload => new PromiseState({state: PromiseState.stateTypes.REJECTED, payload});

  isInvalid() {
    return this.state === PromiseState.stateTypes.INVALID;
  }

  isLoading() {
    return this.state === PromiseState.stateTypes.LOADING;
  }

  isResolved() {
    return this.state === PromiseState.stateTypes.RESOLVED;
  }

  isRejected() {
    return this.state === PromiseState.stateTypes.REJECTED;
  }

  mapIf({
    invalid = () => null,
    loading = () => null,
    resolved = () => null,
    rejected = () => null,
  }) {
    switch (this.state) {
      case PromiseState.stateTypes.INVALID:
        return invalid();
      case PromiseState.stateTypes.LOADING:
        return loading();
      case PromiseState.stateTypes.RESOLVED:
        return resolved(this.payload);
      case PromiseState.stateTypes.REJECTED:
        return rejected(this.payload);
      default:
        throw new Error(`unknown state ${this.state}`);
    }
  }

  mapIfResolved(f = payload => payload, valueIfNotResolved = null) {
    if (this.isResolved()) {
      return f(this.payload);
    } else {
      return valueIfNotResolved;
    }
  }

  mapIfRejected(f = payload => payload, valueIfNotRejected = null) {
    if (this.isRejected()) {
      return f(this.payload);
    } else {
      return valueIfNotRejected;
    }
  }
}

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
}

import { Record } from 'immutable';

export const INVALID = 'INVALID'
export const LOADING = 'LOADING'
export const RESOLVED = 'RESOLVED'
export const REJECTED = 'REJECTED'

export default class PromiseResponse extends Record({
  state: INVALID,
  data: null,
  error: null,
}) {
  static INVALID = new PromiseResponse();

  static LOADING = new PromiseResponse({state: LOADING});

  static createResolved(data) {
    return new PromiseResponse({state: RESOLVED, data});
  }

  static createRejected(error) {
    return new PromiseResponse({state: REJECTED, error});
  }
}

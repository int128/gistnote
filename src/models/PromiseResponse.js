import { Record } from 'immutable';

export const LOADING = 'LOADING'
export const RESOLVED = 'RESOLVED'
export const REJECTED = 'REJECTED'

export default class PromiseResponse extends Record({
  action: null,
  state: LOADING,
  data: null,
  error: null,
}) {
  static LOADING = new PromiseResponse();

  static createResolved(data) {
    return new PromiseResponse({state: RESOLVED, data});
  }

  static createRejected(error) {
    return new PromiseResponse({state: REJECTED, error});
  }
}

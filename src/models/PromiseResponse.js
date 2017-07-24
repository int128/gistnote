import { Record } from 'immutable';

export const LOADING = 'LOADING'
export const RESOLVED = 'RESOLVED'
export const REJECTED = 'REJECTED'

export default class PromiseResponse extends Record({
  action: null,
  state: LOADING,
  data: null,
}) {
  static LOADING = new PromiseResponse();
}

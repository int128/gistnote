import { Record } from 'immutable';

export default class OAuthState extends Record({
  state: null,
  backPath: null,
}) {
  static backPath(backPath) {
    const state = Math.random().toString(36).replace(/[^a-z]+/g, '');
    return new OAuthState({state, backPath});
  }

  verifyState(state) {
    return this.state === state;
  }
}

import { Record } from 'immutable';

export default class OAuthToken extends Record({
  token: null,
  scope: null,
}) {
  static NONE = new OAuthToken()

  getAuthorizationHeader() {
    if (this.token) {
      return `token ${this.token}`;
    }
  }
}

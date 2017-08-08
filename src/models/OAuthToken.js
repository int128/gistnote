import { Record } from 'immutable';

export default class OAuthToken extends Record({
  access_token: null,
  scope: null,
}) {
  static NONE = new OAuthToken()

  getAuthorizationHeader() {
    if (this.access_token) {
      return `token ${this.access_token}`;
    }
  }
}

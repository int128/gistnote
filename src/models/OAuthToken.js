import { Record } from 'immutable';

export default class OAuthToken extends Record({
  access_token: null,
  scope: null,
}) {
  static NONE = new OAuthToken()

  isValid() {
    return this.access_token !== null;
  }

  getAuthorizationHeader() {
    if (this.isValid()) {
      return `token ${this.access_token}`;
    }
  }
}

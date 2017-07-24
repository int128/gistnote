import { Record } from 'immutable';

export default class OAuthToken extends Record({
  token: null,
  scope: null,
}) {
}

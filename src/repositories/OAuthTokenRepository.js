import PromiseState from '../infrastructure/PromiseState';
import PreferenceStorage from '../infrastructure/PreferenceStorage';

import OAuthToken from '../models/OAuthToken';

const OAUTH_TOKEN = 'OAUTH_TOKEN';

export default class OAuthTokenRepository {
  storage = new PreferenceStorage(OAUTH_TOKEN);

  isPresent() {
    return this.storage.get() !== null;
  }

  get() {
    const json = this.storage.get();
    if (json !== null) {
      return new OAuthToken(json);
    } else {
      return OAuthToken.NONE;
    }
  }

  getAsPromiseState() {
    if (this.isPresent()) {
      return PromiseState.resolved();
    } else {
      return PromiseState.INVALID;
    }
  }

  save(oauthToken) {
    return this.storage.save(oauthToken.toJS());
  }

  remove() {
    this.storage.remove();
  }

  poll() {
    return this.storage.poll();
  }
}

import PreferenceStorage from '../infrastructure/PreferenceStorage';

import OAuthToken from '../models/OAuthToken';

const OAUTH_TOKEN = 'OAUTH_TOKEN';

export default class OAuthTokenRepository {
  storage = new PreferenceStorage(OAUTH_TOKEN);

  isPresent() {
    return this.storage.get() !== null;
  }

  getOrNull() {
    const json = this.storage.get();
    if (json !== null) {
      return new OAuthToken(json);
    } else {
      return null;
    }
  }

  save(oauthToken) {
    return this.storage.save(oauthToken.toJS());
  }

  poll() {
    return this.storage.poll();
  }
}

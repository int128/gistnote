import OAuthState from '../models/OAuthState';

const OAUTH_STATE = 'OAUTH_STATE';

export default class OAuthStateRepository {
  /**
   * @returns {OAuthState}
   */
  get() {
    try {
      const json = sessionStorage.getItem(OAUTH_STATE);
      return new OAuthState(JSON.parse(json));
    } catch (error) {
      
    }
  }

  /**
   * @param {OAuthState} oauthState 
   */
  save(oauthState) {
    sessionStorage.setItem(OAUTH_STATE, JSON.stringify(oauthState.toJS()));
  }
}

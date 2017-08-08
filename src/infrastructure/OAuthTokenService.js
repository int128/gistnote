import request from 'request-promise-native';

import OAuthToken from '../models/OAuthToken';

export default class OAuthTokenService {
  static endpoint = 'https://us-central1-gistnote.cloudfunctions.net';

  requestAccessToken(code) {
    return request({
      url: `${OAuthTokenService.endpoint}/access_token`,
      method: 'POST',
      json: true,
      body: {code},
    }).then(body => {
      if (body.error) {
        throw new Error(body.error_description);
      } else {
        return new OAuthToken(body);
      }
    });
  }
}

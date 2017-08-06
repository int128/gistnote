import request from 'request-promise-native';

import OAuthToken from '../models/OAuthToken';

export default class OAuthTokenService {
  authorize(code) {
    return request('https://gistnote.appspot.com/authorize', {
      method: 'POST',
      body: {code},
      transform: body => new OAuthToken(body),
    });
  }
}

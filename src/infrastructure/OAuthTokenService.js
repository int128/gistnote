import OAuthToken from '../models/OAuthToken';

const env = process.env.NODE_ENV;

export default class OAuthTokenService {
  static endpoint = 'https://us-central1-gistnote.cloudfunctions.net';

  fetchAuthorizationRequest() {
    return fetch(`${OAuthTokenService.endpoint}/access_token?env=${env}`, {
      mode: 'cors',
    }).then(response => response.json());
  }

  requestAccessToken(code) {
    return fetch(`${OAuthTokenService.endpoint}/access_token`, {
      mode: 'cors',
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({code, env}),
    })
    .then(response => response.json())
    .then(body => {
      if (body.error) {
        throw new Error(body.error_description);
      } else {
        return new OAuthToken(body);
      }
    });
  }
}

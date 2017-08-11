import OAuthToken from '../models/OAuthToken';

export default class OAuthTokenService {
  static endpoint = 'https://us-central1-gistnote.cloudfunctions.net';

  fetchAuthorizationRequest() {
    return fetch(`${OAuthTokenService.endpoint}/access_token`, {
      mode: 'cors',
    }).then(response => response.json());
  }

  requestAccessToken(code) {
    return fetch(`${OAuthTokenService.endpoint}/access_token`, {
      mode: 'cors',
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({code}),
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
